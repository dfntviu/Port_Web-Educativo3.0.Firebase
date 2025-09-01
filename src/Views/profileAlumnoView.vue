<template>
	<div>
		<h2>Modificar Contraseña
			<form @subimit.prevent="contraladoraChangePassword">
				<label for="actual">Contraseña Actual</label>
				<input type="text">

				<label for="nueva">Contraseña Nueva</label>
				<input type="text">

				<button>Guardar Cambios</button>
			</form>
		</h2>
	</div>
</template>

<script>
	// Composition API
	import { ref } from 'vue';
	import { ProfileStudent } from '@/Services/profileServiceAlumnos.js';
	export default {
		setup(){
			const passwd  = ref('');
			const new_passwd = ref('');

			const contraladoraChangePassword = async()=>{
				try{
					await ProfileStudent.changePasswordAlum(passwd.value, new_passwd.value);
					console.log('Consumo del Servicio exitoso, La Actualizacion de Contraseña culminado');
						passwd.value = '';
						new_passwd.value = '';
				}catch(error){
					 console.error('Error: Lo sentimos, el servicio del Perfil de Cambio de Contrasenia del Alumno no fue consumido');
				}
			};

			return {
				passwd, new_passwd,
				contraladoraChangePassword
			};

		}
	};
</script>

<style scoped>
	
</style>