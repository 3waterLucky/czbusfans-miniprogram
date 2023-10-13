<template>
	<view>
		<TopNavBar :navItems="navItems" :fontColor="'#5555ff'" :borderColor="'#5555ff'" @changePage="changePage"></TopNavBar>
		<view class="pageView">
			<view class="editCarousel" v-show="showPage === 0">
				<view class="addNewCarousel">
					<view class="articleTitle">
						文章标题
						<input class="articleTitleText" type="text">
					</view>
					<view class="articleUrl">
						URL
						<input class="articleUrlText" type="text" name="" id="">
					</view>
					<view class="articlePic">
						选择封面图
						<button class="choosePic" type="default" @click="choosePic">选择图片</button>
					</view>
					<button class="submit" @click="submitNewArticle"></button>
				</view>
			</view>
			<view class="editNotice" v-show="showPage === 1">
				通知栏
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"manageIndex",
		data() {
			return {
				navItems: ['轮播图', '通知栏'],
				showPage: 0,
				newPicTempFile: []
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
					success(res) {
						this.newPicTempFile = res
						console.log(this.newPicTempFile)
					},
					fail() {
						uni.showToast({
							icon: 'error',
							title: '选取图片失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.pageView {
		
		.editCarousel {
			
			.addNewCarousel {
				
				.inputText {
					height: 30px;
					line-height: 30px;
					background-color: #fff;
					border: 1px solid #000;
				}
				
				.articleTitle {
					
					.articleTitleText {
						.inputText();
					}
				}
				
				.articleUrl {
					
					.articleUrlText {
						.inputText();
					}
				}
			}
		}
	}
</style>