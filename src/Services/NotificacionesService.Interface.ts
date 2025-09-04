  import { collection,      addDoc,   doc, setDoc, udpateDoc,
          serverTimeStamp, getDocs,  query, where,   orderBy,
          onSnapshot, updateDoc, doc } from 'firebase/firestore';
 import { initializateFireabaseStg } from '@/public/configFirebase.js';

  const  {db, storage} =  initializateFireabaseStg();

  export class NotificationsService {
    /**
     * Escucha notificaciones en tiempo real
     * @param role 'alumno' | 'profesor'
     * @param uid obligatorio para alumno
     * @param cb callback que recibe las notificaciones
      **/
      static listen(role: 'alumno' | 'profesor',uid: string | null, cb: (items: any)=> void){
         let qRef;

           if(role === 'alumno' && uid){
             qRef = query(collection(doc(db,'form_registers-alumnos', uid, 'notificaciones_alumno'),
                           orderBy('createdBy', 'desc')
                    );
           }else if(role === 'profesor' && uid){
              qRef = query(collection(doc(db,'notificaciones_profesor', 'global', 'form_registers-alumnos'),
                           orderBy('createdBy', 'desc')
              );
           }else{
              throw new Error('El rol ha sido invalido o uid no definido para el Alumno');
           }
          
           return onSnapshot(qRef, (snap)=> {
              const data: any[] = [];
                 snap.forEach((d) => data.push({id:d.id, ...d.data}) );
                  cb(data);
           });           
      }
        /**
        * Marca una notificación como leída
        * @param role 'alumno' | 'profesor'
        * @param notifyId id de la notificación
        * @param uid obligatorio para alumno
        */
      static async marcarLeido(role: 'alumno' | 'profesor', notifyId: string, uid?:string){
         let ref;
            if(role === 'alumno'  && uid){
               ref doc(db,'usuarios', uid, 'notificaciones_profesor');
            }else if(role === 'profesor'  && uid()){
              ref doc(db,'usuarios', uid, 'notificaciones_profesor');
            }else {
               throw new Error('El rol es invalido o el uid no fue Definido por el Alumno');
            }

            await updateDoc(ref, {leido:true});
      }
      /**
       * Marca una notificación como leída
       * @param role 'alumno' | 'profesor'
       * @param notifyId id de la notificación
       * @param uid obligatorio para alumno
       */
      static async sendNotification(role: 'alumno' | 'profesor',uidList: string[] , message:string){
         const promises = uidList.map( (uid) => {
            let collectionRef;

              if(role === 'alumno'){
                 collectionRef = collection(db,'form_registers-alumnos','notificaciones_profesor');
              }else if(role === 'profesor'){
                  collectionRef collection(db,'notificaciones_profesor', 'global', 'form_registers-alumnos');
              }else{
              throw new Error('El Rol es invalido');
           }
            return addDoc(collectionRef,{
              message,
              read: false,
              createdBy: serverTimeStamp(),
           });  

         });
        // Enviamos(Pagamos) todas las promesas
         await Promise.all(promises);
      }
  }