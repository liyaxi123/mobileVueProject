<template>
<transition name="slide">
<music-list v-if="transition1" :bgImg="bgImg" :title="title"></music-list>
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
        console.log(data)
        this.song = data
      })
    }
    // _normalSongList (list) {
    //   let ret = []
    //   list.forEach(item => {
    //     // new Song(item.id, item.mid, item.singer[0].name, item.album.name, item.interval, item.)

    //   })
    // }
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
