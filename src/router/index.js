import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "HomeLayout" */ '@/layouts/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Homescreen" */ '@/components/Search/SearchForm.vue'),
      },
      {
        path: 'pretraga',
        name: 'SearchResult',
        component: () => import(/* webpackChunkName; "SearchResult" */ '@/views/PlantSpecies/Search/SearchResults.vue'),
      },
      {
        path: 'biljna-vrsta/:id([0-9]+)',
        component: () => import(/* webpackChunkName; "SearchPlantSpeciesView" */ '@/views/PlantSpecies/Search/_id.vue'),
        children: [
          {
            path: 'osnovne-informacije',
            name: 'SearchPlantSpeciesView',
            component: () => import(/* webpackChunkName: "SearchPlantSpeciesView" */ '@/views/PlantSpecies/Search/BasicInformation.vue'),
          },
          {
            path: 'slike',
            name: 'SearchPlantSpeciesImages',
            component: () => import(/* webpackChunkName: "PlantSpeciesImages" */ '@/views/PlantSpecies/Search/Images.vue'),
          },
          {
            path: 'uporabni-dijelovi',
            name: 'SearchPlantSpeciesUsefulParts',
            component: () => import(/* webpackChunkName: "PlantSpeciesUsefulParts" */ '@/views/PlantSpecies/Search/UsefulParts.vue'),
          },
          {
            path: 'slike-uporabnih-dijelova',
            name: 'SearchUsefulPartImages',
            component: () => import(/* webpackChunkName: "UsefulPartImages" */ '@/views/PlantSpecies/Search/UsefulPartImages.vue'),
          },
          {
            path: 'bioaktivne-tvari',
            name: 'SearchPlantSpeciesBioactiveSubstances',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/views/PlantSpecies/Search/BioactiveSubstances.vue'),
          },
          {
            path: 'podvrste',
            name: 'SearchPlantSpeciesSubspecies',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/views/PlantSpecies/Search/Subspecies.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/kontrolna-ploca',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "AdminLayout" */ '@/layouts/Admin.vue'),
    children: [
      {
        path: 'biljne-vrste',
        name: 'PlantSpeciesHome',
        component: () => import(/* webpackChunkName: "PlantSpeciesHome" */ '@/views/PlantSpecies/Admin/PlantSpeciesHome.vue'),
      },
      {
        path: 'biljne-vrste/:id([0-9]+)',
        component: () => import(/* webpackChunkName: "PlantSpeciesView" */ '@/views/PlantSpecies/Admin/_id.vue'),
        children: [
          {
            path: 'osnovne-informacije',
            name: 'AdminPlantSpeciesView',
            component: () => import(/* webpackChunkName: "PlantSpeciesBasicInfo" */ '@/views/PlantSpecies/Admin/BasicInformation.vue'),
          },
          {
            path: 'slike',
            name: 'AdminPlantSpeciesImages',
            component: () => import(/* webpackChunkName: "PlantSpeciesImages" */ '@/views/PlantSpecies/Admin/Images.vue'),
          },
          {
            path: 'uporabni-dijelovi',
            name: 'AdminPlantSpeciesUsefulParts',
            component: () => import(/* webpackChunkName: "PlantSpeciesUsefulParts" */ '@/views/PlantSpecies/Admin/UsefulParts.vue'),
          },
          {
            path: 'slike-uporabnih-dijelova',
            name: 'AdminUsefulPartImages',
            component: () => import(/* webpackChunkName: "UsefulPartImages" */ '@/views/PlantSpecies/Admin/UsefulPartImages.vue'),
          },
          {
            path: 'bioaktivne-tvari',
            name: 'AdminPlantSpeciesBioactiveSubstances',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/views/PlantSpecies/Admin/BioactiveSubstances.vue'),
          },
          {
            path: 'podvrste',
            name: 'AdminPlantSpeciesSubspecies',
            component: () => import(/* webpackChunkName: "PlantSpeciesSubspecies" */ '@/views/PlantSpecies/Admin/Subspecies.vue'),
          },
        ],
      },
      {
        path: 'rodovi',
        name: 'GeneraHome',
        component: () => import(/* webpackChunkName: "GeneraHome" */ '@/views/GeneraHome.vue'),
      },
      {
        path: 'botanicke-porodice',
        name: 'BotanicalFamilyHome',
        component: () => import(/* webpackChungName: "BotanicalFamilyHome" */ '@/views/BotanicalFamilyHome.vue'),
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production' ? '/biljne-vrste' : '/',
  mode: 'history',
  routes,
});

export default router;
