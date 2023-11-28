// 笔记相关api

// 获取笔记列表
export const getNoteList = () =>
	uni.request({
		url: '/note',
		method: 'GET'
	})
	
// 获取标签列表
export const getTags = () => 
	uni.request({
		url: '/note/tags',
		method: 'GET'
	})

// 创建新笔记
export const createNewNote = ({ tag, title, mainBody }) => 
	uni.request({
		url: '/note/new',
		method: 'POST',
		data: {
			tag,
			title,
			mainBody
		}
	})

// 上传图片
export const uploadImg = (filePath) => 
	uni.uploadFile({
		url: '/note/image',
		filePath,
		name: 'image'
	})