<template>
	<div>
		<form @subimit.prevent="controladoraEnvioDatos">
			<label for="">Nombre</label>
			<input type="text" v-model="form.nombre">
			<label for="">Apellido</label>
			<input type="text" v-model="form.apellido">
			<label for="">Correo</label>
			<input type="text" v-model="form.correo">
			<label for="">Usuario</label>
			<input type="text" v-model="form.user">

			<button type="submit">Actualizar Perfil</button>
		</form>
	</div>
</template>

<script>
	import {onMounted,ref} from 'vue';
	import {initializateFireabaseStg} from '@/public/configFirebase.js';
	import { ProfileStudent} from '@/Services/profileServiceAlumnos.js';

	export default {
		setup(){
				
			const form = ref({
				nombre: ''
				uuid: '',
				user:'',
				correo:'',
				apellido'',
			});
				// obj autentificado destructurando 
				const { auth } = initializateFireabaseStg();

			const cargarPerfil = async ()=>{
				const user = auth.currentUser;

				if(!user) return;
					try{
						// Considerando que el uuid del alumno de la firestore es identico que el uuid de la sesion
						const perfil = await ProfileStudent.getProfileDelAlumno(user.value);
						 if(perfil){
						 	form.value = {uuid: user.uid, ...perfil};
						 }
					}catch(error){
						console.error('Error al cargar el Perfil del Alumno');
					}
			};

			const controladoraEnvioDatos = async ()=>{
				try{
						// Considerando que el uuid del alumno de la firestore es identico que el uuid de la sesion
						const actualizado = await ProfileStudent.updateProfileAlum(form.value);
						 alert('El perfil ha sido actualizado Correctamente');
						  form.value = actualizado;
					}catch(error){
						console.error('Error al cargar el Perfil del Alumno');
					}
			};

			onMounted(()=>{
				cargarPerfil();
			});

			return {
				form, controladoraEnvioDatos;
			}
		}
	};

</script>

<style scoped>
	
</style>