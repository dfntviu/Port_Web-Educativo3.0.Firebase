 import {defineStore} from 'pinia';
 import {AuthService} from '@/services/AuthService.ts';
 import {do}
 import {generatePermisosPorRol} from '@/States/useStateRules.ts';  //new_1 - ([const] ePropio de reglas de Seg. Firebase)

  type Role = 'profesor' | null;
    
    // scope global
    const collection_teacher= {`data_profesores_profile`?.`collect_1`}; //encadenamiento de colecciones
    const collection2_teacher= {`data_profesores_profile`?.`collect_2`};
    const collection3_teacher= {`data_profesores_profile`?.`collect_3`};
    const collection4_teacher= {`data_profesores_profile`?.`collect_4`};
    
    // const sub_collection_personal = '',
    

   export  const usePerfilProfStore = defineStore('auth', {
      		// Que propiedades necesito en el almacen del perfil de un profesor para que esto sea funcional?
            state: () => ({
      			 usuario: null as null | {
      			 	user: string  | null;
      			 	correo: string | null;
      			 	uid: string | null;
      			 	apellido: string | null;
      			 	role: Role; // Cambios Parte 3.1
                    permisos: {},  //nuevo, propio del service de FirebaseRules -> (es inalcanzable)
      			 },
      			 role: null as Role,
      			 isAuthenticaded: false,
      			 isLoading: false,
      			 lastError: null as string | null,
      			 // sessionTimestamp: null as number | null,
      		}),

                // Que resultados son necesarios p/q sean aprovechados para el flujo de trabajo coherente?
      		getters: {

      			userChangeCredentials: (s) => {
      				if(s.usuario) return null;
      				const user_actual = // s.usuario.user || ''; -> adaptar al login desde fireAuthentication
      				const actual_password = // s.usuario.apellido || '';-> adaptar al login desde fireAuthentication
      				const new_password = /* invocar como se trae del auth de firebase */;
      			}
      			isReady: (s) => !s.isLoading,  // siempre son utiles, y se ocupan
      			hasError: (s) => s.lastError, // siempre son utiles, y se ocupan
      		},
                // elegir metodos(getters) que deben ejecutarse para mostrar correctamente el perfil del profesor y q mets de getters seran 
                // utilizado para el cambio de credencializacion 
      		actions:{	
      		
      			// Lo dejo, porque probablemente se reutilice, para limpiar los inputs de cambio de contrasenia o algo q se le parezca
      			cleanUser(){
      			    this.usuario  = null;
      			    this.role = null;
      			    this.isAuthenticaded =null;
      			    this.sessionTimestamp = null;
      			    this.lastError = null;    // Cambios Parte 3.3
                    this.permisos = generatePermisosPorRol(null); //limpiar los permisos de sesión de Firerules
      			},
                // Mas bien debere iniciarse el metodo login de authService.ts y de ahi usar la transicion de LocalStg a FirebaseStg
      			async accesProfileData( usuario: string, contrasenia: string){

      						     this.setUser({
      						      	user: payload.user,
      						      	correo:payload.correo,
      						      	   uuid  :payload.uuid,
										 apellido:payload.apellido,	
								   	 role:payload.role as Role
      						      });  

                                 const c1= this.collection_teacher
                                 const c2= this.collection2_teacher
                                 const c3= this.collection3_teacher
                                 const c4= this.collection4_teacher

                                 // empular todas las coleccion, en una sola coleccion p/aniadir una sola

                                   const collectio_tot = collectio_tot.pus(c1)?.push(c2)?.push(c3)?.push(c4);

                                const docRef = doc(db, this.collectio_tot);

                                const datos_d_perfil = getDoc(docRef);
                                    // Validar la longitud de la coleccion
                                if(datos_d_perfil.isCollection().size >= 0 &&  user.isIdentity(uuid))
                                    console.log('Identificación correcta en el perfil del usuario');
                                return datos_d_perfil;
      			},

      			

      			
      		}
      		// Si hubiera un metodo mas colocaria [,] de lo contrario se quita
    });