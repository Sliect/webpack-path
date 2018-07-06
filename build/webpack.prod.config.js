const baseConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackConfig = merge.smart(baseConfig, {
  context: path.resolve(__dirname, '../'),

  devtool: '#source-map',

  mode: "production",

  performance: {
    hints: false
  },

  plugins: [
    new OptimizeCssAssetsPlugin({}),
    // new BundleAnalyzerPlugin()
  ]
})

// npm run pbuild --report 可查看具体打包
if (process.env.npm_config_report) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig