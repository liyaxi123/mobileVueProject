export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s+|$)')
  console.log(el.className)
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
