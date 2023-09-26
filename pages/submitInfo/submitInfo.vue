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
		<button class="submit" type="primary" size="default" @click="submitInfo">提交</button>
	</view>
</template>

<script>
	import { uploadAvatar } from '../../api/user.js'
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
				// uni.getFileSystemManager().saveFile({
				// 	tempFilePath: avatarUrl,
				// 	success:(res) => {
				// 		this.avatarUrl = res.savedFilePath
				// 	}
				// })
			},
			// 提交头像和昵称到服务器
			submitInfo() {
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
					// 将临时头像存储在本地
					// uni.getFileSystemManager().saveFile({
					// 	tempFilePath: this.avatarUrl,
					// 	success:(res) => {
					// 		this.avatarUrl = res.savedFilePath
					// 	}
					// })
					console.log('In submitInfo, this.nickName: ', this.nickName)
					console.log('uploadAvatar')
					if (this.avatarUrl.length) {
						uploadAvatar(this.avatarUrl).then(() => {
							console.log('uploadAvatar success')
							console.log('getUserInfo')
							this.$store.dispatch('getUserInfo', uni.getStorageSync('openid'))
						})
					} else {
						console.log('getUserInfo')
						this.$store.dispatch('getUserInfo', uni.getStorageSync('openid'))
						// this.$bus.$emit('updateUserInfo')
					}
					
					const data = {
						// avatar: this.avatarUrl.length ? this.avatarUrl : this.$store.state.user.avatarUrl,
						// nickName: this.nickName.length ? this.nickName : '游客'
						nickName: this.nickName
					}
					console.log('dispatch: setUserInfo')
					this.$store.dispatch('setUserInfo', data)
				});
			},
			// 填写昵称
			// setNickName(e) {
			// 	console.log(e)
			// 	this.nickName = e.detail.value
			// }
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
	}
</style>

