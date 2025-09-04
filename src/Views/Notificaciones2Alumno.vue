<script setup>
    const authStore = useAuthStore();
    const notificaciones = ref([]);

    const fetchNotificaciones = async () => {
      if (!authStore.isAlumno) return;
      notificaciones.value = await NotificacionService.getNotificacionesAlumno(authStore.userEmail);
    };
  
</script>