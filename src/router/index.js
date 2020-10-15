import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import ServiceOrderSearch from '../components/ServiceOrderSearch'
import store from '../store/index'
import ImageUpload from '../components/ImageUpload'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'serviceordersearch',
      component: ServiceOrderSearch,
      meta: {
        keepAlive: true,
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/serviceordersearch',
      name: 'serviceordersearch',
      component: ServiceOrderSearch,
      meta: {
        keepAlive: true,
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/imageupload/:orderId',
      name: 'imageupload',
      component: ImageUpload,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  NProgress.start()
  const isLogin = store.state.isLogin
  if (to.name === 'login' && isLogin) {
    next({
      path: '/serviceordersearch'
    })
  } else if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (isLogin) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
})
export default router
