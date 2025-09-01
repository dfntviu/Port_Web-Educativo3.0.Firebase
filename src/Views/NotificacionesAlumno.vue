<template>
  <a-card class="max-w-3xl mx-auto mt-8">

  	<section v-if="notifs.recientes.length">
	  	<h4>Recientes</h4>
	  	 <a-list :data-source="notifs.recientes">
	  	 	<template #renderItem="{item} ">
	  	 		<a-list-item @click="marcarLeido(item.id)" style="cursor: pointer;">
	  	 			<a-list-item-meta
	  	 			 :title="titulo(item)"
  					 :description="fecha(item)"
	  	 			>
	  	 			</a-list-item-meta>
	  	 		</a-list-item>
	  	 	</template>
	  	 </a-list>
    </section>

     <section v-if="notifs.antiguas.length" class="mt-6">
  	  <h3>Más Antiguas</h3>
  	    <a-list :data-source="notifs.antiguas">
  	    	<template #renderItem="{item}" >
  	    		 <a-list-item @click="marcarLeido(item.id)" style="cursor: pointer;">
  	    		 	<a-list-item-meta 
  	    		 		:title="titulo(item)"
  	    		 		:description="fecha(item)"
  	    		 	>
  	    		 		
  	    		 	</a-list-item-meta>
  	    		 </a-list-item>
  	    	</template>
  	    </a-list>

       <a-empty v-if="notifs.items.length" description="No hay notificaciones."/>		
    </section>
  </a-card>	
</template>


<script lang="ts">
   import {ref, computed} from 'vue';
	import {useNotificacionesStore} from '@/Stores/useMatStore.ts';

	const notifications =  useNotificacionesStore();

	 onMounted(() =>{
	 	notifications.listenAlumno();
	 });

	 	function titulo(n: any){
	 		if(n:tipo=== 'material_aprobado') return 'El Mat. Educativo fue: Aprobado';
	 			if(n:tipo=== 'material_aprobado') return 'El Mat. Educativo fue: Rechazado';
	 			 return 'Notificacion';
	 	}

	 	function fecha(n: any){
	 		const t =  n.createdAt?.toDate?.() ?? new Date(); 
	 		 return new Init.DateTimeFormat('es-MX', {dateStyle: 'medium',timeStyle: 'short'}).format(t);
	 	}

	 	function marcarLeido(id: string){
	 		 notifications.marcarLeidoAlumno(id);
	 	}
</script>

 <style scoped>
 	.max-w-3xl { max-width: 960px; }
    .mt-6 { margin-top: 24px; }
    .mb-3 { margin-bottom: 12px; }
 </style>