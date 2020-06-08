import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    bioactiveSubstances: [],
  },

  mutations: {
    SET_BIOACTIVE_SUBSTANCES(state, bioactiveSubstances) {
      state.bioactiveSubstances = bioactiveSubstances;
    },
    ADD_BIOACTIVE_SUBSTANCE(state, bioactiveSubstance) {
      state.bioactiveSubstances.push(bioactiveSubstance);
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('bioactive-substances');
      commit('SET_BIOACTIVE_SUBSTANCES', response.data.data);
    },

    async create({ commit }, bioactiveSubstance) {
      const response = await HTTP.post('bioactive-substances', bioactiveSubstance);
      commit('ADD_BIOACTIVE_SUBSTANCE', response.data.data);
    },
  },
};
