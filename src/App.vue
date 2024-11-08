<template>
  <PrimeiroComponeterNav />
  <SegundoComponeteHome />
  <terceiro-componetekaban />
  <QuartoComponenteCadastro />
</template>

<script>
import PrimeiroComponeterNav from './components/PrimeiroComponeterNav.vue';
import QuartoComponenteCadastro from './components/QuartoComponenteCadastro.vue';
import SegundoComponeteHome from './components/segundoComponeteHome.vue';
import TerceiroComponeteKaban from './components/TerceiroComponeteKaban.vue';
export default {
  components: { TerceiroComponeteKaban },
  name: 'nav',
};
</script>

<style>
/* Adicione aqui estilos globais, se necessário */
</style>
