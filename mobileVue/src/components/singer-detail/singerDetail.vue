<template>
<transition name="slide">
<music-list v-if="transition1" :bgImg="bgImg" :title="title" :song="song"></music-list>
</transition>
</template>

<script>
import MusicList from '@/components/music-list/musicList.vue'
import { getSingerDetail, getVkey } from '@/api/singer.js'
import { mapGetters } from 'vuex'
// import { Song } from '@/common/js/song.js'
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
    ]),
    bgImg () {
      return this.singer.singer_pic
    },
    title () {
      return this.singer.singer_name
    }
  },
  created () {
    this._getSingerDetail(this.singer.singer_mid)
  },
  methods: {
    _getSingerDetail (singerId) {
      if (!singerId) { // 当出现直接在singerDetail页面刷新的情况后，直接跳到歌手页面
        this.$router.push({path: '/singer'})
        return
      }
      getSingerDetail(singerId).then(res => {
        let data = res.data.singer.data.songlist
        this.song = this._normalSongList(data)
        console.log(this.song)
      })
    },
    _normalSongList (list) {
      let ret = []
      let singerList = ''
      list.forEach(item => {
        if (item.singer.length > 1) {
          item.singer.forEach(items => {
            singerList += '/' + items.name
          })
        } else {
          singerList = item.singer[0].name
        }
        ret.push({'id': item.id, 'songName': item.name, 'mid': item.mid, 'singerName': singerList})
      })
      return ret
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
