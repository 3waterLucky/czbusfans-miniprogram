// 车型相关api

export const getBusList = () =>
	uni.request({
		url: '/bus/type',
		method: 'GET'
	})