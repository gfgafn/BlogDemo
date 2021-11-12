/*
 * @Author: your name
 * @Date: 2021-11-01 23:14:06
 * @LastEditTime: 2021-11-13 02:15:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\http\api.js
 */
import $http from "./index";

export const register = (data) => $http.post("/sign_up", data);
export const login = (data) => $http.post("/log_in", data);
export const getPosts = () => $http.post("/select");
export const writePost = (data) => $http.post("/write", data);
export const modifyPost = (data) => $http.post("/modify", data);