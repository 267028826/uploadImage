import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  isLogin: window.localStorage.getItem('isLogin'),
  userName: window.localStorage.getItem('userName')
}
const mutations = {
  // 将token保存到sessionStorage里，token表示登陆状态
  LOGIN: (state, data) => {
    state.isLogin = data.success
    state.userName = data.userName
    window.localStorage.setItem('isLogin', data.success)
    window.localStorage.setItem('userName', data.userName)
  },
  // 登出
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.isLogin = false
    state.userName = ''
    window.localStorage.removeItem('isLogin')
    window.localStorage.removeItem('userName')
  }
}

const actions = {
}
var store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store
