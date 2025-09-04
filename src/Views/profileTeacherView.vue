<script lang='ts'>
   import {useTeacherStore} from '@/Stores/useProfileProffe.official.ts'; 
   // instanciar el acceso al Store
    const pr_teacherStore = useTeacherStore();
    	// scope (global) o bien invocar al metodo de toda la vida de inicializacion
    const userTest1  = 'instituto@ejemplo.com';
    const passwordTest1 = '654123';
    
    export async function verPerfilDelProfesor(userTest1: String, passwordTest1: String){
    		pr_teacherStore.accesProfileData(userTest1,passwordTest1);

    }
</script>

<template>
	<div>
			<div>
				 <button @click="verPerfilDelProfesor"></button>
				<h3>Perfil del Profesor</h3>
				<p>Nombre:{{pr_teacherStore.usuario.user}} </p>
				<p>Correo:{{pr_teacherStore.usuario.correo}} </p>
				<p>Apellido:   {{pr_teacherStore.usuario.apellido}} </p>
				<p>Rol:   {{pr_teacherStore.usuario.role}} </p>
				<!-- <p>info1</p> <p>info1</p> <p>info1</p> -->
			</div>
		</div>	
</template>