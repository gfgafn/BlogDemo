/*
 * @Author: your name
 * @Date: 2021-10-23 22:09:33
 * @LastEditTime: 2021-11-13 01:44:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/game",
    name: "GameLevel3",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Level3.vue"),
  },
  {
    path: "/write",
    name: "WritePost",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WritePost.vue"),
  },
  {
    path: "/editPost",
    name: "editPost",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditPost.vue"),
    // props: { postID: 0, post: {} },
    props: route => ({ query: route.query })
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
