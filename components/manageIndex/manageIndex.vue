<template>
	<view class="container">
		<TopNavBar :navItems="navItems" :fontColor="'#5555ff'" :borderColor="'#5555ff'" @changePage="changePage"></TopNavBar>
		<view class="pageView">
			<view class="editCarousel" v-show="showPage === 0">
				<view class="addNewCarousel">
					<uni-section class="addNewCarousel-title" title="新增轮播图" titleFontSize="16px" titleColor="#5555ff" type="line"></uni-section>
					<view class="articleTitle">
						<text class="addNewCarousel-item-text">文章标题</text>
						<view class="inputBox">
							<input class="articleTitleText" type="text">
						</view>
					</view>
					<view class="articleUrl">
							<text class="addNewCarousel-item-text">URL</text>
						<view class="inputBox">
							<input class="articleUrlText" type="text" name="" id="">
						</view>
					</view>
					<view class="articlePic">
						<button class="choosePic" @click="choosePic">选择封面图</button>
					</view>
					<view class="showArticlePic" v-if="newPicTempFile !== ''">
						<image class="showArticlePic-image" :src="newPicTempFile" alt="">
					</view>
					<button class="submitNewCarousel" @click="submitNewCarousel">提交</button>
				</view>
			</view>
			<view class="editNotice" v-show="showPage === 1">
				通知栏
			</view>
		</view>
	</view>
</template>

<script>
	import { addNewArticle, uploadImage } from '../../api/manageIndex.js'
	export default {
		name:"manageIndex",
		data() {
			return {
				navItems: ['轮播图', '通知栏'],
				showPage: 0,
				newArticleTitle: '',
				newArticleURL: '',
				newPicTempFile: '',
				insertId: 0,
			};
		},
		methods: {
			changePage(index) {
				this.showPage = index
			},
			choosePic() {
				wx.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album'],
					sizeType: ['compressed'],
					success:(res) => {
						this.newPicTempFile = res.tempFiles[0].tempFilePath
						console.log(this.newPicTempFile)
					},
					fail() {
						uni.showToast({
							icon: 'error',
							title: '选取图片失败'
						})
					}
				})
			},
			submitNewCarousel() {
				const _this = this
				let isFilled = true
				uni.showLoading({
					title: '提交中'
				})
				const selector = this.createSelectorQuery()
				selector.select('.articleTitleText').fields({
					properties: ['value']
				}, res => {
					console.log('articleTitleText', res)
					if (!res.value.length) {
						uni.hideLoading()
						uni.showToast({
							icon: 'error',
							title: '请输入文章标题'
						})
						isFilled = false
					} else {
						_this.newArticleTitle = res.value
					}
				})
				selector.select('.articleUrlText').fields({
					properties: ['value']
				}, res => {
					console.log('articleUrlText', res)
					if (!res.value.length) {
						uni.hideLoading()
						uni.showToast({
							icon: 'error',
							title: '请输入文章URL'
						})
						isFilled = false
					} else {
						_this.newArticleURL = res.value
					}
				})
				selector.exec(() => {
					if (!_this.newPicTempFile.length) {
						uni.hideLoading()
						uni.showToast({
							icon: 'error',
							title: '请选择封面图'
						})
						isFilled = false
					}
					if (isFilled) {
						console.log('可以提交', _this.newArticleTitle, _this.newArticleURL)
						addNewArticle(_this.newArticleTitle, _this.newArticleURL).then((res) => {
							if (res.data.message == 'success') {
								uni.hideLoading()
								uni.showToast({
									icon: 'success',
									title: '保存成功'
								})
								_this.insertId = res.data.insertId
								uploadImage(_this.newPicTempFile, _this.insertId).then((res) => {
									console.log(res.data)
								})
							} else {
								uni.hideLoading()
								uni.showToast({
									icon: 'error',
									title: res.data.message
								})
							}
						})
					}
				}, err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'error',
						title: '提交失败'
					})
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.container {
		background-color: #eee;
	}
	
	.pageView {
		width: 100vw;
		height: 100%;
		
		
		.pageView-item-common {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);	
			background-color: #fff;
		}
		
		.editCarousel {
			width: 100%;
			height: calc(100vh - 70px);
			position: relative;
			background-color: #eee;
			

			.addNewCarousel {
				width: 90%;
				margin-top: 10px;
				padding-bottom: 10px;
				border-radius: 20px;
				overflow: hidden;
				.pageView-item-common();
				
				.addNewCarousel-item-common {
					margin-bottom: 20px;
				}
				
				.addNewCarousel-item-text {
					padding-left: 10px;
				}
				
				.addNewCarousel-title {
					
				}
				
				.inputBox {
					position: relative;
					height: 30px;
				}
				
				.inputText {
					position: absolute;
					height: 100%;
					width: 95%;
					left: 50%;
					transform: translateX(-50%);
					margin-top: 3px;
					line-height: 30px;
					padding-left: 2px;
					border: 1px solid #000;
				}
				
				.articleTitle {
					.addNewCarousel-item-common();
					
					.articleTitleText {
						.inputText();
					}
				}
				
				.articleUrl {
					.addNewCarousel-item-common();
					
					.articleUrlText {
						.inputText();
					}
				}
				
				.articlePic {
					
					.addNewCarousel-item-common();
					
					.choosePic {
						width: 150px;
						height: 30px;
						line-height: 30px;
						color: #fff;
						background-color: #5555ff;
					}
				}
				
				.showArticlePic {
					position: relative;
					width: 100%;
					height: 180px;
					
					.showArticlePic-image {
						position: absolute;
						width: 320px;
						height: 100%;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				
				.submitNewCarousel {
					width: 80%;
					height: 40px;
					margin-top: 10px;
					line-height: 40px;
					color: #fff;
					background-color: #5555ff;
				}
			}
		}
	}
</style>