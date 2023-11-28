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
		<view class="postIcon" @click="toCreateNote">
			+
		</view>
	</view>
</template>

<script>
	import { getNoteList } from '@/api/note.js'
	export default {
		data() {
			return {
				noteList: [],				// 所有数据
				showNum: 20,
				showStartIndex: 0,
				showEndIndex: 19,
				leftList: [],				// 左栏数据
				leftHeight: 0,			// 左栏高度
				leftSize: [],				// 左栏每一项的高度
				rightList: [],			// 右栏数据
				rightHeight: 0,			// 右栏高度
				rightSize: [],			// 右栏每一项的高度
				leftTransform: 0,		// 左栏相对于右栏的偏移量
			}
		},
		computed: {
			showList() {
				return this.noteList.slice(this.showStartIndex, this.showEndIndex + 1)
			}
		},
		methods: {
			toCreateNote() {
				uni.navigateTo({
					url: '/pages/NoteShare/CreatetNote/CreatetNote'
				})
			},
			// 将一个卡片分配到左栏或右栏中高度较低的一栏
			allocate(item) {
				const screenWidthRpx = 750
				const screenWidthPx = uni.getWindowInfo().screenWidth
				const rate = screenWidthRpx / screenWidthPx
				const picWidth = 342
				console.log('allo', item.width, picWidth, item.height, picWidth / item.width * item.height)
				console.log('before insert', this.leftHeight, this.rightHeight)
				if (this.leftHeight <= this.rightHeight) {
					console.log('insert into left')
					const h = picWidth / item.width * item.height + 71 * rate
					this.leftList.push(item)
					this.leftSize.push(h / rate)
					this.leftHeight += h
				} else {
					console.log('insert into right')
					const h = picWidth / item.width * item.height + 71 * rate
					this.rightList.push(item)
					this.rightSize.push(h / rate)
					this.rightHeight += h
				}
				console.log('after insert', this.leftHeight, this.rightHeight)
			}
		},
		onLoad() {
			getNoteList().then(res => {
				if (res.statusCode !== 200) {
					uni.showToast({
						icon: 'error',
						title: '获取列表失败'
					})
				} else {
					this.noteList = res.data.list
					for (let i = 0; i < this.showNum; i++) {
						console.log(i)
						this.allocate(this.noteList[i])
					}
				}
			})
		},
		onPageScroll(e) {
			// console.log(e.scrollTop)
			const query = uni.createSelectorQuery()
			query.select('.left').fields({
				size: true
			})
			query.select('.right').fields({
				size: true
			})
			query.exec(res => {
				// console.log(res)
			})
			this.showStartIndex = Math.max(Math.floor(e.scrollTop / 250) * 2 - 6, 0)
			this.showEndIndex = this.showStartIndex + this.showNum - 1
		},
		onPullDownRefresh() {
			getNoteList().then(res => {
				if (res.statusCode !== 200) {
					uni.stopPullDownRefresh()
					uni.showToast({
						icon: 'error',
						title: '刷新失败'
					})
				} else {
					this.noteList = res.data.list
					for (let i = 0; i < this.showNum; i++) {
						this.allocate(this.noteList[i])
					}
				}
			})
		}
	}
</script>

<style lang="less">
	.container {
		min-height: 100vh;
		background-color: #eee;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;

		.left,
		.right {
			display: flex;
			width: 360rpx;
			flex-direction: column;
			align-items: center;
		}

		.noteCard {
			width: 100%;
			border-radius: 10px;
			overflow: hidden;
			margin-top: 5px;
			
			&:last-child {
				margin-bottom: 5px;
			}
		}

		.postIcon {
			position: fixed;
			right: 5vw;
			bottom: 5vw;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-color: #4991ba;
			text-align: center;
			color: #fff7c5;
			font-size: 60px;
			line-height: 53px;
		}
	}
</style>