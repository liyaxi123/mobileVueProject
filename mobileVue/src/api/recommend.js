import $api from '@/common/axios/request.js'
import { params } from '@/common/js/util.js'
import { parameter, recommendList } from '@/common/js/config.js'
// 获取轮播图的的数据
export function getRecommendData () {
  let url = '/api/getRecommendList'
  let relUrl = `${url}${url.indexOf('?') < 0 ? '?' : '&'}${params(parameter)}`
  return $api({
    url: relUrl,
    method: 'get'
  })
}

// 获取推荐菜单

export function getRecommendList () {
  let url = '/api/getRecommend'
  let relUrl = `${url}${url.indexOf('?') < 0 ? '?' : '&'}${params(recommendList)}`
  return $api({
    url: relUrl,
    method: 'get'
  })
}
