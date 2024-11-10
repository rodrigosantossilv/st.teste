import { createRouter, createWebHistory } from 'vue-router';
import "./assets/global.css";
import LoginPage from './components/LoginPage.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import App from './App.vue';
import Kaban from './components/kaban.vue';
import ComponenteHome from './components/ComponenteHome.vue';
import ComponenteKaban from './components/ComponenteKaban.vue';
import ComponenteCadastro from './components/ComponenteCadastro.vue';
import ComponenteControleSala from './components/ComponenteControleSala.vue';
import ComponenteControleUsuario from './components/ComponenteControleUsuario.vue';

const routes = [

  { path: '/login', component: LoginPage },
  { path: '/App', component: App },
  { path: '/Home', component: ComponenteHome },
  { path: '/Kaban', component: ComponenteKaban },
  { path: '/Cadastro', component: ComponenteCadastro },
  { path: '/ControleSala', component: ComponenteControleSala },
  { path: '/ControleUsuario', component: ComponenteControleUsuario },
  { path: '/openticketpage', component: OpenTicketPage },
  { path: '/kaban', component: Kaban },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
