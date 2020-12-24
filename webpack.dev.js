const merge = require('webpack-merge') // eslint-disable-line node/no-unpublished-require
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map'
})
