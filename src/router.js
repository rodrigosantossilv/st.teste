import { createRouter, createWebHistory } from 'vue-router';
import "./CSS/style.css";
import LoginPage from './components/LoginPage.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import Kaban from './components/kaban.vue';
import ComponenteHome from './components/ComponenteHome.vue';
import ComponenteKaban from './components/ComponenteKaban.vue';
import ComponenteCadastro from './components/ComponenteCadastro.vue';
import ComponenteControleSala from './components/ComponenteControleSala.vue';
import ComponenteControleUsuario from './components/ComponenteControleUsuario.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/ComponenteHome', component: ComponenteHome },
  { path: '/ComponenteKaban', component: ComponenteKaban },
  { path: '/ComponenteCadastro', component: ComponenteCadastro },
  { path: '/ComponenteControleSala', component: ComponenteControleSala },
  { path: '/ComponenteControleUsuario', component: ComponenteControleUsuario },
  { path: '/openticketpage', component: OpenTicketPage },
  { path: '/kaban', component: Kaban },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
