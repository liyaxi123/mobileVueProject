<template>
    <div class="slider" ref="slider">
        <ul class="slider-group" ref="sliderGroup">
            <slot></slot>
        </ul>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index">
            </span>
        </div>
    </div>
</template>

<script>
import { addClass } from '@/common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0,
      flag: true
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return true
      }
      this._setSliderWidth()
      this.slider.refresh() // 重新计算宽度
    })
  },
  activated () {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    clearTimeout(this.timer)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth () {
      this.children = this.$refs.sliderGroup.children // 获取可滚动容器内的所有子对象
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth // 获取父容器的可视宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item') // 为每个子对象加slider-item类
        child.style.width = sliderWidth + 'px' // 设置子对象宽度为父容器宽度
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 允许横向滚动
        scrollY: false, // 不能纵向滚动
        momentum: false, // 没有缓冲
        // snap: true, // 开启snap
        // snapLoop: this.loop, //循环播放
        // snapThreshold: 0.3, // 播放到下一个所用时间
        // snapSpeed: 400, // 速度
        click: true,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX // 横轴方向的页面数（当前页面的信息）
        // console.log(pageIndex + '测试')
        // if (this.loop) {
        //   pageIndex -= 1
        // }
        this.currentPageIndex = pageIndex
        // console.log(this.currentPageIndex + 'currentPage')
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
      this.slider.on('beforeScrollStrat', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      // let pageIndex = this.currentPageIndex + 1
      // console.log(pageIndex + 'currentPageIndex')
      // console.log(1111111)
      // if (this.loop) {
      //   pageIndex += 1
      // }
      // console.log(pageIndex+ 'pageIndex')
      this.timer = setTimeout(() => {
        // this.slider.goToPage(pageIndex, 0, 400) // 滚动到指定的页面,第一页为1
        // if (pageIndex === 5) {
        //   this.slider.goToPage(0, 0, 400)
        // }
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/variable.scss';
.slider {
  min-height: 1px;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    width: 100%;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-l
      }
    }
  }
}
</style>
