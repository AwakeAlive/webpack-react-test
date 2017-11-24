const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    app: './src/index.js',
    // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，
    // 这是因为，它们很少像本地的源代码那样频繁修改。
    // 因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，
    // 并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 entry(入口) 起点，
    // 以及再额外配置一个 CommonsChunkPlugin 实例的组合方式来实现：
    vendors: [ //  第三方库(vendor) 入口
      'lodash',
      'babel-polyfill'
    ]
  }, // 项目入口文件地址
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // CommonsChunkPlugin 可以用于将模块分离到单独的文件中
    // 能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。
    // 通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中：
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ],
  output: {
    path: `${__dirname}/dist`, // 这里是项目输出的路径，_dirname 表示当前稳健的位置 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    filename: 'js/[name].[chunkhash].js' // 这里是生成文件的名称，可起想要的名字
  },
  // 能找到.eslintrc.js
  // eslint: {
  //   configFile: '.eslintrc.js'
  // },
  // loader 用于对模块的源代码进行转换。
  // loader 可以使你在 import 或"加载"模块时预处理文件。
  // 因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。
  // loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL
  module: {
    rules: [
      // js 验证
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015', 'react'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        // 例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，
        // 或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：
        test: /\.(less|css)?$/,
        // http://npm.taobao.org/package/autoprefixer
        // cnpm i -S autoprefixer
        // cnpm i -D postcss-loader
        loader: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      }
    ]
  }
}

module.exports = config
