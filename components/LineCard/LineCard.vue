<template>
	<view>
		<view class="container">
			<view class="lineNo" :class="{
				'express': lineInfo.tag == 'express',
				'normal': lineInfo.tag == 'normal',
				'micro': lineInfo.tag == 'micro',
				'raoping': lineInfo.tag == 'Raoping',
				'intercity': lineInfo.tag == 'intercity',
				'travel': lineInfo.tag == 'travel',
				'temp': lineInfo.tag == 'temp',
				'other': lineInfo.tag == 'other'
			}">
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
				<img src="../../static/images/K4byd.jpg" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: { lineInfo: Object },
		computed: {
			// 微信小程序不支持这种形式绑定class
			// tagClassObj() {
			// 	return {
			// 		'express': this.lineInfo.tag == 'express',
			// 		'normal': this.lineInfo.tag == 'normal',
			// 		'micro': this.lineInfo.tag == 'micro',
			// 		'raoping': this.lineInfo.tag == 'Raoping',
			// 		'intercity': this.lineInfo.tag == 'intercity',
			// 		'travel': this.lineInfo.tag == 'travel',
			// 		'temp': this.lineInfo.tag == 'temp',
			// 		'other': this.lineInfo.tag == 'other'
			// 	}
			// }
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
		
		.lineNo {
			float: left;
			height: 100%;
			width: 100px;
			
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
		
		.express {
			background-image: linear-gradient(to right, #c387ff , 90%, #fff);
			// background-color: #c387ff;
		}
		
		.normal {
			background-image: linear-gradient(to right, #ffaa7f , 90%, #fff);
			// background-color: #ffaa7f;
		}
		
		.micro {
			background-image: linear-gradient(to right, #aaaa5a , 90%, #fff);
			// background-color: #aaaa5a;
		}
		
		.rural {
			background-image: linear-gradient(to right, #67aa67 , 90%, #fff);
			// background-color: #67aa67;
		}
		
		.raoping {
			background-image: linear-gradient(to right, #5f94ff , 90%, #fff);
			// background-color: #5f94ff;
		}
		
		.intercity {
			background-image: linear-gradient(to right, #ff87a7 , 90%, #fff);
			// background-color: #ff87a7;
		}
		
		.travel {
			background-image: linear-gradient(to right, #ff0000 , 90%, #fff);
			// background-color: #ff0000;
		}
		
		.temp {
			background-image: linear-gradient(to right, #ffff87 , 90%, #fff);
			// background-color: #ffff87;
			color: #000;
		}
		
		.other {
			background-image: linear-gradient(to right, #888 , 90%, #fff);
			// background-color: #888;
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
			background-color: #aa55ff;
			line-height: 80px;
			text-align: center;
			color: #fff;
			
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>