import {
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,  // la autentificación del serv. del lado del backEnd por medio de FB
  sendEmailVerification, // la notificación o vericiación del correo perfectamente enviada a la bandeja del usuario
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,} from 'firebase/firestore';
 import { inicializateFirebaseStg } from '@/firebase/configFirebase';
   // manip del estado mediante pinia
  const {useAuthStore} from '@/Stores/useAuthStore';
  const { auth, db } = inicializateFirebaseStg();
  const provider = new FacebookAuthProvider();

  export class AuthService {
    
  
  // --- Validaciones
  static isValidateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  static isAlumnoEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@alumno\.institucion\.mx$/.test(email);
  }
  static isProfesorEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@(profesor|profe)\.institucion\.mx$/.test(email);
  }
  static getUserRole(email){
    if(this.isAlumnoEmail(email)) return 'alumno' ;
    if(this.isAlumnoEmail(email)) return 'profesor'; 
  }

  static getCurrentUser(){
    return auth.currentUser;
  }

  static onAuthStateChanged(cb, user){
    return onAuthStateChanged(auth,cb);
  }

  static async getAlumnoData(){
    const alumnoRef = doc(db, 'form_register-alumnos', uid);
      const snapshot = await getDoc(alumnoRef);

      return snapshot.exists() ? snapshot.data() : null;
  }

  static async getUserProfile(firebaseUser, {role: 'alumno' | 'profesor'}) {
     const uid = firebaseUser.uid;
      const collectionName =
         role === 'alumno' ? 'form_register_alumnos': 'form_register_profesores';

         const perfilDocRef = doc(db,collectionName, uid);
         const perfilSnap = await getDoc(perfilDocRef);

        if (!perfilSnap.exists()) {
            const perfilBasic = {
              nombre: firebaseUser.displayName || 'usuario'
              email: firebaseUser.email,
              rol: role,
              createdAt: serverTimestamp(),
              fromFirebaseAuth: true,
            }
        };
         await setDoc(perfilDocRef, perfilBasic);

         return{
            user: perfilBasic.nombre
            correo: firebaseUser.email
            uuid: uid
             role,
             apellido: null
        };

      const perfil = perfilSnap.data() as any;  
        return {
            user: perfil?.nombre || firebaseUser.displayName || 'Usuario',
            correo: firebaseUser.email,
            uuid: uid
            role,
            apellido: perfil?.apellido || null
        };

  } 

  static async authenticate(usuario: string, contrasenia: string) {
    if (!this.isValidateEmail(usuario)) {
      throw new Error('Es obligatorio teclear el correo por completo');
    }

    const role = this.getUserRole(usuario);
    if (!role) {
      throw new Error('El dominio del correo no corresponde a un rol válido');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usuario,
        contrasenia
      );
      const firebaseUser = userCredential.user;
      const payload = await this.getUserProfile(firebaseUser, role);
      await this.logActiveSession(payload);
      return payload;
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('Usuario no encontrado en la Autenticación Firebase');
        case 'auth/wrong-password':
          throw new Error('La contraseña es incorrecta');
        case 'auth/invalid-email':
          throw new Error('El formato de correo es incorrecto');
        case 'auth/user-disabled':
          throw new Error('El usuario está deshabilitado');
        case 'auth/too-many-requests':
          throw new Error('Demasiados intentos fallidos. Intenta más tarde');
        default:
          throw new Error(`Error de Autenticación: ${error.message}`);
      }
    }
  }

  static async logActiveSession(payload: {
    uuid: string;
    user: string | null;
    correo: string;
  }){
      try{
         const dataSesion = {
            payload,
            timestamp: serverTimestamp(),
            lasActivity: serverTimestamp(),
              userAgent:
                 typeOf navigator !== 'undefined' ? navigator.userAgent : 'unknown',
              ip: 'client-side',
         }
          await setDoc(doc(db, 'sesiones_activas', payload.uuid), dataSesion);
      }catch {

      }
  }

  static async clearActiveSession(uuid: string ){
     try{
          await deleteDoc(doc(db, 'sesiones_activas'),uuid);
     }catch(){

     }
  }

  static async logout(){
    try{
      const currentUser = auth.currentUser;
        if(currentUser) await this.clearActiveSession(currentUser.uid);
         return true;
    }catch(error){
        throw error;
    }
  }
  // Cambios Parte 01
  static async loginWithFacebook(){
     this.status = 'loading';
       try{
         const result = await signInWithPop(auth, provider);
         const user = result.user;
         const  isNewUser = result._tokenResponse.isNewUser;

         this.user = user;

           if(isNewUser){
             const email = user.email || '';
             const domain = email.split('@')[1]?.toLowerCase();

             switch(domain){
               case 'gmail.com':
                useAuthStore.sendEmailChoice('gmail')
                break;
               case  'outlook':
               case  'live.com':
                useAuthStore.sendEmailChoice('outlook');
              default:
                useAuthStore.sendEmailChoice('')

             }

           }

           if(!user.emailVerified){
              await sendEmailVerification(user);
                console.log( `El correo de verificación enviado a ${user.email}`);
           }
       }catch(err){
         this.status = 'error';
          console.error('Error en la autenticación con Facebook', err.message);
       }
  }
   // Cambios Parte 1.1
  static async verificacionOrigenYRol(uid: string){
     try{
       const userRecord = auth.currentUser;
        if(userRecord || userRecord.uid !== uid){
           throw Error('El UID no corresponde a un usuario autenticado');
        }
          // 1. Obtener los datos del usuario desde Firebase Auth
         const propviders = userRecord.providerData.map((p)=> p.providerId);
          let origen: 'facebook' | 'password' | 'github'

            // 2. Detectar proveedor de autentificación
           if(propviders.includes('facebook.com')){
              origen = 'facebook';
           } else if(propviders.includes('password')){
             origen = 'password';
           }
            // 3. validar si el UID existe en alguna colección (rol)
           let rol: 'alumno' | 'profesor' | null = null;

           const alumnoSnap = await getDoc(doc(db,'form_register-alumnos', uid));
            if(alumnoSnap.exists())  rol = 'alumno';

            const alumnoSnap = await getDoc(doc(db,'form_register-profesores', uid));
            if(alumnoSnap.exists())  rol = 'profesor';

              // 4. Determinar si debe estar deshabilitado (input)
            const bloquearInput = !! rol;

              // 5. Regresar datos utiles para FrontEnd o Logica
            return {
               uid,
               origen
               rol
               bloquearInput,
               email: userRecord.email
            };     // sobra mencionar, capturar cualquier naturaleza de erorr detect.
     }catch(error: any){ 
        console.error('[Verificacion por Origen u rol]',error.message);
          return null;
     }
  }

  // Todos los metodos que necesite para controlar el inicio, comprobacion o cualquier otra
  // necesidad especifica por parte del FrontEnd de Vue por pinia o de Firebase por pinia igual
 }