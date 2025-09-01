  import { collection,      addDoc,   doc, setDoc, udpateDoc,
          serverTimeStamp, getDocs,  query, where,   orderBy,
          onSnapshot, updateDoc, doc } from 'firebase/firestore';
 import { initializateFireabaseStg } from '@/public/configFirebase.js';

  const  {db, storage} =  initializateFireabaseStg();

  export class NotificationsService {
     static listenAlumno(uid: string, cb:(items: any[])=> void){
        const qRef = query(
          collection(db, 'usuarios',uid, 'notificaciones'),
          orderBy('createdBy','desc')
        );

         return onSnapshot(qRef, (snap) => {
              const data: any[]: [],
                snap.forEach((d) => data.push({ id: d.id, ...d.data})):
                 cb(data);
           });
     }

     static listeProfesor(cb:(items: any[])=> void){
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
        const ref =  doc(db,'usuarios', uid, 'notificaciones', notifyId );
         await updateDoc(ref, {leido: true});
     }
  }