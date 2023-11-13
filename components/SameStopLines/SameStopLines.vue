<template>
	<view class="sameStopLines" @click.stop="">
		<view class="title">
			本站线路
		</view>
		<view class="close" @click="close">
			<image src="@/static/images/close.png" mode="widthFix"></image>
		</view>
		<scroll-view class="lines" scroll-y="true">
			<view class="lines-item" 
				v-for="(line, index) in sameStopLines" 
				:key="index"
				@click="toDetail(line.id, line.direction)"
			>
				<view class="lines-item-upper">
					<view class="lineNo">
						{{ line.lineNo }}
					</view>
				</view>
				<view class="lines-item-bottom">
					{{ line.dep }}&nbsp;开往&nbsp;{{ line.dest }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getSameStopLines, getDetail } from '@/api/lines.js'
	export default {
		name:"SameStopLines",
		data() {
			return {
				sameStopLines: []
			};
		},
		props: ['stopId'],
		methods: {
			close() {
				this.$emit('close')
			},
			async getLines(stopId) {
				let result = await getSameStopLines(stopId)
				if (result.data.code !== 200) {
					uni.showToast({
						icon: 'none',
						title: '获取同站线路失败'
					})
				} else {
					let lines = result.data.lines
					for (const line of lines) {
						let res = await getDetail(line.lineId)
						if (res.data.code !== 200) {
							uni.showToast({
								icon: 'none',
								title: '获取同站线路详情失败'
							})
						} else {
							let { id, lineNo, dep, dest } = res.data.line
							if (line.direction) {
								let temp = dep
								dep = dest
								dest = temp
							}
							this.sameStopLines.push({
								id,
								lineNo,
								dep,
								dest,
								direction: line.direction
							})
						}
					}
				}
			},
			toDetail(id, direction) {
				uni.navigateTo({
					url: `/pages/BusLines/LineDetail/LineDetail?id=${id}&direction=${direction}`
				})
			}
		},
		watch: {
			stopId(newVal, oldVal) {
				this.sameStopLines = []
				this.getLines(newVal)
			}
		}
	}
</script>

<style lang="less">
	.sameStopLines {
		width: 300px;
		height: 400px;
		border-radius: 20px;
		overflow: hidden;
		
		.title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-weight: 600;
			text-align: center;
			background-color: #5555ff;
			color: #fff;
		}
		
		.close {
			position: absolute;
			right: 10px;
			top: 10px;
			width: 30px;
			height: 30px;
			
			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		
		.lines {
			width: 100%;
			height: 350px;
			background-color: #fff;
			
			.lines-item {
				width: 100%;
				height: 60px;
				padding-left: 10px;
				border-bottom: 1px solid #bbb;
				
				.lines-item-upper {
					width: 100%;
					height: 36px;
					position: relative;
					color: #5aaa5d;
					line-height: 36px;
					font-size: 18px;
					font-weight: 600;
					
					&::after {
						content: '>';
						color: #000;
						position: absolute;
						top: 10px;
						right: 16px;
					}
				}
				
				.lines-item-bottom {
					width: 100%;
					height: 24px;
					color: #888;
					line-height: 24px;
					font-size: 14px;
				}
			}
		}
	}
</style>