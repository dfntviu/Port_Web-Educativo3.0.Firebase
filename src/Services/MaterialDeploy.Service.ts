 
 import {collection,doc,getDoc,getDocs,setDoc, updateDoc,deleteDoc} from 'firebase/firestore';
 import {initializateFireabaseStg} from '@/public/configFirebase.js';

  const { db } = initializateFireabaseStg();

    class MaterialDeplService {
    	static collectionName = 'materials';
    		// Obtener todos los materiales
    	static async getAllMaterials(){
    		try{
    			const snapshot = await getDocs(collection(db,this.collectionName));
    			 return snapshot.docs.map(doc => ({id: doc.id,  ...doc.data()}) );
    		}catch(error){
    			console.error("[Serv. de Despliegue de Materiales]: Error al Deployar tus materiales Educativos");
    			 throw error;
    		}
    	}//#End coseguirTodoMat

    		// Obtener material por ID
    	static async getMaterialById(id){
    		try{
    			const docRef = doc(db, this.collectionName);
    			const docSnap = await getDoc(docRef)
    		}catch(error){
    			console.error("[Serv. de Despliegue de Materiales]: Error al Deployar tus materiales Educativos");
    			 throw error;
    		}
    	} //#End conseguirMat

    	     // Subir o actualizar material
    	static async saveMaterial(material){
    		try{
    			if(!material.titulo || material.descripcion){
    				throw new Error("Error: El título y la descripción del Mat. Educativo son obligatorios");
    			}

    			const docRef = material.id ? doc(db,this.collectionName, material.id) : doc(collection(db,this.collectionName) );


    			const dataToSave = {
    				titulo:   material.titulo,
    				descripcion_extract:material.descripcion,
    				archivoURL:material.archivoURL || null,
    				fechaCreacion: material.fecha_creacion 	|| new Date(),
    				autor:material.nombre || null
    			};

    			await setDoc(docRef,dataToSave, {merge:true});
    			  return { id:docRef.id, ...dataToSave };

    		}catch(error){
    			console.error('[Serv. de Despliegue de Materiales]: Error al guardar el Mat. Educativo');
    			  throw error;
    		}
    	} //#End Guardado
    	
    		// Eliminar material
    	static async deleteMateria(){
    		try{
    			await deleteDoc(doc(db,this.collectionName));
    			 return true;
    		}catch(error){
    			console.error('[Serv. de Despliegue de Materiales]: Error al eliminar el Mat. Educativo');
    			  throw error;
    		}
    	}
    }