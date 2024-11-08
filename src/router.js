import { createRouter, createWebHistory } from 'vue-router';
//import Telaum from './components/Telaum.vue';
import LoginPage from './components/LoginPage.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import kaban from './components/kaban.vue';
import PrimeiroComponeteNav from './components/PrimeiroComponeteNav.vue';
import SegundoComponeteHome from './components/segundoComponeteHome.vue';
import TerceiroComponeteKaban from './components/TerceiroComponeteKaban.vue';
import QuartoComponenteCadastro from './components/QuartoComponenteCadastro.vue';
import QuintoComponenteControleSala from './components/QuintoComponenteControleSala.vue';
import SextoComponeteControleUsuario from './components/SextoComponeteControleUsuario.vue';


const routes = [
  { path: '/', component: LoginPage },
  {path: '/PrimeiroComponeteNav', component: PrimeiroComponeteNav},
  {pach: '/SegundoComponeteHome', component: SegundoComponeteHome},
  {path: '/TerceiroComponeteKaban', component: TerceiroComponeteKaban},
  {path: '/QuartoComponenteCadastro', component: QuartoComponenteCadastro},
  {path: '/QuintoComponenteControleSala', component: QuintoComponenteControleSala},
  {path: '/SextoComponeteControleUsuario', component: SextoComponeteControleUsuario},
  {path: '/openticketpage', component: OpenTicketPage},
  {path: '/kaban', component: kaban},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
