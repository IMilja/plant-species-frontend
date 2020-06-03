import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 10,
    systematists: [],
  },

  mutations: {
    SET_SYSTEMATISTS(state, systematists) {
      state.systematists = systematists;
    },
    ADD_SYSTEMATIST(state, systematist) {
      state.systematists.push(systematist);
    },
    DELETE_SYSTEMATIST(state, systematistId) {
      const systematists = state.systematists.filter((s) => s.id !== systematistId);
      state.systematists = systematists;
    },
    EDIT_SYSTEMATIST(state, systematist) {
      const index = state.systematists.findIndex((s) => s.id === systematist.id);

      if (index !== -1) {
        state.systematists.splice(index, 1, systematist);
      }
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('systematists');
      commit('SET_SYSTEMATISTS', response.data.data);
    },

    async create({ commit }, systematist) {
      const response = await HTTP.post('systematists', systematist);
      commit('ADD_SYSTEMATIST', response.data.data);
    },

    async delete({ commit }, systematist) {
      const response = await HTTP.delete(`systematists/${systematist.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_SYSTEMATIST', systematist.id);
      }
    },

    async edit({ commit }, systematist) {
      const response = await HTTP.patch(`systematists/${systematist.id}`, systematist);
      commit('EDIT_SYSTEMATIST', response.data.data);
    },
  },
};
