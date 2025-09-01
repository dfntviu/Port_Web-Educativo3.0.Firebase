 <template>
</template>

<script setup>
	import {ref, computed} from 'vue';
	import { useAuthStore } from '@/Stores/useAuthStore.ts';
	import { AuthService } from '@/Services/useAuthStore.ts';
	import { useRouter } from 'vue';
	import { navigationAlum } from '@/Layout/NavigationAlumno.vue';
	import { navigationTeach } from '@/Layout/NavigationTeacher.vue';


	// invocamos al serv de autentificacion
	const estado_auth = useAuthStore();
    const  chage_route = useRouter()
	const type_user = ref('');
	const password = ref('');

		// Validaciones UI

	 const valida_email   = computed(()=> AuthService.isValidateEmail(type_user.value));
	 const valida_password = computed(()=> password.value.length > = 6);

	export const controladorInicioSession =  async =()=>{
	 	 if(valida_email.value) return
	 	 if(valida_password.value) return


	 	 	result = await estado_auth.login({ type_user: type_user.value, password: password.value});

			let type_user_profesor = navigationTeach()
	 	 	let type_user_alumno   = navigationAlum();
			

	 	  if(result.success){
	 	  	  if(estado_auth.isAlumnoEmail) router.push()
 |				 chage_route.push({name: 'NavigationAlumno'});
	 	   else if(estado_auth.is.isProfesorEmail)
	 	  	  		chage_route.push({name: 'NavigationTeacher'});

	 	  }
	};
</script>