<template>
	<div>       
		<div>
			 <h2>Registro de los Profesores</h2>
		<form @action.prevent="enviarRegistro">
			<input type="text" v-model="nombre">
			<input type="text" v-model="apellido">
			<input type="text" v-model="user">
			<input type="text" v-model="uuid" disabled>
			<input type="email" v-model="correo">
			<button class="bnt-succes">Enviar</button>
		</form>
		</div>
	<!-- Mostrar la confiramacion en la Ventana Modal  -->
	
		<div class="modal-box">                                                            
	        <span class="modal-close" @click="closeModal">&times;</span>               
	          <h3>Datos Capturados</h3>                                                
	          <p>Nombre:<strong>{{datosForma.nombre}} </strong></p>   <!--intepolar -->  
	          <p>Apellido: <strong>{{datosForma.apellido}} </strong></p>                   
	          <p>Carrera: <strong>{{datosForma.user}} </strong></p>                  
	          <p>Correo:  <strong>{{datosForma.correo}} </strong></p>    
	         </span> 
	    </div>                                                                       
	</div>
</template>

<script>
	import {onMounted,ref} from 'vue';
	import {initializateFireabaseStg} from '@/public/configFirebase.js';
	import { AuthService} from '@/Services/AuthService.ts';

	export default {
		setup(){
				
			const form_firestore_alumno = ref({
				nombre: ''
				uuid: '',
				user:'',
				correo:'',
				apellido:'',
				rol:''
			});
				// Var. reactiva del servicio, su inf se reasigna  a la store
			const firestore_alumno = ref('form_register_alumno');
				// obj autentificado destructurando 
				const { auth } = initializateFireabaseStg();

			const enviarRegistro = async( role= 'alumno')=>{  //0. Definir el role de alumno
 				   // - LlamadaProteger de cualquier error (lamding)
				  try{
				  			// 1 Llamar al Servicio y comenzar el consumo de Firestore
				  		const alumnos_fstore = await AuthService.getUserProfile(usuario_back,role); // error # 2 (pagar la sincronia)
			
			 			// 2. Agsingar a la var. reactiva (consumiendo el formualario.)
			 			form_firestore_alumno.value = alumnos_fstore;   // error # 1 (ausencia de atrib valor, y es en la fuente [ndestiny])

				  	// 3. Enviemos el objeto guardado, referenciado con la data.
				  		return form_firestore_alumno;
				  }catch(error){ 
				  	  // 4. Manejo estandar del error 
				  	 throw new Error('Tipo de Rol no definio o inexistente')  // error # 3 (sin instanciar)
				  	//console.error('Lo sentimo la colección, aun no existe en la Firestore');  Cualquiera de  los dos object
				  }  
			}

			const enviarRegistro2 = async( role= 'profesor')=>{  //0. Definir el role de alumno
 				   // - LlamadaProteger de cualquier error (lamding)
				  try{
				  			// 1 Llamar al Servicio y comenzar el consumo de Firestore
				  		const profesores_fstore = await AuthService.getUserProfile(usuario_back,role); // error # 2 (pagar la sincronia)
			
			 			// 2. Agsingar a la var. reactiva (consumiendo el formualario.)
			 			form_firestore_profesor.value = alumnos_fstore;   // error # 1 (ausencia de atrib valor, y es en la fuente [ndestiny])

				  	// 3. Enviemos el objeto guardado, referenciado con la data.
				  		return form_firestore_profesor;
				  }catch(error){ 
				  	  // 4. Manejo estandar del error 
				  	 throw new Error('Tipo de Rol no definio o inexistente')  // error # 3 (sin instanciar)
				  	//console.error('Lo sentimo la colección, aun no existe en la Firestore');  Cualquiera de  los dos object
				  }  
			}

			 onMounted(async()=>{  //redefino la sincronia 
			 	 // pago la sincronia(cumplo mi promesa)
			 	  await enviarRegistro(usuario_back, 'alumno');
			 });
			return {

				enviarRegistro;
			}
		}
</script>