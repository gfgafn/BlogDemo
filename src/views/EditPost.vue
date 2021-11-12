<template>
  <input @input="getPostTitle" class="EP_postTitle" :value="this.post.title" />
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editorId="editorId"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      :editorId="editorId"
      :mode="mode"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
      style="height: 500px"
    />
  </div>
  <div class="submit">
    <span class="subbut">
      <a-button type="primary" size="large" block @click="submitPostEdited"
        >提交更改</a-button
      >
    </span>
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 也可以在 <style> 中 import

import { computed, onUnmounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor,
} from "@wangeditor/editor-for-vue";
import cloneDeep from "lodash.clonedeep";
import * as API from "../http/api";

export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  // data() {
  //   return {
  //     postEdited: {
  //       record: null,
  //       title: "",
  //       content: [],
  //     },
  //   };
  // },
  setup() {
    const editorId = "postEditorSec";

    // 默认内容
    const defaultContent = [
      {
        type: "paragraph",
        children: [{ text: "一行文字" }],
      },
    ];

    // 注意，深度拷贝 content ，否则会报错
    const getDefaultContent = computed(() => cloneDeep(defaultContent));

    // 编辑器配置
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        insertImage: {
          checkImage(src) {
            console.log("image src", src);
            if (src.indexOf("http") !== 0) {
              return "图片网址必须以 http/https 开头";
            }
            return true;
          },
        },
      },
    };
    let post = reactive({
      record: null,
      title: "",
      content: [],
    });
    const route = useRoute();
    let postTemp = { ...post };

    // 编辑器回调函数

    /**
     * @description: 获取从路由传来的参数并更新到编辑器
     * @param {editor} wangEditor实例
     */
    const handleCreated = (editor) => {
      postTemp = JSON.parse(route.query.post);
      post.record = postTemp.record;
      post.title = postTemp.title;
      editor.children = JSON.parse(postTemp.content);
    };
    const handleChange = (editor) => {
      console.log("change:", editor.children);
    };
    const handleDestroyed = (editor) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor) => {
      console.log("blur", editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      // editor.insertText("xxx");

      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false); // 返回 false ，阻止默认粘贴行为
      callback(true); // 返回 true ，继续默认的粘贴行为
    };

    // 及时销毁编辑器
    onUnmounted(() => {
      const editor = getEditor(editorId);
      if (editor == null) return;

      // 销毁，并移除 editor
      editor.destroy();
      removeEditor(editorId);
    });

    return {
      editorId,
      mode: "default",
      getDefaultContent,
      editorConfig,
      post,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
    };
  },
  methods: {
    getPostTitle(event) {
      this.post.title = event.target.value;
    },
    getPostContent() {
      const editor = getEditor("postEditorSec");
      this.post.content = JSON.stringify(editor.children);
    },
    submitPostEdited() {
      let LocalStorageData = JSON.parse(localStorage.getItem("data"));
      if (LocalStorageData) {
        this.getPostContent();
        API.modifyPost(this.post).then((res) => {
          if (res.code === "200") {
            message.success("修改成功");
          } else {
            message.error("修改失败,请重试");
          }
        });
        // console.log(this.post);
      } else {
        message.error("请先登录");
      }
    },
  },
};
</script>
<style>
.EP_postTitle {
  width: 100%;
  font-size: 48px;
  font-weight: 600;
  outline: none;
  border: 1px solid rgb(204, 204, 204);
  border-bottom: 0;
}
.postTitle::input-placeholder {
  color: #d6d6d6;
}
/* 兼容WebKit browsers（Chrome的内核） */
.postTitle::-webkit-input-placeholder {
  color: #d6d6d6;
}
/* Mozilla Firefox 4 to 18 */
.postTitle::-moz-placeholder {
  color: #d6d6d6;
}
/* Mozilla Firefox 19+ */
.postTitle::-moz-placeholder {
  color: #d6d6d6;
}
/* Internet Explorer 10+ */
.postTitle::-ms-input-placeholder {
  color: #d6d6d6;
}
.submit {
  display: flex;
  padding: 3%;
}
.subbut {
  /* width: 20%; */
  display: inline-block;
  margin: 0 auto;
}
</style>