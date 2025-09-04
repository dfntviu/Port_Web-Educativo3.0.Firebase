const  firebase = requiere('firebase/app');
 requiere('firebase/auth');
 requiere('firebase/firestore');
 requiere('firebase/storage');
 
  export  const inicarFirebaseConf=()=>{
      const frebseConfig =  {
      // apiKey: "AIzaSyD4B3irImFN1Tc-TtbWfaHSKuaAI_CvQrg",
  
         // Credenciales pertencientes al plan-spark(gratuito)
        apiKey: "AIzaSyD4B3irImFN1Tc-TtbWfaHSKuaAI_CvQrg",
        authDomain: "portalweb-educativo1-8.firebaseapp.com",
        projectId: "portalweb-educativo1-8",
        storageBucket: "portalweb-educativo1-8.firebasestorage.app",
        messagingSenderId: "469237567360",
        appId: "1:469237567360:web:c151637015cd8fa5307b65",
        measurementId: "G-FB8DEZ6317" 
      }
  
     firebase.initializateApp(frebseConfig);
  
      const db      = firebase.firestore()
      const auth    = firebase.auth();   
      const storage = firebase.stotage();

      return {firebase,db,auth,storage, frebseConfig}
  }
    // export {firebase,db,auth,storage, frebseConfig};