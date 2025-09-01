 import {defineStore} from 'pinia';
  import {NotificacionesService} from '@/Services/NotificacionesService.ts';

     export const useNotificacionesStore = defineStore('notify', {
     	state: ()=> ({
     	  items: [] as any,
     	  unsub: null as null | (()=> void),
     	}),
     	 getters:{
     	 	recientes: (s) => s.items.filter((n)=>{
     	 		const t = n.createAt?.toDate?.() ?? new Date(n.createAt);
     	 		 return (Date.now() - t.getTime()) /36e5 < = 6;
     	 	}),
     	 	antiguas: (s) => s.items.filter((n) => {
     	 		const t = n.createAt?.toDate?.() ?? new Date(n.createAt);
     	 		 return (Date.now() - t.getTime()) /36e5 < = 6;
     	 	}),
     	 },

     	actions:{
     	 	listenAlumno(){
      	 	 const auth = useAuthStore();
      	 	  if(auth.userUuid) return;
      	 	  	this.unsub?.();
      	 	  	this.unsub = NotificacionesService.listenAlumno(auth.userUuid, (items)=>{
      	 	  		   this.items = items;
      	 	    });
      		},

      	   listenProfesor(){
      	   	  this.unsub?.();
      	   	   this.unsub = NotificacionesService.marcarLeidoAlumno(auth.userUuid,notifId);
      	   },

      	   async marcarLeidoProfesor(notifId: string){
      	   	  await NotificacionesService.marcarLeidoProfesor(notifId);
      	   },
     	},

     });