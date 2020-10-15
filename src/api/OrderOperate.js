import axios from 'axios'

var baseUrl = process.env.BASE_URL + '/ServiceOrderByWx/'
export function queryPicture (orderId) {
  return axios.get(baseUrl + 'QueryOrderPictures', {
    params: {
      orderId: orderId
    },
    withCredentials: true
  })
}
export function RemovePicture (pictureId) {
  return axios.get(baseUrl + 'RemovePicture', {
    params: {
      id: pictureId
    },
    withCredentials: true
  })
}
export function UploadPicture (params) {
  return axios.post(baseUrl + 'UploadPicture', params, {
    withCredentials: true,
    'Content-Type': 'multipart/form-data'
  })
}
export function queryApi (queryString) {
  return axios.get(baseUrl + 'QueryServiceOrder', {
    params: {
      queryString: queryString
    },
    withCredentials: true
  })
}
export default {queryPicture, queryApi, RemovePicture, UploadPicture}
