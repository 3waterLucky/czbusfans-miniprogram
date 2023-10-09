import { getLinesList } from '../api/lines.js'

const state = {
	linesList: []
}

const actions = {
	async getLinesList({ commit }) {
		console.log('getLinesList action')
		let result = await getLinesList()
		if (result.statusCode == 200) {
			commit('GETLINESLIST', result.data.linesList)
		}
	}
}

const mutations = {
	GETLINESLIST(state, linesList) {
		console.log('GETLINESLIST mutation')
		console.log(linesList)
		state.linesList = linesList || []
	}
}

const getters = {
	
}

export default {
	state,
	actions,
	mutations,
	getters
}