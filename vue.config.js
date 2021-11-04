/*
 * @Author: your name
 * @Date: 2021-10-21 14:40:34
 * @LastEditTime: 2021-11-04 10:28:07
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
            "layout-header-background": '#58595B',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    // host: 'localhost',
    // port: 8081,
    // open: true,// vue项目启动时自动打开浏览器
    proxy: {
      "/api": {
        // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        target: "http://39.108.117.28:8080", //目标地址，一般是指后台服务器地址
        changeOrigin: true, //是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
            '^/api': "/api"
        }
      },
    },
  },
};
