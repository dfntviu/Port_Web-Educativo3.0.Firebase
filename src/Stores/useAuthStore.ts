 import {defineStore} from 'pinia';
 import {AuthService} from '@/services/AuthService.ts';
 import {generatePermisosPorRol} from '@/States/useStateRules.ts';  //new_1 - ([const] ePropio de reglas de Seg. Firebase)

  type Role = 'alumno' || 'profesor' | null;

   export  const useAuthStore = defineStore('auth', {
      		state: () => ({  // son los datos que una aplicacion necesita guardar en el almacen(tienda de props)
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
      			 sessionTimestamp: null as number | null,
      		}),

                // Calcula y obtiene datos computados del almacen <-> state. Obtiene  resultado esp. a partir de este
      		getters: {
      			isAlumno: (s) =>s.role === 'alumno',
      			isProfesor: (s) =>s.role === 'profesor',
      			userEmail: (s) =>s.usuario?correo === null,
      			isAlumno: (s) =>s.usuario?.uuid === null,

      			userFullName: (s) => {
      				if(s.usuario) return null;
      				const nombre = s.usuario.user || '';
      				const apellido = s.usuario.apellido || '';
      				const apellido ?  `${nombre} ${apellido}`: nombre;
      			}
      			isReady: (s) => !s.isLoading,
      			hasError: (s) => s.lastError,
      		},
           // se encarga de accionar los getters que son (parcialme sust por la mutacion)
      		actions:{
      			setError(msg: string | null){
      				this.lastError = msg;
      			},
      			setLoading(v: boolean){
      				this.isLoading = msg;
      			},
      			setUser(payload: {
      				user: string | null;
      				correo : string | null;
      				uuid: string | null;
      				apellido: string | null;
      				role: Role;
      			}){

      				this.usuario  =  {...payload}
      			    this.role = payload.role;
      			    this.isAuthenticaded = true;
      			    this.sessionTimestamp = Date.now();
      			    this.lastError = null; // Cambios Parte 3.2
                     this.permisos =  generatePermisosPorRol();  // ya es alcanzable (cambio #1)
      			},
      			cleanUser(){
      			    this.usuario  = null;
      			    this.role = null;
      			    this.isAuthenticaded =null;
      			    this.sessionTimestamp = null;
      			    this.lastError = null;    // Cambios Parte 3.3
                    this.permisos = generatePermisosPorRol(null); //limpiar los permisos de sesión de Firerules
      			},

      			async login( {usuario, contrasenia}: {usuario: string, contrasenia: string}){
      					this.setLoading(true);
      					this.setError(null);

      					try{
      						    AuthService.authenticate(usuario,contrasenia);
      						      this.setUser({
      						      	user: payload.user,
      						      	correo:payload.correo,
      						      	   uuid  :payload.uuid,
										 apellido:payload.apellido,	
								   	 role:payload.role as Role
      						      });

      						       return { succes: true, message: 'Acceso Concedido', users_data: payload};
      					}catch(e: any){
      						 this.setError(e?.message || 'Error de Autentificacion: Acceso rechazado');
      						 	return { succes: false, message:this.lastError, users_data: null};
      					}finally{
      						 this.setLoading(false);
      					}
      			},

      			async logout(){
      				try{
      				   await AuthService.logout();
      				     this.cleanUser();
      				      return true;
      				}catch{
      					this.cleanUser();
      					this.setError('Error no fue posible cerrar la sesión');
      					return false;
      				}finally{
      					 this.setLoading(false);
      				}
      			},

      			inicializateAuth(){
      				return new Promise((resolve)=> {
      					const unsub = AuthService.onAuthStateChanged(async (firebaseUser) =>{
      							if(firebaseUser?.email){
      								try{
      								  const role = AuthService.getUserRole(firebaseUser.email);
      								    if(role){
      								    	 await AuthService.getUserProfile(firebaseUser, role);
      								    	  this.setUser({
      								    	  	 user:  payload.user,
      								    	  	 correo: payload.correo,
      								    	  	 uuid: payload.uuid,
      								    	  	 apellido: payload.apellido
      								    	  });
      								    }
      								}catch{
      								   this.setError('Error al restaura la Sesión');
      								}
      							}else{
      								this.cleanUser();
      							}
      							resolve(unsub);
      						});
      				});
      			},

      		}
      		// Si hubiera un metodo mas colocaria [,] de lo contrario se quita
    });