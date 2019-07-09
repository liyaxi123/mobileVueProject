export function params (data) {
  let url = ''
  for (let k in data) {
    url += `&${k}=${encodeURIComponent(data[k])}`
  }
  return url === '' ? '' : url.substring(1)
}
