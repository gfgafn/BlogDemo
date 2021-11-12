<!--
 * @Author: your name
 * @Date: 2021-10-29 18:39:53
 * @LastEditTime: 2021-11-01 20:33:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\components\contebt.vue
-->
<template lang="">
    <a-layout >
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{ padding: '24px' }"
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
</template>
<script>
import Footer from "./Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>
<style lang="">
</style>
