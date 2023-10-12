<template>
	<view class="mid">
		BusFans
		<br>
		Developing...
		<view class="postIcon">
			+
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.mid {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: #eee;
		
		.postIcon {
			position: fixed;
			right: 5vw;
			bottom: 5vw;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			line-height: 57px;
			background-color: #ffaa00;
			text-align: center;
			color: #fff;
			font-size: 50px;
		}
	}
</style>
