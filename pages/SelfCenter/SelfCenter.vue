<template>
	<view class="page">
		<view class="selfInform">
			<img class="avatar" :src="avatarUrl">
			<view class="nickName">
				{{ nickName }}
			</view>
		</view>
		<view class="options">
			<view class="options-item selfInfo" @click="toSelfInfo">
				个人信息
			</view>
			<view class="options-item feedback" @click="toBugReport">
				问题反馈
			</view>
			<view class="options-item about" @click="toAboutUs">
				关于我们
			</view>
			<view class="options-item admin" @click="toAdmin" v-if="isAdmin">
				管理员入口
			</view>
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
				avatarUrl: state => state.user.avatar,
				nickName: state => state.user.nickName,
				isAdmin: state => state.user.isAdmin
			})
		},
		methods: {
			toSelfInfo() {
				uni.navigateTo({
					url: '/pages/submitInfo/submitInfo'
				})
			},
			toBugReport() {
				uni.navigateTo({
					url: '/pages/BugReport/BugReport'
				})
			},
			toAboutUs() {
				uni.navigateTo({
					url: '/pages/AboutUs/AboutUs'
				})
			},
			toAdmin() {
				uni.navigateTo({
					url: '/pages/Admin/Admin'
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
			position: relative;
			height: 40px;
			padding-left: 4vw;
			padding-right: 20px;
			line-height: 40px;
			border-bottom: 1px solid #888;
			
			&::after {
				content: '>';
				position: absolute;
				height: 40px;
				line-height: 40px;
				right: 2vw;
			}
		}
		
		.item-icon {
			content: '';
			float: left;
			width: 30px;
			height: 30px;
			margin-top: 5px;
			background-size: contain;
		}
		
		.selfInfo::before {
			.item-icon();
			background-image: url('../../static/images/selfInfo.png');
		}
		
		.feedback::before {
			.item-icon();
			background-image: url('../../static/images/feedback.png'
			);
		}
		
		.about::before {
			.item-icon();
			background-image: url('../../static/images/about.png');
		}
		
		.admin::before {
			.item-icon();
			background-image: url('../../static/images/admin.png');
		}
	}
</style>
