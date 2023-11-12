<template>
	<view>
		<view class="container" :style="{ '--clr': color, '--deg': deg }" @click="couponMove">
			<view class="lineNo">
				<view class="lineNo-inner">
					<view class="circle"></view>
					<view class="lineNo-text">
						{{ lineInfo.lineNo }}
					</view>
				</view>
			</view>
			<view class="dest">
				<view class="from">
					{{ lineInfo.from }}
				</view>
				<view class="arrow">
					<uni-icons custom-prefix="iconfont" type="icon-shangxiajiantou" size="16"></uni-icons>
				</view>
				<view class="to">
					{{ lineInfo.to }}
				</view>
			</view>
			<view class="carImg" :style="{'--trans-time': transTime}">
				<image :src="lineInfo.squarePhoto" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: { 
			lineInfo: Object,
			transTime: String
		},
		data() {
			return {
				deg: 0
			}
		},
		computed: {
			color() {
				let ret = ''
				switch(this.lineInfo.tag) {
					case 'express':
						ret = '#c387ff'
						break
					case 'normal':
						ret = '#ffaa7f'
						break
					case 'micro':
						ret = '#aaaa5a'
						break
					case 'Raoping':
						ret = '#5f94ff'
						break
					case 'intercity':
						ret = '#ff87a7'
						break
					case 'travel':
						ret = '#ff0000'
						break
					case 'temp':
						ret = '#ffff87'
						break
					case 'other':
						ret = '#888'
						break
				}
				return ret
			}
		},
		methods: {
			couponMove() {
				this.deg = '10deg'
				setTimeout(() => {
					this.deg = '0'
				}, 1000)
			}
		}
	}
</script>

<style lang="less">
	.container {
		position: relative;
		height: 80px;
		width: 95vw;
		border-radius: 10px;
		background-color: #ddd;
		box-shadow: -4px 4px 2px #bbb;
		var: --clr;
		
		&::before {
			content: '';
			width: 30px;
			height: 15px;
			border-radius: 0 0 15px 15px;
			position: absolute;
			background-color: #ddd;
			z-index: 9998;
			left: 85px;
			top: 0;
		}
		
		&::after {
			content: '';
			width: 30px;
			height: 15px;
			border-radius: 15px 15px 0 0;
			position: absolute;
			background-color: #ddd;
			z-index: 9998;
			left: 85px;
			bottom: 0;
		}
		
		.lineNo {
			float: left;
			height: 100%;
			width: 100px;
			background-image: linear-gradient(to right, var(--clr) , 90%, #fff);
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			
			.lineNo-inner {
				position: relative;
				float: left;
				height: 100%;
				width: 80px;
				text-align: center;
				color: #fff;
				
				.lineNo-text {
					position: absolute;
					top: 40px;
					width: 100%;
					padding: 5px;
					transform: translateY(-50%);
					text-align: center;
					font-size: 18px;
					font-weight: 600;
					word-wrap: break-word;
				}
				
				.circle {
					position: absolute;
					top: 5px;
					left: 5px;
					width: 10px;
					height: 10px;
					border-radius: 5px;
					box-shadow: inset -3px -3px 1px #666;
					background-color: #ddd;
				}
			}
		}

		.dest {
			position: absolute;
			right: 80px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: calc(95vw - 180px);
			font-size: 16px;
			background-image: radial-gradient(circle at right, #ddd 4px, white 0);
			background-position: 100% 19%;
			background-size: 100% 12px;
			background-repeat: repeat;
		}
		
		.carImg {
			float: right;
			height: 100%;
			width: 80px;
			line-height: 80px;
			text-align: center;
			color: #fff;
			background-color: #bbb;
			transform: rotate(var(--deg));
			transform-origin: left bottom;
			transition: transform var(--trans-time) ease-in;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			overflow: hidden;
			
			image {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;
				
				&::before {
					position: absolute;
					left: 0;
					right: 0;
					content: '';
					width: 100%;
					height: 100%;
					z-index: 9999;
					background-image: radial-gradient(circle at left, #ddd 4px, transparent 0);
					background-position: 100% 19%;
					background-size: 100% 12px;
					background-repeat: repeat;
				}
			}
		}
	}
</style>