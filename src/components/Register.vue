<!--
 * @Author: your name
 * @Date: 2021-11-01 22:21:45
 * @LastEditTime: 2021-11-01 23:08:03
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
            <a-input-password v-model:value="formState.password" type="password" placeholder="Password">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-input-password v-model:value="formState.passwordSec" type="password" placeholder="Input Password Secondly">
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
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import * as HTTP from "../http/api";
export default defineComponent({
  components: { UserOutlined, LockOutlined },
  setup() {
    // 注册弹窗是否可见
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    // reactive声明响应式数据，用于声明引用数据类型
    const formState = reactive({
      user: "",
      password: "",
      passwordSec: "",
    });

    const handleFinish = async (values) => {
      const isAllowed = VerifyPwd();
      if (isAllowed) {
        console.log(values, formState, isAllowed);
        const { code } = await HTTP.register(isAllowed);
        if (code === 200) {
          message.success("注册成功");
          visible.value = false;
        } else {
          message.error("登陆失败");
        }
      } else {
        message.error("密码不一致");
      }
    };
    
    /**
     * @description: 验证前后两次输入的密码是否一致
     * @param {formState} 注册表单中的数据
     * @return {true | false} 是否允许注册
     */
    const VerifyPwd = (formState) => {
      const { password, passwordSec } = formState;
      if (password === passwordSec) {
        return true;
      } else {
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
      VerifyPwd,
      handleFinishFailed,
    };
  },
});
</script>
<style lang="">
</style>