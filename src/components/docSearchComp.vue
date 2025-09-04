
<script setup>
    import {ProfileStudent} from '@/Services/ProfileServiceAlumnos.js'; // tick
    import {MaterialDeplService} from '@/Services/MaterialDeployService.js'; // tick
    import {ref, onMounted} from 'vue'; // tick 1/2
    //import {} from '';       Firebase
    
     // P0 Declaracion de Variables
   // Definir variables reactivas p/la busqueda.
    const    alumnos = ref([]);
    const materiales = ref([]);
    // Variable d control, p/la busqueda
    const alumno_encontrado = ref(null);

      /**
      * Componente de busqueda de materiales por filtro nombre del alumno es utilizable en
      * ambos roles, ademas de otras vistas en las que sean necesario.
      * */

      //Paso 01: Definir la f(n) de Busqueda de materiales por nombre del Alumno
     function buscarAlumnosPorNombre = async(nombre) =>{
        // Paso 1.1 Prevenir cualquier fallo
        try{
            const profiles = ProfileStudent.getProfilesAlumnos();  // tick(camb nombre)
             alumnos.value = profiles;

        // Paso 03: Buscar por Nombre(se utiliza find, para que buscar al primero que coincida)
        alumno_encontrado.find(al =>  al.name === nombre);

            // 3.1 verificar que se encontro, si no fue así =>
            if(!alumno_found){
                    console.warn(`Errror en la busqueda: NO se encontró el Alumno llamado: ${nombre}` );
                       return;
            }
            // 3.2 Si la busqueda fue acertada =>
            console.log('El Alumno: ', alumno_encontrado.value,' fue encontrado');

            // Paso 4: Traer los materiales relacionados
                            const materiales = await MaterialDeplService.getMaterialById(alumno_encontrado.value.uuid);

                            console.log('Materiales del Alumno:');

            // Paso 5: Recorremos los atributos de los materiales
                    materiales.value.forEach(mat => {
                        console.log('📘 - 🏫',mat.fecha, mat.nombre, mat.content, mat.description);
                    });

        }catch(err){ 
            // Lo mismo de siempre
            console.error('Error en la busqueda del Alumno: ', err);
        }
                
    }
        // example template
        onMounted(()=>{
         // Invocar a la f(n), se hara desde la Vista
            buscarAlumnosPorNombre('Jorge');
        })
</script>