
const state = {
	registration: {},
}
const getters = {}
const actions = {
	addRegistration({ commit }, registration) {
		commit('setRegistration', registration)
	}
}
const mutations = {
	setRegistration: (state, registration) => state.registration = registration
}

export default {
	state,
	getters,
	actions,
	mutations
}

