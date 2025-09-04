  import { collection,      addDoc,   doc, setDoc, udpateDoc,
          serverTimeStamp, getDocs,  query, where,   orderBy,
          onSnapshot, updateDoc, doc } from 'firebase/firestore';
 import { initializateFireabaseStg } from '@/public/configFirebase.js';

  const  {db, storage} =  initializateFireabaseStg();

  export class NotificationsService {
     static listenAlumno(uid: string, cb:(items: any[])=> void){
        const qRef = query(
          collection(db, 'usuarios',uid, 'notificaciones_profesor'),
          orderBy('createdBy','desc')
        );

         return onSnapshot(qRef, (snap) => {
              const data: any[]: [],
                snap.forEach((d) => data.push({ id: d.id, ...d.data})):
                 cb(data);
           });
     }

      static listenProfesor(cb:(items: any[])=> void){
         const qRef = query(
          collection(db, 'notificaciones_profesor', 'global', 'items' );
           orderBy('createdBy', 'desc');
          
           return onSnapshot(qRef, (snap) => {
              const data: any[]: [],
                snap.forEach((d) => data.push({ id: d.id, ...d.data})):
                 cb(data);
           });
      }

      static marcarLeidoProfesor(notifyId:string){
        const ref =  doc(db,'notificaciones_profesor','global', items, notifyId );
         await updateDoc(ref, {leido: true});
      }

      static marcarLeidoAlumno(uid: string, notifyId:string){
        const ref =  doc(db,'usuarios', uid, 'notificaciones_profesor', notifyId );
          await updateDoc(ref, {leido: true});
      }
      // Seguramente se ocupara. Entonces a lucirse
      static async notifyAlumno(alumnoId, mensaje){
          try{
            await addDoc(collection(db,'notificaciones_profesor'),{
               alumnoId, mensaje,
               createAt: serverTimeStamp();
               leido:false;
            });
          }catch(error) {
            console.error('Error notificando Alumno',er)
          }
      }

      /**static async sendNotification(uidList, message) {
         const promises = uidList.map(uid => {
          return addDoc(collection(db, 'notificaciones'), {
            uid,
            message,
            read: false,
            timestamp: new Date()
          });
        });
        await Promise.all(promises);
      } **/

  }