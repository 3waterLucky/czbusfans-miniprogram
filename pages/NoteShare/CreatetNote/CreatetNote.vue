<template>
	<view class="container">
		<view class="dist">
			<view class="dist-title">
				板块分区
			</view>
			<scroll-view class="tags" scroll-x="true">
				<view class="tags-item" 
					v-for="(tag, index) in tags" 
					:class="{ 'activeTag': selectedTag == index }"
					:key="index"
					@tap="selectedTag = index"
				>
					{{ tag }}
				</view>
			</scroll-view>
		</view>
		<input class="title" type="text" v-model="title" placeholder="请输入笔记标题（12-30字）" maxlength="30">
		<textarea class="mainBody" 
			v-model="mainBody" 
			placeholder="请输入笔记正文(1000字以内)" 
			maxlength="1000" 
			:style="{'--h': h + 'px'}"
			@keyboardheightchange="changeHeight"
		>
		</textarea>
		<scroll-view class="preview" v-if="img.length !== 0" scroll-x="true">
			<view class="preview-item" v-for="(item, index) in img" :key="index">
				<image class="img" :src="item.tempFilePath" mode="scaleToFill"></image>
				<image class="deleteImg" src="@/static/images/close.png" mode="scaleToFill" @tap="deleteImg(index)"></image>
			</view>
		</scroll-view>
		<view class="options">
			<view class="options-item" @click="chooseImg">
				<image src="../../../static/images/album.png" mode="widthFix"></image>
			</view>
			<view class="textNum">
				文字：<text :style="{'color': mainBody.length === 1000 ? '#ffc357' : '#000'}">{{ mainBody.length }}</text>/1000
			</view>
			<view class="picNum">
				图片：<text :style="{'color': img.length === 9 || img.length === 0 ? '#ffc357' : '#000'}">{{ img.length }}</text>/9
			</view>
			<view class="submit" @click="submit">
				发布
			</view>
		</view>
	</view>
</template>

<script>
	import { getTags, createNewNote, uploadImg } from '@/api/note.js'
	export default {
		data() {
			return {
				tags: [''],
				selectedTag: null,
				title: '',
				mainBody: '',
				h: 123,
				img: []
			};
		},
		methods: {
			changeHeight(e) {
				console.log(e.detail.height)
				this.h = 123 + e.detail.height
			},
			chooseImg() {
				uni.chooseMedia({
					count: 9,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed']
				}).then(res => 
					// console.log(res.tempFiles)
					this.img = res.tempFiles
				)
			},
			// 点击发布按钮
			submit() {
				if (this.selectedTag == null) {
					uni.showToast({
						icon: 'none',
						title: '请选择板块分区！'
					})
					return
				}
				if (this.title.length < 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入不少于12字的标题！'
					})
					return
				}
				if (this.img.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请至少选择一张图片！'
					})
					return
				}
				uni.showLoading({
					title: '发布中',
					mask: true
				})
				let insertId			// 插入笔记在表中的id
				const re = /[']/g			// 加入转义符号去除单引号对SQL语句的影响
				let title = this.title.replace(re, '\\\'')
				let mainBody = this.mainBody.replace(re, '\\\'')
				console.log(mainBody)
				const reqObj = {
					tag: this.tags[this.selectedTag],
					title,
					mainBody,
					imgNum: this.img.length
				}
				createNewNote(reqObj).then(res => {		// 创建笔记，获得insertId
					if (res.data.code != 200) {
						return Promise.reject('create failed')
					} else {
						insertId = res.data.insertId
					}
				}).catch(() => 
					Promise.reject()
				).then(() => 		// upLoadFile只支持单文件上传
					Promise.all(this.img.map((item, index) => uploadImg(item.tempFilePath, insertId, index)))
				).then((res) => {
					uni.hideLoading()
					uni.showToast({
						icon: 'success',
						title: '发布成功'
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						icon: 'error',
						title: '发布失败'
					})
				})
			},
			// 删除已选图片
			deleteImg(index) {
				this.img.splice(index, 1)
			}
		},
		onLoad() {
			getTags().then(res => {
				this.tags = res.data.tags
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取标签失败，请重试'
				})
			})
		}
	}
</script>

<style lang="less">
	.container {
		.dist {
			box-sizing: border-box;
			height: 41px;
			width: 100%;
			line-height: 40px;
			border-bottom: 1px solid #bbb;
			padding-left: 15rpx;
			
			.dist-title {
				float: left;
				height: 40px;
				width: 130rpx;
				line-height: 40px;
				text-align: center;
				font-weight: 600;
			}
			
			.tags {
				float: left;
				box-sizing: border-box;
				width: 600rpx;
				height: 40px;
				padding-left: 15rpx;
				white-space: nowrap;
				
				.tags-item {
					display: inline-block;
					box-sizing: border-box;
					flex-shrink: 0;
					height: 36px;
					padding-left: 10px;
					padding-right: 10px;
					margin-left: 5px;
					margin-right: 5px;
					line-height: 36px;
					color: #fff;
					background-color: #bbb;
					border-radius: 16px;
				}
				
				.activeTag {
					color: #4991ba;
					background-color: #aae5f4;
				}
			}
		}
		
		.title {
			box-sizing: border-box;
			width: 100%;
			height: 41px;
			padding-left: 15rpx;
			padding-right: 15rpx;
			line-height: 40px;
			font-weight: 600;
			border-bottom: 1px solid #bbb;
		}
		
		.mainBody {
			box-sizing: border-box;
			width: 100%;
			height: calc(100vh - var(--h));
			padding: 15rpx;
			line-height: 28px;
		}
		
		.preview {
			width: 100%;
			height: 80px;
			line-height: 80px;
			box-sizing: border-box;
			border-top: 1px dotted #bbb;
			white-space: nowrap;
			
			.preview-item {
				display: inline-block;
				width: 70px;
				height: 70px;
				position: relative;
				margin: 5px;
				
				.img {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
				
				.deleteImg {
					position: absolute;
					display: block;
					right: 0;
					top: 0;
					width: 16px;
					height: 16px;
					background-color: rgba(60, 60, 60, .8);
					border-radius: 50%;
				}
			}
		}
		
		.options {
			height: 40px;
			width: 100%;
			border-top: 1px solid #bbb;
			position: relative;
			display: flex;
			align-items: center;
			
			.options-item {
				width: 36px;
				height: 36px;
				margin-left: 10px;
				margin-right: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			
			.textNum,
			.picNum {
				height: 40px;
				padding-left: 10px;
				padding-right: 10px;
				font-size: 14px;
				line-height: 40px;
				
				text {
					display: inline;
				}
			}
			
			.submit {
				position: absolute;
				right: 15px;
				width: 50px;
				height: 40px;
				border-radius: 6px;
				background-color: #4991ba;
				color: #fff;
				text-align: center;
				line-height: 40px;
				
				// &:hover {
				// 	background-color: #366d8a;
				// 	color: #888;
				// }
			}
		}
	}
</style>
