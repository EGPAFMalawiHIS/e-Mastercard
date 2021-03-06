import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import dashboard from './modules/dashboard';
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
    location: {
      name: null,
      id: null
    }
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
    setLocation(state, location) {
      state.location.id = location.location_id;
      state.location.name = location.name;
    },
    setWeight(state, weight) {
      state.currentWeight = weight;
    },
    setInitialRegistration(state, encounter) {
      state.initialRegistration = encounter
    },
    setInitialVitals(state, encounter) {
      state.initialVitals = encounter
    },
    setInitialStaging(state, encounter) {
      state.initialStaging = encounter
    }
  },
  actions: {
  },
  modules: {
    dashboard,
    registration,
    staging,
  },
  plugins: [vuexPersist.plugin]
})
