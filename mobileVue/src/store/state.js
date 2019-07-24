import { playMode } from '@/common/js/config.js'
const state = {
  singer: {},
  transition: false, // 控制歌手详情页的动画效果
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1

}

export default state
