<!--
 * @Author: your name
 * @Date: 2021-11-01 22:21:45
 * @LastEditTime: 2021-11-04 13:27:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\src\components\Register.vue
-->
<template lang="">
    <div>
      <span type="primary" @click="showModal">注册</span>
      <a-modal
        v-model:visible="visible"
        title="注册"
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
            <a-input v-model:value="formState.email" placeholder="example@example.com">
              <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password v-model:value="formState.password" type="password" placeholder="Password">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-input-password v-model:value="formState.passwordSec" type="password" placeholder="Password">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="formState.user === '' || formState.password === ''"
            >
              Register
            </a-button>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>
<script>
import { ref, defineComponent, reactive } from "vue";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import * as API from "../http/api";
export default defineComponent({
  components: { UserOutlined, LockOutlined, MailOutlined },
  setup() {
    // 注册弹窗是否可见
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    // reactive声明响应式数据，用于声明引用数据类型
    const formState = reactive({
      user: "",
      email: "",
      password: "",
      passwordSec: "",
    });

    const handleFinish = async () => {
      const isAllowed = registerIf(formState);
      if (isAllowed) {
        const formData = {
          name: formState.user,
          email: formState.email,
          password: formState.password,
        };
        console.log(formData);
        const { code } = await API.register(formData);
        if (code === "200") {
          message.success("注册成功");
        } else if (code === "403") {
          message.error("重复注册");
        } else {
          message.error("注册失败");
        }
      }
    };

    /**
     * @description: 检验是否具有注册资质，即验证邮箱格式和检验前后两次输入的密码是否一致
     * @param {formState} 注册表单中的数据
     * @return {true | false} 是否允许注册
     */
    const registerIf = (formState) => {
      const { email, password, passwordSec } = formState;
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (reg.test(email)) {
        if (password === passwordSec) {
          return true;
        } else {
          message.error("密码不一致");
          return false;
        }
      } else {
        message.error("邮箱格式错误");
        return false;
      }
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    return {
      visible,
      showModal,
      // 注册表单数据
      formState,
      handleFinish,
      registerIf,
      handleFinishFailed,
    };
  },
});
</script>
<style lang="">
</style>