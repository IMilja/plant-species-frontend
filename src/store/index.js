import Vue from 'vue';
import Vuex from 'vuex';
import plantSpecies from './modules/plantSpecies';
import systematist from './modules/systematist';
import genus from './modules/genus';
import image from './modules/image';
import usefulPart from './modules/usefulPart';
import subspecies from './modules/subspecies';
import botanicalFamily from './modules/botanicalFamily';
import bioactiveSubstance from './modules/bioactiveSubstance';
import measureUnit from './modules/measureUnit';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    plantSpecies,
    systematist,
    genus,
    image,
    usefulPart,
    subspecies,
    botanicalFamily,
    bioactiveSubstance,
    measureUnit,
  },
});
