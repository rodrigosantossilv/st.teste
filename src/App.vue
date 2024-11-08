<template>
  <ComponeteNav />
  <ComponeteHome />
  <ComponeteKaban />
  <ComponenteCadastro />
  <ComponenteControlesala />
  <ComponeteControleUsuario />

  
</template>

<script>
import "./CSS/style.css";
import ComponeteNav from './components/ComponeteNav.vue';
import ComponenteCadastro from './components/ComponenteCadastro.vue';
import ComponenteControleSala from './components/ComponenteControleSala.vue';
import ComponeteHome from './components/ComponeteHome.vue';
import ComponeteControleUsuario from './components/ComponeteControleUsuario.vue';
import ComponeteKaban from './components/ComponeteKaban.vue';

export default {
  name: 'App', 
  components: {
    ComponeteNav, 
    ComponeteHome, 
    ComponeteKaban,
    ComponenteCadastro,
    ComponenteControleSala, 
    ComponeteControleUsuario
  },
  data() {
    return {

    }
  },

};



</script>
