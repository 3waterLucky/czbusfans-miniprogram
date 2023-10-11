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
					v-for="(image, index) in imageList" 
					:key="index"
				>
					<img :src="image" alt="">
					<view class="title">
						文章标题{{ index }}
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 推荐菜单栏 -->
		<uni-grid class="recommend" :column="4" :highlight="true" @change="handleClickGrid">
			<uni-grid-item>
				<view class="grid-item-box" style="background-color: #fff;">
					<img src="../../static/images/定位打卡.png" alt="">
					<text class="text">站点地图</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" style="background-color: #fff;">
					<img src="../../static/images/12306.png" alt="">
					<text class="text">铁路专区</text>
				</view>
			</uni-grid-item>
			<uni-grid-item v-for="(item, index) in 6" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons type="image" :size="30" color="green" />
					<text class="text">敬请期待</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		
		<!-- 公告栏 -->
		<uni-section class="notice" title="NEWS" titleFontSize="16px">
			<!-- 装饰器插槽 -->
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<view class="notice-body">
				<view class="notice-item" v-for="(item, index) in news" :key="index">
					<text class="notice-item-title">{{ item.title }}</text>
					<text class="notice-item-date">{{ item.date }}</text>
				</view>
			</view>
		</uni-section>
		
		<!-- 引导关注 -->
		<view class="follow">
			<img src="../../static/images/follow1.png" alt="">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [
					'../../static/images/cr400af.jpg',
					'../../static/images/fqh.jpg',
					'../../static/images/K4byd.jpg'
				],
				news: [
					{
						title: '【停运信息】受台风影响，9月5日潮州公交调整情况',
						date: '2023-09-05'
					},
					{
						title: '市区十条公交线路班次大调整！',
						date: '2023-08-18'
					},
					{
						title: '【绕道！】途经潮汕路的线路或有调整！',
						date: '2023-08-12'
					},
					{
						title: '【线路恢复】鉴于台风对我市的影响逐渐减弱，全市公交线路自12:00起逐步恢复运营',
						date: '2023-07-28'
					},
					{
						title: '【停运通知】台风来袭，公交线路有这些变化……',
						date: '2023-07-26'
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			handleClickGrid(e) {
				if (e.detail.index == 0) {
					uni.navigateTo({
						url: '/pages/StopsMap/StopsMap'
					})
				}
			}
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
		height: calc(75vw * 9 / 16);
		position: relative;
		margin-bottom: 10px;

		.bg {
			width: 100%;
			height: calc(75vw * 9 / 16 / 18 * 13);
			background-color: #ffaa00;
			border-radius: 0 0 30px 30px;
		}

		.swiper {
			position: absolute;
			width:75vw;
			height: calc(75vw * 9 / 16);
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
				position: absolute;
				width: 100%;
				height: 25px;
				bottom: 0;
				padding-left: 10px;
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
		
		img {
			height: 30px;
			width: 30px;
		}
		
		.text {
			font-size: 14px;
			margin-top: 5px;
		}
	}
	
	.notice {
		width: 100%;
		
		.decoration {
			width: 4px;
			height: 12px;
			border-radius: 10px;
			margin-right: 4px;
			background-color: #ffaa00;
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
		
		img {
			width: 100%;
			height: 100%;
		}
	}
	
</style>