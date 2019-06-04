const path = require('path')
// 使用htm模板的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 每次打包后dist并不会被自动清除，所以可以安装下面的插件
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const baseConfig = {
    entry: {
        test: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'image/[name].[hash:8].[ext]',
                            limit: 10000,
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory' // 参数是对结果缓存加速重新编译的速度
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('src')
        }
    }
}
module.exports = baseConfig