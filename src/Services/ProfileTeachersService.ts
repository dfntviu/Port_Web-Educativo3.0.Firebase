   // import { initializateFirebase } from '@/Public/configFirebase.js';   aun no se añade
   
   import   { auth, db } = inicializateFirebaseStg();
   import { updatePassword, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth'
   import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
   import { usePerfilProfStore, type TeacherProfile} from '@/Stores/useProfileProffe.try.ts';
     // import type {TeacherProfile} from '@/types/TeacherProfile' (posiblemente funcione, debera importarse desde el state [a prueba])
      useTeacherStore
     //const  perfil_service = useTeacherStore();   Scope del Edo del Pefil Profesor (no se uso) -> ay esta por si acaso

   export class ProfileService {
      /***
       * Cambiar la contrasenia de un profesor autenticado  
       * **/
      static async changePassword(passwd: string,new_passwd: string): Promise<void>{
          try{
             if(auth.currentUser || auth.currentUser.email){
               throw new Error("No hay un usuario autenticado");
             }

             // 1. Reutenticacion de las credenciales actuales
              const credential = EmailAuthProvider.credential(auth.currentUser.email, passwd);
                await reauthenticateWithCredential(auth.currentUser, credential);

             // 2. Actualizar(re-definir) las credenciales nuevas y Sobrescribir la  nueva por la anterior
                 await updatePassword(auth.currentUser, new_passwd);
                  console.log(`La contraseña:`,new_passwd,`ha sido Actualizada correctamente:`)
                  // 2a) Notificar por FrontEnd
                  alert('Su contraseña ha sido modificada correctamente');

           // 3. Proeger con catch por cachar cualquier, error 
          }catch(error){
               console.error('Error al cambiar la contraseña, Verifica su longitud');
               throw error;
          } 
            // no es necesario regresar la contrasenia
         return;
      }
      /**
       * Actualizar campos especifícos del perfil del Profesor de datos que ya persisten en Firestore  
       * **/
      static async selectDataDelete(profile: TeacherProfile):Promise <TeacherProfile>{
         //0. Vincular la Interfaz `TeacherProfile` y vincularlo al State -> [ahi esta en el ecabezado de la f(n)]
         try{
            // 1. no hay necesidad de Elegir con una est ctrl dinamica, pues eso hace el rest 
             const {uuid, ...rest} = profile;  //rest -> resto, los 4 parametros restantes rest identico a -> user, correo,apellido,role

             if(!uuid) throw new Error("El perfiln no tiene un UUID valido");
                  const docRef = doc(db, 'teachers', uuid);
                // 2. Buscar el metodo para cambiar el parametro d Firebase, es decir UpdateDoc 
                  await updateDoc(docRef,rest);
                     console.log ('El perfil fue actualizado correctamente');

                     // 3. Retornar el perfil actualizado en la Interfaz
                  return {uuid, ...rest};

          }catch(error:any){
                console.error(`Error al Actualizar el perfil:`, error.message);
               throw error;
         }   // { uuid : string, user : string, correo: string, apellido: string,   role: string }
      }

      /**
       * Obtener todas las colecciones relacionadas con el profesor  
       * **/
      static editDataCollections(uuid: string, subcollection:'correo'| 'apellido' | 'role'): Promise <any[]>{

         try{
            // Se buscara como se van a estructurar las colecciones
             // Lo mas sencillo es: directo como cuando desplegamos las colecciones de los materiales educativos en la administracion

                // const any_change = `teachers/` {uuid}`/?fields=correo,apellido,role`;  (fue sustituido por el arg. como encabezado dl met)
           
                 /** equivalente  a: 
                     * teachers/{uuid}/correo   
                     * teachers/{uuid}/apellido 
                     * teachers/{uuid}/role    **/

               const colRef = collection(db, `teachers/${uuid}/${subcollection}`);
               const snapshot = await getDocs(colRef);

               const array_results: any[] =  // any-{inter}=[]-> [element1,element2,element3,...,elementn];
                  snapshot.forEach(doc => array_results.push({id: doc.id, ...doc.data}));
                   // regresar la coleccion con los cambios aplicados
                  return array_results;
         }catch(error:any){
            console.error(`Errror al obtener la subcoleccion Actual: '${subcollection}' del profesor:`, error.message);
             throw error;
         }  
      }
   } 
         // return array_collections;