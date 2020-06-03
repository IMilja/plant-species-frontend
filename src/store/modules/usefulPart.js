import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    allUsefulParts: [],
    usefulParts: [],
  },

  mutations: {
    SET_AVAILABLE_USEFUL_PARTS(state, usefulParts) {
      state.allUsefulParts = usefulParts;
    },
    SET_USEFUL_PARTS(state, usefulParts) {
      state.usefulParts = usefulParts;
    },
    ADD_USEFUL_PART(state, plantPart) {
      const { description } = plantPart;
      const usefulPart = state.allUsefulParts.find((a) => a.id === plantPart.usefulPartId);
      const data = {
        ...usefulPart,
        description,
      };
      state.usefulParts.push(data);
    },

    DELETE_USEFUL_PART(state, usefulPartId) {
      const usefulParts = state.usefulParts.filter((u) => u.id !== usefulPartId);
      state.usefulParts = usefulParts;
    },

    EDIT_USEFUL_PART(state, plantPart) {
      const {
        usefulPartId,
        description,
      } = plantPart;

      const usefulPart = state.usefulParts.find((u) => u.id === usefulPartId);
      if (usefulPart) {
        usefulPart.description = description;
      }
    },
  },

  actions: {
    async loadAllUsefulParts({ commit }) {
      const response = await HTTP.get('useful-parts');
      commit('SET_AVAILABLE_USEFUL_PARTS', response.data.data);
    },

    async loadUsefulParts({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}/useful-parts`);
      commit('SET_USEFUL_PARTS', response.data.data);
    },

    async create({ commit }, usefulPart) {
      const response = await HTTP.post('plant-parts', usefulPart);
      commit('ADD_USEFUL_PART', response.data.data);
    },

    async delete({ commit }, { plantSpeciesId, usefulPartId }) {
      const response = await HTTP.delete(`plant-species/${plantSpeciesId}/useful-parts/${usefulPartId}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_USEFUL_PART', usefulPartId);
      }
    },

    async edit({ commit }, { plantSpeciesId, usefulPartId, description }) {
      const response = await HTTP.patch(`plant-parts/${plantSpeciesId}/${usefulPartId}`, { description });
      commit('EDIT_USEFUL_PART', response.data.data);
    },
  },

  getters: {
    availableUsefulParts: (state) => state.allUsefulParts.filter(
      (o1) => state.usefulParts.filter((o2) => o2.id === o1.id).length === 0,
    ),
  },
};
