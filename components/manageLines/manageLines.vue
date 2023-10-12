<template>
	<view>
		<TopNavBar :navItems="navItems" :fontColor="'#5555ff'" :borderColor="'#5555ff'" @changePage="changePage"></TopNavBar>
		<view class="pageView">
			<view class="editCur" v-show="showPage === 0">
				编辑已有
			</view>
			<view class="addNew" v-show="showPage === 1">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"manageLines",
		data() {
			return {
				navItems: ['编辑已有线路', '新增线路'],
				showPage: 0
			};
		},
		methods: {
			changePage(index) {
				this.showPage = index
			}
		}
	}
</script>

<style lang="less">

</style>