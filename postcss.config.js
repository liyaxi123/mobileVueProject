module.exports = {
    plugins: [
        require('autoprefixer')
        ({browsers: ['last 5 versions']}),
        require('postcss-pxtorem')({
            rootValue: 32, // 1rem对100px 比如设置字体60px则为1rem 然后1rem为根元素的字体大小，假设根元素字体为16px,则实际上设置的字体为16px
            propWhiteList: ['*'] // 对哪些属性进行转换*代表所有的
        })
    ]
}