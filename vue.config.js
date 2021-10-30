/*
 * @Author: your name
 * @Date: 2021-10-21 14:40:34
 * @LastEditTime: 2021-10-30 00:55:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \diantrain\vue.config.js
 */
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true, // 确定是运行时候编译,设置为 true 后你就可以在 Vue 组件中使用 template
  // chainWebpack: (config) => {
  //   config.module
  //     .rule("less")
  //     .use("less-loader")
  //     .loader("less-loader")
  //     .options({
  //       lessOptions: {
  //         /**less-loader 配置 */
  //         strictMath: true,
  //         noIeCompat: true,
  //         javascriptEnabled: true,
  //       },
  //     });
  // },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            // 'layout-sider-background': '#6593A6',
            'layout-header-background': '#58595B'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
