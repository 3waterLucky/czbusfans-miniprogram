import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user.js'
import lines from '@/store/lines.js'
import map from '@/store/map.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		lines,
		map
	}
})

