const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

module.exports = merge.smart(baseWebpackConfig, {
  mode: "development",

  // devtool: '#cheap-module-eval-source-map',

  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    proxy: { //代理接口
      '/': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      // context: path.join(__dirname), // 加上不会去引用打好的包
      manifest: path.join(__dirname, 'vendor-manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../static/*.dll.js'),
    })
  ]
})