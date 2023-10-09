<template>
	<view>
		<map name="stopsMap" 
			id="stopsMap"
			:latitude="userLocation.latitude" 
			:longitude="userLocation.longitude" 
			enable-rotate="true"
			show-compass="true"
			show-location="true"
		>
			<view class="refreshLocation">
				<uni-icons custom-prefix="iconfont" type="icon-dingwei" size="30" @click="relocate"></uni-icons>
			</view>
		</map>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				stopsMarkers: []
			};
		},
		computed: {
			...mapState({
				userLocation: state => state.user.userLocation,
				stopsList: state => state.map.stopsList,
				markedList: state => state.map.markedList
			})
		},
		onReady() {
			this._mapCtx = uni.createMapContext('stopsMap', this)
			this.$store.dispatch('getStopsList').then(() => {
				this.stopsMarkers = this.stopsList.map((item) => {
					let id = item.stopId
					let latitude = item.latitude
					let longitude = item.longitude
					let title = item.stopName
					let iconPath = '../../static/images/redStop.png'
					return {
						id,
						latitude,
						longitude,
						title,
						iconPath,
						width: '20px',
						height: '20px',
						// joinCluster: true
					}
				})
				
				// this._mapCtx.initMarkerCluster({
				// 	// enableDefaultStyle: false,
				// })
				this._mapCtx.addMarkers({
					markers: this.stopsMarkers
				})
			})
		},
		methods: {
			relocate() {
				this._mapCtx.moveToLocation().then(() => {
					this._mapCtx.scale = 16
				})
			},
		}
	}
</script>

<style lang="less">
	map {
		position: relative;
		width: 100vw;
		height: 100vh;
		
		.refreshLocation {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 5vh;
			right: 10vw;
			height: 50px;
			width: 50px;
			background-color: #fff;
			border: 1px solid #000;
			border-radius: 5px;
		}
	}
</style>
