import { getStopsList } from '../api/map.js'

const state = {
	stopsList: [],
	markedList: []
}

const actions = {
	getStopsList({ commit }) {
		return new Promise(async (resolve, reject) => {
			let result = await getStopsList()
			if (result.statusCode == 200) {
				commit('GETSTOPSLIST', result.data)
				resolve('success')
			} else {
				reject('fail')
			}
		})
	}
}

const mutations = {
	GETSTOPSLIST(state, data) {
		state.stopsList = data.list
		state.markedList = data.markedList
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