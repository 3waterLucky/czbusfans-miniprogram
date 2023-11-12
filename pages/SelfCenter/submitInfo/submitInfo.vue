<template>
	<view>
		<view class="info">
			<span>头像</span>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<img :src="avatarUrl" alt="">
			</button>
		</view>
		<view class="info">
			<span>昵称</span>
			<input class="nickName" type="nickname" placeholder="请输入昵称">
		</view>
		<button class="submit" size="default" hover-class="submit-hover" @click="submitInfo">提交</button>
	</view>
</template>

<script>
	import { uploadAvatar } from '../../../api/user.js'
	export default {
		data() {
			return {
				avatarUrl: '',
				nickName: ''
			};
		},
		methods: {
			// 选择头像
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail
				this.avatarUrl = avatarUrl
			},
			// 提交头像和昵称到服务器
			submitInfo() {
				uni.showLoading({
					title: '保存中'
				})
				// 获取input的值，由于昵称既可以自动填充也可以自行输入，需要用此方法获取input的value值
				uni.createSelectorQuery().select('.nickName').fields({
					properties: ['value']
				}, res => {
					console.log(res)
					if (!res.value.length) {
						this.nickName = this.$store.state.user.nickName
					} else {
						this.nickName = res.value
					}
				}).exec(() => {
					const data = {
						nickName: this.nickName
					}
					console.log('dispatch: setUserInfo')
					this.$store.dispatch('setUserInfo', data).then(res => {
						if (res == 'success') {
							console.log('uploadAvatar')
							if (this.avatarUrl.length) {
								uploadAvatar(this.avatarUrl).then(() => {
									console.log('uploadAvatar success')
									console.log('getUserInfo')
									this.$store.dispatch('getUserInfo')
									uni.hideLoading()
									uni.showToast({
										icon: 'success',
										title: '保存成功'
									})
								})
							} else {
								console.log('getUserInfo')
								this.$store.dispatch('getUserInfo')
								uni.hideLoading()
								uni.showToast({
									icon: 'success',
									title: '保存成功'
								})
							}
						}
					}, err => {
						uni.hideLoading()
						uni.showToast({
							icon: 'error',
							title: '操作失败'
						})
					})
				});
			},
		}
	}
</script>

<style lang="less">
	.info {
		height: 60px;
		padding-left: 20px;
		padding-right: 20px;
		line-height: 60px;
		border-bottom: 1px solid #888;
		
		span {
			float: left;
			font-size: 18px;
		}
		
		.avatar-wrapper {
			padding: 0;
			float: right;
			height: 50px;
			width: 50px;
			margin-top: 5px;
			border-radius: 10px;
			
			img {
				width: 50px;
				height: 50px;
			}
		}
		
		.nickName {
			float: right;
			font-size: 18px;
			width: 100px;
			height: 100%;
			line-height: 60px;
			text-align: right;
		}
	}
	.submit {
		margin-top: 50px;
		width: 160px;
		background-color: #ed7d31;
		color: #fff;
	}
	
	.submit-hover {
		background-color: #c08000;
		color: #c0c0c0;
	}
</style>

