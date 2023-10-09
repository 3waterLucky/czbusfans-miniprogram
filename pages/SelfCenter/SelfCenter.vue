<template>
	<view class="page">
		<view class="selfInform">
			<img class="avatar" :src="avatarUrl">
			<view class="nickName">
				{{ nickName }}
			</view>
		</view>
		<view class="options">
			<view class="options-item" @click="toSelfInfo">
				个人信息  >
			</view>
			<view class="options-item">
				问题反馈  >
			</view>
			<view class="options-item">
				关于我们  >
			</view>
		</view>
		<view class="pos">
			经度：{{userLocation.longitude}}
			<br>
			纬度：{{userLocation.latitude}}
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState({
				userLocation: state => state.user.userLocation,
				avatarUrl: state => state.user.avatar,
				nickName: state => state.user.nickName
			})
		},
		methods: {
			toSelfInfo() {
				uni.navigateTo({
					url: '/pages/submitInfo/submitInfo'
				})
			}
		},
		onLoad() {
			console.log('SelfCenter onLoad')
			this.$store.dispatch('getUserInfo', uni.getStorageSync('openid'))
			this.$bus.$on('updateUserInfo', () => {
				console.log('on updateUserInfo')
				this.$forceUpdate()
			})
		}
	}
</script>

<style lang="less" scoped>
	.page {
		min-height: 100vh;
		background-color: #eee;
	}
	
	.pos {
		margin-top: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.selfInform {
		height: 150px;
		padding: 20px;
		background-color: #ffaa00;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.avatar {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}
		
		.nickName {
			margin-top: 20px;
			font-size: 22px;
			color: #fff;
		}
	}
	
	.options {
		margin-top: 10px;
		border-top: 1px solid #888;
		background-color: #fff;
		
		.options-item {
			height: 40px;
			padding-left: 20px;
			padding-right: 20px;
			line-height: 40px;
			border-bottom: 1px solid #888;
		}
	}
</style>
