### 引用element-ui时, 发现fonts的打包路径有问题, 尝试了你的模板是没问题的, 但是看不出问题在哪

```
  npm i & npm start

  它会去在css/fonts/ 下找
  而实际存在于 fonts/下

  我的理解是相对于ouput.path 分离文件,也就是在dist/pages 下输出
  但是字体文件报了404, 而你的项目里字体文件是可以正确找到的

  烦恼了一下午, 只想出了copy 这个歪门方法, 实在是好奇到底哪里有区别
  如能帮助, 万分感谢！！
```

### 解决办法
```
  MiniCssExtractPlugin.loader 改成如下即可
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
```