import {message} from 'antd';

//post get请求
export async function fetchData(
  url: string,
  params: Record<string, unknown> = {},
  method: 'GET' | 'POST' = 'POST',
) {
  let res;
  try {
    res = await Promise.race([
      getTimeOutPromise(),
      getFetchPromise(url, params, method),
    ]);
  } catch (err) {
    console.error('请求一场', {url, params, err});
    message.error('系统错误，请稍后再试');
  }

  return res;
}

//超时，设置为10s
async function getTimeOutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('network time out'));
    }, 10000);
  });
}

//post get
async function getFetchPromise(
  url: string,
  params: Record<string, unknown> = {},
  method: 'GET' | 'POST' = 'GET',
) {
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  };

  const fetchParams: {
    method: 'GET' | 'POST';
    body: undefined | string;
    headers: object;
  } = {
    method,
    body: undefined,
    headers: header,
  };

  let reqUrl = url;
  // get请求，处理所有参数，添加到url上
  if (method === 'GET') {
    if (params) {
      const paramsArray: string[] = [];
      Object.keys(params || {}).forEach((key) =>
        paramsArray.push(key + '=' + params[key]),
      );
      if (url.search(/\?/) === -1) {
        reqUrl += '?' + paramsArray.join('&');
      } else {
        reqUrl += '&' + paramsArray.join('&');
      }
    }
  } else {
    fetchParams.body = JSON.stringify(params);
  }

  return fetch(reqUrl, {
    method: method,
    body: JSON.stringify(params),
    headers: header,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('network error');
      }
    })
    .then((resp) => {
      if (resp?.success) {
        return resp?.data ? resp.data : resp;
      } else {
        throw resp;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
