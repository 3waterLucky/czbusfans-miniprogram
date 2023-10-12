<template>
	<view>
		<TopNavBar :navItems="navItems" @changePage="changePage"></TopNavBar>
		<manageLines v-show="activeTab == 0"></manageLines>
		<manageIndex v-show="activeTab == 1"></manageIndex>
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

<style lang="less">
	Page {
		background-color: #eee;
	}
</style>
