<template>
	<view>
		<map name="stopsMap" 
			id="stopsMap"
			:latitude="userLocation.latitude" 
			:longitude="userLocation.longitude" 
			enable-rotate="true"
			show-compass="true"
			show-location="true"
			@markertap="handleMarkertap"
			@tap="closePopup"
		>
			<view class="relocate">
				<uni-icons custom-prefix="iconfont" type="icon-dingwei" size="30" @click="relocate"></uni-icons>
			</view>
		</map>
		<StopInfo class="popup"
			ref="popup"
			:fullStopName="selectedFullStopName" 
			:stopId="selectedStopId" 
			:tickOffTimes="selectedStopTickOffTimes"
			:userLocation="userLocation"
			:class="{ showPopup: showPopup }"
			@tickOffSuccess="handleTickOffSuccess"
			@showSameStopLines="showSameStopLines = true"
		></StopInfo>
		<SameStopLines class="sameStopLines" 
			:stopId="selectedStopId" 
			v-show="showSameStopLines" 
			@close="showSameStopLines = false"
		>
		</SameStopLines>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				stopsMarkers: [],				// 未打卡站点列表
				markedStopMarkers: [],	// 已打卡站点列表
				selectedStopId: 0,			// 选中的站点id
				selectedFullStopName: '',			// 选中站点的全名
				selectedStopTickOffTimes: 0,	// 选中站点的打卡次数
				showPopup: false,				// 是否显示站点信息弹窗
				enlargedMarker: {},			// marker被放大的站点
				// sameStopLines: [],			// 同站线路列表
				showSameStopLines: false
			};
		},
		computed: {
			...mapState({
				userLocation: state => state.user.userLocation,
				stopsList: state => state.map.stopsList,
				markedList: state => state.map.markedList
			})
		},
		onLoad(option) {
			if (option.stopId !== undefined) {
				this.selectedStopId = option.stopId
			}
			this.createMarkers()
		},
		methods: {
			createMarkers() {
				this._mapCtx = uni.createMapContext('stopsMap', this)
				this.$store.dispatch('getStopsList').then(() => {
					this.stopsMarkers = this.stopsList.map((item) => {
						let id = item.stopId
						let latitude = item.latitude
						let longitude = item.longitude
						let iconPath = '../../../static/images/redStop.png'
						return {
							id,
							latitude,
							longitude,
							iconPath,
							width: '20px',
							height: '20px',
						}
					})
					this.markedStopMarkers = this.markedList.map((item) => {
						let id = item.stopId
						let latitude = item.latitude
						let longitude = item.longitude
						let iconPath = '../../../static/images/greenStop.png'
						return {
							id,
							latitude,
							longitude,
							iconPath,
							width: '20px',
							height: '20px',
						}
					})
					this._mapCtx.addMarkers({
						markers: this.stopsMarkers.concat(this.markedStopMarkers),
						clear: true
					})
					if (this.selectedStopId) {
						console.log('111', this.selectedStopId);
						this.enlargeMarker()
						this._mapCtx.moveToLocation({
							longitude: this.enlargedMarker.longitude,
							latitude: this.enlargedMarker.latitude
						})
					}
				})
			},
			// 重定位至用户位置
			relocate() {
				this._mapCtx.moveToLocation().then(() => {
					this._mapCtx.scale = 16
				})
			},
			// 改变某个marker的大小
			changeMarkerSize(stop, color, size) {
				console.log(stop.stopId)
				this._mapCtx.removeMarkers({
					markerIds: [stop.stopId],
					success:() => {
						console.log('changeMarkerSize success', stop)
						this._mapCtx.addMarkers({
							markers: [{
								id: stop.stopId,
								latitude: stop.latitude,
								longitude: stop.longitude,
								iconPath: `../../../static/images/${color}Stop.png`,
								width: size,
								height: size,
							}]
						})
					}
				})
			},
			enlargeMarker() {
				if (this.enlargedMarker?.stopId) {
					this.changeMarkerSize(this.enlargedMarker, this.selectedStopTickOffTimes ? 'green' : 'red', '20px')
				}
				let found = false
				let color
				console.log('222', this.stopsList)
				for (const stop of this.stopsList) {
					if (stop.stopId == this.selectedStopId) {
						console.log('found', stop.stopId)
						this.selectedFullStopName = stop.stopName
						this.selectedStopTickOffTimes = 0
						this.enlargedMarker = stop
						found = true
						color = 'red'
						break
					}
				}
				if (!found) {
					for (const stop of this.markedList) {
						if (stop.stopId == this.selectedStopId) {
							this.selectedFullStopName = stop.stopName
							this.selectedStopTickOffTimes = stop.tickOffTimes
							this.enlargedMarker = stop
							color = 'green'
							break
						}
					}
				}
				this.changeMarkerSize(this.enlargedMarker, color, '40px')
				setTimeout(() => {
					this.showPopup = true
				}, 10)
			},
			handleMarkertap(e) {
				this.selectedStopId = e.detail.markerId
				this.enlargeMarker()
			},
			closePopup(e) {
				if (this.showPopup && e.type !== 'markertap') {
					this.showPopup = false
					let found = false
					let color = this.selectedStopTickOffTimes ? 'green' : 'red'
					for (const stop of this.stopsList) {
						if (stop.stopId === this.selectedStopId) {
							this.changeMarkerSize(stop, color,'20px')
							break
						}
					}
					if (!found) {
						for (const stop of this.markedList) {
							if (stop.stopId === this.selectedStopId) {
								this.changeMarkerSize(stop, color,'20px')
								break
							}
						}
					}
					console.log('false', e)
				}
			},
			handleTickOffSuccess() {
				this.selectedStopTickOffTimes++
				// 若打卡站点原为红色marker，改为绿色marker
				if (this.selectedStopTickOffTimes === 1) {
					for (const stop of this.stopsList) {
						if (stop.stopId === this.selectedStopId) {
							this.changeMarkerSize(stop, 'green','40px')
							this.$store.dispatch('getStopsList')
							break
						}
					}
				}
			},
		}
	}
</script>

<style lang="less">
	
	Page {
		position: relative;
	}
	
	map {
		position: relative;
		width: 100vw;
		height: 100vh;
		
		.relocate {
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
		
		.customCallout {
			position: relative;
			box-sizing: border-box;
			background-color: #fff; 
			border: 1px solid #ccc;
			border-radius: 20px;
			width: 150px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			&:after {
				position: absolute;
				content: '';
				width: 0;
				height: 0;
				left: 65px;
				bottom: -40px;
				border: 20px solid transparent;
				border-top: 20px solid #ffaa7f;
				transform: scaleX(.5);
			}
			
			.stopName {
				color: #5555ff;
				text-align: center;
				height: 40px;
				line-height: 20px;
				padding: 5px;
				word-wrap: break-word;
			}
			
			.passbyLines {
				width: 80px;
				height: 30px;
				margin: 5px;
				background-color: #55a2ff;
				border-radius: 15px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				font-size: 15px;
			}
			
			.tickOff {
				.passbyLines();
				background-color: #5aaa5d;
			}
		}
	}
	
	.popup {
		position: absolute;
		bottom: 0;
		transform: translateY(100%);
		transition: .25s linear;
	}
	
	.showPopup {
		transform: translateY(0);
		transition: .25s linear;
	}
	
	.sameStopLines {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		}
</style>
