<template>
	<view class="container">
		<view class="mainInfo">
			<view class="electric-disp">
				<view class="electric-disp-left">
					<view class="electric-disp-text" 
						:style="{
							'text-align': leftTa, 
							'left': leftScroll ? posLeft : '0',
							'--scroll-time': scrollTime
						}"
					>
						{{ dep }}
					</view>
				</view>
				<view class="electric-disp-mid">
					<view class="electric-disp-mid-text" 
						:style="{ 
							'--font-size': fontSize, 
							'--line-height': lineHeight 
						}"
					>
						{{ lineNo }}
					</view>
				</view>
				<view class="electric-disp-right">
					<view class="electric-disp-text" 
						:style="{
							'text-align': rightTa, 
							'left': rightScroll ? posLeft : '0',
							'--scroll-time': scrollTime
						}"
					>
						{{ dest }}
					</view>
				</view>
			</view>
			<view class="information">
				<view class="information-left">
					<view class="serviceTime">
						首班{{ startTime }}&nbsp;&nbsp;末班{{ endTime }}
					</view>
					<view class="price">
						票价：{{ line.price }}元
					</view>
				</view>
				<view class="tips">
					温馨<br/>提示
				</view>
				<view class="information-right">
					<view class="exchange" @click="changeDirection">
						<image src="@/static/images/exchange.png" mode="aspectFit"></image>
						<view class="exchange-text">
							换向
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="stopList" scroll-y="true" enable-flex="true">
			<view class="axis" v-show="!direction">
				<view class="axis-item" v-for="(stop, index) in upStops" :key="index"></view>
			</view>
			<view class="axis" v-show="direction">
				<view class="axis-item" v-for="(stop, index) in downStops" :key="index"></view>
			</view>
			<view class="stops" v-show="!direction">
				<view class="stops-item" v-for="(stop, index) in upStops" :key="index">
					{{ stop }}
				</view>
			</view>
			<view class="stops" v-show="direction">
				<view class="stops-item" v-for="(stop, index) in downStops" :key="index">
					{{ stop }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getDetail, getStopName } from "@/api/lines.js"
	export default {
		data() {
			return {
				line: {},
				direction: 0,		// 0上行，1下行
				posLeft: '0',
				posLeftStart: '0',
				scrollTime: '0',	// 滚动时间
				timer: null		,		// 滚动定时器
				upStops: [],			// 上下行站点名称
				downStops: []
			};
		},
		computed: {
			dep() {
				return this.direction ? this.line.to : this.line.from
			},
			dest() {
				return this.direction ? this.line.from : this.line.to
			},
			lineNo() {
				if (this.line.lineNo[this.line.lineNo.length - 1] === '路') {
					return this.line.lineNo.slice(0, -1)
				} else if (this.line.lineNo[this.line.lineNo.length - 1] === '快线') {
					return this.line.lineNo.slice(0, -2)
				} else {
					return this.line.lineNo
				}
			},
			fontSize() {
				let ret = ''
				const small = 100 * 0.22 / 4 - 1
				if (this.lineNo.length <= 4) {
					let allNumber = true
					for (const ch of this.lineNo) {
						if ((ch.charCodeAt() < '0'.charCodeAt() || ch.charCodeAt() > '9'.charCodeAt()) && (ch.charCodeAt() < 'A'.charCodeAt() || ch.charCodeAt() > 'Z'.charCodeAt())) {
							allNumber = false
							break
						}
					}
					ret = allNumber ? '10vw' : '7vw'
				} else {
					ret = small + 'vw'
				}
				return ret
			},
			lineHeight() {
				return parseInt(this.fontSize) < 5 ? '25px' : '50px'
			},
			// 左侧文字对齐方式
			leftTa() {
				return this.dep.length <= 5 ? 'center' :'left'
			},
			// 右侧文字对齐方式
			rightTa() {
				return this.dest.length <= 5 ? 'center' :'left'
			},
			// 左侧是否滚动
			leftScroll() {
				return this.dep.length > 5
			},
			// 右侧是否滚动
			rightScroll() {
				return this.dest.length > 5
			},
			startTime() {
				return this.direction ? this.line.downStartTime : this.line.upStartTime
			},
			endTime() {
				return this.direction ? this.line.downEndTime : this.line.upEndTime
			}
		},
		methods: {
			// 计算滚动
			calScroll() {
				if (this.leftScroll * this.rightScroll === 0) {		// 如果只有一边滚动
					let len = this.leftScroll ? this.dep.length : this.dest.length
					this.posLeftStart = '39vw'
					this.posLeft = `-${39 + (len - 5) * 8}vw`
					this.scrollTime = `${len + 5}s`
				} else if (this.leftScroll && this.rightScroll) {	// 如果两边都滚
					let len = Math.max(this.dep.length, this.dest.length)
					this.posLeftStart = '39vw'
					this.posLeft = `-${39 + (len - 5) * 8}vw`
					this.scrollTime = `${len + 5}s`
				} else {
					this.posLeft = '0'
					this.posLeftStart = '0'
					this.scrollTime = '0'
				}
			},
			// 换向
			changeDirection() {
				this.direction = !this.direction
				clearInterval(this.timer)		// 清除滚动定时器
				// 滚动的字体先归为到起始位置
				let tempScrollTime = this.scrollTime
				this.scrollTime = '0s'
				let temp = this.posLeft
				this.posLeft = '0'
				setTimeout(() => {
					this.scrollTime = tempScrollTime
					this.posLeft = temp
					this.startScroll()
				}, 100)
			},
			// 开始滚动，从满屏文字开始滚动
			startScroll() {
				const intervalTime = parseInt(this.scrollTime) * 1000
				this.timer = setInterval(() => {
					let tempScrollTime = this.scrollTime
					this.scrollTime = '0s'
					let temp = this.posLeft
					this.posLeft = this.posLeftStart
					this.posLeftStart = temp
					setTimeout(() => {
						this.scrollTime = tempScrollTime
						let temp = this.posLeft
						this.posLeft = this.posLeftStart
						this.posLeftStart = temp
					}, 100)
				}, intervalTime)
			}
		},
		onLoad(option) {
			getDetail(option.id).then(res => {
				if (res.data.code === 200) {
					this.line = res.data.line
					getStopName(this.line.upStops.join(',')).then(res => {
						this.upStops = res.data.stopName.map(val => {
							let index = val.indexOf('[')
							if (index !== -1) {
								return val.slice(0, index)
							} else {
								return val
							}
						})
					})
					getStopName(this.line.downStops.join(',')).then(res => {
						this.downStops = res.data.stopName.map(val => {
							let index = val.indexOf('[')
							if (index !== -1) {
								return val.slice(0, index)
							} else {
								return val
							}
						})
					})
					this.calScroll()
					if (this.leftScroll || this.rightScroll) {
						this.startScroll()
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '获取线路详情失败'
					})
				}
			})
			uni.loadFontFace({
				global: false,
				family: 'dianzhen',
				source: 'http://192.168.1.2:3000/font/unifont-15.0.06.ttf'
			})
		},
		onReady() {
			const query = uni.createSelectorQuery()
			query.selectAll('.electric-disp-text').fields({
				size: true,
			}).exec(res => {
				console.log(res)
			})
		}
	}
</script>

<style lang="less">
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: linear-gradient(#2e75b6 400rpx, 700rpx, #eee 1100rpx);
		
		.mainInfo {
			width: 100%;
			height: 110px;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.electric-disp {
				width: 100%;
				height: 50px;
				background-color: #000;
				display: flex;
				font-family: 'dianzhen';
				
				.electric-disp-left,
				.electric-disp-right {
					width: 39%;
					height: 100%;
					position: relative;
					overflow: hidden;
					
					.electric-disp-text {
						min-width: 100%;
						position: absolute;
						height: 100%;
						font-size: 58rpx;
						line-height: 50px;
						color: #ffaa00;
						white-space: nowrap;
						transition: all var(--scroll-time) linear;
					}
				}
				
				.electric-disp-mid {
					width: 22%;
					height: 100%;
					
					.electric-disp-mid-text {
						width: 100%;
						height: 100%;
						font-size: var(--font-size);
						line-height: var(--line-height);
						font-weight: 600;
						color: #ff0000;
						text-align: center;
						word-break: break-all;
						font-family: '微软雅黑';
					}
				}
			}
			
			.information {
				width: 90%;
				height: 50px;
				margin-top: 10px;
				display: flex;
				align-items: center;
				background-color: #fff;
				border-radius: 10px;
				color: #2e75b6;
				
				.information-left {
					width: 74%;
					height: 100%;
					box-sizing: border-box;
					padding-left: 30rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 12px;
					line-height: 25px;
					
					.serviceTime {
						width: 100%;
						height: 50%;
					}
					
					.price {
						width: 100%;
						height: 50%;
					}
				}
				
				.tips {
					width: 40px;
					height: 85%;
					box-sizing: border-box;
					border-radius: 8px;
					border: 1px solid #888;
					text-align: center;
					line-height: 20px;
					font-size: 12px;
				}
				
				.information-right {
					width: 14%;
					height: 100%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					
					.exchange {
						height: 100%;
						width: 60%;
						
						image {
							display: block;
							height: 60%;
							width: 100%;
						}
						
						.exchange-text {
							height: 40%;
							line-height: 20px;
							text-align: center;
							font-size: 12px;
						}
					}
				}
			}
		}
		
		.stopList {
			width: 90%;
			height: calc((100vh - 100px) * 0.9);
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			
			.axis {
				width: 25%;
				height: 100%;
				box-sizing: border-box;
				padding-top: 65rpx;
				
				.axis-item {
					width: 100%;
					height: 70rpx;
					border-right: 8rpx solid #ed7d31;
					position: relative;
					
					&:last-child {
						border-right: none;
					}
					
					&::after {
						position: absolute;
						right: -18rpx;
						top: -14rpx;
						content: '';
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						border: 4rpx solid #2e75b6;
						background-color: #fff;
					}
					
					&:first-child::after,
					&:last-child::after{
						border: 4rpx solid #17a820;
					}
				}
			}
			
			.stops {
				width: 75%;
				height: 100%;
				box-sizing: border-box;
				padding-top: 30rpx;
				
				.stops-item {
					width: 100%;
					height: 70rpx;
					padding-left: 30rpx;
					line-height: 70rpx;
				}
			}
		}
	}
</style>
