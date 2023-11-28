<template>
	<view class="container"  @touchend="endScroll" @touchcancel="endScroll">
		<view class="main">
			<view class="detail" 
				:style="{ 
					'--bgs': bgs, 
					'--bgs-duration': bgsDuration,
					'--bgs-delay': bgsDelay,
					'--bgp-brand': bgpBrand, 
					'--bgp-fulltype': bgpFullType,
					'--brand-left': brandLeft,
					'--fulltype-right': fulltypeRight,
					'--brand-left-duration': brandLeftDuration,
					'--brand-left-delay': brandLeftDelay,
					'--fulltype-right-duration': fulltypeRightDuration
				}"
			>
				<view class="brand">
					{{ typeList[curIndex].brand }}
				</view>
				<view class="fullType">
					{{ typeList[curIndex].fullType }}
				</view>
				<view class="args" :style="{ '--trans-x': argsTransX, '--trans-time': argsTransTime, '--delay': argsDelay }">
					<view class="args-item">
						购入年份：{{ typeList[curIndex].buyYear }}
					</view>
					<view class="args-item">
						动力类型：{{ typeList[curIndex].fuel }}
					</view>
					<view class="args-item">
						所属公司：{{ typeList[curIndex].company }}
					</view>
					<view class="args-item">
						保有数量：{{ typeList[curIndex].num }}
					</view>
					<view class="args-item">
						<text style="display: inline;">运营状态：</text>
						<text style="display: inline;" :style="{ 'color': typeList[curIndex].isRetired ? '#f00' : '#4991ba' }">{{ typeList[curIndex].isRetired ? '已退役' : '服役中' }}</text>
					</view>
				</view>
			</view>
			<view class="photo" :style="{ '--img-trans': imgTrans, '--img-duartion': imgDuration }">
				<image :src="'http://192.168.1.2:3000/images/bus/origin/' + typeList[curIndex].img" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="selector" @touchstart="startScroll" @touchmove="scrolling" @touchend="endScroll" @touchcancel="cancelScroll">
			<view class="selector-left">
				<view class="card" 
					v-for="(item, index) in leftList" 
					:style="{ '--size': Math.pow(0.9, leftList.length - 1 - index) }"
					@tap="toIndexLeft(index)"
				>
					<view class="mask"></view>
					<image :src="'http://192.168.1.2:3000/images/bus/43/' + item.img" mode="aspectFill"></image>
				</view>
			</view>
			<view class="selector-scroll">
				<image :src="'http://192.168.1.2:3000/images/bus/43/' + typeList[curIndex].img" mode="scaleToFill"></image>
			</view>
			<view class="selector-right">
				<view class="card" 
					v-for="(item, index) in rightList" 
					:style="{ '--size': Math.pow(0.9, index) }"
					@tap="toIndexRight(index)"
				>
					<view class="mask"></view>
					<image :src="'http://192.168.1.2:3000/images/bus/43/' + item.img" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getBusList } from '@/api/bus.js'
	
	export default {
		data() {
			return {
				typeList: [],
				curIndex: 0,
				startPos: 0,
				curPos: 0,
				touchStartTime: null,
				isMoving: false,
				argsTransX: '36vw',
				argsTransTime: '0',
				argsDelay: '0.2s',
				imgTrans: 'translate(9vw,26vh) scale(0)',
				imgDuration: '0.5s',
				bgs: '0',
				bgsDuration: '0',
				bgsDelay: '0',
				bgpBrand: 'left',
				bgpFullType: 'right',
				brandLeft: '-40vw',
				fulltypeRight: '-65vw',
				brandLeftDuration: '0',
				brandLeftDelay: '0',
				fulltypeRightDuration: '0'
			};
		},
		methods: {
			// 控制左右滑动
			startScroll(e) {
				if (!this.isMoving) {
					console.log('start ', e.changedTouches[0].clientX);
					this.startPos = e.changedTouches[0].clientX
					this.curPos = e.changedTouches[0].clientX
					this.touchStartTime = e.timeStamp
					this.isMoving = true
				}
			},
			scrolling(e) {
				if (e.timeStamp - this.touchStartTime < 50) {
					return
				}
				this.touchStartTime = e.timeStamp
				console.log('move ', e.changedTouches[0].clientX);
				// 当滑动导致下标变化时，再做如下动作
				if (this.moveIndex !== 0) {
					this.startPos = this.curPos
					this.hideInfo()
				}
				this.curPos = e.changedTouches[0].clientX
			},
			endScroll(e) {
				if (this.isMoving) {
					this.touchStartTime = null
					console.log('end ', e.changedTouches[0].clientX);
					this.curPos = e.changedTouches[0].clientX
					this.showInfo()
					this.isMoving = false
				}
			},
			cancelScroll() {
				console.log('cancel')
				if (this.isMoving) {
					this.touchStartTime = null
					this.curPos = e.changedTouches[0].clientX
					this.showInfo()
					this.isMoving = false
				}
			},
			// 隐藏信息
			hideInfo() {
				this.argsTransX = '36vw'
				this.argsTransTime = '0'
				this.argsDelay = '0'
				this.imgTrans = 'translate(9vw,26vh) scale(0)'
				this.imgDuration = '0'
				this.brandLeft = '-40vw',
				this.fulltypeRight = '-65vw'
				this.brandLeftDuration = '0'
				this.brandLeftDelay = '0'
				this.fulltypeRightDuration = '0'
				this.bgs = '0'
				this.bgsDuration = '0'
				this.bgsDelay = '0'
			},
			// 显示信息
			showInfo() {
				this.argsTransX = '0'
				this.argsTransTime = '0.3s'
				this.argsDelay = '0.1s'
				this.imgTrans = 'translate(0, 0) scale(1)'
				this.imgDuration = '0.5s'
				this.brandLeft = '8vw',
				this.fulltypeRight = '38vw'
				this.brandLeftDuration = '0.5s'
				this.brandLeftDelay = '0.3s'
				this.fulltypeRightDuration = '0.8s'
				this.bgs = '100%'
				this.bgsDuration = '0.5s'
				this.bgsDelay = '0.8s'
			},
			// 切换下标时，先使全部信息隐藏，再重新动画显示
			reshowInfo() {
				this.hideInfo()
				setTimeout(() => {
					this.showInfo()
				}, 50)
			},
			// 点击左右侧小卡片时跳转
			toIndexLeft(index) {
				this.curIndex -= this.leftList.length - index
				this.reshowInfo()
			},
			toIndexRight(index) {
				this.curIndex += index + 1
				this.reshowInfo()
			}
		},
		computed: {
			moveIndex() {
				let dist = (this.curPos - this.startPos) / 50
				return dist < 0 ? -Math.ceil(dist) : -Math.floor(dist)
			},
			showIndex() {
				let ret = this.curIndex + this.moveIndex
				if (ret >= this.typeList.length) {
					ret = this.typeList.length - 1
				} else if (ret < 0) {
					ret = 0
				}
				this.curIndex = ret
				return ret
			},
			leftList() {
				return this.typeList.slice(Math.max(0, this.showIndex - 5), this.showIndex)
			},
			rightList() {
				return this.typeList.slice(this.showIndex + 1, this.showIndex + 6)
			}
		},
		onLoad() {
			getBusList().then(res => {
				this.typeList = res.data.typeList
			})
		},
		onReady() {
			this.showInfo()
		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: 100vh;
		position: relative;
		background-color: #000;
		overflow: hidden;
		
		.main {
			position: absolute;
			top: 8vh;
			width: 100%;
			height: 55vh;
			overflow: hidden;
			
			.detail {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				
				.underline {
					position: absolute;
					display: inline-block;
					color: #fff7c5;
					background: linear-gradient(to right, #ff5f57, #28c840) no-repeat;
					background-size: var(--bgs) 2px;
					transition: background-size var(--bgs-duration) var(--bgs-delay), left var(--brand-left-duration) var(--brand-left-delay), right var(--fulltype-right-duration);
				}
				
				.brand {
					.underline();
					left: var(--brand-left);
					top: 5vh;
					font-size: 60rpx;
					font-weight: 600;
					background-position: var(--bgp-brand) bottom;
				}
				
				.fullType {
					.underline();
					right: var(--fulltype-right);
					top: 14vh;
					font-size: 37rpx;
					font-style: italic;
					background-position: var(--bgp-fulltype) bottom;
				}
				
				.args {
					width: 37vw;
					position: absolute;
					right: 0;
					bottom: 30vw;
					z-index: 9999;
					overflow: hidden;
					
					.args-item {
						box-sizing: border-box;
						width: 37vw;
						height: 50rpx;
						background-color: rgba(255, 223, 197, 0.8);
						margin-bottom: 10px;
						padding-left: 10px;
						line-height: 50rpx;
						color: #4991ba;
						font-size: 27rpx;
						translate: var(--trans-x) 0;
						border-top-left-radius: 15px;
						border-bottom-left-radius: 15px;
						box-shadow: -1px 2px 2px rgba(255, 255, 255, .7);
						transition: translate var(--trans-time) ease-in;
						
						each(range(5), {
							&:nth-child(@{value}) {
								transition-delay: calc((@value - 1) * var(--delay));
							}
						});
					}
				}
			}
			
			.photo {
				width: 75vw;
				height: 50vw;
				border-radius: 20px;
				position: absolute;
				left: 2vw;
				bottom: 0;
				box-shadow: 0 0 6px 2px rgba(255, 255, 255, .7);
				transform: var(--img-trans);
				transition: all var(--img-duartion) ease-in;
				
				image {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 20px;
				}
			}
		}
		
		.selector {
			position: absolute;
			bottom: 8vh;
			width: 100%;
			height: 20vh;
			display: flex;
			justify-content: center;
			transform-style: preserve-3d;
			background-color: rgba(255, 255, 255, .1);
			
			.selector-left,
			.selector-right {
				width: 250rpx;
				height: 100%;
				flex-shrink: 0;
				display: flex;
				align-items: flex-end;
				transform-style: preserve-3d;
				
				.card {
					width: 50rpx;
					height: 60%;
					transform: scaleY(var(--size))  translateZ(calc(var(--size) * 50px));
					position: relative;
					overflow: hidden;
					
					.mask {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, .5);
					}
					
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.selector-left {
				justify-content: flex-end;
				
				.card {
					border-top-left-radius: 6rpx;
					border-bottom-left-radius: 6rpx;
					box-shadow: -1px 2px 3px 1px rgba(255, 255, 255, .7);
				}
			}
			
			.selector-right {
				justify-content: flex-start;
				
				.card {
					border-top-right-radius: 6rpx;
					border-bottom-right-radius: 6rpx;
					box-shadow: 1px 2px 3px 1px rgba(255, 255, 255, .7);
				}
			}
			
			.selector-scroll {
				width: 15vh;
				height: 20vh;
				border: 1px solid #fff;
				line-height: 20vh;
				text-align: center;
				flex-shrink: 0;
				border-radius: 6rpx;
				overflow: hidden;
				transform: translateZ(650px);
				box-shadow: 0 0 10px 3px rgba(255, 255, 255, .7);
				
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
