<template>
	<view class="container">
		<view class="mask" v-if="showMask">
			<view class="popup">
				<view class="popup-img">
					<image src="../../../static/images/qiandao.png" mode="aspectFit"></image>
				</view>
				<view class="popup-text">
					签到成功！积分+{{ addScore }}
				</view>
			</view>
			<view class="mask-close" @click="closeMask"></view>
		</view>
		<view class="info">
			<view class="info-item">
				<view class="info-item-inner">
					<view class="info-item-upper score" :style="{ '--score-font-size': scoreFontSize }">
						{{ curScore }}
					</view>
					<view class="info-item-lower">
						当前积分
					</view>
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-inner">
					<view class="info-item-upper days" :style="{ '--days-font-size': daysFontSize }">
						{{ days }}
					</view>
					<view class="info-item-lower">
						已签天数
					</view>
				</view>
			</view>
		</view>
		<view class="turnplate">
			<view class="spinBtn" :style="{'--btn-color': btnColor, '--spin-color': spinColor}" @click="handleSignIn">
			{{ trunplateText }}
			</view>
			<view class="wheel" :style="{'--degree': degree}">
				<view class="number" style="--i:1; --clr: #db7093"><text>1积分</text></view>
				<view class="number" style="--i:2; --clr: #20b2aa"><text>2积分</text></view>
				<view class="number" style="--i:3; --clr: #ff7f50"><text>3积分</text></view>
				<view class="number" style="--i:4; --clr: #4169e4"><text>4积分</text></view>
				<view class="number" style="--i:5; --clr: #3cb371"><text>5积分</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		signIn,
		getSigninInfo
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				curScore: 0,
				addScore: 0,
				days: 0,
				degree: -27,
				btnColor: '#000',
				trunplateText: '签到',
				spinColor: '#17a820',
				timer: undefined,
				signinStatus: false,
				showMask: false
			};
		},
		methods: {
			// 签到
			handleSignIn() {
				if (this.signinStatus) {
					uni.showToast({
						icon: 'none',
						title: '今天已经签过到啦，明天记得再来哟~'
					})
				} else {
					signIn().then(res => {
						if (res.data.code === 40001) {
							this.signinStatus = true
							uni.showToast({
								icon: 'none',
								title: '今天已经签过到啦，明天记得再来哟~'
							})
						} else {
							this.addScore = res.data.score
							this.signinStatus = true
							setTimeout(() => {
								this.curScore += res.data.score
								this.days++
								this.showMask = true
								this.spinColor = '#888'
								this.trunplateText = '已签'
							}, 3000)
							this.degree = 3600 - 27 - 72 * (res.data.score - 1)
							clearInterval(this.timer)
							this.btnColor = '#888'
						}
					})
				}
			},
			// 关闭签到成功遮罩层
			closeMask() {
				this.showMask = false
			}
		},
		computed: {
			scoreFontSize() {
				if (this.curScore < 1000) {
					return 34
				} else if (this.curScore >= 1000 && this.curScore < 10000) {
					return 24
				} else if (this.curScore >= 10000) {
					return 18
				}
			},
			daysFontSize() {
				if (this.days < 1000) {
					return 34
				} else if (this.days >= 1000 && this.days < 10000) {
					return 24
				} else if (this.days >= 10000) {
					return 18
				}
			}
		},
		onLoad() {
			getSigninInfo().then(res => {
				this.curScore = res.data.score
				this.days = res.data.days
				this.signinStatus = res.data.signinStatus
			}).catch(err => {
				uni.showToast({
					icon: 'error',
					title: '获取状态失败'
				})
			})
		},
		onReady() {
			// 签到按钮闪烁
			this.timer = setInterval(() => {
				if (!this.signinStatus) {
					if (this.btnColor === '#000') {
						this.btnColor = '#ffaa00'
					} else {
						this.btnColor = '#000'
					}
				} else {
					this.trunplateText = '已签'
					this.btnColor = '#888'
					this.spinColor = '#888'
				}
			}, 300)
		}
	}
</script>

<style lang="less">
	@keyframes moveBg {
		0% {
			background-position: 0% 50%
		}
		100% {
			background-position: 90% 50%
		}
	 }
	
	.container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-image: linear-gradient(125deg, #8fb3ff, #416aff, #8fb3ff, #416aff, #8fb3ff);
		background-size: 400%;
		animation: moveBg 6s linear infinite;
		
		.mask {
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100vw;
			height: 100vh;
			z-index: 9999;
			background-color: rgba(0, 0, 0, 0.8);
			
			.popup {
				width: 50vw;
				height: 15vh;
				background-color: #fff;
				border-radius: 10%;
				
				.popup-img {
					width: 100%;
					height: 9vh;
					margin-top: 1vh;
					
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				
				.popup-text {
					width: 100%;
					height: 4vh;
					line-height: 4vh;
					text-align: center;
				}
			}
			
			.mask-close {
				width: 5vh;
				height: 5vh;
				background-image: url('../../../static/images/close.png');
				background-size: contain;
				margin-top: 1vh;
			}
		}
		
		.info {
			position: absolute;
			display: flex;
			justify-content: center;
			top: 10px;
			left: 0;
			width: 100%;
			height: 100px;
			
			.info-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80px;
				height: 80px;
				margin-left: 10px;
				margin-right: 10px;
				background-image: radial-gradient(#f7ffbc 25%, #edaa00);
				border-radius: 10px;
				
				.info-item-inner {
					position: relative;
					width: 83%;
					height: 83%;
					border: 2px solid #ffff00;
					border-radius: 10px;
					color: #416aff;
					
					.info-item-upper {
						position: absolute;
						top: 8px;
						width: 100%;
						height: 34px;
						line-height: 34px;
						text-align: center;
						font-weight: 800;
					}
					
					.score {
						font-size: calc(1px * var(--score-font-size));
					}
					
					.days {
						font-size: calc(1px * var(--days-font-size));
					}
					
					.info-item-lower {
						position: absolute;
						bottom: 4px;
						width: 100%;
						text-align: center;
						font-size: 14px;
					}
				}
			}
		}
		
		.turnplate {
			position: relative;
			width: 300px;
			height: 300px;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.spinBtn {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 60px;
				height: 60px;
				background-color: #fff;
				border-radius: 50%;
				z-index: 10;
				text-align: center;
				font-size: 1.2em;
				font-family: 'Poppins', sans-serif;
				font-weight: 600;
				color: var(--spin-color);
				border: 4px solid var(--btn-color);
				
				&::before {
					content: '';
					position: absolute;
					top: -28px;
					width: 20px;
					height: 30px;
					background-color: #fff;
					clip-path: polygon(50% 0%,21% 100%,78% 100%);
				}
			}
			
			.wheel {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #333;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: 0 0 0 5px #333, 0 0 0 15px #ffaa00, 0 0 0 18px #111;
				transform: rotate(calc(1deg * var(--degree)));
				transition: transform 3s ease-in-out;
				
				.number {
					position: absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 50%;
					height: 50%;
					background: var(--clr);
					transform-origin: bottom right; 
					transform: rotate(calc(72deg * var(--i)));
					clip-path: polygon(0 0, 84% 0, 100% 100%, 0 84%);
					
					text {
						position: absolute;
						right: 25%;
						transform: translateY(20%) rotate(45deg);
						text-align: center;
						font-size: 1.4em;
						font-weight: 700;
						color: #fff;
						text-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);
					}
				}
			}
		}
	}
</style>