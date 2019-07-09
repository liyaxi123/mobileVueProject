import $api from '@/common/axios/request.js'
import { params } from '@/common/js/util.js'
import { parameter } from '@/common/js/config.js'

export function getRecommendData () {
  let url = '/api/getRecommendList'
  let relUrl = `${url}${url.indexOf('?') < 0 ? '?' : '&'}${params(parameter)}`
  return $api({
    url: relUrl,
    method: 'get'
  })
}
