<!--
 * @Author: your name
 * @Date: 2021-10-29 18:55:59
 * @LastEditTime: 2021-11-02 12:26:25
 * @LastEditors: Please set LastEditors
 * @Description: Post component
 * @FilePath: \diantrain\src\components\Posts.vue
-->
<template lang="">
  <div class="post">
    <ul>
      <li class="postTitle">{{post.title}}</li>
      <li class="postAttribute">
        <p>
        <CalendarOutlined /><span>{{post.time.releaseTime}}</span>
        <!-- <UserOutlined /><span>author</span> -->
        <EyeOutlined /><span>{{post.views}}</span>
        </p>
      </li>
      <li class="lable"><span>标签</span></li>
      <li class="postContent">
        <a-typography-paragraph
        :style="{color:'#fff', margin:'0'}"
        :ellipsis="ellipsis ? { rows: 2, expandable: true, symbol: '阅读全文' } : false"
        :content="post.content"
        />
      </li>
      <li class="interaction">
        <LikeOutlined /><span>{{post.likes}}赞同</span>
        <CommentOutlined @click="comment" /><span @click="comment">评论</span> 
        <ShareAltOutlined /><span>分享</span>
        <span class="fold"><UpOutlined /><span>收起</span></span>
      </li>
    </ul>
  </div>
  <comment v-if="commentShowState" ></comment>
</template>
<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import Comment from "./Comment.vue";
export default defineComponent({
  components: { Comment },
  props: { post: Object },
  data() {
    return {
      datetime: dayjs(),
      commentShowState: false,
    };
  },
  methods: {
    comment() {
      this.commentShowState = !this.commentShowState;
    },
  },
  setup() {
    return {
      ellipsis: ref(true),
    };
  },
});
</script>
<style scoped>
.post {
  margin: 0 auto;
  color: #a6adb4;
  background-color: #303841;
}
.post ul {
  list-style: none;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 3% 3%;
  text-align: left;
}
.post ul li {
  width: 100%;
}
.postTitle {
  font-size: 30px;
  font-weight: 600;
}

.postAttribute {
  padding: 0% 0 0.5% 0;
}
.postAttribute p {
  width: 100%;
  margin: 0;
}
.postAttribute span:nth-child(2n) {
  font-weight: 500;
  padding: 0 3% 0 0.5%;
}

.postContent {
  padding: 2% 0 3% 0;
}

.readButtonLine a {
  width: 100%;
}
.readButton {
  display: block;
  box-sizing: border-box;
  width: 30%;
  padding: 1% 0%;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
  border-radius: 3px;
  color: #a6adb4;
  background-color: #001529;
}
/* 底部交互，点赞、评论、分享 */
.interaction span:nth-child(2n) {
  font-weight: 500;
  padding: 0 8% 0 0.5%;
  cursor: pointer;
}
.interaction .fold {
  float: right;
  width: 20%;
  text-align: right;
}
</style>
