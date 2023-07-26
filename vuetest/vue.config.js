const { defineConfig } = require('@vue/cli-service')
module.exports = {
    configureWebpack: {
    devServer: {
    host:'192.168.110.237',
    port: '8080',
    allowedHosts: 'all',
    https: false,
    open: false, // 配置自动启动浏览器
    }
  },
}