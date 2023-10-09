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