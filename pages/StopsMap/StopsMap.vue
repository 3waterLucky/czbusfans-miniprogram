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
			<!-- <cover-view slot="callout">
				<template v-for="(item, index) in stopsMarkers">
					<cover-view  class="customCallout" :marker-id="item.id" :key="index">
						<cover-view class="stopName"> 
							{{ item.title }}
						</cover-view>
						<cover-view class="passbyLines">
							本站线路
						</cover-view>
						<cover-view class="tickOff" @tap="tickOff(item.id)">
							打卡
						</cover-view>
					</cover-view>
				</template>
			</cover-view> -->
			<view class="relocate">
				<uni-icons custom-prefix="iconfont" type="icon-dingwei" size="30" @click="relocate"></uni-icons>
			</view>
		</map>
		<StopInfo class="popup"
			ref="popup"
			:fullStopName="selectedFullStopName" 
			:stopId="selectedStopId" 
			:userLocation="userLocation"
			:class="{ showPopup: showPopup }"
		></StopInfo>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				stopsMarkers: [],
				selectedStopId: 0,
				selectedFullStopName: '',
				showPopup: false
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
					// let title = item.stopName
					let iconPath = '../../static/images/redStop.png'
					return {
						id,
						latitude,
						longitude,
						// title,
						iconPath,
						width: '20px',
						height: '20px',
					}
				})
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
			handleMarkertap(e) {
				this.selectedStopId = e.detail.markerId
				for (const stop of this.stopsList) {
					if (stop.stopId === this.selectedStopId) {
						this.selectedFullStopName = stop.stopName
						break
					}
				}
				setTimeout(() => {
					console.log('true', e)
					this.showPopup = true
				}, 10)
			},
			closePopup(e) {
				if (this.showPopup && e.type !== 'markertap') {
					this.showPopup = false
					console.log('false', e)
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
			// height: 100px;
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
</style>
