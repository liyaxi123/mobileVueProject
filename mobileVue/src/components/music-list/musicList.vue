<template>
<div class="musicList">
  <div class="back" @click="goBack">
    <i class="icon-back"></i>
  </div>
  <!-- 歌手名称 -->
  <h1 class="title">{{title}}</h1>
  <!-- 背景图片 -->
  <div class="bg-image" :style="bgStyle" ref="bgImage">
    <div class="play-wrapper">
      <div ref="playBtn" class="play">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
    </div>
    <div class="filter" ref="filter"></div>
  </div>
  <!-- 这个layer层是为了实现功能 -->
  <div class="bg-layer" ref="layer"></div>
  <scroll :data="song" @scroll="scroll" :listenScroll="listenScroll" class="list" ref="list" :probe-type="probeType">
    <div class="song-list-wrapper" ref="songListWrapper">
      <song-list :data="song" @selectItem="selectItem"></song-list>
    </div>
  </scroll>
  <div class="loading" v-show="!song.length">
    <loading></loading>
  </div>
</div>
</template>

<script>
import scroll from '@/base/scroll/scroll.vue'
import songList from '@/base/songList/songList.vue'
import loading from '@/base/loading/loading.vue'
import { mapMutations, mapActions } from 'vuex'
import { addPrefix } from '@/common/js/dom.js'
const transform = addPrefix('transform')
const SCROLL_TOP = 50
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  mounted () {
    this.imgHight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.imgHight}px`
  },
  props: {
    song: {
      type: Array,
      default: () => []
    },
    bgImg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectItem (item, index) {
      this.selectPlay({
        list: this.song,
        index
      })
    },
    scroll (opt) {
      // -200
      this.scrollY = opt.y
    },
    goBack () {
      this.$router.back()
      // this.SET_TRANSITIONFLAGS(false)
    },
    ...mapMutations([
      'SET_TRANSITIONFLAGS'
    ]),
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    scroll,
    songList,
    loading
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImg})`
    }
  },
  watch: {
    scrollY (newValue) {
      let transY = this.imgHight - SCROLL_TOP // 可以滚动的最大距离
      let scale = 1
      if (-newValue < transY) {
        this.$refs.layer.style[transform] = `translate3d(0, ${newValue}px, 0)`
        // 当这招到达最大值后改变图片的高度
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.bgImage.style.zIndex = 0
        this.$refs.playBtn.style.display = ''
      } else {
        this.$refs.bgImage.style.paddingTop = `${0}px`
        this.$refs.bgImage.style.height = `${SCROLL_TOP}px`
        this.$refs.bgImage.style.zIndex = 39
        this.$refs.list.$el.style.zIndex = 35
        this.$refs.playBtn.style.display = 'none'
      }
      if (newValue > 0) {
        scale = (1 + (Math.abs(newValue / this.imgHight)))
      }
      this.$refs.bgImage.style.transform = `scale(${scale})`
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
.musicList {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
  z-index: 100;
  .back {
    position: absolute;
    top: 0;
    left: 0px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme
    }
  }
  .title {
    position: absolute;
    top: 0;
    text-align: center;
    @include no-wrap();
    z-index: 40;
    line-height: 40px;
    font-size: $font-size-large;
    width: 100%;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;
    transform-origin: top;
    z-index: 30;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box; // 包括padding和border
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
  }
  .list {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: $color-background;
    z-index: 40;
    .song-list-wrapper {
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
    z-index: 35;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%)
  }
}
</style>
