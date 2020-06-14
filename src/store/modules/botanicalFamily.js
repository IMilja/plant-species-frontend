import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 10,
    botanicalFamilies: [],
  },

  mutations: {
    SET_BOTANICAL_FAMILIES(state, botanicalFamilies) {
      state.botanicalFamilies = botanicalFamilies;
    },
    ADD_BOTANICAL_FAMILY(state, botanicalFamily) {
      state.botanicalFamilies.push(botanicalFamily);
    },
    DELETE_BOTANICAL_FAMILY(state, botanicalFamilyId) {
      const botanicalFamilies = state.botanicalFamilies.filter((b) => b.id !== botanicalFamilyId);
      state.botanicalFamilies = botanicalFamilies;
    },
    EDIT_BOTANICAL_FAMILY(state, botanicalFamily) {
      const index = state.botanicalFamilies.findIndex((b) => b.id === botanicalFamily.id);

      if (index !== -1) {
        state.botanicalFamilies.splice(index, 1, botanicalFamily);
      }
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('botanical-families');
      commit('SET_BOTANICAL_FAMILIES', response.data.data);
    },

    async create({ commit }, botanicalFamily) {
      const response = await HTTP.post('botanical-families', botanicalFamily);
      commit('ADD_BOTANICAL_FAMILY', response.data.data);
    },

    async delete({ commit }, botanicalFamily) {
      const response = await HTTP.delete(`botanical-families/${botanicalFamily.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_BOTANICAL_FAMILY', botanicalFamily.id);
      }
    },

    async edit({ commit }, botanicalFamily) {
      const response = await HTTP.patch(`botanical-families/${botanicalFamily.id}`, botanicalFamily);
      commit('EDIT_BOTANICAL_FAMILY', response.data.data);
    },
  },
};
