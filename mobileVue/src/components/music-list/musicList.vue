<template>
<div class="musicList">
  <div class="back">
    <i class="icon-back"></i>
  </div>
  <!-- 歌手名称 -->
  <h1 class="title">{{title}}</h1>
  <!-- 背景图片 -->
  <div class="bg-image" :style="bgStyle" ref="bgImage">
    <div class="filter" ref="filter"></div>
  </div>
  <div class="bg-layer" ref="layer"></div>
  <scroll class="list" ref="list" :data="song" @scroll="scroll" :listenScroll="listenScroll">
    <div class="song-list-wrapper" ref="songListWrapper"> 
      <song-list :data="song"></song-list>
    </div>
  </scroll>
</div>
</template>

<script>
import scroll from '@/base/scroll/scroll.vue'
import songList from '@/base/songList/songList.vue'
const SCROLL_TOP = 40
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  mounted () {
    let imgHight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${imgHight}px`
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
    scroll (opt) {
      // -200
      this.scrollY = opt.y
    }
  },
  components: {
    scroll,
    songList
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImg})`
    }
  },
  watch: {
    scrollY (newValue) {
      if (this.imgHight + newValue <= this.SCROLL_TOP) {
        this.$refs.songListWrapper.$el.style.top = `${this.SCROLL_TOP}px`
      }
    }
  },
  created () {
    this.listenScroll = true
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
    left: 6px;
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
    background-size: auto;
    transform-origin: top;
  }
  .list {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      background: $color-background;
      position: fixed;
      width: 100%;
    }
  }
}
</style>
