import axios, {type AxiosInstance} from 'axios'
import {ElMessage} from 'element-plus'

const instance = axios.create({
  timeout: 5 * 1000,
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

instance.interceptors.request.use(config => {
  config.headers.token = localStorage.getItem('token')
  return config
}, error => {
  console.log('req error : ', error)
  if (axios.isCancel(error)) {
    return error
  }
  // const {response, code, message, config} = error || {}
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  const {code, message, data} = response.data
  if (code !== 2000) {
    ElMessage.warning(message)
    return Promise.reject(response)
  }
  return data
}, error => {
  ElMessage.warning('请求异常')
  return error
})

export const rest: AxiosInstance = instance