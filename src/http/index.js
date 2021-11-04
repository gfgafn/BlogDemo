/*
 * @Author: your name
 * @Date: 2021-10-30 15:48:53
 * @LastEditTime: 2021-11-04 16:13:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\http\index.js
 */
import axios from "axios";
const $http = axios.create({
  baseURL: "/api/user",
  // baseURL: "https://www.fastmock.site/mock/b51d52f417e389dc24af7a14eae70d5f/heytea",
  // 设定的请求超时时间
  timeout: "",
  // 当前请求的默认请求头
  // headers:{}
});

// 请求拦截
$http.interceptors.request.use((config) => {
  console.log("Axios-http中的config", config);
  return config;
});

// 响应拦截
$http.interceptors.response.use((response) => {
  let { config, data } = response;
  console.log("Axios-http中的respone", response);
  console.log("Axios-http中的response.data", data);
  if (data.code === "200") {
    if (config.url === "/log_in") {
      localStorage.setItem("data", JSON.stringify(data.data));
      return data;
    } else {
      return data;
    }
  } else {
    Promise.reject(data);
    return data;
  }
});

export default $http;
