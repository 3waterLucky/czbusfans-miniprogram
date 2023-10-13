<template>
	<view class="container">
		<TopNavBar :navItems="navItems" @changePage="changePage"></TopNavBar>
		<view class="pageView">
			<manageLines v-show="activeTab == 0"></manageLines>
			<manageIndex v-show="activeTab == 1"></manageIndex>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navItems: ['线路相关', '首页相关'],
				activeTab: 0
			}
		},
		methods: {
			changePage(index) {
				this.activeTab = index
			}
		}
	}
</script>

<style scoped lang="less">
	Page {
		
		.container {
			background-color: #eee;
			
			.pageView {
				background-color: #fff;
			}
		}
		
	}
</style>
