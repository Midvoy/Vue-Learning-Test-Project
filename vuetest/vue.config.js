const { defineConfig } = require('@vue/cli-service')
module.exports = {
    configureWebpack: {
    devServer: {
    host:'100.80.226.8',
    port: '8080',
    allowedHosts: 'all',
    https: false,
    open: false, // 配置自动启动浏览器
    }
  },
}