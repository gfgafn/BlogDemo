<!--
 * @Author: your name
 * @Date: 2021-10-31 01:58:47
 * @LastEditTime: 2021-11-02 16:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\components\Comment.vue
-->
<template>
  <a-list
    class="comment-list"
    :header="`${data.length} replies`"
    item-layout="horizontal"
    :data-source="data"
  />
  <AddComment />
  <a-list class="comment-list" item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment :author="item.author" :avatar="item.avatar">
          <template #actions>
            <span key="comment-basic-like">
              <a-tooltip title="Like">
                <template v-if="action === 'liked'">
                  <LikeFilled @click="like" />
                </template>
                <template v-else>
                  <LikeOutlined @click="like" />
                </template>
              </a-tooltip>
              <span style="padding-left: 8px; cursor: auto">
                {{ item.likes }}
              </span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="Dislike">
                <template v-if="action === 'disliked'">
                  <DislikeFilled @click="dislike" />
                </template>
                <template v-else>
                  <DislikeOutlined @click="dislike" />
                </template>
              </a-tooltip>
              <span style="padding-left: 8px; cursor: auto">
                {{ item.dislikes }}
              </span>
            </span>
            <span v-for="(action, index) in item.actions" :key="index">{{
              action
            }}</span>
          </template>
          <template #content>
            <p>
              {{ item.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
              <span>{{ item.datetime.fromNow() }}</span>
            </a-tooltip>
          </template>
          <a-comment>
            <template #actions>
              <span>Reply to</span>
            </template>
            <template #author>
              <a>Han Solo</a>
            </template>
            <template #avatar>
              <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            </template>
            <template #content>
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure).
              </p>
            </template>
            <a-comment>
              <template #actions>
                <span>Reply to</span>
              </template>
              <template #author>
                <a>Han Solo</a>
              </template>
              <template #avatar>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              </template>
              <template #content>
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure).
                </p>
              </template>
            </a-comment>
            <a-comment>
              <template #actions>
                <span>Reply to</span>
              </template>
              <template #author>
                <a>Han Solo</a>
              </template>
              <template #avatar>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              </template>
              <template #content>
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure).
                </p>
              </template>
            </a-comment>
          </a-comment>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import dayjs from "dayjs";
import { defineComponent, ref } from "vue";
import {
  LikeFilled,
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
} from "@ant-design/icons-vue";
import relativeTime from "dayjs/plugin/relativeTime";
import AddComment from "./AddComment.vue";
dayjs.extend(relativeTime);
export default defineComponent({
  components: {
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined,
    AddComment,
  },
  setup() {
    const likes = ref(0);
    const dislikes = ref(0);
    const action = ref();

    const like = () => {
      likes.value = 1;
      dislikes.value = 0;
      action.value = "liked";
    };

    const dislike = () => {
      likes.value = 0;
      dislikes.value = 1;
      action.value = "disliked";
    };
    return {
      like,
      dislike,
      data: [
        {
          likes,
          dislikes,
          actions: ["Reply to"],
          author: "Han Solo",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: dayjs().subtract(1, "days"),
        },
        {
          likes,
          dislikes,
          actions: ["Reply to"],
          author: "Han Solo",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: dayjs().subtract(2, "days"),
        },
      ],
      dayjs,
    };
  },
});
</script>