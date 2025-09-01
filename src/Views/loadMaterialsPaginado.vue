 <template>
 	<div class="p-4">
    <h2>Materiales Educativos</h2>
    <GridHijo />
  </div>
 </template>

 <script setup>
 	import {onMounted, provide} from 'vue';
 	import {useMaterialsStore} from '@/Stores/materials.js'
 	// Componente hijo con el grid CSS de los elementos (sin definir)
 	import GridHijo from "./GridHijo.vue";

 	const store_mat = useMaterialsStore();

 	onMounted(async()=>{
 		await store_mat.loadMaterials();
 	});

 	// Proveemos el contexto de todos sus descendientes
 	 provide("paginacion", {
 	 	 items: store_mat.items,
 	 	 currentPage: store_mat.currentPage,
 	 	 nextPageToken: store_mat.nextPageToken,
 	 	 fetchPage: store_mat.fetchPage
 	 });

 </script>
