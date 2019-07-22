<template>
<div class="musicList">
  <div class="back">
    <i class="icon-back"></i>
  </div>
  <!-- 歌手名称 -->
  <h1 class="title">{{title}}</h1>
  <!-- 背景图片 -->
  <div class="bg-image" :style="bgStyle">
    <div class="filter" ref="filter"></div>
  </div>
  <div class="bg-layer" ref="layer"></div>
  <scroll>
    <div class="song-list-wrapper">
      <song-list></song-list>
    </div>
  </scroll>
</div>
</template>

<script>
import scroll from '@/base/scroll/scroll.vue'
import songList from '@/base/songList/songList.vue'
export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
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
}
</style>
