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
    bioactiveSubstances: [],
    usefulParts: [],
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

    SET_USEFUL_PARTS(state, usefulParts) {
      state.usefulParts = usefulParts;
    },

    ADD_USEFUL_PART(state, plantPart) {
      const data = {
        ...plantPart.usefulPart,
        description: plantPart.description,
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

    SET_BIOACTIVE_SUBSTANCES(state, bioactiveSubstances) {
      state.bioactiveSubstances = bioactiveSubstances;
    },

    ADD_BIOACTIVE_SUBSTANCE(state, { bioactiveSubstance, usefulPartId }) {
      const usefulPart = state.usefulParts.find((u) => u.id === usefulPartId);
      const data = {
        ...bioactiveSubstance,
        usefulPartId,
        usefulPartCroatianName: usefulPart.croatianName,
        usefulPartLatinName: usefulPart.latinName,
      };
      state.bioactiveSubstances.push(data);
    },

    DELETE_BIOACTIVE_SUBSTANCE(state, { usefulPartId, bioactiveSubstanceId }) {
      const bioactiveSubstances = state.bioactiveSubstances.filter(
        (b) => b.usefulPartId !== usefulPartId || b.bioactiveSubstanceId !== bioactiveSubstanceId,
      );
      state.bioactiveSubstances = bioactiveSubstances;
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

    async loadUsefulParts({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}/useful-parts`);
      commit('SET_USEFUL_PARTS', response.data.data);
    },

    async createUsefulPart({ commit }, usefulPart) {
      const response = await HTTP.post('plant-parts', usefulPart);
      commit('ADD_USEFUL_PART', response.data.data);
    },

    async deleteUsefulPart({ commit }, { plantSpeciesId, usefulPartId }) {
      const response = await HTTP.delete(`plant-species/${plantSpeciesId}/useful-parts/${usefulPartId}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_USEFUL_PART', usefulPartId);
      }
    },

    async editUsefulPart({ commit }, { plantSpeciesId, usefulPartId, description }) {
      const response = await HTTP.patch(`plant-parts/${plantSpeciesId}/${usefulPartId}`, { description });
      commit('EDIT_USEFUL_PART', response.data.data);
    },

    async loadBioactiveSubstances({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}/bioactive-substances`);
      commit('SET_BIOACTIVE_SUBSTANCES', response.data.data);
    },

    async deleteBioactiveSubstance({ commit }, {
      plantSpeciesId,
      usefulPartId,
      bioactiveSubstanceId,
    }) {
      const response = await HTTP.delete(`plant-parts/${plantSpeciesId}/${usefulPartId}/bioactive-substances/${bioactiveSubstanceId}`);
      if (response.status === 204 || response.status === 200) {
        commit('DELETE_BIOACTIVE_SUBSTANCE', { usefulPartId, bioactiveSubstanceId });
      }
    },

    async addBioactiveSubstance({ commit }, bioactiveSubstance) {
      const {
        plantSpeciesId,
        usefulPartId,
        content,
        bioactiveSubstanceId,
      } = bioactiveSubstance;

      const response = await HTTP.post(`plant-parts/${plantSpeciesId}/${usefulPartId}/bioactive-substances`, {
        bioactiveSubstanceId,
        content,
      });
      const { data } = response.data;
      commit('ADD_BIOACTIVE_SUBSTANCE', { bioactiveSubstance: data, usefulPartId });
    },
  },
};
