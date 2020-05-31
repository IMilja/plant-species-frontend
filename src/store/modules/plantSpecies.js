import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 10,
    plantSpecies: [],
    singlePlantSpecies: {
      croatianName: '',
      latinName: '',
      synoynm: '',
      description: '',
      genus: {
        name: '',
        botanicalFamily: {
          croatianName: '',
          latinName: '',
        },
      },
      systematist: {
        name: '',
      },
    },
  },

  mutations: {
    SET_PLANT_SPECIES(state, plantSpecies) {
      state.plantSpecies = plantSpecies;
    },
    ADD_PLANT_SPECIES(state, plantSpecies) {
      state.plantSpecies.push(plantSpecies);
    },
    DELETE_PLANT_SPECIES(state, plantSpeciesId) {
      const plantSpecies = state.plantSpecies.filter((p) => p.id !== plantSpeciesId);
      state.plantSpecies = plantSpecies;
    },
    EDIT_PLANT_SPECIES(state, plantSpecies) {
      const index = state.plantSpecies.findIndex((p) => p.id === plantSpecies.id);

      if (index !== -1) {
        state.plantSpecies.splice(index, 1, plantSpecies);
      }
    },
    SET_SINGLE_PLANT_SPECIES(state, plantSpecies) {
      state.singlePlantSpecies = plantSpecies;
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('plant-species');
      commit('SET_PLANT_SPECIES', response.data.data);
    },

    async create({ commit }, plantSpecies) {
      const response = await HTTP.post('plant-species', plantSpecies);
      commit('ADD_PLANT_SPECIES', response.data.data);
    },

    async delete({ commit }, plantSpecies) {
      const response = await HTTP.delete(`plant-species/${plantSpecies.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_PLANT_SPECIES', plantSpecies.id);
      }
    },

    async edit({ commit }, plantSpecies) {
      const response = await HTTP.patch(`plant-species/${plantSpecies.id}`, plantSpecies);
      commit('EDIT_PLANT_SPECIES', response.data.data);
    },

    async loadSingle({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}`);
      commit('SET_SINGLE_PLANT_SPECIES', response.data.data);
    },
  },
};
