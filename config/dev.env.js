'use strict'
const merge = require('webpack-merge')  //将两个对象种的配置合并
const prodEnv = require('./prod.env')   //包含一些与生产环境相关的变量和设置

module.exports = merge(prodEnv,{
    NODE_ENV: '"development"',
    BASE_API: '"http://localhost:8888"'
})