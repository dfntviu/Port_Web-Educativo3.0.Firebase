/** Docs: 
	   		Tecnicos:
       Este documento resume las convenciones, estructuras base y atajos clave utilizados en este proyecto, con el objetivo de mantener 
       una base de código clara, ordenada y fácil de navegar.
	   * ctrl + p <- desplazarse muy rapito entre script 
	   * ctrl + k + b <- ocultar/desocultar panel de directoris
	   * shift + ctrl + [key.up de Intro] <-- compose comment
	   * shift + ctrl  + p <- termius terminal
	   * alt + numero <- desplazarme a cualq scritp, si y solo si corresp al numero **/

	   // Lógicos
	   /**  Forma tecnica avanzada de documentar clases o funciones, matizando el tipo de retorno y argumentos
	    * Ademas de la descipcion breve del proposito de dicha tipo de metodo, estructura , f(n) etc
            *  Control de las coincidencias multiples
 	 		* //@returns {Array} coincidencias
 	 		*  //@param  {object | null}
 	 	    *
          El objeto nme_const sirve como contenedor estructurado para organizar distintos elementos del proyecto:
         en extension js
		    const nme_const = {
		   	  /*Primitivos: variables, arreglos
		   	   Objetos
		   	  funciones
		   	   clases  
	   		}
			
			- Se recomienda documentar funciones, clases y métodos utilizando JSDoc, una notación estándar para describir:
			
			Propósito general del componente.
				Tipos de entrada (@param) y salida (@returns).
				Comportamiento lógico y validaciones importantes.
	   		**/