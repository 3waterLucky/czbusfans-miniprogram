<script>
	import { wxLogin } from './api/user.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSetting({
				success: (res) => {
					console.log(res)
					if (!res.authSetting['scope.userLocation']) {
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
			// 自动登录
			wx.login({
				success: (res) => {
					console.log(res)
					wxLogin(res.code)
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
</style>
