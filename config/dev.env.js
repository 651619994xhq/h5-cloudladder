'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL:'"http://fat01-common-pay-service.zykj.com"',
  BASE_URL:'"http://10.10.25.7:8086"', //这里需要修改配置
  H5_BASE_URL:'""'
})
