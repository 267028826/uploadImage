import axios from 'axios'
var baseurl = process.env.BASE_URL
export function loginApi (userName, password, vCode) {
  const data = {
    userName: userName,
    password: password,
    vcode: vCode
  }
  return axios.post(baseurl + '/Account/LogIn', data, {
    withCredentials: true
  })
}

export function logoutApi () {
  return axios.get(baseurl + '/Account/LogOut', {
    withCredentials: true
  })
}

export default {loginApi, logoutApi}
