<template>
<!-- play这个组件不受其他组件的影响所以放于app.vue下 -->
<div class="player" v-show="playlist.length">
  <div class="normal-player" v-show="fullScreen">
    <div class="background">
      <img width="100%" height="100%" :src="bgImg">
    </div>
    <div class="top">
      <div class="back" @click="scaleSmall">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{currentSong.songName}}</h1>
      <h2 class="subtitle">{{currentSong.singerName}}</h2>
    </div>
    <div class="middle">
      <div class="middle-l" ref="middleL">
        <div class="cd-wrapper" ref="cdWrapper">
          <div class="cd">
            <img class="image" :src="albumImg">
          </div>
        </div>
        <div class="playing-lyric-wrapper">
          <div class="playing-lyric"></div>
        </div>
      </div>
      <scroll class="middle-r" ref="lyricList">
        <div class="lyric-wrapper">
          <div>
            <p ref="lyricLine" class="text"></p>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <div class="dot-wrapper"></div>
    </div>
  </div>
  <div class="mini-player" v-show="!fullScreen">
    <div class="icon">
      <img width="40" height="40" :src="albumImg">
    </div>
    <div class="text">
      <h2 class="name">{{currentSong.songName}}</h2>
      <p class="desc">{{currentSong.singerName}}</p>
    </div>
    <div class="control">
      <i class="icon-playlist"></i>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import scroll from '@/base/scroll/scroll.vue'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ]),
    bgImg () {
      return `//y.gtimg.cn/music/photo_new/T001R300x300M000${this.currentSong.songImg}.jpg?max_age=2592000`
    },
    albumImg () {
      return `//y.gtimg.cn/music/photo_new/T002R300x300M000${this.currentSong.albumImg}.jpg?max_age=2592000`
    }
  },
  components: {
    scroll
  },
  methods: {
    scaleSmall () {
      this.SET_FULL_SCREEN(false)
    },
    ...mapMutations([
      'SET_FULL_SCREEN'
    ])
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
.player {
  .normal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        transition-property: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg)
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-medium;
        line-height: 40px;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text;
        text-align: center;
      }
    }
    .middle {
      position: fixed;
      top: 55px;
      bottom: 170px;
      white-space: nowrap;
      width: 100%;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        padding-top: 80%;
        height: 0;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid rgba(255, 255, 255, 0.1);
            .image {
              position: absolute;
              width: 100%;
              height: 100%;
              left : 0;
              top: 0;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 180;
    bottom: 0;
    height: 40px;
    background: $color-highlight-background;
    .icon {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 5px 0 8px;
      img {
        border-radius: 50%;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 10px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        @include no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
      .desc {
        @include no-wrap();
        font-size: $font-size-small-s;
        color: $color-text-d
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 20px;
        color: $color-theme-d;
      }
    }
  }
}
</style>
