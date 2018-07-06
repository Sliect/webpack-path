const path = require('path')
const webpack = require('webpack')

const vendors = ['vue/dist/vue.esm.js', 'element-ui', 'vue-router', 'axios', 'babel-polyfill']

module.exports = {
  mode: "development",

  entry: {
    vendor: vendors
  },

  output: {
    path: path.join(__dirname, '../static'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },

  devtool: '#source-map',

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
}