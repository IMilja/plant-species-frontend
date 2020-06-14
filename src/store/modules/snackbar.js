export default {
  namespaced: true,
  state: {
    snackbar: {
      color: '',
      isActive: false,
      text: '',
    },
  },

  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },
  },

  actions: {
    activeSnackbar({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar);
    },
  },
};
