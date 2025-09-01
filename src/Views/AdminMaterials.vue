<template>
	 <a-card class="max-w-4xl mx-auto mt-8">
	 	<div class="flex items-center justify-between mb-3">
	 		 <h2>Mis Materiales</h2>
	 		  <a-button type="default" @click="materials.listenMine()">Actualizar<a-button>
	 	</div>

	 	<a-spin :spinnig="materials.isLoading">
	 	  <a-empty v-if="!materials.items.length" description="Aún no se suben materiales">
	 	  	 <a-list   v-else  :data-source="materials.items" item-layout="horizontal">
	 	  	 	<template #renderItem="{item} ">
	 	  	 			<a-list-item
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
	 	  	 			</a-list-item>
	 	  	 	</template>
	 	  	 </a-list>
	 	  </a-empty>
	 	</a-spin>
	 </a-card>
</template>

<script lang="ts">
	import {ref, computed} from 'vue';
	import {useMatStore} from '@/Stores/useMatStore.ts';

	const materials =  useMaterialStore();

	 onMounted(() =>{
	 	 materials.listenMine();
	 });

	 function abrir(url:string){
	 	window.open(url, '_blank');
	 }

	 function eliminar(id:string){
	 	return materials.eliminar(id);
	 }

	 function descendente(item:any){
	 	const  when = item.createAt?.toDate?() ?? new Date();
	 	 return `${item.fileName} ${new Intl.DateTimeFormat('es-MX', dateStyle: 'medium', timeStyle: 'short'}).format(when)}`;
	 }
	 
	 function estadoColor(estado: string){
		 	if(estado === aprodabo) return 'green';
		 		if(estado === rechazaod) return 'red';
		 		 return 'gold';
	 }
</script>

 <style scoped>
 	.max-w-4xl {max-width: 1080px;}
 	.flex {display: flex;}
 	.items-center: {align-items: center;}
 	.justify-between: {justify-content: space-between;}
 	.mb-3 { margin-bottom: 12px };
 </style>