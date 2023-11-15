const { defineConfig } = require('@vue/cli-service')

//npm_config 是一个环境变量，用于配置npm的一些参数，可以通过命令行中设置参数来配置，或通过编辑.npmrc文件来配置
const port = process.env.port || process.env.npm_config|| 8899

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV != 'production',
  assetsDir: 'static',
  publicPath: '/mall',
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    // port: port,
    open: false,
    client: {
      overlay: {
        warnings: false,
        errors: true
      },
    }
    // proxy: {
    //   proxy: 'http:\\'
    // }
  }
})
