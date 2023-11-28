<template>
	<view>
		<view class="text-block">
			<text>您可将问题详情编辑成电子邮件</text>
			<view class="email">
				<text class="emailText" user-select="true">发送至czbusfans@163.com</text>
				<button class="copyEmail" hover-class="toFeedback-hover" @click="copyEmail">点击复制</button>
			</view>
			<text>也可点击下方按钮进行反馈</text>
		</view>
		<button class="toFeedback" hover-class="toFeedback-hover" open-type="feedback">意见反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			copyEmail() {
				uni.setClipboardData({
					data: 'czbusfans@163.com',
					success() {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						})
					},
					fail() {
						uni.showToast({
							icon: 'fail',
							title: '复制失败，请手动复制'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		display: flex;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		margin-top: 10px;
		background-color: #eee;
	}
	
	.text-block {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.email {
		display: flex;
		justify-content: center;
		height: 25px;
		margin-top: 5px;
		margin-bottom: 5px;
		
		.emailText {
			display: inline-block;
			height: 25px;
			line-height: 25px;
		}
		
		.copyEmail {
			display: inline-block;
			width: 90px;
			height: 25px;
			text-decoration: underline;
			font-size: 14px;
			background-color: #ffc357;
			line-height: 25px;
			color: #fff;
		}
	}
	
	.toFeedback {
		height: 40px;
		width: 160px;
		margin-top: 5px;
		line-height: 40px;
		color: #fff;
		background-color: #ffc357;
	}
	
	.toFeedback-hover {
		background-color: #c08000;
		color: #c0c0c0;
	}
</style>
