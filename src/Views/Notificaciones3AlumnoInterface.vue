<template>
	<div>
		<h2>Notificacionea</h2>
		<ul>
			<li v-for="n in notifiaciones" :key="n.id">
				<span> {{n.mesage}}</span>
				<button @click="marcarNotifyRevisada(n.id)" v-if="!n.read"></button>
			</li>
		</ul>
		<button @click="enviarNotificacion">Enviar Test2</button>
	</div>
</template>

<script setup>
	import {ref, onMounted} from 'vue';
	import {useAuthStore} from '@/Stores/authStore.ts';
	import {NotificationsService} from '@/Services/NotificationsService.Interface.ts';

	//  accedemos a nuestro Servicios
	const authStore= useAuthStore();
	const notifiaciones= ref(['']);

	  // Gozamos(consumimos)  los servicios definidos

	// Escuchar las Notificaciones
	 onMounted( ()=>{
	 	NotificationsService.listen(authStore.role, authStore.uid, (items) =>{
	 		notifiaciones.value = items;
	 	});
	 });

	 // Marcar Como Leido
	  const marcarNotifyRevisada = async()=>{
	  	 await NotificationsService.marcarLeido(authStore.role, id, authStore.uid);
	  };
	 // Enviar Notificacion
	 const enviarNotificacion = async() =>{
	 	await NotificationsService.sendNotification(
	 			authStore.role,
	 			[authStore.uid],  // lista de destinatatios
	 			 '¡Bienvendio a tus Notificaciones!'
	 		  );
	 };

</script>