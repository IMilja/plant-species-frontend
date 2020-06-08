import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    usefulParts: [],
  },

  mutations: {
    SET_AVAILABLE_USEFUL_PARTS(state, usefulParts) {
      state.usefulParts = usefulParts;
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('useful-parts');
      commit('SET_AVAILABLE_USEFUL_PARTS', response.data.data);
    },
  },
};
