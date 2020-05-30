import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/layouts/Default.vue'),
  },
  {
    path: '/kontrolna-ploca',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "Admin" */ '@/layouts/Admin.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
