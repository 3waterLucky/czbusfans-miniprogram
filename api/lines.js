// 线路信息相关api

import { baseUrl } from './user.js'

// 获取线路列表
export const getLinesList = () => 
	uni.request({
		url: baseUrl + '/lines/list',
		method: 'GET'
	})