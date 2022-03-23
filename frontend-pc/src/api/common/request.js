import axios from 'axios'
// import utilHelper from '../utilHelper';
import { message } from 'antd';

// 创建axios实例
const request = axios.create({
//   baseURL: utilHelper.scope.proxyName, // api的base_url
  baseURL: '',
  headers: { 'content-type': 'application/json' },
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  //拦截发生错误的请求
  // console.log("response.data=>",response.data);
  if (response.data.status !== 0) {
    message.error(response.data.msg)
    // throw Error(response.data.msg); // 抛出错误 让调用api的地方catch错误
  }
  return response;
},
function (error) {
  message.error(error.message)
  return Promise.reject(error);
});

export default request;
