import HTTP from '@/http-common.js';

export default {
  namespaced: true,
  state: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  },

  mutations: {
    LOG_IN(state, currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      state.currentUser = currentUser;
    },
    LOG_OUT(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },

  actions: {
    async login({ commit }, loginData) {
      const response = await HTTP.post('users/login', loginData);
      const {
        accessToken,
        userRole,
      } = response.data.data;

      const currentUser = {
        accessToken,
        userRole,
      };
      commit('LOG_IN', currentUser);
    },

    async logout({ commit }) {
      commit('LOG_OUT');
    },
  },

  getters: {
    accessToken: (state) => (state.currentUser ? state.currentUser.accessToken : ''),
    isSuperAdmin: (state) => (state.currentUser ? state.currentUser.userRole === 'SUPER_ADMIN' : ''),
  },
};
