import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import kaban from './components/kaban.vue';
import ComponeteNav from './components/ComponeteNav.vue';
import ComponeteHome from './components/ComponeteHome.vue';
import ComponeteKaban from './components/ComponeteKaban.vue';
import ComponenteCadastro from './components/ComponenteCadastro.vue';
import ComponenteControleSala from './components/ComponenteControleSala.vue';
import ComponeteControleUsuario from './components/ComponeteControleUsuario.vue';


const routes = [
  { path: '/', component: LoginPage },
  {path: '/ComponeteNav', component: ComponeteNav},
  {pach: '/ComponeteHome', component: ComponeteHome},
  {path: '/ComponeteKaban', component: ComponeteKaban},
  {path: '/ComponenteCadastro', component: ComponenteCadastro},
  {path: '/ComponenteControleSala', component: ComponenteControleSala},
  {path: '/ComponeteControleUsuario', component: ComponeteControleUsuario},
  {path: '/openticketpage', component: OpenTicketPage},
  {path: '/kaban', component: kaban},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
