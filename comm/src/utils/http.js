
import axios from 'axios'
import { Message } from 'element-ui'
import requestError from './request-error'
// 域名地址
axios.defaults.baseURL = '';


//  REQUEST 请求异常拦截
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    // 将Token添加到请求头里面
    token && (config.headers.Token = token);
    return config;
}, err => {
    // 错误处理
    Message.error({ message: '请求超时!' });
    return Promise.resolve(err);
});

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(result => {
    if (result.data.code && result.data.code != 200) {
        Message.error({ message: result.data.msg });
        // 非法进入时直接跳到登录页
        window.location.href = '/';
        return;
    };
    return result;
}, err => {

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
    return Promise.resolve(err);
})

// 接口域名
export const baseUrl = axios.defaults.baseURL;

// POST 方法封装 (处理参数与文件上传)
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params
    });
}


//  GET 方法封装
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    });
}

//  PUT 方法封装
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params
    });
}

//  DELETE 方法封装
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params
    });
}
