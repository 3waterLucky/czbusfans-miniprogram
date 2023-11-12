<template>
	<view class="container">
		<view class="filter" :style="{ '--left': left }">
			<view class="filter-left">
				<view class="filter-left-item" @click="filterLines('all')">
					全部线路&nbsp;({{ allLines.length }})
				</view>
				<view class="filter-left-item" 
					v-for="(item, key, index) in linesList" 
					:key="index"
					@click="filterLines(key)"
				>
					{{ item.typeName }}&nbsp;({{ item.lines.length }})
				</view>
			</view>
			<view class="filter-right" @click="closeFilter"></view>
		</view>
		<view class="selector">
			<view class="filterButton" @click="openFilter">
				<image src="../../static/images/filter.png" mode="widthFix"></image>
			</view>
			{{ title }}
		</view>
		<view class="cards">
			<LineCard class="lineCard" 
				v-for="line in showLines" 
				:lineInfo="line" 
				:transTime="transTime"
				:key="line.lineNo"
				@tap="toDetail(line)"
			>
			</LineCard>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				display: 'all',
				left: '-100vw',
				title: '全部线路',
				showLines: [],
				transTime: '.7s'
			};
		},
		computed: {
			...mapState({
				linesList: state => state.lines.linesList
			}),
			...mapGetters(['normalLines', 'expressLines', 'travelLines', 'microLines', 'ruralLines', 'RaopingLines', 'intercityLines', 'tempLines', 'otherLines']),
			allLines() {
				let ret = []
				for (const type in this.linesList) {
					ret = ret.concat(this.linesList[type].lines)
				}
				return ret
			}
		},
		methods: {
			toDetail(line) {
				let { id } = line
				setTimeout(() => {
					uni.navigateTo({
						url: `./LineDetail/LineDetail?id=${id}`,
					})
				}, 500)
			},
			openFilter() {
				this.left = '0'
			},
			closeFilter() {
				this.left = '-100vw'
			},
			filterLines(key) {
				if (key === 'all') {
					this.title = '全部线路'
					this.showLines = this.allLines
				} else {
					this.title = this.linesList[key].typeName
					this.showLines = this.linesList[key].lines
				}
			}
		},
		onLoad() {
			this.$store.dispatch('getLinesList').then(() => {
				this.filterLines('all')
			})
		},
		onHide() {
			this.transTime = '0'
		},
		onShow() {
			setTimeout(() => {
				this.transTime = '.7s'
			}, 10)
		}
	}
</script>

<style lang="less">
	.container {
		position: relative;
		
		.filter {
			height: 100vh;
			width: 100vw;
			position: absolute;
			left: var(--left);
			z-index: 9999;
			transition: all .3s linear;
			
			.filter-left {
				float: left;
				width: 60%;
				height: 100%;
				background-color: #bbb;
				
				.filter-left-item {
					box-sizing: border-box;
					width: 100%;
					height: 40px;
					padding-left: 10px;
					background-color: #ddd;
					line-height: 38px;
					position: relative;
					border-bottom: #bbb 2px solid;
					border-right: #bbb 2px solid;
					
					&::after {
						content: '>';
						position: absolute;
						height: 100%;
						line-height: 38px;
						right: 5px;
					}
				}
			}
			
			.filter-right {
				float: left;
				width: 40%;
				height: 100%;
				background-color: transparent;
			}
		}
		
		.selector {
			position: sticky;
			top: 0;
			width: 100%;
			height: 40px;
			background-color: #ed7d31;
			line-height: 40px;
			color: #fff;
			text-align: center;
			
			.filterButton {
				position: absolute;
				left: 10px;
				top: 7px;
				width: 24px;
				height: 24px;
				
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.cards {
			min-height: 100vh;
			display: flex;
			align-items: center;
			flex-direction: column;
			background-color: #ddd;
			padding-bottom: 10px;
			
			.lineCard {
				margin-top: 10px;
			}
		}
	}

</style>
