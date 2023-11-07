// 笔记相关api

// 获取笔记列表
export const getNoteList = () =>
	uni.request({
		url: '/note',
	})