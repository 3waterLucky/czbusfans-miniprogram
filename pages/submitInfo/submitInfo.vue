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
			<input class="nickName" type="nickname" placeholder="请输入昵称" @input="setNickName">
		</view>
		<button class="submit" type="primary" size="default" @click="submitInfo">提交</button>
	</view>
</template>

<script>
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
				uni.getFileSystemManager().saveFile({
					tempFilePath: avatarUrl,
					success:(res) => {
						this.avatarUrl = res.savedFilePath
					}
				})
			},
			// 提交头像和昵称到服务器
			submitInfo() {
				if (!this.avatarUrl.length) {
					this.avatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
					uni.getFileSystemManager().saveFile({
						tempFilePath: this.avatarUrl,
						success:(res) => {
							this.avatarUrl = res.savedFilePath
						}
					})
				}
				const data = {
					avatar: this.avatarUrl,
					nickName: this.nickName.length ? this.nickName : '游客'
				}
				this.$store.dispatch('setUserInfo', data)
			},
			// 填写昵称
			setNickName(e) {
				this.nickName = e.detail.value
			}
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
