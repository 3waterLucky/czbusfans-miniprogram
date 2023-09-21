// 用户相关api
import { store } from '../store/index.js'

const baseUrl = 'http://192.168.1.2:3000'

// 登录并将openid存储在本地
export function wxLogin(code) {
	let ret = ''
	uni.request({
		url: baseUrl + '/user/login',
		// url: 'http://127.0.0.1:3000/user/login',
		method: 'GET',
		data: {
			code
		},
		success: (res) => {
			uni.setStorage({
				key: 'openid',
				data: res.data.openid,
			})
		}
	})
}

// 提交个人信息
export function submitInfo(data) {
	uni.request({
		url: baseUrl + '/user/submitInfo',
		// url: 'http://127.0.0.1:3000/user/submitInfo',
		method: 'POST',
		data: {
			openid: uni.getStorageSync('openid'),
			nickName: data.nickName,
			avatar: data.avatar
		}
	}).then(() => {
		console.log('submit success')
	})
}

// 获取个人信息（头像、昵称）
export const getInfo = (openid) => uni.request({
	url: baseUrl + '/user/getInfo',
	// url: 'http://127.0.0.1:3000/user/getInfo',
	method: 'GET',
	data: {
		openid
	}
})