import FormData from 'form-data';
import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    images: [],
  },

  mutations: {
    SET_IMAGES(state, images) {
      state.images = images;
    },

    ADD_IMAGE(state, image) {
      state.images.push(image);
    },

    DELETE_IMAGE(state, imageId) {
      const images = state.images.filter((i) => i.id !== imageId);
      state.images = images;
    },
  },

  actions: {
    async plantSpeciesloadAll({ commit }, plantSpeciesId) {
      const response = await HTTP.get(`plant-species/${plantSpeciesId}/images`);
      commit('SET_IMAGES', response.data.data);
    },

    async addPlantSpeciesImage({ commit }, { plantSpeciesId, image }) {
      const formData = new FormData();
      Object.keys(image).forEach((key) => formData.append(key, image[key]));

      const response = await HTTP.post(`plant-species/${plantSpeciesId}/images`, formData);
      commit('ADD_IMAGE', response.data.data);
    },

    async deleteImage({ commit }, image) {
      const response = await HTTP.delete(`images/${image.id}`);

      if (response.status === 204 || response.status === 200) {
        commit('DELETE_IMAGE', image.id);
      }
    },
  },
};
