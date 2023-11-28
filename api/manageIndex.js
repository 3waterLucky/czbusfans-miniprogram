// 主页展示信息相关API

export const addNewArticle = (title, url) => 
	uni.request({
		url: '/carousel/add',
		method: 'POST',
		data: {
			title,
			url
		}
	})
	
export const uploadImage = (tempFilePath, insertId) => 
	uni.uploadFile({
		url: '/carousel/uploadImage',
		filePath: tempFilePath,
		name: 'carouselImage',
		formData: {
			insertId
		}
	})

export const getCarousel = () => 
	uni.request({
		url: '/carousel/get',
		method: 'GET'
	})
	
export const getNotice = () => 
	uni.request({
		url: '/carousel/notice',
		method: 'GET'
	})