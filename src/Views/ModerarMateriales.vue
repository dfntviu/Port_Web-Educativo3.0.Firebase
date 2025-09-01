<template>
	<main>
		<div class="flex items-center justify-between mb-3">
			<h2>Moderación del Material Edu.</h2>
			 <button @click="recargar">Recargar</button>
		</div>
			<template>
		<div :data-source="notifys.elements">
				<li>
					<a 
					  :title="element.tituloPDF"
					  :descripcion="desc(element)"
					>
					  <template>
					  	  <button @click="ver(element.url)">Ver</button>
					  	  <button @click="aprobar(element)">Aprobar</button>
					  	  <a-pop-confirm @confirm="rechazar(element)">
					  	  	 <button danger size="small">Rechazar</button>
					  	  </a-pop-confirm>

					  </template>
					</a>
				</li>
			</template>
		</div>
		 <div v-if="notifys.elements.length" description="Sin materiales Pendientes"></div>
	</main>
</template>

<script lang="ts">
  import {onMounted} from 'vue';
  import {useNotificacionesStore} from '@/Stores/useNotificationStore.ts';
  import {EvaluateMaterialService}  from '@/Services/EvaluarMaterialService.ts'; 
  import {useAuthStore} from '/@Stores/useAuthStore.ts';

  		const notifys = useNotificacionesStore();
      	const auth  = useAuthStore();


      onMounted(()=>{
      	 notifys.listenProfesor();
      })

      function recargar(){
      	notifys.listenProfesor();
      }

      function desc(element:any){
      	 const t = item.createdAt?.toDate?.() ?? new Date();
      	  return `Alumno: ${element.uidAlumno} ${new Initl.DateTimeFormat('es-MX',  {dateStyle: 'medium', timeStyle: 'short' }).format(t)}`;
      }

      function ver(url:string){
      	 window.open(url, '_blank');
      }

       async function aprobar(element: any){
      	 await EvaluateMaterialService.aprobarMaterial(element.uidAlumno, element.materialId, auth.userUuid!);
 		  await notifys.marcarLeidoProfesor(element.id);
       }

       async function rechazar(element: any){
 		  await notifys.rechazarMaterial(element.uidAlumno,element.materialId, auth.userUuid!);
 		  await notifys.marcarLeidoProfesor(element.id);
       }

</script>

<style>
   .max-w-5xl { max-width: 1200px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .mb-3 { margin-bottom: 12px; }
</style>