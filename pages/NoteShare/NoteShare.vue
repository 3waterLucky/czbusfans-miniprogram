<template>
	<view class="container">
		<view class="left">
			<NoteCard class="noteCard"
				v-for="(item, index) in leftList"
				:imageUrl="item.imageUrl"
				:title="item.title"
				:authorAvatar="item.authorAvatar"
				:authorName="item.authorName"
				:likeNum="item.likeNum"
				:key="item.id"
			></NoteCard>
		</view>
		<view class="right">
			<NoteCard class="noteCard"
				v-for="(item, index) in rightList"
				:imageUrl="item.imageUrl"
				:title="item.title"
				:authorAvatar="item.authorAvatar"
				:authorName="item.authorName"
				:likeNum="item.likeNum"
				:key="item.id"
			></NoteCard>
		</view>
		<!-- 发布按钮 -->
		<view class="postIcon">
			+
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showNum: 20,
				showStartIndex: 0,
				showEndIndex: 19,
			}
		},
		computed: {
			// 虚拟数据
			noteList() {
				let ret = []
				for (let i = 0; i < 1000; i++) {
					let obj = {}
					let randomWidth = Math.round((Math.random() * 2 + 2) * 100)
					let randomHeight = Math.round((Math.random() * 2 + 2) * 100)
					let randomImgId = Math.round(Math.random() * 50)
					let randomAvatarId = Math.round(Math.random() * 50)
					obj.imageUrl = `https://picsum.photos/id/${randomImgId}/${randomHeight}/${randomWidth}`
					obj.title = '测试标题'
					let repeatTime = Math.random() * 18
					for (let j = 0; j < repeatTime; j++) {
						obj.title += '测试标题'
					}
					obj.authorAvatar = `https://picsum.photos/id/${randomAvatarId}/${randomHeight}/${randomWidth}`
					obj.authorName = '随机用户' + Math.round(Math.random() * 1000000)
					obj.likeNum = Math.round(Math.random() * 30)
					obj.id = i
					ret.push(obj)
				}
				return ret
			},
			showList() {
				return this.noteList.slice(this.showStartIndex, this.showEndIndex + 1)
			},
			leftList() {
				return this.showList.filter((val, index) => index % 2 === 0)
			},
			rightList() {
				return this.showList.filter((val, index) => index % 2 !== 0)
			}
		},
		onPageScroll(e) {
			console.log(e.scrollTop)
			this.showStartIndex = Math.max(Math.floor(e.scrollTop / 250) * 2 - 6, 0)
			this.showEndIndex = this.showStartIndex + this.showNum - 1
		},
	}
</script>

<style lang="less">
	.container {
		min-height: 100vh;
		background-color: #eee;
		display: flex;
		justify-content: space-around;

		.left,
		.right {
			display: flex;
			width: 48%;
			flex-direction: column;
			align-items: center;
		}

		.noteCard {
			width: 100%;
			border-radius: 10px;
			overflow: hidden;
			margin-top: 5px;
			margin-bottom: 5px;
		}

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