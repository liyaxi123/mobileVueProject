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
        <div class="progress-wrapper">
          <span class="time time-l">{{formatData(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar @percentChange="percentChange" :precent="percent"></progress-bar>
          </div>
          <span class="time time-r">{{formatData(currentSong.interval)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i></i>
          </div>
          <div class="icon i-left" @click="prev" :class="disableCls">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlaying"></i>
          </div>
          <div class="icon icon-right" @click="next" :class="disableCls">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="mini" key="small">
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img width="40" height="40" :src="albumImg" :class="cdCircle">
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
  <audio :src="playSrc" ref="audio" @timeupdate="updateTime" @canplay="ready" @error="error"></audio>
  <!-- 定义canplay的原因是，当快速点击下一曲，上一曲的时候，歌曲可能还没加载完成，播放就会报错，
  而canplay方法是歌曲加载完成后触发，所以可以通过该方法进行判断， error是对canplay方法的完善完善
   -->
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import scroll from '@/base/scroll/scroll.vue'
import animations from 'create-keyframe-animation'
import { getVkey } from '@/api/singer.js'
import progressBar from '@/base/progressBar/progressBar.vue'
export default {
  computed: {
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    playMiniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCircle () {
      return this.playing ? 'goRound' : 'goRound pause'
    },
    percent () {
      return this.currentTime / this.currentSong.interval
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playSrc',
      'playing',
      'currentIndex'
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
      src: '',
      currentTime: 0,
      songReady: false
    }
  },
  watch: {
    playSrc (newVAalue) {
      this.$nextTick(() => { // 这里需要想一下，不加的话不会播放
        this.$refs.audio.play()
      })
    },
    playing (newValue) {
      newValue ? this.$nextTick(() => { this.$refs.audio.play() }) : this.$nextTick(() => { this.$refs.audio.pause() })
    }
  },
  components: {
    scroll,
    progressBar
  },
  mounted () {
  },
  methods: {
    scaleSmall () {
      this.SET_FULL_SCREEN(false)
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.SET_PLAYING_STATE(!this.playing)
    },
    open () {
      this.SET_FULL_SCREEN(true)
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (!this.playing) {
        this.SET_PLAYING_STATE(true)
      }
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playlist.length - 1
      }
      getVkey(this.playlist[index].mid).then(res => {
        console.log(res)
        let content = res.data.req_0.data.midurlinfo[0].purl
        let ht = res.data.req_0.data.sip[0]
        this.SET_PLAYSRC(`${ht}${content}`)
        this.SET_CURRENT_INDEX(index)
      })
      this.songReady = false
    },
    ready () {
      this.songReady = true
    },
    error (e) {
       // error事件是为了完善canplay事件，是想有些时候可能网络原因歌曲一直无法加载，导致this.songReady无法为true
       //所以出现错误的话，我们也设置为true就好了
     this.songReady = true
    },
    percentChange (val) {
      this.$refs.audio.currentTime = this.currentSong.interval * val
    },
    next () {
      if (!this.songReady) {
        return
      }
      if (!this.playing) {
        this.SET_PLAYING_STATE(true)
      }
      let index = this.currentIndex + 1
      if (index > this.playlist.length - 1) {
        index = 0
      }
      getVkey(this.playlist[index].mid).then(res => {
        let content = res.data.req_0.data.midurlinfo[0].purl
        let ht = res.data.req_0.data.sip[0]
        this.SET_PLAYSRC(`${ht}${content}`)
        this.SET_CURRENT_INDEX(index)
      })
      this.songReady = false
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    ...mapMutations([
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE',
      'SET_PLAYSRC',
      'SET_CURRENT_INDEX'
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
    },
    formatData (data) {
      let min = Math.floor(data / 60)
      let second = Math.floor(data % 60)
      if (second < 10) {
        second = '0' + second
      }
      return `${min}:${second}`
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
      top: 70px;
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
            &.goRound {
            animation:cdPeople 20s linear infinite;
          }
          &.pause {
            animation-play-state:paused
          }
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
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align:left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1
        }
      }
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
        &.goRound {
          animation:cdPeople 20s linear infinite;
        }
        &.pause {
          animation-play-state:paused
        }
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
  @keyframes cdPeople {
    0% {transform: rotate(0deg) scale(1);}
    25% {transform: rotate(90deg) scale(0.5);}
    50% {transform: rotate(180deg) scale(0.3)}
    75% {transform: rotate(270deg) scale(0.5);}
    100% {transform: rotate(360deg) scale(1);}
  }
}
</style>
