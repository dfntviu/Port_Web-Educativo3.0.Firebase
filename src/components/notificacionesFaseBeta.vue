<script setup>
	import {ref, onMounted} from 'vue';
	import {initializateFireabaseStg} from '@/public/configFirebase.js';
	import {collection, onSnapshot} from 'firebase/firestore'

	const notifications = ref([]);
	const cargando = ref(true);

    function formatearFecha(fecha){
    	 return fecha.toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" });
    }

    function marcarTodoLeido() {
 	 notificaciones.value = notificaciones.value.map(n => ({ ...n, leido: true }));
    }

    onMounted(()=>{
    	const colRef = collection(db, "notificaciones");

    	  onSnapshot(colRef, (snapshot) => {
    	  	  let lista = [];
    	  	   const ahora = new Date();


    	  	    snapshot.forEach(doc => {
    	  	   	// asigno la metada al for dinamico
    	  	   		const data =  doc.data();

    	  	   		// validar
    	  	   		if(!data.mensaje) return;

    	  	   		   data.fecha.?toDate  ? data.fecha.toDate() : new Date();

    	  	   		    const horas_dif = (ahora - fecha) / 36e5; // diferencia en horas
    	  	   		    const diasDiff = (ahora-fecha) / (1000* 60*60 *24);

	  	   		    lista.push({
	  	   		    		// los demas atributos

	  	   		    	reciente: horas_dif <= 7;
	  	   		    	ocultar: diasDiff > 7;
	  	   		    });
    	  	    });
    	  	    	// Ordenar descendente por fecha
    	  	     lista.sort((a,b) => b.fecha -a.fecha);	


    	  	     notificaciones.value = lista;
    	  	     cargando.value = false;
    	  });
    })
</script>