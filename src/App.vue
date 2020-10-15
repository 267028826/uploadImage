<template>
  <div id="app">
    <van-nav-bar
      title=" "
      :left-text="userName"
      right-text="注销"
      v-if="isLogin"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { logoutApi } from './api/AccountOperate'
export default {
  name: 'App',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userName () {
      return this.$store.state.userName
    }
  },
  created () {
    console.log(process.env.VUE_APP_BASE_URL)
    var cookie = this.$cookies.get('.ASPXAUTH')
    if (cookie === null || cookie === undefined) {
      this.$store.commit('LOGOUT')
      this.$router.push({ name: 'login' })
    }
    console.log(cookie)
  },
  methods: {
    onClickLeft: async function () {
      // this.$cookies.remove('.ASPXAUTH')
    },
    onClickRight () {
      logoutApi()
        .then(response => {
          if (response.status === 200) {
            if (response.data.success) {
              this.$store.commit('LOGOUT')
              this.$router.push({ name: 'login' })
            } else {
              this.$toast(response.data.text)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
