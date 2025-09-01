<template>
  <a-card class="max-w-2wl mx-auto mt-8">
    <h2>Subir el Material Educ.</h2>
     <a-form layout="vertical" @submit.prevent="handleUpload">
       <a-form-item label="materia  (opcion) ">
          <a-input v-model:value="alumno" placeholder="Tu nombre"></a-input>
       </a-form-item>
       
       <a-form-item 
          label="Archivo (PDF/DOCX max. 20MB)"
          :validate-status="fileStatus"
          :help="fileHelp">
        </a-form-item>

         <input type="file" @change="onFile" >
      
        
        <a-button type="primary" :loading="materials.isLoading" @click="handleUpload">
           {{materials.isLoading ? 'Subiendo...' : 'Subir'}}
        </a-button>

        <div class="mt-3" v-if="materials.lastError">
            <a-alert type="error" :message="materials.lastError" show-icon />
        </div>
    </a-form>
  </a-card>

</template>

<script setup lang="ts"> 
  import {ref, computed} from 'vue';
  import {useMatStore} from '@/Stores/useMatStore.ts';
  
     const materials = useMaterialStore();

     const file = ref<File | null>(null);
     const titulo = ref('');
     const alumno = ref('');

     const   tituloVal = computed(() =>titulo.value.trim().length >=3);
     const titleStatus = computed(()=>titulo.value && titulo.value ? 'error' : '' );
       const titleHelp = computed(()=>titulo.value && titulo.value ? 'Mínimo 3 caracteres' : '' );

      const   fileVal = computed(() =>file.value);
     const fileStatus = computed(()=>fileVal.value ? 'error' : '' );
     const   fileHelp = computed(()=>fileVal.value ?  'Selecciona un archivo' : '' );

     function onFile(e:Event){
       const input = e.target as HTMLInputElement;
         file.value = input.file?.[0] || null;
     }

      async function handleUpload(){
         if(!tituloVal.value ||fileVal.value) return;
           await materials.upload(file.value!, {titulo.value, alumno.value || undefined});
          // Limpiar campos
           file.value = null;
           titulo.value = '';
           alumno.value = '';
      }
</script>
<style scoped>
		.max-w-2wl{
      max-width: 800px;
    }
</style>