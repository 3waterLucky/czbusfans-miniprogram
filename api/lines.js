// 线路信息相关api

// 获取线路列表
export const getLinesList = () => 
	uni.request({
		url: '/lines/list',
		method: 'GET'
	})