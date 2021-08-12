import axios from 'axios'
import { Message } from 'element-ui'
import requestError from './request-error'
import { downloadFile } from './utils'
const service = axios.create({
  baseURL: '',
  timeout: 10000
})

//  REQUEST 请求异常拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    // 将Token添加到请求头里面
    token && (config.headers.Token = token)
    return config
  },
  (err) => {
    // 错误处理
    Message.error({ message: '请求超时!' })
    return Promise.resolve(err)
  }
)

//  RESPONSE 响应异常拦截
service.interceptors.response.use(
  (result) => {
    if (result.data.code && result.data.code != 200) {
      Message.error({ message: result.data.msg })
      // 非法进入时直接跳到登录页
      window.location.href = '/'
      return
    }
    if (result.config.responseType === 'blob' || result.config.responseType === 'arraybuffer') {
      //下载excel类型
      return downloadFile(result)
    }
    return result
  },
  (err) => {
    if (err && err.response) {
      err.message = requestError(err.response.status)
      const hasMessage = document.body.querySelector('.el-message')
      if (!hasMessage) {
        Message({ message: err.message, type: 'error', duration: 1000 })
      }
    } else {
      err.message = '连接服务器失败!'
    }

    Message.error({ message: err.message })
    return Promise.resolve(err)
  }
)

// 接口域名
export const baseUrl = axios.defaults.baseURL

export const http = {
  post(url, params) {
    return service({
      method: 'post',
      url: url,
      data: params
    })
  },
  get(url, params) {
    return service({
      method: 'get',
      url: url,
      params: params
    })
  },
  put(url, params) {
    return service({
      method: 'put',
      url: url,
      data: params
    })
  },
  delete(url, params) {
    return service({
      method: 'delete',
      url: url,
      data: params
    })
  }
}
