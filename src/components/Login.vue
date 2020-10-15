<template>
  <div id="login">
    <form>
      <van-cell-group>
        <van-field
          required
          clearable
          label="用户名"
          v-model="userName"
          placeholder="请输入用户名"
          @focus="clearError('userName')"
          :error-message="errorMessage.userName"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          type="password"
          required
          clearable
          label="密码"
          v-model="passWord"
          placeholder="请输入密码"
          @focus="clearError('password')"
          :error-message="errorMessage.password"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          required
          clearable
          label="验证码"
          v-model="vCode"
          placeholder="请输入验证码"
          @focus="clearError('vCode')"
          :error-message="errorMessage.vCode"
        >
          <van-image
            slot="button"
            :src="vCodeSrc"
            @click="refreshVCode"
            width="70"
            height="23"
          />
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-button
          @click.prevent="login"
          size="large"
          type="primary"
        >登陆</van-button>
      </van-cell-group>
    </form>
  </div>
</template>
<script>
import { loginApi } from '../api/AccountOperate'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      passWord: '',
      vCode: '',
      vCodeSrcBase: process.env.BASE_URL + '/Account/VCode',
      rand: new Date().toString(),
      errorMessage: {
        userName: '',
        password: '',
        vCode: ''
      }
    }
  },
  computed: {
    vCodeSrc: function () {
      return this.vCodeSrcBase + '?' + this.rand
    }
  },
  methods: {
    login: function () {
      var valided = true
      if (this.userName === null || this.userName === '') {
        this.errorMessage.userName = '请输入用户名'
        valided = false
      }
      if (this.passWord === null || this.passWord === '') {
        this.errorMessage.password = '请输入密码'
        valided = false
      }
      if (this.vCode === null || this.vCode === '') {
        this.errorMessage.vCode = '请输入验证码'
        valided = false
      }
      if (!valided) {
        return
      }
      loginApi(this.userName, this.passWord, this.vCode)
        .then(response => {
          this.refreshVCode()
          if (response.status === 200) {
            if (response.data.success) {
              this.$store.commit('LOGIN', response.data)
              this.$router.push({ name: 'serviceordersearch' })
            } else {
              this.$toast(response.data.text)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshVCode: function () {
      this.rand = new Date().toString()
    },
    clearError: function (e) {
      this.errorMessage[e] = ''
    }
  }
}
</script>
<style>
#login {
  margin-top: 140px;
  padding: 0 20px;
}
</style>
