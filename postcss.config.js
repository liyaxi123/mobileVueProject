module.exports = {
    plugins: [
        require('autoprefixer')
        ({browsers: ['last 5 versions']}),
        require('postcss-pxtorem')({
            rootValue: 100, // 1rem对100px
            propWhiteList: ['*'] // 对哪些属性进行转换*代表所有的
        })
    ]
}