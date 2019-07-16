import $api from '@/common/axios/request.js'
import { params } from '@/common/js/util.js'

export function getSingerInfo () {
  const url = '/api/getSingerList'
  const param = {
    '-': 'getUCGI6254991607978515',
    g_tk: 530494126,
    loginUin: 1148387889,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
  }
  const relUrl = `${url}${url.indexOf('?') < 0 ? '?' : '&'}${params(param)}`
  return $api({
    url: relUrl,
    method: 'get'
  })
}