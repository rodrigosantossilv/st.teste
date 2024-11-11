import { createRouter, createWebHistory } from 'vue-router';
import "./assets/global.css";
import ComponenteSidebarNavbar from './components/ComponenteSidebarNavbar.vue';
import LoginPage from './components/LoginPage.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import Kaban from './components/kaban.vue';


const routes = [

  { path: '/login', component: LoginPage },
  {path: '/', component: ComponenteSidebarNavbar},
  { path: '/openticketpage', component: OpenTicketPage },
  { path: '/kaban', component: Kaban },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
