<template>
<!-- play这个组件不受其他组件的影响所以放于app.vue下 -->
<div class="player" v-show="playlist.length > 0">
  <transition name="normal"
              v-on:enter="enter"
              v-on:after-enter="afterEnter"
              v-on:leave="leave"
              v-on:after-leave="afterLeave"
  >
    <div class="normal-player" key="full" v-show="fullScreen">
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
            <div class="cd" :class="cdCircle">
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
        <div class="operators">
          <div class="icon i-left">
            <i></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i :class="playIcon" @click="togglePlaying"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="mini" key="small">
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img width="40" height="40" :src="albumImg">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.songName}}</h2>
        <p class="desc">{{currentSong.singerName}}</p>
      </div>
      <div class="control">
        <i :class="playMiniIcon" @click.stop="togglePlaying"></i>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </transition>
  <audio :src="playSrc" ref="audio"></audio>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import scroll from '@/base/scroll/scroll.vue'
import animations from 'create-keyframe-animation'
export default {
  computed: {
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    playMiniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCircle () {
      return this.playing ? 'goRound' : ''
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playSrc',
      'playing'
    ]),
    bgImg () {
      return `//y.gtimg.cn/music/photo_new/T001R300x300M000${this.currentSong.songImg}.jpg?max_age=2592000`
    },
    albumImg () {
      return `//y.gtimg.cn/music/photo_new/T002R300x300M000${this.currentSong.albumImg}.jpg?max_age=2592000`
    }
  },
  data () {
    return {
      src: ''
    }
  },
  watch: {
    playSrc (newVAalue) {
      this.$nextTick(() => { // 这里需要想一下，不加的话不会播放
        this.$refs.audio.play()
      })
    },
    playing (newValue) {
      newValue ? this.$refs.audio.play() : this.$refs.audio.pause()
    }
  },
  components: {
    scroll
  },
  mounted () {
  },
  methods: {
    scaleSmall () {
      this.SET_FULL_SCREEN(false)
    },
    togglePlaying () {
      this.SET_PLAYING_STATE(!this.playing)
    },
    open () {
      this.SET_FULL_SCREEN(true)
    },
    ...mapMutations([
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE'
    ]),
    enter (el, done) { // 这个其实是设置进入时的起始状态，然后在规定的时间那日运动到真正的位置
      const { x, y, scale } = this._getPositionAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})` // 起始状态在左下角，并且缩放
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)` // 60%的时候，回到自己本身的位置，并且放大
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)` // 100%的时候再进行一次缩放
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 300,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move') // 取消动画
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) { // leave事件代表最终要去往的位置，也就是最终离开的位置
      this.$refs.cdWrapper.style.transition = 'all .3s'
      const { x, y, scale } = this._getPositionAndScale()
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done) // transitionend是一个事件类型
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transform = ''
      this.$refs.cdWrapper.style.transition = ''
    },
    _getPositionAndScale () {
      const targetWidth = 40 // 小图片宽度
      const paddingLeft = 13
      const paddingBottom = 12
      const paddingTop = 96
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width // 小于零
      const x = -(window.innerWidth / 2 - paddingLeft - targetWidth / 2)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom - targetWidth / 2
      return {
        x,
        y,
        scale
      }
    }
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
     &.normal-enter {
      .bottom {
        transform: translateY(100px);
      }
      .top {
        transform: translate3d(0, -100px, 0);
      }
    }
    &.normal-leave-to {
        .bottom {
        transform: translateY(100px);
      }
      .top {
        transform: translate3d(0, -100px, 0);
      }
    }
    &.normal-enter-active, &.normal-leave-active {
      transition: all .3s;
    .top,.bottom {
      transition: all .3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    }
  }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px)
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
      top: 60px;
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
          .goRound {
            -webkit-animation:cdPeople 5s linear infinite;
          }
           @-webkit-keyframes cdPeople {
            0% {transform: rotate(0deg);}
            25% {transform: ratate(90deg);}
            50% {transform: ratate(180deg)}
            75% {transform: ratate(270deg);}
            100% {transform: ratate(360%);}
           }
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid rgba(255, 255, 255, 0.1);
            .image {
              position: absolute;
              width: 90%;
              height: 90%;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px
          }
        }
        .i-right {
          text-align: left;
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
      text-align: center;
      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 20px;
        color: $color-theme-d;
      }
      .icon-mini {
        font-size: 32px;
      }
    }
  }
}
</style>
