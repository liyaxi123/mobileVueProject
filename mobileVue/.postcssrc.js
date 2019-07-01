// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue: 10, // 转换rem的标准，然后乘以根元素字体大小得到真正的尺寸
      unitPrecision: 5,
      propList: ['*'],
      replace: true
    }
  }
}
