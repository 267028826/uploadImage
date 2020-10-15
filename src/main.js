// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
// import {logoutApi} from './api/AccountOperate'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(VueCookies)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    window.addEventListener('pagehide', e => this.unloadHandler(e))
    window.onbeforeunload = function (e) {
      console.log('a')
      alert('a')
      if (e) {
        e.returnValue = '关闭提示'
      }

      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示'
    }
  },
  destroyed () {
    window.removeEventListener('pagehide', e => this.unloadHandler(e))
  },
  methods: {
    unloadHandler (e) {
      // logoutApi()
    }
  }
})
