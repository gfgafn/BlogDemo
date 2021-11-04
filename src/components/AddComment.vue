<!--
 * @Author: your name
 * @Date: 2021-11-02 11:29:51
 * @LastEditTime: 2021-11-02 16:17:07
 * @LastEditors: Please set LastEditors
 * @Description: 添加评论
 * @FilePath: \diantrain\src\components\AddComment.vue
-->
<template>
  <a-comment>
    <template #avatar>
      <a-avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    </template>
    <template #content>
      <a-form-item>
        <a-textarea
          v-model:value="value"
          :rows="2"
          placeholder="发一条友善的评论"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          :loading="submitting"
          type="primary"
          @click="handleSubmit"
        >
          发表评论
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
  <a-list
    v-if="comments.length"
    :data-source="comments"
    :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
    item-layout="horizontal"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        >
          <template #actions>
            <span key="comment-basic-like">
              <a-tooltip title="Like">
                <template v-if="action === 'like'">
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
            <span v-for="(action, index) in item.actions" :key="index">
              {{ action }}
            </span>
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  <!-- <a-comment>
    <template #avatar>
      <a-avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    </template>
    <template #content>
      <a-form-item>
        <a-textarea
          v-model:value="value"
          :rows="2"
          placeholder="发一条友善的评论"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          :loading="submitting"
          type="primary"
          @click="handleSubmit"
        >
          发表评论
        </a-button>
      </a-form-item>
    </template>
  </a-comment> -->
</template>
<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default defineComponent({
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

    const comments = ref([]);
    const submitting = ref(false);
    const value = ref("");

    const handleSubmit = () => {
      if (!value.value) {
        return;
      }

      submitting.value = true;
      setTimeout(() => {
        submitting.value = false;
        comments.value = [
          {
            actions: ["Reply to"],
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: value.value,
            datetime: dayjs().fromNow(),
          },
          ...comments.value,
        ];
        value.value = "";
      }, 1000);
    };

    return {
      like,
      dislike,
      comments,
      submitting,
      value,
      handleSubmit,
    };
  },
});
</script>