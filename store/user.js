import { submitInfo, getInfo } from '../api/user.js'

const state = {
	userLocation: {},
	avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
	nickName: '游客'
}

const actions = {
	getUserLocation({ commit }) {
		console.log('action')
		uni.getLocation({
			success(res) {
				commit('GETUSERLOCATION', res)
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	async setUserInfo({ commit }, data) {
		await submitInfo(data)
		commit('SETUSERINFO', data)
	},
	async getUserInfo({ commit }, openid) {
		const result = await getInfo(openid)
		if (result.statusCode == 200) {
			console.log(result)
			commit('GETUSERINFO', result.data)
		}
	}
}

const mutations = {
	GETUSERLOCATION(state, location) {
		state.userLocation = location
		console.log(state.userLocation, 'vuex')
	},
	SETUSERINFO(state, data) {
		state.avatar = data.avatar
		state.nickName = data.nickName
		console.log(state, 'SETUSERINFO')
	},
	GETUSERINFO(state, data) {
		state.avatar = data.avatar
		state.nickName = data.nickName
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