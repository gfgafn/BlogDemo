<!--
 * @Author: your name
 * @Date: 2021-10-29 18:30:29
 * @LastEditTime: 2021-11-04 15:50:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\components\Header.vue
-->
<template lang="">
    <a-layout-header
    class="header"
    :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
  >
    <!-- <div class="logo">logo</div> -->
     <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
      <a-menu-item key="1">
        <router-link to="/">首页</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/write">写博客</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/game">GameLevel3</router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link to="/about">关于我</router-link>
      </a-menu-item>
      <a-menu-item key="5">
        <Login />
      </a-menu-item>
      <a-menu-item key="6">
        <Register />
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'
export default {components: { Login, Register },};
</script>
<style lang="">
</style>