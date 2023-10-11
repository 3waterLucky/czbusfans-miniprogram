<template>
	<view class="container">
		<view class="busStop">
			<view class="busPic">
				<img src="../../static/images/BusStop.png" alt="">
			</view>
			<view class="busStop-right">
				<view class="stopName">
					{{ stopName }}
				</view>
				<view class="direction">
					方向：{{ direction }}
				</view>
			</view>
		</view>
		<view class="boxLine"></view>
		<view class="buttons">
			<button class="passbyLines">本站线路</button>
			<button class="tickOff" @click="tickOff">
				打卡
			</button>
			<button class="navToStop">导航至该站点</button>
		</view>
	</view>
		
</template>

<script>
	import { getStopCoord, tickOff } from '../../api/map.js'
	const QQMapWX = require('../../libs/qqMap/qqmap-wx-jssdk.js')
	var qqmapsdk = new QQMapWX({
	  key: 'WFFBZ-WNHK5-J6FIW-IKSHY-W2N6K-EVFAJ' // 腾讯位置服务里的KEY
	});
	export default {
		name:"StopInfo",
		data() {
			return {
			};
		},
		props: {
			fullStopName: {
				type: String,
				required: true
			},
			stopId: {
				type: Number,
				required: true
			},
			userLocation: {
				type: Object,
				required: false
			}
		},
		computed: {
			stopName() {
				return this.fullStopName.split('[')[0]
			},
			direction() {
				const seperated = this.fullStopName.split('[')
				if (seperated.length === 1) {
					return '-'
				} else {
					return seperated[1].slice(0, -1)
				}
			}
		},
		methods: {
			// 打卡
			async tickOff() {
				if (!this.userLocation || !this.userLocation.latitude || !this.userLocation.longitude) {
					uni.showToast({
						icon: 'error',
						title: '获取定位失败！'
					})
					return
				}
				const from = {
					latitude: this.userLocation.latitude,
					longitude: this.userLocation.longitude
				}
				const res = await getStopCoord(this.stopId)
				const to = [res.data]	// 此处注意to和from的格式不同
				console.log('站点定位', to)
				const showFailToast = (msg) => {
					uni.showToast({
						icon: 'error',
						title: msg
					})
				}
				// 计算直线距离
				qqmapsdk.calculateDistance({
					mode: 'straight',
					from,
					to,
					success:(res) => {
						console.log('calDistanceRes is: ', res)
						const dist = res.result.elements[0].distance
						if (dist <= 50) {
							tickOff(this.stopId).then((res) => {
								if (res.data.message == 'success') {
									uni.showToast({
										icon: 'success',
										title: '打卡成功！'
									})
								} else {
									showFailToast('打卡失败')
								}
							})
						} else {
							showFailToast('与站点距离过远')
						}
					},
					fail() {
						showFailToast('获取距离失败')
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.container {
		width: 100vw;
		padding-top: 5px;
		padding-bottom: 5px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: #fff;
		
		.busStop {
			height: 60px;
			padding-left: 30px;
			margin-bottom: 2px;
			
			.busPic {
				float: left;
				width: 60px;
				height: 60px;
				
				img {
					width: 100%;
					height: 100%;
				}
			}
			
			.busStop-right {
				float: left;
				display: flex;
				flex-direction: column;
				padding-left: 20px;
				
				.stopName {
					height: 40px;
					color: #5555ff;
					font-size: 20px;
					line-height: 40px;
				}
				
				.direction {
					height: 20px;
					font-size: 14px;
					color: #666;
					line-height: 20px;
				}
			}
		}
		
		.boxLine {
			width: 100%;
			height: 4px;
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: #17a820;
		}
		
		.buttons {
			display: flex;
			width: 100%;
			height: 38px;
			padding-bottom: 15px;
			align-content: space-around;
			
			button {
				font-size: 18px;
				background-color: #ffaa7f;
				color: #fff;
				line-height: 38px;
				text-align: center;
				word-wrap: break-word;
			}
		}
	}
</style>