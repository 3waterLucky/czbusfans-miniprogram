import { getLinesList } from '../api/lines.js'

const state = {
	linesList: {}
}

const actions = {
	async getLinesList({ commit }) {
		let result = await getLinesList()
		if (result.statusCode == 200) {
			commit('GETLINESLIST', result.data.linesList)
		}
	}
}

const mutations = {
	GETLINESLIST(state, linesList) {
		state.linesList = linesList
	}
}

const getters = {
	normalLines: state => state.linesList.normalLines,
	expressLines: state => state.linesList.expressLines,
	travelLines: state => state.linesList.travelLines,
	microLines: state => state.linesList.microLines,
	ruralLines: state => state.linesList.ruralLines,
	RaopingLines: state => state.linesList.RaopingLines,
	intercityLines: state => state.linesList.intercityLines,
	tempLines: state => state.linesList.tempLines,
	otherLines: state => state.linesList.otherLines
}

export default {
	state,
	actions,
	mutations,
	getters
}