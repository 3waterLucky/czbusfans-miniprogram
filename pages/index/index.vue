<template>
	<view class="content">
		<!-- 头部轮播图 -->
		<view class="header">
			<view class="bg"></view>
			<swiper class="swiper" 
				:autoplay="true" 
				:circular="true" 
				:interval="3000" 
				:duration="1000"
			>
				<swiper-item class="swiper-item" 
					v-for="(item, index) in carousel" 
					@click="toGzhWebSite(item.url)"
					:key="item.id"
				>
					<img :src="'http://192.168.1.2:3000' + item.image" alt="">
					<view class="title">
						{{ item.title }}
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 推荐菜单栏 -->
		<uni-grid class="recommend" :column="4" :highlight="true" @change="handleClickGrid">
			<uni-grid-item :index="0" :key="0">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/tickoff.png" alt="">
					<text class="text">站点地图</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="1" :key="1">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/scan.png" alt="">
					<text class="text">扫码乘车</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="2" :key="2">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/gongjiaoche.png" alt="">
					<text class="text">车型一览</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="3" :key="3">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/chengshi.png" alt="">
					<text class="text">跨市交通</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="4" :key="4">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/dongche.png" alt="">
					<text class="text">高铁接驳</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="5" :key="5">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/12306.png" alt="">
					<text class="text">铁路专区</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="6" :key="6">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/signin.png" alt="">
					<text class="text">每日签到</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="7" :key="7">
				<view class="grid-item-box" style="background-color: #fff;">
					<image src="../../static/images/activity.png" alt="">
					<text class="text">活动中心</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		
		<!-- 欢迎文字 -->
		<view class="welcome" :class="{ 'welcome-close': welcomeClose }" v-if="showWelcome">
			<text class="welcome-text">欢迎来到潮巴园</text>
		</view>
		
		<!-- 公告栏 -->
		<uni-section class="notice" title="NEWS" titleFontSize="16px">
			<!-- 装饰器插槽 -->
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<view class="notice-body">
				<view class="notice-item" 
					v-for="(item, index) in notice" 
					@tap="toGzhWebSite(item.url)"
					:key="index"
				>
					<text class="notice-item-title">【{{ item.tag }}】{{ item.title }}</text>
					<text class="notice-item-date">{{ item.deliverDay }}</text>
				</view>
			</view>
		</uni-section>
		
		<!-- 引导关注 -->
		<view class="follow">
			<image src="../../static/images/follow1.png" alt="" show-menu-by-longpress="true">
		</view>
	</view>
</template>

<script>
	import { getCarousel, getNotice } from '../../api/manageIndex.js'
	export default {
		data() {
			return {
				carousel: [],
				notice: [],
				welcomeClose: false,
				showWelcome: true
			}
		},
		onLoad() {
			getCarousel().then(res => {
				if (res.data.code == 200) {
					this.carousel = res.data.carousel
				} else {
					uni.showToast({
						icon: 'none',
						title: '获取轮播图失败'
					})
				}
			})
			getNotice().then(res => {
				if (res.data.code == 200) {
					this.notice = res.data.notice
				} else {
					uni.showToast({
						icon: 'none',
						title: '获取通知失败'
					})
				}
			})
		},
		onReady() {
			setTimeout(() => {
				this.welcomeClose = true
				setTimeout(() => {
					this.showWelcome = false
				}, 250)
			}, 4000)
		},
		methods: {
			handleClickGrid(e) {
				switch (e.detail.index) {
					case 0:
						uni.navigateTo({
							url: '/pages/gridFuncs/StopsMap/StopsMap'
						})
						break
					case 1:
						uni.navigateTo({
							url: '/pages/gridFuncs/ScanCode/ScanCode'
						})
						break
					case 2:
						uni.navigateTo({
							url: '/pages/gridFuncs/BusType/BusType'
						})
						break
					case 6:
						uni.navigateTo({
							url: '/pages/gridFuncs/SignIn/SignIn'
						})
						break
					default:
						uni.showToast({
							icon: 'none',
							title: '敬请期待...'
						})
						break
				}
			},
			toGzhWebSite(url) {
				uni.navigateTo({
					url: `/pages/GzhWebSite/GzhWebSite?url=${url}`
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	
	.content {
		min-height: 100vh;
		background-color: #eee;
		padding-bottom: 10px;
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

	.header {
		width: 100%;
		height: calc(75vw * 2 / 3);
		position: relative;
		margin-bottom: 10px;

		.bg {
			width: 100%;
			height: calc(75vw * 2 / 3 / 18 * 13);
			background-color: #4991ba;
			border-radius: 0 0 30px 30px;
		}

		.swiper {
			position: absolute;
			width:75vw;
			height: calc(75vw * 2 / 3);
			top: 0;
			left: 50%;
			border-radius: 10px;
			transform: translateX(-50%);
			overflow: hidden;
		}

		.swiper-item {
			position: relative;

			img {
				height: 100%;
				width: 100%;
			}

			.title {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				position: absolute;
				width: calc(75vw - 20px);
				bottom: 0;
				padding-left: 10px;
				padding-right: 10px;
				font-size: 16px;
				line-height: 25px;
				background-color: rgba(0, 0, 0, .5);
				color: #fff;
			}
		}

	}
	
	.recommend {
		display: block;
		margin-bottom: 10px;
		
		.grid-item-box {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
		
		image {
			display: block;
			height: 30px;
			width: 30px;
		}
		
		.text {
			font-size: 14px;
			margin-top: 5px;
		}
	}
	
	.welcome {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		animation: boxShowUp 1.5s forwards;
		transform: translateY(0);
		
		.welcome-text {
			width: 100%;
			background-image: linear-gradient(to right, red 10%, orange,  green, blue, indigo, violet);
			color: transparent;
			text-align: center;
			font-size: 30px;
			line-height: 40px;
			font-weight: 600;
			background-clip: text;
			animation: textShowUp 3s forwards;
		}
	}
	
	.welcome-close {
		transform: translateY(-40px);
		margin-bottom: -40px;
		transition: .25s linear;
	}
	
	@keyframes boxShowUp {
		from {
			filter: contrast(50);
		}
		to {
			filter: contrast(1);
		}
	}
	
	@keyframes textShowUp {
		from {
			letter-spacing: -50px;
			filter: blur(10px);
		}
		to {
			letter-spacing: 10px;
			filter: blur(0);
		}
	}
	
	.notice {
		width: 100%;
		
		.decoration {
			width: 4px;
			height: 12px;
			border-radius: 10px;
			margin-right: 4px;
			background-color: #ffc357;
		}
		
		.notice-body {
			width: 100%;
			border-top: #8f8f94 solid 1px;
			
			.notice-item {
				position: relative;
				height: 30px;
				width: 100%;
				font-size: 14px;
				border-bottom: 1px solid #ddd;
				
				&::before {
					position: absolute;
					left: 2vw;
					top: 13px;
					content: '';
					background-color: #000;
					width: 1vw;
					height: 1vw;
					border-radius: 50%;
				}
				
				.notice-item-title {
					display: inline-block;
					width: 70vw;
					padding-left: 4vw;
					white-space: nowrap; 
					overflow: hidden; 
					text-overflow: ellipsis;
					line-height: 30px;
				}
				
				.notice-item-date {
					display: inline-block;
					float: right;
					width: 22vw;
					font-size: 14px;
					padding-left: 1vw;
					padding-right: 2vw;
					line-height: 30px;
					color: #8f8f94;
					white-space: nowrap;
					overflow: hidden; 
					text-overflow: ellipsis;
				}
			}
		}
	}
	
	
	.follow {
		width: 90vw;
		height: calc(90vw / 1080 * 685);
		transform: translateX(5vw);
		margin-top: 10px;
		border-radius: 10vw;
		overflow: hidden;
		
		image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	
</style>