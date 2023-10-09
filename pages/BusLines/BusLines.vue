<template>
	<view class="content">
		<LineCard class="lineCard" v-for="line in linesList" :lineInfo="line"></LineCard>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				linesList: state => state.lines.linesList
			})
		},
		onLoad() {
			this.$store.dispatch('getLinesList')
		}
	}
</script>

<style lang="less">
	.content {
		min-height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #eee;
		padding-bottom: 10px;
		
		.lineCard {
			margin-top: 10px;
		}
	}
</style>
