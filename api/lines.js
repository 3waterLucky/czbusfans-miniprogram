// 线路信息相关api

// 获取线路列表
export const getLinesList = () => 
	uni.request({
		url: '/lines/list',
		method: 'GET'
	})

// 获取线路详细信息
export const getDetail = (id) => 
	uni.request({
		url: '/lines/lineInfo',
		method: 'GET',
		data: {
			id
		}
	})
	
// 根据站点id获取站点名
export const getStopName = (stopId) =>
	uni.request({
		url: '/lines/stopName',
		method: 'GET',
		data: {
			stopId
		}
	})