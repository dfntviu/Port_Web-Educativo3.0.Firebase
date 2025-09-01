 	 //Definir la f(n) asincronica med. getDocs p/recuperar a los alumnos 
   import { getDocs, collection } from 'firebase/firestore';
   import { db }  = inicializateFirebaseStg();
   import { getAuth } from '/firebase/auth';  // p/la contrasenia
   import { EmailAuthProvider, reauthenticateWithCredential, updatePassword} from '/firebase/auth';  //news 2,3

   		// Scope de las colecciones de la Firestore
      const perfilCollection = collection(db, "form_register-alumnos");		// Paso 02: Apuntar a la coleccion de los alumnos(la Firestore) 
      const auth 		     = getAuth();

	export class ProfileStudent {

 		// Paso 04:Exponer la f(n) como el servicio de Perfil de Alumnos
 		static async getProfilesAlumnos(){
 			try{
 			 // Paso 03: Obtener los documentos(Tal cual como en LStge, pero desde Firebase)
 				 const perfilSnapshot = await getDocs(perfilCollection);
 				 const perfilList = perfilSnapshot.docs.map(doc => ({
						 				id: doc.id,
						 				...doc.data();
 				 					}));
 			}catch(error){
 				console.error('error al obtener los perfiles de alumnos',eror);
 				// Paso 03: Devolver la coleccion
 				 return perfilList;
 				 // return [];
 			}
 		},


 		// Prop: Mostrar los datos del alumno basados en el correo de incio de sesión 
		static async getDataUsuarioXCorreo(){
			const user = auth.currrentUser;

			 if(!user){
			 	 console.warn('Error: No hay usurio autenticado');
			 	  return null;
			 }

			 const email = user.email;
			 const usarios_ref = collection(db,'form_register-alumnos');

			 	const  query_ident = query(usarios_ref, where("correo" "===", email));

			 const querySnapshot = await getDocs(query_ident);

			 if(querySnapshot.empty){
			 	 console.log("No se encontraron usuarios con este correo");
			 	  return null;
			 }
			 	// enviar el correo q corresponde al usuario unico con el email
			 return querySnapshot.docs[0].data();
		},


		 static async getProfileDelAlumno(idUsuario){
		 	const profiles = this.perfilList;  // a prueba, ahorrarse el scope de la 8

		 	 const q = query(profiles, where('idUsuario','==', idUsuario));
		 	  const querySnapshot = getDocs(q);

		 	  if(querySnapshot.empty){
			 	 console.log("No se encontró usuarios el perfil del Alumno");
			 	  return null;
			  }
			  	// El perfil que le corresponde al Id
			  return querySnapshot.docs[0].data();
		 }
		 	
		

		//  Prop: Cambiar la contrasenia del Alumno
	    static async changePasswordAlum(passwd, new_passwd){
	   	  try{
 				 const user = auth.currrentUser;
 				 // Asegurarse de que hay un usuario autenticado
	           if(user || user.email){
	           	 throw new Error("No hay un usuario autenticado");
	           }

	           // 1. Iniciar la Reautenticacion con las credenciales actuales
	            const credential = EmailAuthProvider.credential(user.email, passwd);
	              await reauthenticateWithCredential(user,credential);

	           // 2. Actualizar la contrasenia
	               await updatePassword(user, new_passwd);
	             // 2a. Notificar al usuario desde el Front
	               alert('La nueva contraseña ha sido  modificada correctamente');
 			}catch(error){
 				console.error('error al cambiar la contraseña.Verifica que cumpla los criterios de Autentificación',eror);
 				  throw error;
 				//  * No es necesario regresar nada
 			}
	    },

	    // Casi Exactame igual que en los serviceProffessor: Editar cualquier atributo del Alumno
	    static async updateProfileAlum(profile){
	    	try{
 			 	// 1. Extraer el uid y el resto de los campos a actualizar
 			 	 const {uuid, ...rest} = profile;  //en el 2 parametro vienen todos los campos;

 			 	  if(!uuid){
 			 	  	throw new Error("El perfil no tiene un UUID válido");
 			 	  }

 			 	  // 3. Referencia al documento en la coleccion 'form_register-alumnos'
 			 	   const docRef = doc(db, "form_register-alumnos", uuid);

 			 	    await updateDoc(docRef,rest);

 			 	    // 4. Devolver los atribs en el perfil unico actualizado
 			 	      return {uuid , ...rest}

 			}catch(error){
 				console.error('error al obtener los perfiles de alumnos',eror);
 				throw error;
 			}
	    }
			// La f(n) debera definirse en la vista
	    /** 	static async mostrarCompleteProfile(){
		 		const usuario = await this.getDataUsuarioXCorreo();

		 		if(!usuario){
		 		  console.error("Alumno no registrado o sesión no inciada");
		 		 	  return
		 		}

		 			const perfil_user = await this.getProfileDelAlumno(usuario.id);

		 			if(!perfil_user){
			 	 		console.log("No se encontraro el Perfil del Alumno");
			 	 	}

			 	 	// Deployamos info
			 	 	console.log('Datos del Alumno: ', usuario);
			 	 	console.log('Perfil del Alumno: ', perfil_user);

		 	}  **/
	}

 	// Paso 05: Consumir el servicios en la Vista ...
// Asi sera utilizada en la vista [1]
   /**	import { UsuarioService } from './usuarioService';
    import { PerfilService } from './perfilService';

	  const mostrarDatosUsuario = async () => {
	      const authUser = await UsuarioService.getUsuarioAutenticado();
	  
	  		  if (!authUser) return console.log("Usuario no autenticado");
	  
	  		  const usuario = await UsuarioService.getUsuarioPorCorreo(authUser.email);
	  		  if (!usuario) return console.log("Usuario no encontrado en Firestore");
	  
	  		  const perfil = await PerfilService.getPerfilPorUsuarioId(usuario.id);
	  		  if (!perfil) return console.log("Perfil no encontrado");
	  
	     console.log("Usuario:", usuario);
	     console.log("Perfil:", perfil);
	  };  
	 **/

 	// Asi sera utilizada en la vista [2]
 	 // await Alumnos.changePassword("antiguaContraseña123", "nuevaContraseña456");
 	// Asi sera utilizada en la vista [3]
 	  // try { const perfilActualizado = await Alumnos.updateProfile(nuevoPerfil); console.log("Perfil actualizado:", perfilActualizado); }
 		// Continuar con la siguientre transición(migracion) LocalSte - Firebase