<template>
	 <a-card class="max-w-4xl mx-auto mt-8">
	 	<div class="flex items-center justify-between mb-3">
	 		 <h2>Mis Materiales</h2>
	 		  <a-button type="default" @click="materials.listenMine()">Actualizar<a-button>
	 	</div>

	 	<a-spin :spinnig="materials.isLoading">
	 	  <a-empty v-if="!materials.items.length" description="Aún no se suben materiales">
	 	  	 <!-- <a-list   v-else  :data-source="materials.items" item-layout="horizontal"> -->
	 	  	 	<!-- <template #renderItem="{item} "> -->
	 	  	 			<!-- <a-list-item
	 	  	 				:title="item.titulo"
	 	  	 				:description="desc(item)"
	 	  	 			>
	 	  	 				<template #actions>
	 	  	 					<a-tag :color="estadoColor(item.estado)"> {{item.estado}} </a-tag>
	 	  	 					<a-button size="small" @click="abrir(item.url)">Ver</a-button>
	 	  	 					<a-pop-confirm title="¿Eliminar material?" @confirm="eliminar(item.id)">
	 	  	 						<a-button danger  size="small">Eliminar</a-button>
	 	  	 					</a-pop-confirm>
	 	  	 				</template>
	 	  	 			</a-list-item> -->
	 	  	 	<!-- </template> -->
	 	  	 <!-- </a-list> -->
	 	  </a-empty>
	 	</a-spin>
	 </a-card>
</template>

<script lang="ts">
	import {ref, computed} from 'vue';
	import {useAuthStore} from '@/Stores/useAuthStore.ts';
	import {MaterialDeplService } from '@/Stores/MaterialDeployService.ts';


	export default(){
		setup(){
		 	const aut_store =  useAuthStore();
		 	const materials = ref([]);
		 	const loading  = ref(false);
		 	const errorMsg =  ref(null);

		 	const fetchMaterials = async() => {	
		 		loading.value = "";
		 		errorMsg.value = "";

		 		try{
		 			materials.value = await MaterialDeplService.getAllMaterials();
		 		}catch(error){
		 			errorMsg.value = error.message;
		 		}finally{
		 			 loading.value = false;
		 		}
		 	};

		 // };
		 const eliminarMaterial = async(id) => {	
		 		if(confirm("Estas seguro de Eliminar el Material?")) return;

		 		try{
		 			await MaterialDeplService.deleteMaterial(id);
		 			 materials.value = materials.value.filter(mt => mt.id !== id);
		 		}catch(error){
		 			alert("Error al eliminar: "+ error.message);
		 		}
		 };
	
	// };
		
		const editarMaterial =  async(mat) =>
		{
			const nvo_titulo = prompt('El Nuevo Titulo:', mat.titulo);
			const nueva_descripcion = prompt('LA Nueva Descripcion:', mat.descricpion);			

			if(!nvo_titulo || !nueva_descripcion) return;

			try{
				await MaterialDeplService.saveMaterial({mat, titulo: nvo_titulo, descricpion: nueva_descripcion});
				 await fetchMaterials();
			}catch(error){
				alert("Error al actualizar  Datos del Material:"+ error.message);
			}
		};

		onMounted(()=>fetchMaterials());
		return {aut_store, materials, loading, errorMsg, eliminarMaterial, editarMaterial}
    };
};
	
</script>

 <style scoped>
 	
 </style>