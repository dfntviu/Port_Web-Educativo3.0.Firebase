 import {defineStore} from 'pinia'
 import {ref, computed} from 'vue';
  import {MaterialService} from '@/Services/MaterialDeploy.Service.ts';

   export const useMaterialsStore = defineStore('materials', ()=>{
   	 // variables para controlar la paginacion de los alumnos
          const allItems = ref([])  //control de agreg. a la Firestore
          const currentPage = ref(0);
          const pageSize = 20;
          const nextPageToken = ref(false);

          const items = computed(()=>{
          	  const start = currentPage.value * pageSize;
          	  const end   =  start + pageSize;

          	    return allItems.value.slice(start,end);
          });
          // control de la direccion de la pagina, con apoyo de la validacion d (fetchPage)
       	const fetchPage = ((next = true)=>{
       		 if (next) {
       		 	if ((currentPage+1) * pageSize < allItems.value.length) {
       		 	       		 		currentPage.value++;   //La siguiente pagina
       		 	}else{
       		 		if (currentPage.value > 0) {
       		 			currentPage.value--; //La anterior pagina
       		 		}
       		 	}
       	};
       	
       	// Obtenncion de los material en por c/paginacion
       	const loadMaterials = async()=>{
       		try{
       			const materials = MaterialService.getAllMaterials();
       			allItems.value = materials
       			 nextPageToken.value = materials.length > pageSize;
       		}catch(error){
       			console.error(error);
       		}
       	}
       	// enviamos todo para recibirlo en la vista
       	 return {allItems,currentPage,nextPageToken,items,fetchPage, loadMaterials};
   });    