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
  <scroll :data="song" @scroll="scroll" :listenScroll="listenScroll" class="list" ref="list" :probe-type="probeType">
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
      console.log(this.imgHight + newValue)
      console.log(SCROLL_TOP)
      this.$refs.layer.style['transform']= `translate3d(0, ${newValue}px, 0)`
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
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
}
</style>
