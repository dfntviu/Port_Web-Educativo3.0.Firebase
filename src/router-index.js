import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Home from '@/views/Home.vue';
import AdminMateriales from '@/views/adminMateriales.vue';
import SubirMaterial from '@/views/subirMaterial.vue';
// todas las rutas restantes

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/admin-materiales',
    name: 'AdminMateriales',
    component: AdminMateriales,
    meta: { requiresAuth: true, role: 'profesor' }
  },
  {
    path: '/subir-material',
    name: 'SubirMaterial',
    component: SubirMaterial,
    meta: { requiresAuth: true, role: 'alumno' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Cambios Parte 04
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Home' }); // o ruta login
  }

  if (to.meta.role && authStore.role !== to.meta.role) {
    // Aquí podrías redirigir o mostrar error o ruta no autorizada
    return next({ name: 'Home' });
  }

  next();
});

export default router;
