<!--
 * @Author: your name
 * @Date: 2021-10-29 18:30:29
 * @LastEditTime: 2021-10-30 03:11:15
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
        <router-link to="game">GameLevel3</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/about">关于我</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
export default {};
</script>
<style lang="">
</style>