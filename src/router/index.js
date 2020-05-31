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
    component: () => import(/* webpackChunkName: "Admin" */ '@/layouts/Admin.vue'),
    children: [
      {
        path: '',
        name: 'PlantSpeciesHome',
        component: () => import(/* webpackChunkName: "PlantSpeciesHome" */ '@/views/PlantSpeciesHome.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
