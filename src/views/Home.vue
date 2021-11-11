<!--
 * @Author: your name
 * @Date: 2021-10-23 22:09:33
 * @LastEditTime: 2021-10-29 18:26:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\views\Home.vue
-->
<template>
  <div>
    <template v-for="postData in posts" :key="postData.record">
      <Post :post="postData" />
    </template>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
import Post from "../components/Post.vue";
import * as API from "../http/api";
export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [
        {
          record: 2,
          userId: 9,
          title: "Ant Design",
          content: [
            {
              type: "header1",
              children: [{ text: "Ant Design of Vue" }],
            },
            {
              type: "paragraph",
              children: [
                {
                  text: "Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. ",
                },
              ],
            },
          ],
          time: {
            releaseTime: "2021/11/6",
            lastEditedTime: "2021/11/6",
          },
          likes: 1,
          views: 2,
        },
      ],
    };
  },
  created() {
    let LocalStorageData = JSON.parse(localStorage.getItem("data"));
    if (LocalStorageData) {
      API.getPosts().then((res) => {
        if (res.code === "500") {
          message.error("登录状态过期，请重新登录");
        } else {
          this.posts = res.data;
        }
      });
    } else {
      message.error("请先登录");
    }
  },
};
</script>

<style>
</style>
