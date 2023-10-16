import { baseUrl } from './user.js'

export const addNewArticle = (title, url) => 
	uni.request({
		url: baseUrl + '/carousel/add',
		method: 'POST',
		header: {
			openid: uni.getStorageSync('openid')
		},
		data: {
			title,
			url
		}
	})
	
export const uploadImage = (tempFilePath, insertId) => 
	uni.uploadFile({
		url: baseUrl + '/carousel/uploadImage',
		filePath: tempFilePath,
		name: 'carouselImage',
		formData: {
			insertId
		}
	})

export const getCarousel = () => 
	uni.request({
		url: baseUrl + '/carousel/get',
		method: 'GET'
	})