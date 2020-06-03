import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 10,
    genera: [],
  },

  mutations: {
    SET_GENERA(state, genera) {
      state.genera = genera;
    },
    ADD_GENUS(state, genus) {
      state.genera.push(genus);
    },
    DELETE_GENUS(state, genusId) {
      const genera = state.genera.filter((g) => g.id !== genusId);
      state.genera = genera;
    },
    EDIT_GENUS(state, genus) {
      const index = state.genera.findIndex((g) => g.id === genus.id);

      if (index !== -1) {
        state.genera.splice(index, 1, genus);
      }
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('genera');
      commit('SET_GENERA', response.data.data);
    },

    async create({ commit }, genus) {
      const response = await HTTP.post('genera', genus);
      commit('ADD_GENUS', response.data.data);
    },

    async delete({ commit }, genus) {
      const response = await HTTP.delete(`genera/${genus.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_GENUS', genus.id);
      }
    },

    async edit({ commit }, genus) {
      const response = await HTTP.patch(`genera/${genus.id}`, genus);
      commit('EDIT_GENUS', response.data.data);
    },
  },
};
