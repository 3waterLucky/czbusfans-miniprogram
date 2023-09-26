import { submitInfo, getInfo, uploadAvatar } from '../api/user.js'

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
	setUserInfo({ commit }, data) {
		submitInfo(data).then((res) => {
			if (res.statusCode == 200) {
				console.log('submitInfo success')
				commit('SETUSERINFO', data)
			}
		})
	},
	getUserInfo({ commit }, openid) {
		const result = {}
		getInfo(openid, result).then(() => {
			console.log('in action: getUserInfo result came')
			commit('GETUSERINFO')
		})
	},
	updateAvatar({ commit }) {
		commit('UPDATEAVATAR')
	}
}

const mutations = {
	GETUSERLOCATION(state, location) {
		state.userLocation = location
	},
	SETUSERINFO(state, data) {
		// state.avatar = data.avatar
		state.nickName = data.nickName
		console.log(state, 'SETUSERINFO')
	},
	GETUSERINFO(state) {
	// 	console.log('GETUSERINFO mutation', JSON.stringify(data))
	// 	let userData = uni.getStorageSync('userData')
	// 	if (userData) {
	// 		userData = JSON.parse(userData)
	// 	}
	// 	state.avatar = userData?.avatar || data.avatar
	// 	state.nickName = userData?.nickName || data.nickName
		console.log('getuserInfo mutation')
		state.avatar = uni.getStorageSync('avatar')
		state.nickName = uni.getStorageSync('nickName')
	},
	UPDATEAVATAR(state) {
		state.avatar = uni.getStorageSync('avatar')
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