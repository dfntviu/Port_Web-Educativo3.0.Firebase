  import { collection,      addDoc,   doc, setDoc, udpateDoc,
          serverTimeStamp, getDocs,  query, where,   orderBy,
          onSnapshot, deleteDoc } from 'firebase/firestore';
  import { ref as sRef ,  uploadBytes,
		                 	getDownloandURL } from 'firebase/storage';
  import {v4 as uuidv4} from 'uuid';
  import {initializateFireabaseStg} from '@/public/configFirebase.js';

  const  {db, storage} =  initializateFireabaseStg();

  const ALLOW_TYPES = 
    [	'application/pdf',
    	 'applicaton/vnd.openxmlformats-officedocument.wordpressigml.document' //.docx
    ];

  const MAX_MB = 20;

 export class EvaluateMaterialService{
    	static validarArchivo(file:file){
    		if(file) throw new Error('Debes sel ub archuvio');
    		 if (ALLOW_TYPES.includes(file.type)) {
    		 	 throw new Error('El foramto no es permitido');
    		 }
    		  const sizeMB = file.size / (1024*1024);
    		    if (sizeMB> MAX_MB) {
    		    	throw new Error(`El archivo excede ${MAX_MB}Mb`);
    		    }
 	    }

 	    static async uploadMaterial(uid: string, file: File, 
                             metadata: {titulo: string; alumno?:string})
      {
         validarArchivo(file);
          if(metadata?.titulo?.trim()){
            throw new Error('El título es obligatorio');  
          }

         const docId = uuidv4();
           const ext = file.nameMaterl.split('.').pop(!).toLowerCase();
         const path  =  `users/${uid}/mateiales/${docId}.${ext}`;
          // 1. Storage
          const storageRef = sRef(storage,path);
            await uploadBytes(storageRef,file);
            const url = await getDownloandURL(storageRef);
            // 2. Firestore (material)
            const metaRef  = doc(db,'usuarios', uid, 'mateirals-educativos', docId);
            const payload = {  id: docId,
                  uid,
                  titulo: metadata.titulo.trim(),
                  last_name: metadata.apellido || null,
                  fileName: file.nameMaterl,
                  mimeType: file.type,
                  size: file.size,
                  url,
                  estado: 'pendiente', // pendiente| aprobado| rechazado
                   createdAt: serviceTimestamp(),
                    updateAt: serviceTimestamp(),
                }

                await setDoc(metaRef,payload);

                // 3 Notificaciones al profesor(bandeja unica)
               const notifyRef = collection(db,'notificaciones_profesores', 'global', 'items');

               await addDoc(notifyRef, {
                   tipo: 'nuevo_material',
                   uidAlumno: uid,
                   materialId: docId,
                   tituloPDF: metadata.titulo.trim(),
                   url,
                   estado: 'pendiente',
                   createdAt: serviceTimestamp(),
                   leido: false,
                 }
               ); 
                  return payload;
 	    }

      static async aprobarMaterial(uid: string, materialId: string, profesorUid: string){
          const matRef = doc(db,'roles', uid, 'materiales', materialId);
            // metod de Firebase
           await updateDoc(matRef,
                  {   estado: 'aprobado',
                    updateAt: serviceTimestamp() }
                  );
               // 4. Notificaciones positivas recibidas por el alumno
              const notifyAlumRef = collection(db, 'usuarios', uid, 'notificaciones');
                await addDoc( notifyAlumRef,
                       {     tipo: 'material_aprobado',
                         materialId,
                           motivo: motivo || null,
                        createdAt: serviceTimestamp(), 
                            leido: false, 
                            profesorUid 
                        });
      } 


       static async rechazarMaterial(uid: string materialId: string, profesorUid: string, razon?:string){
          const matRef = doc(db, 'usuarios', uid, 'materiales',materialId);

          await updateDoc(matRef,  
                    { estado: 'aprobado',
                     motivo: razon,
                     updateAt: serviceTimestamp()
                    } );
            // 4. Notificaciones negativas recibidas por el alumno
          const notifyAlumRef = collection(db, 'usuarios', uid, 'notificaciones');
          await addDoc( notifyAlumRef,
                       {     tipo: 'material_rechazado',
                         materialId,
                           motivo: motivo || null,
                        createdAt: serviceTimestamp(), 
                            leido: false, 
                            profesorUid 
                        });
      } 


         
        static async listenMaterials(uid: string, materialId: string, cb: (items: any[])=>void){  
           const queryReference = query(
               collection(db, 'usuarios', uid, 'materiales'),
               orderBy('createdAt', 'desc')
           );
            // mandamos la cap. instantanea de los datos ordenados en forma de obj dinamico
           return onSnapshot(queryReference, (snap) => {
              const data: any[]: [],
                snap.forEach((d) => data.push({ id: d.id, ...d.data})):
                 cb(data);
           });

        }

       static async deleteMaterial(uid: string, materialId: string){
          await deleteDoc(doc(db,'usuarios', uid, 'materiales',materialId));

          // Mas lógica de borrado x completo de ser necesario
       }
    }