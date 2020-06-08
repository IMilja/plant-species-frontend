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
    children: [
      {
        path: 'biljne-vrste',
        name: 'PlantSpeciesHome',
        component: () => import(/* webpackChunkName: "PlantSpeciesHome" */ '@/views/PlantSpeciesHome.vue'),
      },
      {
        path: 'biljne-vrste/:id([0-9]+)',
        component: () => import(/* webpackChunkName: "PlantSpeciesView" */ '@/views/PlantSpeciesView.vue'),
        children: [
          {
            path: 'osnovne-informacije',
            name: 'PlantSpeciesView',
            component: () => import(/* webpackChunkName: "PlantSpeciesBasicInfo" */ '@/components/PlantSpecies/PlantSpeciesBasicInfo.vue'),
          },
          {
            path: 'slike',
            name: 'PlantSpeciesImages',
            component: () => import(/* webpackChunkName: "PlantSpeciesImages" */ '@/components/PlantSpecies/PlantSpeciesImages.vue'),
          },
          {
            path: 'uporabni-dijelovi',
            name: 'PlantSpeciesUsefulParts',
            component: () => import(/* webpackChunkName: "PlantSpeciesUsefulParts" */ '@/components/UsefulPart/UsefulPartTable.vue'),
          },
          {
            path: 'bioaktivne-tvari',
            name: 'PlantSpeciesBioactiveSubstances',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/components/BioactiveSubstance/BioactiveSubstanceTable.vue'),
          },
          {
            path: 'podvrste',
            name: 'PlantSpeciesSubspecies',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/components/Subspecies/SubspeciesTable.vue'),
          },
        ],
      },
      {
        path: 'rodovi',
        name: 'GeneraHome',
        component: () => import(/* webpackChunkName: "GeneraHome" */ '@/views/GeneraHome.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
