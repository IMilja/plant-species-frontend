import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    measureUnits: [],
  },

  mutations: {
    SET_MEASURE_UNITS(state, measureUnits) {
      state.measureUnits = measureUnits;
    },
    ADD_MEASURE_UNIT(state, measureUnit) {
      state.measureUnits.push(measureUnit);
    },
  },

  actions: {
    async loadAll({ commit }) {
      const response = await HTTP.get('measure-units');
      commit('SET_MEASURE_UNITS', response.data.data);
    },

    async create({ commit }, measureUnit) {
      const response = await HTTP.post('measure-units', measureUnit);
      commit('ADD_MEASURE_UNIT', response.data.data);
    },
  },
};
