import { createRouter, createWebHistory } from 'vue-router';
 import {useAuthStore} from '@/Stores/useAuthStore.ts'  //el almacn cotrola estado del rol del usuario
 import Home from '@/views/Home.vue';
 /*import AdminMaterials from '@/views/adminMaterials.vue';
   import SubirMaterial from '@/views/subirMaterial.vue'; */
    import  { BienvenidaViewsAlms2 } from '@/Views/BienvenidaViewsAlms2.view';
    import  { SubidaDeMateriales } from '@/Views/SubidaDeMateriales.vue';  //eñego
    import  { Notificaciones2Alumno } from '@/Views/Notificaciones2Alumno.vue';
    import  { ProfileAlumnoView } from '@/Views/ProfileAlumnoView.vue';
    import  { ProfileTeacherView } from '@/Views/ProfileTeacherView.vue';
    import  { RegistrarAlumnoView} from '@/Views/RegistrarAlumnoView.vue';
    import  { RegistrarProfesorView} from '@/Views/RegistrarProfesorView.vue';
    import  { ModerarMateriales}  from '@/Views/ModerarMateriales.vue';

    // import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', name: 'Home', component: Home },
  /*{
    path: '/admin-materiales',
    name: 'AdminMateriales',
    component: AdminMateriales,
    meta: { requiresAuth: true, role: 'profesor' }
  },*/

  {
    path: '/bienvenida-views-alms2',
    name: 'BienvenidaViewsAlms2',
    component: BienvenidaViewsAlms2,
    meta: { requiresAuth: true, role: 'alumno' }
  },

  {
    path: '/subir-material',
    name: 'SubidaDeMateriales',
    component: SubidaDeMateriales,
    meta: { requiresAuth: true, role: 'alumno' }
  },
  // To Edit
   {
    path: '/notificaciones2-alumno',
    name: 'Notificaciones2Alumno',
    component: Notificaciones2Alumno,
    meta: { requiresAuth: true, role: 'profesor' }
  },
  {
    path: '/profile-alumno-view',
    name: 'ProfileAlumnoView',
    component: ProfileAlumnoView,
    meta: { requiresAuth: true, role: 'alumno' }
  },
   {
    path: '/profile-teacher-view',
    name: 'ProfileTeacherView',
    component: ProfileTeacherView,
    meta: { requiresAuth: true, role: 'profesor' }
  },
  {
    path: '/registrar-alumno-view',
    name: 'RegistrarAlumnoView',
    component: RegistrarAlumnoView,
    meta: { requiresAuth: true, role: 'alumno' }
  },
   {
    path: '/registrar-profesor-view',
    name: 'RegistrarProfesorView',
    component: RegistrarProfesorView,
    meta: { requiresAuth: true, role: 'profesor' }
  },
  {
    path: '/moderar-materiales',
    name: 'ModerarMateriales',
    component: ModerarMateriales,
    meta: { requiresAuth: true, role: 'profesor' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard global
router.beforeEach((to, from, next) => {
  const auth_store = useAuthStore();
  // Cambios Parte 04
  if(auth_store.Isloading){
      await auth_store.checkAuthState();
  }
  if (to.meta.requiresAuth && !auth_store.isAuthenticated){
      return next({ name: 'Home' }); 
  } 
  if (to.meta.role && auth_store.role !== to.meta.role) {
     return next({ name: 'PageError403' }); 
  }

  next();
});
/* if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Home' }); // o ruta login
  }

  if (to.meta.role && authStore.role !== to.meta.role) {
    // Aquí podrías redirigir o mostrar error o ruta no autorizada
    return next({ name: 'Home' });
  }*/
export default router;
