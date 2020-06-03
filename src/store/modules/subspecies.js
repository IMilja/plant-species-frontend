import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 10,
    subspecies: [],
  },

  mutations: {
    SET_SUBSPECIES(state, subspecies) {
      state.subspecies = subspecies;
    },
    ADD_SUBSPECIES(state, subspecies) {
      state.subspecies.push(subspecies);
    },
    DELETE_SUBSPECIES(state, subspeciesId) {
      const subspecies = state.subspecies.filter((s) => s.id !== subspeciesId);
      state.subspecies = subspecies;
    },
    EDIT_SUBSPECIES(state, subspecies) {
      const index = state.subspecies.findIndex((s) => s.id === subspecies.id);

      if (index !== -1) {
        state.subspecies.splice(index, 1, subspecies);
      }
    },
  },

  actions: {
    async loadAll({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}/subspecies`);
      commit('SET_SUBSPECIES', response.data.data);
    },

    async create({ commit }, subspecies) {
      const response = await HTTP.post('subspecies', subspecies);
      commit('ADD_SUBSPECIES', response.data.data);
    },

    async delete({ commit }, subspecies) {
      const response = await HTTP.delete(`subspecies/${subspecies.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_SUBSPECIES', subspecies.id);
      }
    },

    async edit({ commit }, subspecies) {
      const response = await HTTP.patch(`subspecies/${subspecies.id}`, subspecies);
      commit('EDIT_SUBSPECIES', response.data.data);
    },
  },
};
