import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function guardAdminArea(to, from, next) {
  let isAuthenticated = false;

  if (localStorage.getItem('currentUser')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next();
  } else {
    next({
      name: 'Login',
    });
  }
}

function superAdminGuard(to, from, next) {
  let isSuperAdmin = false;

  if (localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    isSuperAdmin = currentUser.userRole === 'SUPER_ADMIN';
  }

  if (isSuperAdmin) {
    next();
  } else {
    next({
      name: 'PlantSpeciesHome',
    });
  }
}

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
        component: () => import(/* webpackChunkName; "PlantSpeciesView" */ '@/views/PlantSpecies/Search/_id.vue'),
        children: [
          {
            path: 'osnovne-informacije',
            name: 'SearchPlantSpeciesView',
            component: () => import(/* webpackChunkName: "BasicInformation" */ '@/views/PlantSpecies/Search/BasicInformation.vue'),
          },
          {
            path: 'slike',
            name: 'SearchPlantSpeciesImages',
            component: () => import(/* webpackChunkName: "SearchPlantSpeciesImages" */ '@/views/PlantSpecies/Search/Images.vue'),
          },
          {
            path: 'uporabni-dijelovi',
            name: 'SearchPlantSpeciesUsefulParts',
            component: () => import(/* webpackChunkName: "SearchPlantSpeciesUsefulParts" */ '@/views/PlantSpecies/Search/UsefulParts.vue'),
          },
          {
            path: 'slike-uporabnih-dijelova',
            name: 'SearchUsefulPartImages',
            component: () => import(/* webpackChunkName: "SearchUsefulPartImages" */ '@/views/PlantSpecies/Search/UsefulPartImages.vue'),
          },
          {
            path: 'bioaktivne-tvari',
            name: 'SearchPlantSpeciesBioactiveSubstances',
            component: () => import(/* webpackChunkName: "SearchPlantSpeciesSubspecies" */ '@/views/PlantSpecies/Search/BioactiveSubstances.vue'),
          },
          {
            path: 'podvrste',
            name: 'SearchPlantSpeciesSubspecies',
            component: () => import(/* webpackChunkName: "SearchPlantSpeciesSubspecies" */ '@/views/PlantSpecies/Search/Subspecies.vue'),
          },
        ],
      },
      {
        path: '/users',
        redirect: { name: 'Login' },
        component: () => import(/* webpackChunkName: "Authentication" */ '@/views/Authentication.vue'),
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "Authentication" */ '@/components/Authentication/LoginForm.vue'),
          },
          {
            path: 'forgot-password',
            name: 'ForgotPassword',
            component: () => import(/* webpackChunkName: "Authentication" */ '@/components/Authentication/ForgotPassword.vue'),
          },
          {
            path: 'reset-password',
            name: 'ResetPassword',
            component: () => import(/* webpackChunkName: "Authentication" */ '@/components/Authentication/ResetPassword.vue'),
          },
          {
            path: 'activate-account',
            name: 'ActivateAccount',
            component: () => import(/* webpackChunkName: "Authentication" */ '@/components/Authentication/ActivateAccount.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/kontrolna-ploca',
    name: 'AdminPanel',
    beforeEnter: guardAdminArea,
    component: () => import(/* webpackChunkName: "AdminLayout" */ '@/layouts/Admin.vue'),
    children: [
      {
        path: 'biljne-vrste',
        name: 'PlantSpeciesHome',
        component: () => import(/* webpackChunkName: "AdminPlantSpeciesHome" */ '@/views/PlantSpecies/Admin/PlantSpeciesHome.vue'),
      },
      {
        path: 'biljne-vrste/:id([0-9]+)',
        component: () => import(/* webpackChunkName: "PlantSpeciesView" */ '@/views/PlantSpecies/Admin/_id.vue'),
        children: [
          {
            path: 'osnovne-informacije',
            name: 'AdminPlantSpeciesView',
            component: () => import(/* webpackChunkName: "BasicInformation" */ '@/views/PlantSpecies/Admin/BasicInformation.vue'),
          },
          {
            path: 'slike',
            name: 'AdminPlantSpeciesImages',
            component: () => import(/* webpackChunkName: "AdminPlantSpeciesImages" */ '@/views/PlantSpecies/Admin/Images.vue'),
          },
          {
            path: 'uporabni-dijelovi',
            name: 'AdminPlantSpeciesUsefulParts',
            component: () => import(/* webpackChunkName: "AdminPlantSpeciesUsefulParts" */ '@/views/PlantSpecies/Admin/UsefulParts.vue'),
          },
          {
            path: 'slike-uporabnih-dijelova',
            name: 'AdminUsefulPartImages',
            component: () => import(/* webpackChunkName: "AdminUsefulPartImages" */ '@/views/PlantSpecies/Admin/UsefulPartImages.vue'),
          },
          {
            path: 'bioaktivne-tvari',
            name: 'AdminPlantSpeciesBioactiveSubstances',
            component: () => import(/* webpackChunkName: "AdminPlantSpeciesSubspecies" */ '@/views/PlantSpecies/Admin/BioactiveSubstances.vue'),
          },
          {
            path: 'podvrste',
            name: 'AdminPlantSpeciesSubspecies',
            component: () => import(/* webpackChunkName: "AdminPlantSpeciesSubspecies" */ '@/views/PlantSpecies/Admin/Subspecies.vue'),
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
      {
        path: 'korisnici',
        name: 'Users',
        beforeEnter: superAdminGuard,
        component: () => import(/* webpackChunkName: "AdminPlantSpeciesSubspecies" */ '@/views/Users.vue'),
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
