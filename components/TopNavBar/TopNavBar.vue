<template>
	<view>
		<view class="tab_bar">
			<view class="tab" 
				v-for="(item, index) in navItems" 
				:style="{ 
					'color':(activeTab == index ? fontColor : '#888'), 
					'border-bottom-color':(activeTab == index ? borderColor : '#888'),
					 'width': tabWidth
				 }"
				@click="changeTab(index)"
			>
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TopNavBar",
		data() {
			return {
				activeTab: 0
			};
		},
		props: {
			navItems: {
				type: Array,
				required: true
			},
			fontColor: {
				type: String,
				required: false,
				default: '#ed7d31'
			},
			borderColor: {
				type: String,
				required: false,
				default: '#ed7d31'
			}
		},
		computed: {
			tabWidth() {
				return (100 / this.navItems.length) + 'vw'
			}
		},
		methods: {
			changeTab(newTab) {
				this.activeTab = newTab
				this.$emit('changePage', newTab)
			}
		}
	}
</script>

<style lang="less">
	.tab_bar {
		display: flex;
		width: 100%;
		height: 35px;
		line-height: 35px;
		
		.tab {
			flex-grow: 1;
			text-align: center;
			border-bottom: 2px solid #888;
			padding-left: 5px;
			padding-right: 5px;
		}
	}
</style>