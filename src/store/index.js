import Vue from 'vue';
import Vuex from 'vuex';
import plantSpecies from './modules/plantSpecies';
import systematist from './modules/systematist';
import genus from './modules/genus';
import image from './modules/image';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    plantSpecies,
    systematist,
    genus,
    image,
  },
});
