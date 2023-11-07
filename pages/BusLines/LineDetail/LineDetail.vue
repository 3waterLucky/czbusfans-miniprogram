<template>
	<view>
		{{ lineNo }}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineNo: 0
			};
		},
		onLoad(option) {
			this.lineNo = option.lineNo
		}
	}
</script>

<style lang="less">

</style>
