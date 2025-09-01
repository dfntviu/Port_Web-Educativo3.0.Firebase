<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
   <LoginvView/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LoginView from '@/Views/LoginView.vue';

export default {
  name: 'App',
  components: {
    LoginView,
    HelloWorld
  }
}
</script>
  <!-- Adaptar las vistas restantes: 
     El base es el Login, es invocada a partir de este script (cambiar a API-Comp). Luego inicia 
     el loggin este verifica si el correo pertenece al Alumno o Profesor apoyado de las validaciones
     del estado de Autentificacion(Auth). Segun correponda inicia en su vista por defecto.

     El flujo consiste en: Dirigrse a la Vista Principal(loginView), la Vista invoca a la variable 
     que llama al estado, y el estado efectua algunos metodos del servicio que la vista este necesite
     en dicho momento. a su vez el servicio apoyado por el estado de pinia será encargado de actualizar
     su valor y trabaja en conjunto con la data de FireStore(pinia);  Entonces ya que se tiene la 
     información actualizada será renderizada la informacion.

     Y así se aplica a todas las vistas a excepcion, de la que no tengan una relacion directa con 
     el control dinamico de pinia(el estado) y el flujo de información(solas las vistas estaticas).

     Es importante recordar que los requerimientos de c/rol, se almacenan en los Layouts de Navegacion
     segun corresponda su rol, y estos estan guardados como componentes. y q esta version debera adaptar
     misma arq. para q sea asequible dicho flujo de trabajo.
   -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
