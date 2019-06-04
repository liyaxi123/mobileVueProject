//模块合并插件
const merge= require('webpack-merge')
// 将css提取为独立的文件，每一个包含css的js都会创建一个css文件 支持按需加载css和sourceMap
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
// 压缩css
constOptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 对js文件进行压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.js')

const prodConfig = {
    mode: 'production',
    // production环境下需要将css进行抽离而dev下不需要，所以在这里配置
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // css抽离成单独文件
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash:8].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new constOptimizeCssAssetsPlugin({}) // css压缩
        ]
    }
}

module.exports = merge(baseConfig, prodConfig)
