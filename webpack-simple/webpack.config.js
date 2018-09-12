var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    // __dirname + '/public' 之前的写法
    // path: path.resolve(__dirname, './dist') 和上面的是一样的
    path: path.resolve(__dirname, './dist'),
    //  publicPath: 顾名思义就是一个公共地址，用于处理静态资源的引用地址问题，比如图片的地址路径问题。
    //  /dist/ 之前是这个 但是我们本地运行报错了
    // publicPath: './',
    publicPath: './',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    //在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在。resolve.extensions用于配置在尝试过程中用到的后缀列表
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    //当使用html5 history api,将会在响应404时返回index.html。想要开启该功能进行如下设置
    historyApiFallback: true,
    // 启用noInfo，类似webpack bundle启动或保存的信息将会被隐藏，Errors和warnings仍会被显示
    noInfo: true,
    // 在浏览器上全屏显示编译的errors或warnings。默认是关闭的
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// 关于生产环境和开发环境的判断
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template : 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
