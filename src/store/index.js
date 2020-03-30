import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import registration from './modules/registration';
import staging from './modules/staging';


Vue.use(Vuex)

const vuexPersist = new VuexPersist({key: 'eMastercard', storage: window.sessionStorage});

export default new Vuex.Store({
  state: {
    user: null,
    patient: null,
    currentWeight: null,
    currentHeight: null,
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
    }, 
    getPatient(state) {
      return state.patient;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPatient(state, patient) {
      state.patient = patient;
    },
    setHeight(state, height) {
      state.currentHeight = height;
    },
    setWeight(state, weight) {
      state.currentWeight = weight;
    }
  },
  actions: {
  },
  modules: {
    registration,
    staging
  },
  plugins: [vuexPersist.plugin]
})
