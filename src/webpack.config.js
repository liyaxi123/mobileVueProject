const path = require(path)
module.exports = {
    entry: './main.js', // 入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //出口路径
        filename: 'demo.js'
    }
}