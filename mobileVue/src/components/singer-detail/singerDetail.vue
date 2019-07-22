<template>
<transition name="slide">
<music-list v-if="transition1"></music-list>
</transition>
</template>

<script>
import MusicList from '@/components/music-list/musicList.vue'
import { getSingerDetail } from '@/api/singer.js'
import { mapGetters } from 'vuex'
import { Song } from '@/common/js/song.js' 
export default {
  data () {
    return {
      song: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'singer',
      'transition1'
    ])
  },
  created () {
    this._getSingerDetail(this.singer.singer_mid)
  },
  methods: {
    _getSingerDetail (singerId) {
      getSingerDetail(singerId).then(res => {
        console.log(res.data.singer.data.songlist)
        this.song = this._normalSongList(res.data.singer.data.songlist)
      })
    },
    _normalSongList (list) {
      let ret = []
      list.forEach( item => {
        new Song(item.id, item.mid, item.singer[0].name, item.album.name, item.interval, item.)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active{
   transition: all  .3s
}
.slide-enter,.slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
guid: 9285586180
vkey: DE18D32D05D71D32D4AE2D584314E8DE45942979F6039134E47202193F1CBEB199109511722D2AA8EF943F9AF6BCC64EAC8BDB00C58DC142
uin: 561
fromtag: 66

//抓取v-key的接口
-: getplaysongvkey8306853865854023
g_tk: 1592920106
loginUin: 1148387889
hostUin: 0
format: json
inCharset: utf8
outCharset: utf-8
notice: 0
platform: yqq.json
needNewCode: 0