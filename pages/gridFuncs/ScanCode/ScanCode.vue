<template>
	<view class="container">
		<view class="title">
			请选择支付方式
		</view>
		<view class="choose">
			<view class="choose-item"  @click="toWxPay">
				<view class="choose-item-upper">
					<image src="http://192.168.1.2:3000/images/others/wxPay.png" mode="aspectFit"></image>
					<view class="choose-item-text">
						微信支付
					</view>
				</view>
				<view class="choose-item-bottom">
					将跳转小程序
				</view>
			</view>
			<view class="choose-item"  @click="toAliPay">
				<view class="choose-item-upper">
					<image src="http://192.168.1.2:3000/images/others/alipay.png" mode="aspectFit"></image>
					<view class="choose-item-text">
						支付宝
					</view>					
				</view>
				<view class="choose-item-bottom">
					查看操作方法
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toWxPay() {
				wx.openEmbeddedMiniProgram({
					appId: 'wx624dc2cce62f7008'
				})
			},
			toAliPay() {
				uni.navigateTo({
					url: './AliPay/AliPay'
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		min-height: 100vh;
		width: 100%;
		padding-top: 20px;
		background-color: #eee;
		
		.title {
			width: 100%;
			font-size: 18px;
			text-align: center;
			color: #ed7d31;
		}
		
		.choose {
			width: 100%;
			margin-top: 10px;
			display: flex;
			justify-content: space-around;
			
			.choose-item {
				width: 30vw;
				display: flex;
				flex-direction: column;
				
				.choose-item-upper {
					width: 100%;
					height: 30vw;
					margin-left: auto;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					image {
						display: block;
						width: 80%;
						height: 80%;
						margin-bottom: 5px;
					}
				}
				
				.choose-item-bottom {
					width: 100%;
					height: 24px;
					margin-top: 10px;
					background-color: #20b2aa;
					color: #fff;
					line-height: 24px;
					border-radius: 12px;
					text-align: center;
				}
			}
			
		}
	}
</style>
