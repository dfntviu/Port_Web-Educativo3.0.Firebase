<template>
  <div class="sub-materials">
  	 	<h2>Subir Materials</h2>
  	 <form @submit.prevent="handleSubmit">
  	 	<label >
  	 		Titulo:
  	 		<input type="text" v-model="material.titulo" required>
  	 	</label>
  	 	<label >
  	 		Descipción:
  	 		<text-area  v-model="material.descricpcion">
  	 	</label>
  	 	<label >
  	 		Material PDF:
  	 		<input type="file" @change="handleFileUpload" >
  	 	</label>


  	 	<button type="submit" :disabled="loading"></button>

  	 	<buton v-if="errorMsg"></div>>{{erorMsg}}</buton>
  	 	<buton v-if="succesMsg"></div>>{{succesMsg}}</buton>
  	 </form>

  </div>

  <div v-else>
	 <p>No tienes los permisos para acceder a la Vista</p>  	
  </div>
  	
</template>


<script >
	import {ref} from 'vue';
	import {useAuthStore} from '@/Stores/useAuthStore.ts';
	import {MaterialDeplService} from '@/Stores/MaterialDeployService.ts';

	export default {
		 setup(){
		 	 const authStore = useAuthStore();

		 	 const material = ref({ titulo: "", descripcion: "", archivoURL: ""});
		 	 const loading = ref(false);
		 	 const errorMsg = ref(null);
		 	 const succesMsg = ref(null);


		 	 const handleFileUpload = async () => {
		 	 	 const file = event.target.files[0];
		 	 	   if(!file) return;

		 	 	   material.value.archivoURL = URL.createObject(file);
		 	 }

		 	 const handleSubmit = async ()=> {
		 	 	loading.value = true;
		 	 	erroMsg.value = null;
		 	 	succesMsg.value = true;

		 	 	try{
		 	 		const saved =  await MaterialDeplService.saveMaterial({
		 	 			...material.value,
		 	 			autor: authStore.userFullName
		 	 		});

		 	 		succesMsg.value =  "El material ha sido subido correctamente!";
		 	 		 material.value = {titulo: "", descripcion: "", archivoURL: ""};

		 	 	}catch(error){
		 	 		erroMsg.value = error.message
		 	 	}finally{
		 	 		loading.value = false;
		 	 	}
		 	 };



		 	 return { authStore, material, loading, erroMsg, succesMsg, handleFileUpload, hanldeSubmit };
		}
	}
</script>

<style scoped>
	.error{ color: red; }
	.success{ color: green; }
</style>