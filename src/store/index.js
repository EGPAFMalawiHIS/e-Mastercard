import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexPersist = new VuexPersist({key: 'eMastercard', storage: window.sessionStorage});

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    userIs(state) {
      return role => {
        if (!state.user) {
          return false;
        }

        const userRoles = state.user.roles;
        return userRoles.findIndex(userRole => userRole.role.toLowerCase() === role.toLowerCase()) >= 0;
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
