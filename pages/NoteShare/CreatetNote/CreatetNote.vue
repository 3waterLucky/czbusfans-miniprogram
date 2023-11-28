<template>
	<view class="container">
		<view class="dist">
			<view class="dist-title">
				板块分区
			</view>
			<scroll-view class="tags" scroll-x="true" enable-flex="true">
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
		<scroll-view class="preview" v-if="img.length !== 0" scroll-x="true" enable-flex="true">
			<image v-for="(item, index) in img" :src="item.tempFilePath" mode="scaleToFill" :key="index"></image>
		</scroll-view>
		<view class="options">
			<view class="options-item" @click="chooseImg">
				<image src="../../../static/images/album.png" mode="widthFix"></image>
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
			submit() {
				
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
				display: flex;
				align-items: center;
				
				.tags-item {
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
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border-top: 1px dotted #bbb;
			
			image {
				display: block;
				width: 70px;
				height: 70px;
				border-radius: 10px;
			}
		}
		
		.options {
			height: 40px;
			width: 100%;
			border-top: 1px solid #bbb;
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
		}
	}
</style>
