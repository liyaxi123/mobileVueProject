<template>
<div class="progress-bar" ref="progressBar" @click="progressClick">
  <div class="bar-inner">
    <div class="progress" ref="progress"></div>
    <div class="progressBtnWrapper" ref="progressBtn"
         @touchstart.prevent="progressTouchStart"
         @touchmove.prevent="progressTouchMove"
         @touchend.prevent="progressTouchend"
    >
      <div class="progressBtn"></div>
    </div>
  </div>
</div>
</template>

<script>
import { addPrefix } from '@/common/js/dom.js'
const progressBarWidth = 160
export default {
  props: {
    precent: 0
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressTouchStart (e) {
      this.touch.initial = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.initial) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const MoveWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      console.log(MoveWidth)
      this.$refs.progressBtn.style.transform = `translate3d(${MoveWidth}px, 0, 0)`
      this.$refs.progress.style.width = `${MoveWidth}px`
    },
    progressTouchend () {
      this.touch.initial = false
      this.$emit('percentChange', this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth)
    },
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect() // 获得父容器的left等
      const offsetWidth = e.offsetX
      const parentWidth = this.$refs.progressBar.clientWidth
      const percent = offsetWidth / parentWidth
      this.$refs.progressBtn.style.transform = `translate3d(${percent * parentWidth}px, 0, 0)`
      this.$refs.progress.style.width = `${percent * parentWidth}px`
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    precent (newValue) {
      if (newValue >= 0 && !this.touch.initial) {
        const width = this.$refs.progressBar.clientWidth * newValue
        this.$refs.progressBtn.style.transform = `translate3d(${newValue * width}px, 0, 0)`
        this.$refs.progress.style.width = `${newValue * width}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/scss/variable.scss';

  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 3px;
      background: rgba(0, 0, 0, 0.3);
      .progressBtnWrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 20px;
        height: 30px;
        .progressBtn {
          position: relative;
          top: 10px;
          left: 7px;
          box-sizing: border-box;
          width: 10px;
          height: 10px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme
        }
      }
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
    }
  }
</style>
