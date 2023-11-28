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
				<view class="tips-btn" @click="showTips = true">
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
				<view class="axis-item" :class="{'chosen': showChoose == index}" v-for="(stop, index) in upStops" :key="index"></view>
			</view>
			<view class="axis" v-show="direction">
				<view class="axis-item" :class="{'chosen': showChoose == index}" v-for="(stop, index) in downStops" :key="index"></view>
			</view>
			<view class="stops" v-show="!direction">
				<view class="stops-item" v-for="(stop, index) in upStops" :key="index">
					<view class="stops-item-stopName" :class="{'chosen': showChoose == index}" @click="handleClickStop(index)">
						{{ stop }}
					</view>
					<view class="stops-item-choose" v-if="showChoose == index">
						<!-- 这个地方不知道为什么用v-if就可以，用v-show一开始可以，后来又不行了 -->
						<view class="stops-item-choose-btn" @click="toStopMap(line.upStops[index])">
							查看地图
						</view>
						<view class="stops-item-choose-btn" @click="openSameStopLines(line.upStops[index])">
							同站线路
						</view>
					</view>
				</view>
			</view>
			<view class="stops" v-show="direction">
				<view class="stops-item" v-for="(stop, index) in downStops" :key="index">
					<view class="stops-item-stopName" :class="{'chosen': showChoose == index}" @click="handleClickStop(index)">
						{{ stop }}
					</view>
					<view class="stops-item-choose" v-if="showChoose == index">
						<view class="stops-item-choose-btn" @click="toStopMap(line.downStops[index])">
							查看地图
						</view>
						<view class="stops-item-choose-btn" @click="openSameStopLines(line.downStops[index])">
							同站线路
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 同站线路弹窗 -->
		<view class="mask" v-show="showSameStopLines" @click="showSameStopLines = false">
			<SameStopLines class="sameStopLines"
				:stopId="selectedStopId" 
				@close="showSameStopLines = false"

			>
			</SameStopLines>
		</view>
		<!-- 温馨提示弹窗 -->
		<view class="mask" v-show="showTips" @click="showTips = false">
			<view class="tips" @click.stop="">
				<view class="tips-title">
					温馨提示
				</view>
				<view class="tips-close" @click="showTips = false">
					<image src="@/static/images/close.png" mode="widthFix"></image>
				</view>
				<scroll-view class="tips-bottom" scroll-y="true">
					<view class="tips-item" v-for="(item, index) in line.tips" :key="index">
						{{ index + 1 }}.&nbsp;{{ item }}
					</view>
				</scroll-view>
		</view>
	</view>
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
				downStops: [],
				showChoose: -1,		// 显示选项的站点下标
				selectedStopId: 0,
				showSameStopLines: false,
				showTips: false
			};
		},
		computed: {
			dep() {
				return this.direction ? this.line.dest : this.line.dep
			},
			dest() {
				return this.direction ? this.line.dep : this.line.dest
			},
			lineNo() {
				if (this.line.lineNo[this.line.lineNo.length - 1] === '路') {
					return this.line.lineNo.slice(0, -1)
				} else if (this.line.lineNo.slice(-2) === '快线') {
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
				this.showChoose = -1
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
			},
			handleClickStop(index) {
				if (this.showChoose == index) {
					this.showChoose = -1
				} else {
					this.showChoose = index
				}
			},
			toStopMap(stopId) {
				uni.navigateTo({
					url: `/pages/gridFuncs/StopsMap/StopsMap?stopId=${stopId}`
				})
			},
			openSameStopLines(stopId) {
				this.selectedStopId = stopId
				this.showSameStopLines = true
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
					if (option.direction == 1) {
						this.changeDirection()
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
		}
	}
</script>

<style lang="less">
	.container {
		position: relative;
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
				
				.tips-btn {
					width: 40px;
					height: 85%;
					box-sizing: border-box;
					border-radius: 8px;
					border: 1px solid #888;
					text-align: center;
					line-height: 20px;
					font-size: 12px;
					text-decoration: underline;
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
				
				.chosen {
					height: 170rpx;
				}
			}
			
			.stops {
				width: 75%;
				height: 100%;
				box-sizing: border-box;
				padding-top: 30rpx;
				
				.stops-item {
					width: 100%;
					padding-left: 30rpx;
					
					.stops-item-stopName {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
					}
					
					.chosen {
						font-weight: 600;
					}
					
					.stops-item-choose {
						width: 100%;
						height: 100rpx;
						display: flex;
						align-items: center;
						
						.stops-item-choose-btn {
							margin-right: 30rpx;
							height: 90rpx;
							line-height: 90rpx;
							background-color: #ed7d31;
							color: #fff;
							padding-left: 20rpx;
							padding-right: 20rpx;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
		
		.mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(255, 255, 255, .7);
			z-index: 9999;
			
			.sameStopLines {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 1px solid #5555ff;
			}
			
			.tips {
				position: absolute;
				width: 300px;
				height: 300px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 1px solid #5555ff;
				border-radius: 20px;
				overflow: hidden;
				
				.tips-title {
					width: 100%;
					height: 50px;
					line-height: 50px;
					font-weight: 600;
					text-align: center;
					background-color: #5555ff;
					color: #fff;
				}
				
				.tips-close {
					position: absolute;
					right: 10px;
					top: 10px;
					width: 30px;
					height: 30px;
					
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				
				.tips-bottom {
					width: 100%;
					height: 250px;
					background-color: #fff;
					
					.tips-item {
						box-sizing: border-box;
						padding: 30rpx;
						width: 100%;
					}
				}
			}
		}
	}
</style>
