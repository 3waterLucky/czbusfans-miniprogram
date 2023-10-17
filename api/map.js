// 站点地图相关api

// 获取站点列表
export const getStopsList = () =>
	uni.request({
		url: '/map/stopsList',
		method: 'GET',
	})
	
// 获取站点坐标
export const getStopCoord = (stopId) => 
	uni.request({
		url: '/map/getStopCoord',
		method: 'GET',
		data: {
			stopId
		}
	})

// 打卡
export const tickOff = (from, stopId) => uni.request({
	url: '/map/tickOff',
	method: 'POST',
	data: {
		from,
		stopId
	}
})