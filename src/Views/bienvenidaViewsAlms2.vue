<template>
	<div class="welcome-container">
		<h1 v-if="full_Name" class="
		">
		  !Bienvenido, {{full_Name}}
		</h1>
		 <p v-else class="loading-text">Cargando tú perfil</p>
	</div>
</template>

<script setup>
	import {ref} from 'vue';
	import {getUserProfile} from '@/Services/AuthService.ts';
	import {ProfileStudent} from '@/Services/profileServiceAlumnos.js';
	import  { initialzateFirebaseStg } from '@/Firebase/configFirebase.js';

	// Inicializar Firebase
	import {auth,db} = inicializateFirebaseStg();

	 const user_who = ref('');
	 const name = ref('');
	 const apellido = ref('');
	 const full_Name = ref('');

	 // Mostrar  mensajes de Bienvenida según corresponde el correo electronico
    
     const SeeWelcomeText = async(email, password){
     // Envuelveo en un Bloque salvador contra todo (Capturador de errores)
        try{
          	 // 1. Autenticar al Usuario
          	const loggear = AuthService.autenticate(email, password);
     
          	if(!loggear){
          		console.log('El UUID del usuario aún no ha sido identificado verifique el correo de su Sesión actual')
          		 return;
          	}
     
          	// 2. Obtener los datos del Alumno desde el servicio de la Clase ProfileStudent
     	     	 const current_user = await ProfileStudent.getDataUsuarioXCorreo(email);
     
     	       if(!current_user){
     	       		alert('Usuario NO registrado en la colección');
     	       		  return;
     	       }
     	       	// en el origen
     	       user_who.value = current_user;
     
     
     	       // 3. Obtener el Perfil de una de la coleccion d la FireStore
     	           const profile = getUserProfile(current_user, 'alumno');
     
     	          // 4.  Asignar nombre y apellido a las referencias reactivas
     	       	name.value    = profile.user;
     			apellido.value = profile.apellido;
     
     			//  Construir nombre Completo(FullName)
     			 full_Name.value =  `${name.value apellido.value}`;
     
     			 return full_Name; 
     	}catch(error){
     		console.error('Error al cargar el perfil del Usuario: ', error);
     	} //#Fin del catch
    } //#Fin de la F(n)

    // Asi será utilizdo, si se requiere trasladar a cualquier vista
      await  SeeWelcomeText('correo@ejemplo.com','654123');		    // Pero aqui será simplemente invocado desde el formulario
</script>

<!-- Estilos aplicado al Panel de Bienvenida -->
<style>
	.welcome-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		align-items: center;
		margin-top: 50px;
	}
	.welcome-text{
		font-size: 2em;
		color: #1a73e8;
		animation:  dispatch 1.5s ease-in-out;
	}
	.loading-text{
		font-size: 1.2rem;
		color: #555;
		animation:  dispatch 1.0s ease-in-out;
	}

	@keyframes dispatch {
		0% {  opacity: 0, 
			transform: translateX(-10px); 
		}
		100% {  opacity: 1, 
			transform: translateY(0px); 
		}
	}
</style>