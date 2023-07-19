import axios, {type AxiosInstance} from 'axios'
import {ElMessage} from 'element-plus'
import {FileUtil} from '@/util/file-util'

const instance = axios.create({
  timeout: 5 * 1000,
  baseURL: import.meta.env.VITE_API_BASE_URL
})

instance.interceptors.request.use(config => {
  config.headers.token = localStorage.getItem('token')
  return config
}, error => {
  console.error('req error : ', error)
  if (axios.isCancel(error)) {
    return error
  }
  return Promise.reject(error)
})

instance.interceptors.response.use(async response => {
  // 请求时设置返回blob, 但是实际上可能返回的是json的情况
  if (response.data instanceof Blob) {
    if (!response.headers['content-type']?.includes('application/json')) {
      FileUtil.saveBlob(response.data, decodeURI(response.headers['filename'] ?? ''))
      return null
    }
    response.data = JSON.parse(await (response.data as Blob).text())
  }
  const {
    code,
    message,
    data
  } = response.data
  if (code !== 2000) {
    ElMessage.warning(message)
    return Promise.reject(response)
  }
  return data
}, error => {
  ElMessage.warning('请求异常')
  console.error('请求异常: ', error)
  return Promise.reject(error)
})

export const rest: AxiosInstance = instance
