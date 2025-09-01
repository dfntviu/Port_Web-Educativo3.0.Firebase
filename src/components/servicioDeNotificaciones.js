 import { collection, addDoc, getDocs } from 'firebase/firestore';
 import {initializateFireabaseStg} from '@/public/configFirebase.js';

 const  {db} =  initializateFireabaseStg(); 

 export class ServeBasicNotifications {
    	static collectName = "notificaciones";
    	// static destinatarios = [] -> p/ambas

		static async createNotification(titulo, mensaje, destinatarios=[]){
		  		try{
		  			const docRef = await addDoc(collection(db,this.collectName),{
		  				titulo,
		  				mensaje,
		  				destinatarios,
		  				 fecha: new Date();
		  				  leidaPor: []
		  			});
		  			  return { id: docRef, titulo, mensaje, destinatarios };
		  		}catch(error){
		  			 console.error('[Servicio d notificaciones]: Error al mostrar Notificación');
		  		}
		}

    	static async getNotificationAlumno(email){
    	 	try{
    	 		const sanpshot = await getDocs(collection(db, this.collectName));
    	 		 return sanpshot.docs
    	 		   .map(doc => ({ id: doc.id, ...doc.data() }))
    	 		   .filter(n => n.destinatarios.includes(email));
    	 	}catch(error){
    	 		console.error('[Servicio d notificaciones]: Error al obtener Notificaciónes');
    	 		 throw error;
    	 	}
    	}
 } 