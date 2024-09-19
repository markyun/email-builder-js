import axios from 'axios';
const instance = axios.create({
  // 设置默认的请求头
  headers: {},
  // 设置默认的超时时间
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.response.use(
  // eslint-disable-next-line no-unused-vars
 response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  error => {
    if (error.name === 'CanceledError') {
      return Promise.resolve(error);
    }

    const { response = {}, config = {} } = error || {};
    const { url } = config;
    const { status, data } = response;
    const { resultMsg, message } = data || {};

    if (url.indexOf('property.json') < 0 && url.indexOf('local.json')) {
      // IMessage.error(resultMsg || message);
    }
    // 593状态码，统一提示系统正在升级
    if (status === 593) {
      // window.location.href = `${window.location.origin}/error-page/maintenance.html`;
    }
    if (status === 504) {
      // IMessage.error(formatLocalMessage('tip_wrong_504'));
    }
    if (status === 401) {
      // jumpToLoginPage();
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  config => {
    // cancelPending(config); // 在请求开始前，对之前的请求做检查取消操作
    // addPending(config); // 将当前请求添加到 pending 中

    // 默认携带 cookie
    if (typeof config.withCredentials !== 'boolean') {
      config.withCredentials = true;
    } else {
      config.withCredentials = config.withCredentials;
    }
    return config;
  },
  error => Promise.reject(error)
);

function processOptions(option) {
  const { headers = {}, method = 'GET', data, ...preOptions } = option || {};
  // 获取 token
  const authToken = '';
  const language = ''; // 优先获取url中的语言
  const phoneType = 1;
  let newHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Device-Type': phoneType,
    'Channel-Id': 1,
    Locale: language, // 语言参数
    // 本地 mock token
    // Token: !authToken ? '' : authToken,
    // user_token: !authToken ? '' : authToken,
    // 'X-CSRF-TOKEN': !authToken ? '' : authToken,
    ...headers,
  };

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    newHeaders.Accept = 'application/json';
    if (!(data instanceof FormData)) {
      newHeaders = {
        ...newHeaders,
        'Content-Type': 'application/json; charset=utf-8',
      };
    }
  }

  const newOptions = {
    getResponse: true,
    // responseType: 'application/json',
    headers: newHeaders,
    data,
    method,
    ...(preOptions || {}),
  };
  return newOptions;
}

const request = async (url, option, isThrowError = true) => {
  const response = await instance(url, processOptions(option, isThrowError));
  if (!response) {
    return {};
  }
  const { status, data, resultMsg, message } = response || {};
  if (`${status}` === '200') {
    return data;
  }
  // IMessage.error(resultMsg || message);
  return response;
};

// export const request2 = instance;

export default request;
