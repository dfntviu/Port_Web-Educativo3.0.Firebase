 import {defineStore} from 'pinia'
 import {MaterialService} from '@/services/MaterialService.ts';
 import {useAuthStore} from './useAuthStore.ts';

   export const useMaterialStore = defineStore('materials', {
   	  state: ()=> ({
   	  	items: [] as any[],
   	  	isLoading: false,
   	  	lastError: null as string | null,
   	  	 unsub: null as null | (()=>void),

         // variables para controlar la paginacion de los alumnos
         /* allItems = ref([])
          currentPage = ref(0);
          pageSize = 20;
          nextPageToken = ref(false) */
   	  }),	

   	  getters:{
	   	   pendientes: (s)=> s.items.filter((x)=>x.estado === 'pendiente') 
   		   aprobados: (s)=> s.items.filter((x)=>x.estado === 'aprobado') 
   		   rechazados:(s)=> s.items.filter((x)=>x.estado === 'rechazado') 
      },

      actions: {
      	setError(m: string |null){
      	 	 this.lastError = m;
      	}, 
      	setLoading(v: boolean){
      	 	 this.isLoading = v;
      	},
      	listenMine(){
      	 	const auth = useAuthStore();
      	 	 if(auth.userUuid) return;
      	 	   this.setLoading(true);
      	 	  	this.unsub = MaterialService.listenMyMaterials(auth.userUuid, (items)=>{
      	 	  		   this.items = items;
      	 	  		   this.setLoading(false);
      	 	    });
      	},
      	
      	async upload(file: File, meta: {titulo: string, materia?: string}){
      	 	const auth = useAuthStore();
      	 	 if(!auth.userUuid) throw new Error('No autenticado');
      	 	   this.setLoading(true);
      	 	   	this.setError(null);
      	 	   try{
      	 	   	 return await MaterialService.uploadMaterial(auth.userUuid, file,meta);
      	 	   }catch(e: any){
        	 	   	 setError(e?.message || `Error al subir el material`);
        	 	   	  throw e;
      	 	   }finally{
      	 	   		this.setLoading(false);
      	 	   }
      	},

      	async eliminar(materialId: string){
      		const auth = useAuthStore();

      		  if(!auth.userUuid) throw new Error('Material no Registrado');
      		   await MaterialService.deleteMaterial(auth.userUuid, materialId)
      	},
      },// End of actions
   });