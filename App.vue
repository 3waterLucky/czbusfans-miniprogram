<script>
	import { wxLogin } from './api/user.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 获取授权信息
			uni.getSetting({
				success: (res) => {
					console.log('getSetting: ', res)
					if (!res.authSetting['scope.userLocation']) {
						// 请求地理位置授权
						uni.authorize({
							scope: 'scope.userLocation',
							success: () => {
								this.$store.dispatch('getUserLocation')
							}
						})
					} else {
						this.$store.dispatch('getUserLocation')
					}
				}
			})
			// 登录获取openid
			wx.login({
				success: (res) => {
					wxLogin(res.code).then((res) => {
						console.log('set openid')
						uni.setStorageSync('openid', res.data.openid)
						this.$store.dispatch('getUserInfo', res.data.openid)
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/static/iconfont.css";
</style>
