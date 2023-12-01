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

/**
 * 创建新笔记
 * @param {object} obj	参数对象
 * @param {string} obj.tag	板块分区
 * @param {string} obj.title	标题
 * @param {string} obj.mainBody	正文
 * @param {number} obj.imgNum	图片数量
 * @returns {Promise}	请求的结果
 */
export const createNewNote = ({ tag, title, mainBody, imgNum }) => 
	uni.request({
		url: '/note/new',
		method: 'POST',
		data: {
			tag,
			title,
			mainBody,
			imgNum
		}
	})
/**
 * 上传图片
 * 微信的upLoadFile不支持Promise风格调用，需要包装成Promise
 * @param {string} filePath	图片路径
 * @param {number} insertId	从服务端获取的笔记被插入表中的id
 * @param {number} sequence	图片顺序 
 * @returns {Promise} 上传图片的结果
 */
export const uploadImg = (filePath, insertId, sequence) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: '/note/image',
			filePath,
			name: 'image',
			formData: {
				insertId,
				sequence
			},
			success: (res) => {
				if (res.statusCode !== 200) {
					reject(res)
				} else {
					const data = JSON.parse(res.data)
					if (data.code == 200) {
						resolve(res)
					} else {
						reject(res)
					}
				}
			},
			fail: () => {
				reject()
			}
		})
	})
}