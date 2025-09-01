
<script setup>
	// - Declaracion de librerias necesarias
	  /** Las de la Firebase **/	
	  import {getUserProfile} from '@/Services/AuthService.ts';
	  import {ProfileStudent} from '@/Services/profileServiceAlumnos.js';
	  import { doc, getDocs, collections} from 'firebase/firestore';
	  import {ref} from 'vue';   //del Fmwrk
	   import {auth,db} = inicializateFirebaseStg();

	  /** Dec variables  **/
	   // Locales
	   let user_who = ref('');
	   let pasword_who = ref('');
	   const name = ref('');
	   const apellido = ref('');
	   // Firebase
	/** La Lógica del Requerimiento (De la Vista)
	 * * **/

	  SawWelcomeText
    // 1. Recuperar las credenciales de autorizacion que corresponda con el servicio de autorizacion
	  const loggear = AuthService.autenticate(user_who, pasword_who);

	  if(loggear){
	  	 const current_user = ProfileStudent.getDataUsuarioXCorreo();
	  	  const  user_who = current_user;
	  	    return user_who;
	  }else{
	  	  console.log('El UUID del usuario aún no ha sido identificado verifique el correo de su Sesión actual')
	  }
       
   // 3. Desplegamso su estado reactivo del correo de la coleccion de profesores, Iterpolar el Mensaje de Bienvenida, con respecto a su sesion (uuid) Nombre completo + rol +
        if(loggear === user_who){
            const nombre = getUserProfile.name.value;
            const apellido = getUserProfile.apellido.value;
            let nombre_complete = nombre+apellido
              return nombre_complete;
        }else{
        	alert('Usuario no registrado en la coleecion');
        }


</script>
