import { createApp } from "vue";
import Antd from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";
import App from "./App.vue";
import router from "./router";

import "ant-design-vue/dist/antd.css";
const app = createApp(App);
// const icons = Icons;
app
  .use(router)
  .use(Antd)
  .mount("#app");
for (const i in Icons) {
  app.component(i, Icons[i]);
}
app.config.productionTip = false;
