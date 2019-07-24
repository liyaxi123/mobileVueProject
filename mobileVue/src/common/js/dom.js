export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s+|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return true
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}

// 为tansform属性针对不同的浏览器加不同的前缀
// 第一步创建元素
let els = document.createElement('div').style

let vender = (() => {
  let transformName = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let k in transformName) {
    if (els[transformName[k]] !== undefined) {
      return transformName[k]
    }
  }
  return false
})()

export function addPrefix (style) {
  if (vender === false) {
    return false
  }
}
