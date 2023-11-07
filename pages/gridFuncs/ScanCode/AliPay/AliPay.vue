<template>
	<view class="container">
		<swiper class="swiper" :vertical="true">
			<swiper-item class="swiper-item">
				<uni-section class="step" type="line" title="Step 1" titleFontSize="18px" titleColor="#1778FF"></uni-section>
				<view class="text">
					进入支付宝首页<br/>点击上方菜单中的“出行”
				</view>
				<image class="img" src="http://192.168.1.2:3000/images/alipay/1.png" mode="widthFix">
				<canvas class="arrow" style="width: 30px; height: 80px;" canvas-id="arrow"></canvas>
			</swiper-item>
			<swiper-item class="swiper-item">
				<uni-section class="step" type="line" title="Step 2" titleFontSize="18px" titleColor="#1778FF"></uni-section>
				<view class="text">
					确保城市选择为“潮州”<br/>点击下方“前往领取”
				</view>
				<image class="img" src="http://192.168.1.2:3000/images/alipay/2.png" mode="widthFix">
				<view class="arrow"></view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<uni-section class="step" type="line" title="Step 3" titleFontSize="18px" titleColor="#1778FF"></uni-section>
				<view class="text">
					勾选同意协议<br/>点击“同意协议并领卡”<br/>输入支付密码
				</view>
				<image class="img" src="http://192.168.1.2:3000/images/alipay/3.png" mode="widthFix">
				<view class="arrow"></view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<uni-section class="step" type="line" title="Step 4" titleFontSize="18px" titleColor="#1778FF"></uni-section>
				<view class="text">
					开通完成<br/>再次从首页进入“出行”时就会出现乘车码
				</view>
				<image class="img" src="http://192.168.1.2:3000/images/alipay/4.png" mode="widthFix">
				<view class="arrow"></view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<uni-section class="step" type="line" title="Step 5" titleFontSize="18px" titleColor="#1778FF"></uni-section>
				<view class="text">
					乘坐分段收费线路时<br/>请先向驾驶员告知目的地<br/>由驾驶员在键盘上调整价格后<br/>再进行刷码
				</view>
				<image class="img" src="http://192.168.1.2:3000/images/alipay/5.jpg" mode="widthFix">
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onReady() {
			const ctx = uni.createCanvasContext('arrow')
			console.log(ctx);
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(15, 12)
			ctx.lineTo(30, 0)
			ctx.lineTo(26, 0)
			ctx.lineTo(15, 8)
			ctx.lineTo(4, 0)
			ctx.setFillStyle("#1778FF")
			ctx.fill()
		}
	}
</script>

<style lang="less">
	.swiper {
		min-height: 100vh;
		width: 100%;
		background-color: #eee;
		
		.swiper-item {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.uni-section {
				background: transparent;
			}
			
			.text {
				width: 70%;
				margin-bottom: 5px;
				text-align: center;
			}
			
			.img {
				display: block;
				width: 70%;
				margin-bottom: 60px;
			}
			
			// .arrow {
			// 	width: 30px;
			// 	height: 80px;
			// }
		}
	}
</style>
