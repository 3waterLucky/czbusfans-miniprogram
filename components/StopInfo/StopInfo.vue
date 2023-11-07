<template>
	<view class="container">
		<view class="busStop">
			<view class="busPic">
				<img class="busPic-img" src="../../static/images/BusStop.png" alt="">
			</view>
			<view class="busStop-right">
				<view class="stopName">
					{{ stopName }}
				</view>
				<view class="busStop-right-lower">
					<view class="direction">
						方向：{{ direction }}
					</view>
					<view class="tickOffTimes">
						打卡次数：{{ tickOffTimes }}
					</view>
				</view>
			</view>
		</view>
		<view class="boxLine"></view>
		<view class="buttons">
			<button class="buttons-item passbyLines">本站线路</button>
			<button class="buttons-item tickOff" @click="tickOff">
				打卡
			</button>
			<button class="buttons-item stopPic">站点图片</button>
		</view>
	</view>
		
</template>

<script>
	import { getStopCoord, tickOff } from '../../api/map.js'
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
			tickOffTimes: {
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
			},
		},
		methods: {
			// 打卡
			tickOff() {
				uni.showLoading({
					title: '打卡中',
					mask: true
				})
				const showFailToast = (msg) => {
					uni.showToast({
						icon: 'error',
						title: msg
					})
				}
				// 获取当前用户定位
				this.$store.dispatch('getUserLocation').then(async() => {
					const from = {
						latitude: this.userLocation.latitude,
						longitude: this.userLocation.longitude
					}
					try {
						const res = await tickOff(from, this.stopId)
						if (res.data.message == 'success') {
							uni.hideLoading()
							this.$emit('tickOffSuccess')
							uni.showToast({
								icon: 'success',
								title: '打卡成功！'
							})
						} else {
							uni.hideLoading()
							showFailToast(res.data.message)
						}
					} catch(err) {
						uni.hideLoading()
						showFailToast('打卡失败')
						return
					}
				}, err => {
					uni.hideLoading()
					showFailToast('获取定位失败')
				})
			},
		},
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
			padding-left: 10px;
			margin-bottom: 2px;
			
			.busPic {
				float: left;
				width: 60px;
				height: 60px;
				
				.busPic-img {
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
				
				.busStop-right-lower {
					width: calc(100vw - 110px);
					
					.direction {
						float: left;
						height: 20px;
						font-size: 14px;
						color: #666;
						line-height: 20px;
					}
					
					.tickOffTimes {
						float: right;
						height: 20px;
						// padding-right: 20px;
						font-size: 14px;
						color: #666;
						line-height: 20px;
					}
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
			
			.buttons-item  {
				font-size: 18px;
				width: 28vw;
				background-color: #ffaa7f;
				color: #fff;
				line-height: 38px;
				text-align: center;
				word-wrap: break-word;
			}
		}
	}
</style>