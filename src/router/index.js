import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CrudView from '../views/CrudView.vue';


const routes = [
  { path: '/', component: LoginView, name: 'Login' },
  { path: '/crud', component: CrudView, name: 'Crud' },
  { path: '/logout', redirect: '/login' },
  // Outras rotas do seu aplicativo
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
