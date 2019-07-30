export function params (data) {
  let url = ''
  for (let k in data) {
    url += `&${k}=${encodeURIComponent(data[k])}`
  }
  return url === '' ? '' : url.substring(1)
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  let _arr = arr.slice() // 返回一个新的数组
  for (let i = 0; i < _arr.length; i++) {
    getRandomInt()
  }
}
