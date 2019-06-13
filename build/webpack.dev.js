const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const devConfig = {
    mode: 'development', // webpack4 配置运行环境
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    // 以下是热更新的代码
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 监听的目录
        hot: true, // 热更新启用， 只会刷新修改的页面其他的不会刷新
        open: true, // 自动打开浏览器
        compress: false, // 为true时将会把dist文件夹的文件进行压缩
        historyApiFallback: true, // 单页路由 可以配置当路径不存在时的跳转路径
        host: "192.168.1.122"
    },
    // 热更新需要的插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                           config: {
                               path: '@/../postcss.config.js'
                           }
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = merge(baseConfig, devConfig)