  // -->Services/authRulesFirebase.ts
// Cambios Parte 03
export function generatePermisosPorRol(rol: 'alumno' | 'profesor' | 'admin'){
 	 switch(rol){
 	 	case: 'alumno':
 	 		 return {
 	 		  	 		ViewSubirAportePDFAlumno: true;
 	 		  	 		ViewVerSubidaAportesPDFporSesion: true;
 	 		  	 		VieWelcomeProfesor: false;}
 	 	case: 'profesor':
 	 		return {
 	 		  	 		puedeSubirPdfProfesor: true;
 	 		  	 		puedeVerArchivosProfesor: true;
 	 		  	 		puedeAccederVistaAlumno: false;}
 	 	case: 'admin':
 	 		return {
 	 		  	 		puedeSubirPdfAlumno: true;
 	 		  	 		puedeVerArchivosAlumno: true;
 	 		  	 		puedeSubirPdfProfesor: true;
 	 		  	 		puedeVerArchivosProfesor: true; 
 	 		  	 		puedeAccederVistaAlumno: true;
 	 		  	 	}

 	 		  'default':
 	 		return {
 	 		  	 		puedeSubirPdfAlumno: false;
 	 		  	 		puedeVerArchivosAlumno: false;
 	 		  	 		puedeSubirPdfProfesor: false;
 	 		  	 		puedeVerArchivosProfesor: false; 
 	 		  	 		puedeAccederVistaAlumno: false;
 	 		  	 		puedeAccederVistaProfesor: false;
 	 		  	 	}

 	}
 }