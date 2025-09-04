<template>
	<div>
		<h1>IniciarSesion</h1>
			
			<form @submit.prevent="controladorInicioSesion">
				<input type="text"  v-model="email">
				<span></span>
				<input type="password" v-model="password">
				<span></span>
				 <button type="submit">Ingresar</button>
			</form>
		
	</div>
</template>

<script setup>
	import {ref, computed} from 'vue';  //tick
	import { useAuthStore } from '@/Stores/useAuthStore.ts'; //tick
	import { AuthService } from '@/Stores/AuthService.ts'; //tick
	import { useRouter } from 'vue-router'; //tick (1/2)
	 import { navigationAlum } from '@/Layout/NavigationAlumno.vue';
	 import { navigationTeach } from '@/Layout/NavigationTeacher.vue';
	 
	 // Manip de las ents con el Estado
	const    email = ref('');
	const password = ref('');  //tick

	// Disp. al estado y la naveg(ruteo)
	const authStore = useAuthStore(); //tick (2/3) use var_generic
    const  router = useRouter()  //tick (1/2)

		// Validaciones UI(User Int.)
	     const valida_email = computed(()=> AuthService.authenticate(email.value,password.value); //cross 1/2
	  const valida_password = computed(()=> password.value.length >= 6);  //tick (1/2)

	 // Metodo Crontroladora del Loign
	export const controladorInicioSesion =  async ()=>{
	  // Esto esta medio bien es tick 2/3 
	     if( !valida_email.value || !valida_password.value){
	     	alert('Correo Institucional o contraseña no válidos');
	   	   return;
	    }	
	        const resultado_credts =   await authStore.login({
	         	    correo: email.value,
	         	contrasena: password.value,
	        });

        	if(resultado_credts.success){
        		// P3 Identificar que el usuario inical corresponda al rol de sesion
    		  if(authStore.role === 'alumno'){
    		  		router.push({name: 'adminMaterialsView'})
    		  }else if(authStore.role === 'profesor'){
					router.push({name: 'uploadMaterialsView'})
    		  }else{
    		  	 router.push({name:'HomeView'});
    		  }
        	}else{
        		alert("Error al inicar sesión: El ",this.email,' NO pertenece en los Roles de registro');
        	}			

	 	    /*if(result.success){
	 	  	  if(estado_auth.isAlumnoEmail) router.push()
 				 chage_route.push({name: 'NavigationAlumno'});
 			}*/
	};
</script>