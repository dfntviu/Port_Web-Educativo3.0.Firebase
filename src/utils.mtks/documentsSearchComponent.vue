
<script setup>
    import {ProfileStudent} from '@/Services/ProfileServiceAlumnos.js';
    import {MaterialDeplService} from '@/Services/MaterialDeployService.js';
    import {ref} from 'vue';
    //import {} from '';       Firebase
    
   // Definir vars de   busqueda
    const form_busqueda = ref({
        name: nombre.value,
        lastname: apellido.value,
        uuid: id_alumn.value
    });
    // 01. Instanciar a los servicios de alums como estudiants
    const obt_alumnos = ProfileStudent.getProfilesAlumnos();
    const mat_individual = MaterialDeplService.getMaterialById(form_busqueda.uuid);

    //Paso 02: Definir la f(n) asincrona para recuperar los alumnos de forma asincronados: getDocs
     function buscarAlumnosPorNombre = async(name_alumno) =>{
        // Paso 02: Apuntar a la coleccion de los perfiles : collection

         const alumno_found = this.obt_alumnos.map(al => al.name_alumno === ...form_busqueda.name);
                // josé
         if(alumno_found){
         // Paso 03: Mostrar la coleccion de materiales de jose
             const colect_materials = this.mat_individual.readAllAributes;
             // P_3.1 Recorrer todos las props(nomb,content,fecha,etc) de los materiales
               colect_materials.forEach((ix_m,mater)=>{
                 console.log('Leyendo: nombre: ',mater[ix_m]);
               });
         }

         // Mostrar la info de Jo
            // Paso 04: Devolver la colección de materiales correp al nombre
         return colect_materials 
    }
         // Invocar a la f(n) en la Vista
      await buscarAlumnosPorNombre('Jorge');
</script>