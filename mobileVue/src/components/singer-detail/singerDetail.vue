<template>
<transition name="slide"
>
  <music-list :bgImg="bgImg" :title="title" :song="song" ref="musicList"></music-list>
</transition>
</template>

<script>
import MusicList from '@/components/music-list/musicList.vue'
import { getSingerDetail } from '@/api/singer.js'
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
      return `//y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg?max_age=2592000`
    },
    title () {
      return this.singer.singer_name
    }
  },
  created () {
    console.log(this.singer)
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
        singerList = singerList[0] === '/' ? singerList.substr(1) : singerList
        ret.push({'id': item.id, 'songName': item.name, 'mid': item.mid, 'singerName': singerList, 'songImg': item.singer[0].mid, 'albumImg': item.album.mid})
      })
      return ret
    }
    // beforeEnter (el) {
    //   this.$refs.musicList.$el.style.transition = 'all 3s'
    //   this.$refs.musicList.$el.style.transform = `translate3d(0, 100%, 0)`
    // },
    // enter (el, done) {
    //   this.$refs.musicList.$el.style.transition = 'all 3s'
    //   this.$refs.musicList.$el.style.transform = `translate3d(0, 100%, 0)`
    //   this.$refs.musicList.$el.addEventListener('transitionend', done)
    // },
    // afterEnter () {
    //   this.$refs.musicList.$el.style.transition = ''
    //   this.$refs.musicList.$el.style.transform = ''
    // },
    // leave (el, done) {
    //   this.$refs.musicList.$el.style.transition = 'all 3s'
    //   this.$refs.musicList.$el.style.transform = `translate3d(100%, 0, 0)`
    // }
  }
}
</script>

// <style lang="scss" scoped>
.musicList.slide-enter-active, .musicList.slide-leave-active {
   transition: all  3s
}
.musicList.slide-enter, .musicList.slide-leave-to {
  transform: translateX(100%)
}
</style>
