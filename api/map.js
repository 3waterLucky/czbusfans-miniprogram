// 站点地图相关api
import { baseUrl } from './user.js'

// 获取站点列表
export const getStopsList = () =>
	uni.request({
		url: baseUrl + '/map/stopsList',
		method: 'GET',
		header: {
			openid: uni.getStorageSync('openid')
		}
	})
	
// 获取站点坐标
export const getStopCoord = (stopId) => 
	uni.request({
		url: baseUrl + '/map/getStopCoord',
		method: 'GET',
		data: {
			stopId
		}
	})
	
	// 打卡
	// export const tickOff = (stopId) => 
	// 	uni.request({
	// 		url: baseUrl + '/map/tickOff',
	// 		method: 'POST',
	// 		header: {
	// 			openid: uni.getStorageSync('openid')
	// 		},
	// 		data: {
	// 			stopId
	// 		}
	// 	})
		
export const tickOff = (from, stopId) => uni.request({
	url: baseUrl + '/map/tickOff',
	method: 'POST',
	header: {
		openid: uni.getStorageSync('openid')
	},
	data: {
		from,
		stopId
	}
})