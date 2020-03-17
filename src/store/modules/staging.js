const state = {
	staging: {},
}
const getters = {}
const actions = {
	addStaging({ commit }, staging) {
		commit('setStaging', staging)
	}
}
const mutations = {
	setStaging: (state, staging) => state.staging = staging
}

export default {
	state,
	getters,
	actions,
	mutations
}

