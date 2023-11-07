import { submitInfo, getInfo, uploadAvatar } from '../api/user.js'

const state = {
	userLocation: {},
	avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
	nickName: '游客',
	isAdmin: 0
}

const actions = {
	getUserLocation({ commit }) {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				success(res) {
					commit('GETUSERLOCATION', res)
					console.log('location accuracy: ', res.accuracy)
					resolve('success')
				},
				fail(err) {
					console.log(err)
					reject('fail')
				}
			})
		})
	},
	setUserInfo({ commit }, data) {
		return new Promise((resolve, reject) => {
			submitInfo(data).then((res) => {
				if (res.statusCode == 200) {
					console.log('submitInfo success')
					commit('SETUSERINFO', data)
					resolve('success')
				} else {
					reject('fail')
				}
			})
		})
	},
	getUserInfo({ commit }) {
		const result = {}
		getInfo(result).then(() => {
			console.log('in action: getUserInfo result came')
			commit('GETUSERINFO')
		})
	},
	updateAvatar({ commit }) {
		commit('UPDATEAVATAR')
	},
	getUserAuth({ commit }, isAdmin) {
		commit('GETUSERAUTH', isAdmin)
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
	GETUSERINFO(state, data) {
		console.log('getuserInfo mutation')
		state.avatar = uni.getStorageSync('avatar')
		state.nickName = uni.getStorageSync('nickName')
	},
	UPDATEAVATAR(state) {
		state.avatar = uni.getStorageSync('avatar')
	},
	GETUSERAUTH(state, isAdmin) {
		state.isAdmin = isAdmin
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