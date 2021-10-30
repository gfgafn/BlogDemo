<template>
  <Header />
  <a-layout>
    <Sider />
    <Content />
  </a-layout>
  <a-back-top />
</template>
<script>
import Header from "./components/Header.vue";
import Sider from "./components/Sider.vue";
import Content from "./components/Content.vue";

export default {
  components: { Header, Sider, Content },
  name: "App",
};
</script>
<style>
</style>
