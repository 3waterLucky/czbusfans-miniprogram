// 用户相关api
import store from '../store/index.js'

const homeWifi = '192.168.1.2'
const schoolWifi = '10.10.244.98'
const cellPhone = '172.20.10.3'
export const baseUrl = 'http://' + homeWifi + ':3000'

// 服务器保存头像
export const uploadAvatar = (tempPath) => 
	uni.uploadFile({
		url: baseUrl + '/user/uploadAvatar',
		filePath: tempPath,
		name: 'avatar',
		header: {
			openid: uni.getStorageSync('openid')	// 带上openid，便于服务端存储时设置唯一的文件名
		}
	})

// 登录并将openid存储在本地
export const wxLogin = (code) => 
	uni.request({
		url: baseUrl + '/user/login',
		method: 'GET',
		data: {
			code
		},
	})


// 提交个人信息
export const submitInfo = (data) =>  
	uni.request({
		url: baseUrl + '/user/submitInfo',
		method: 'POST',
		data: {
			openid: uni.getStorageSync('openid'),
			nickName: data.nickName,
			// avatar: data.avatar
		}
	})

// 获取个人信息（头像、昵称）
export const getInfo = (openid, ret) => {
	return uni.request({
		url: baseUrl + '/user/getInfo',
		method: 'GET',
		data: {
			openid
		},
	}).then((res) => {
		console.log('getInfo', res)
		ret.nickName = res.data.nickName
		uni.setStorageSync('nickName', res.data.nickName)
		store.dispatch('getUserAuth', res.data.isAdmin)
		// 下载头像存储到本地
		uni.downloadFile({
			url: res.data.avatar,
			success: (res) => {
				console.log('downloadFile success', res)
				console.log('res.tempFilePath', res.tempFilePath)
				const path = res.tempFilePath ? res.tempFilePath : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				ret.avatar = path
				uni.setStorageSync('avatar', path)
				store.dispatch('updateAvatar')
				console.log('In getInfo, ret: ', ret)
			}
		})
	})
}