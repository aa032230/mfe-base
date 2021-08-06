export default (status) => {
  let _message = "";
  switch (status) {
    case 400:
      _message = "请求错误";
      break;

    case 401:
      _message = "未授权，请登录";
      break;

    case 403:
      _message = "拒绝访问";
      break;

    case 404:
      _message = `请求出错`;
      break;

    case 408:
      _message = "请求超时";
      break;

    case 500:
      _message = "服务器错误";
      break;

    case 501:
      _message = "服务未实现";
      break;

    case 502:
      _message = "网关错误";
      break;

    case 503:
      _message = "服务不可用";
      break;

    case 504:
      _message = "网关超时";
      break;

    case 505:
      _message = "HTTP版本不受支持";
      break;
    default:
      _message = "未知错误";
      break;
  }
  return _message;
};
