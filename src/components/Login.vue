<!--
 * @Author: your name
 * @Date: 2021-10-31 02:42:26
 * @LastEditTime: 2021-11-01 20:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\components\Login.vue
-->
<template>
  <div>
    <span type="primary" @click="showModal">登录</span>
    <a-modal
      v-model:visible="visible"
      title="登录"
      :footer="null"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
    <p>
      {{ modalText }}
      <a-form
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item>
          <a-input v-model:value="formState.user" placeholder="Username">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.password" type="password" placeholder="Password">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </p>
    </a-modal>
  </div>
</template>
<script>
import { ref, defineComponent, reactive  } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import * as HTTP from '../http/api'
export default defineComponent({
  components: { UserOutlined ,LockOutlined },
  setup() {
    // 登录弹窗是否可见
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    // loginform
    // reactive声明响应式数据，用于声明引用数据类型   
    const formState = reactive({
      user: '',
      password: '',
    });

    const handleFinish = async (values) => {
      console.log(values, formState);
      const {code}  = await HTTP.login(formState)
      if (code === 200) {
        message.success('登录成功');
        visible.value = false;
      } else {
        message.error('登陆失败');
      }
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };
    return {
      visible,
      showModal,
      // loginform
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },

});
</script>