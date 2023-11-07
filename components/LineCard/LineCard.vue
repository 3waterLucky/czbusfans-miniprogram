<template>
	<view>
		<view class="container"  :style="{ '--clr': color }">
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
			<view class="carImg">
				<image :src="lineInfo.photo" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: { lineInfo: Object },
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
		}
	}
</script>

<style lang="less">
	.container {
		position: relative;
		height: 80px;
		width: 95vw;
		border-radius: 10px;
		background-color: #fff;
		overflow: hidden;
		box-shadow: -4px 4px 2px #bbb;
		var: --clr;
		
		.lineNo {
			float: left;
			height: 100%;
			width: 100px;
			background-image: linear-gradient(to right, var(--clr) , 90%, #fff);
			
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
					background-color: #fff;
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
		}
		
		.carImg {
			float: right;
			height: 100%;
			width: 80px;
			line-height: 80px;
			text-align: center;
			color: #fff;
			border-left: 6px dotted var(--clr);
			
			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>