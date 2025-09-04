  import { collection,      addDoc,   doc, setDoc, udpateDoc,
          serverTimeStamp, getDocs,  query, where,   orderBy,
          onSnapshot, updateDoc, doc } from 'firebase/firestore';
  import {NotificationsService} from '@/Services/NotificacionesService.ts';
  import { initializateFireabaseStg } from '@/config/initializateFirebase.js';

  const  {db, storage} =  initializateFireabaseStg();

      const matRef = doc(db,'reg_materials', materialId);
  export class ModerationMaterials{
   // 2 metodos adicionales por cualquier cosa

      static async aprobarMaterial(materialId,alumnoId){
           this.matRef;
        // const matRef = doc(db,'reg_materials', materialId);
          await updateDoc(matRef, {estado: 'aprobado', arpobadoAt: new Date() });
            await  NotificationsService.notifyAlumno(alumnoId,'El material Fue aprobado')
      }

      static async rechazarMaterial(materialId,alumnoId){
        this.matRef;
          // const matRef = doc(db,'reg_materials', materialId);
        await updateDoc(matRef, {estado: 'rechazado', arpobadoAt: new Date() });
          await  NotificationsService.notifyAlumno(alumnoId,'El material Fue rechazado')
        
      }

      static async getPendientes(){
         // const querySnapshot =  getDocs(collection(db,'reg_materiales'));
          const gran_filtro =  querySnapshot.docs.map(doc=> ({ id:doc.id, ...doc.data()} ))
                                                .filter(mat => mat.estado === 'pendiente');

              return gran_filtro;
      }

      /** no es aqui es para notificaciones
       *   static async notifyAlumno(alumnoId, mensaje){
                  try{
                    await addDoc(collection(db,'notificaciones_profesor'),{
                       alumnoId, mensaje,
                       createAt: serverTimeStamp();
                       leido:false;
                    });
                  }catch(error) {
                    console.error('Error notificando Alumno',er)
                  }
        } **/

  }