  import {defineStore} from 'pinia';
  import {auth, db} from '@/Servicies/initFirebase'; //cambiar p/despues
  import {doc, getDoc} from 'firebase/firestore';
  import {signWithEmailAndPassword} from 'firebae/auth';

    interface TeacherProfile {
   		 uuid : string
		   user : string
		  correo: string
		apellido: string	
		    role: string
    }

    export const useTeacherStore = defineStore('teacher', {
    	 state: ()=> ({
    	 	usuario: null as TeacherProfile | null,
    	 	loading: false,
    	 	  error: null as string | null
    	 }),

    	 getters: {
    	 	  isAuthenticated: (s) => !!s.usuario,
    	 	getTeacherProfile: (s) => s.usuario
    	 },

    	 actions:{
    	 		accesProfileData(usuario: string, contrasenia){
    	 			this.loading = true;
    	 			  this.error = null

    	 			try{
    	 				  // Paso 1: Login mediante Firebase Aut
    	 				  const credenciales = signWithEmailAndPassword(auth, usuario, contrasenia)
    	 				       const payload = credenciales.user

							const snap_shot	= doc(db, 'teachers', payload.uid);
							 // Paso 2: Obtener documento(hoja) de perfil del profesor en Firestore
							 if(snap_shot.exists()){
							 	throw new Error('El perfil del Profesor no existe en la Firestore');
							 }    	 				  
							   // Y si existe, se guardan 
							  const datosPerfil = snap_shot.data() as TeacherProfile;

							  // Paso 3: Guardar los atributos en el estado de Pinia(la Persistencia global)
							   this.usuario = {
							   	 uuid: payload.uid,
							   	 user: datosPerfil.user,
							   	 correo: datosPerfil.correo,
							   	 appellido: datosPerfil.apellido,
							   	 role: datosPerfil.role
							   }

							   console.log('La identificación es correcta en el perfil del usario');
							   return this.usuario;

    	 			}catch(err: any){
    	 				console.error("Error en accesProfileData", err.message);
    	 				  this.error = err.message;
    	 			}finally(){
    	 				this.loading = false;
    	 			}
    	 		},  //end_metodo de acceso al perfil
    	 		logout(){
    	 			this.usuario = null;
    	 		}
    	}  //end_metodo del life of cycle de  actions

    }); //fin del estado(state) de profesores