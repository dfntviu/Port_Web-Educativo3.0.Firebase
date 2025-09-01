<template>
	<div>
		<div>
			 <h2>Registro de los Profesores</h2>
			<form @action.prevent="enviarRegistroProfesor">
				<input type="text" v-model="nombre">
				<input type="text" v-model="apellido">
				<input type="text" v-model="user">
				<input type="text" v-model="uuid" disabled>
				<input type="email" v-model="correo">
				<button class="bnt-succes">Enviar</button>
			</form>
		</div>
	  <!-- Mostrar la confiramacion en la Ventana Modal  -->
		<div class="modal-box">                                                            
	        <span class="modal-close" @click="closeModal">&times;</span>               
	          <h3>Datos Capturados</h3>                                                
	          <p>Nombre:<strong>{{datosForma.nombre}} </strong></p>   <!--intepolar -->  
	          <p>Apellido: <strong>{{datosForma.apellido}} </strong></p>                   
	          <p>Carrera: <strong>{{datosForma.user}} </strong></p>                  
	          <p>Correo:  <strong>{{datosForma.correo}} </strong></p>    
	         </span> 
		</div> 
		      <!-- Mostrar la confiramacion del objeto de  registro abajo-->                
			<!-- <div v-if="form_firestore_profesor" class="saved-info">                          
			       <h3>Est├í fue la informaci├│n que Ud Guardo</h3>                 
			       <p>Ud. se llama:<strong>{{form_firestore_profesor.nombre}}</strong></p>     
			     <p>Su apellido es:<strong>{{form_firestore_profesor.apellido}}</strong></p>       
			     <p>Carrera: <strong>{{form_firestore_profesor.user}} </strong></p>              
	       		 <p>Su e-mail es:<strong>{{form_firestore_profesor.correo}}</strong></p>    
	        </div> -->                                                                               
	</div>                                                                             
</template>

<script>
	export default {
		setup(){
			const form_firestore_profesor = ref({
						nombre: ''
						apellido: ''
						uuid: '',
						user:'',
						correo:'',
						apellido:'',
						rol:''
					});
		
					const enviarRegistroProfesor = async( role= 'profesor')=>{  //0. Definir el role de alumno
		 				   // - LlamadaProteger de cualquier error (lamding)
						  try{
						  			// 1 Llamar al Servicio y comenzar el consumo de Firestore
						  		const profesores_fstore = await AuthService.getUserProfile(usuario_back,role); // error # 2 (pagar la sincronia)
					
					 			// 2. Asignar a la var. reactiva (consumiendo el formualario.)
			            form_firestore_profesor.value = profesores_fstore;  // error # 1 (ausencia de atrib valor, y es en la fuente [ndestiny])
		
						  	// 3. Enviemos el objeto guardado, referenciado con la data.
						  		return form_firestore_profesor;
						  }catch(error){ 
						  	  // 4. Manejo estandar del error 
						  	 throw new Error('Tipo de Rol no definio o inexistente')  // error # 3 (sin instanciar)
						  	//console.error('Lo sentimo la colección, aun no existe en la Firestore');  Cualquiera de  los dos object
						  }  
					}					

					  /** Dec. de los metodos de validacion **/
					// 1. Validar que se ingresen datos con respecto a su naturaleza

					// 2. Validar la semantica del correo

					// 3. Validar que no existan campos vacios

					 // 4. Validar si son 2 nombres se genere esp. en blanco en automatico
					const generateSpaces= (nombre)=>{
					 	if(this.nombre && this.nombre.trim()!== ""){
					 	 	// dividir la cadena en 2
					 	 		const separate = this.nombre.split(" ",2);
					 	    if(separate.length === 2){
					 	    	const nam1 =  separate[0];
					 	    	const nam2 =  separate[1];
					 	    		 	// Identificar la sig. Mayusc
					 	    	if(nam1 === nam1.toUpperCase() || nam2 === nam2.toUpperCase()){
					 	    	     // Quitar el espacio que los separa
					 	    	 		 let no_space = juntar + juntar2;
					 	    	 	 // reajustar el nombre y juntarlo Alejando Joaquin
					 	    	 		 let juntar2 = nam2.join(nam2,'');// -> AlejandoJoaquin
					 					// devolver el nombre sin espacios
					 	    	 		return no_space;
					 	    	}else{  
					 	    		  // Si no aplica la mayuscula, d igual manera unir los espacios
					 	    		  return nam1 + nam2;
					 	    		return
					 	    	}
					 	    }
					 	}
					 	  // 6.  Si no se cumplen las condiciones, reg. el que ingreso
					 	 return nombre;
					},

					// 5. No permitir datos duplicados esp(nombres y apellidos identico)
					const notDuplicates= (nomb,apell, registros)=>{
								const duplicado = registros.some(r => r.nombre===nomb && r.apellido===apell)
							if(duplicado){
							    console.log('El nombre ya existe, ingrese otro');
							    return null;
					 }else{
							 	 console.error('El registro es Nuevo, agregalo a la coleccion');
							}
							   return {nomb,apell};
				    },

				onMounded(async()=>{
					await enviarRegistroProfesor;
				});
	
				return { form_firestore_profesor, enviarRegistroProfesor,
				          generateSpaces, notDuplicates                   };
		}
    };
</script>
  <style scoped>
  	 .card {
       margin: 0 auto; /* Centra horizontalmente */
       max-width: 590px;        /* Ancho m├íximo de la tarjeta */
      width: 490px;
      height: 385px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    .space-btn {
          margin-top: 20px;      /* Espacio superior entre campos */
          margin-bottom: 20px;   /* Espacio inferior entre campos */
          padding: 13px 28px;    /* Tama├▒o del bot├│n: vertical x horizontal */
          font-size: 1.2rem;     /* Letra grande */
          border-radius: 8px;    /* Bordes redondeados para mejor est├®tica */
          background-color: #4CAF50; /* Color de fondo */
        }
  </style>