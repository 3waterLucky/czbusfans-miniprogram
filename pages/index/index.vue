<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(image, index) in imageList" :key="index">
				<img :src="image" alt="">
			</swiper-item>
		</swiper>
		<image class="logo" src="/static/images/appAvatar.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'welcome to czbusfans',
				imageList: [
					'../../static/images/cr400af.jpg',
					'../../static/images/fqh.jpg',
					'../../static/images/K4byd.jpg'
				]
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.swiper {
		width: 100%;
	}
	
	.swiper-item {
		display: block;
/* 		height: 300rpx;
		line-height: 300rpx; */
		text-align: center;
	}
</style>
