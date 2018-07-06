const path = require('path');

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackClearConsole = require('webpack-clear-console').WebpackClearConsole;
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader'); //webpack4.6开始需要引入此插件，主要由于这里使用的是vue-loader版本大于15，低于15的不需要，切记切记，不然就会鸡鸡掉
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'js/[name].js?v=[hash]',
    path: path.resolve(__dirname, "../dist/pages")
  },

  module: {
    rules: [{
      test: /\.(css|postcss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      test: /\.vue$/,
      include: path.resolve(__dirname, "../src"),
      loader: 'vue-loader'
    }, {
      test: /\.(png|svg|jpg|jpeg|gif|ogg|mp4)$/,
      use: {
        loader: 'file-loader',
        options: {
          //打包生成图片的名字
          name: "[name].[ext]",
          //图片的生成路径
          outputPath: 'img/'
        }
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      // use: {
      //   loader: "url-loader",
      //   options: {
      //     limit: 20000,
      //     name: 'fonts/[name].[hash:8].[ext]'
      //   }
      // }
      use: {
        loader: 'file-loader',
        options: {
          name: "[name].[ext]",
          outputPath: 'fonts/'
        }
      }
    }]
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'swiper$': 'swiper/dist/js/swiper.min.js'
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({ //IE低版本浏览器兼容
      Promise: 'es6-promise-promise'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      // chunkFilename: "[id].css"
    }),
    //new WebpackClearConsole(),
    //new UnminifiedWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'demo',
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],

  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "commons",
          chunks: "all"
        }
      }
    }
  }
}