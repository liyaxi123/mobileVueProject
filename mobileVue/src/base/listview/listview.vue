<template>
<!-- 这里：data=data是为了配合scroll组件中的watch，当data改变时，scroll就会重新初始化 -->
<!-- 这里的@scoll是监听scroll组件传递的事件scroll -->
  <scroll class="listview"
          :data="data"
          ref="listview"
          :probeType=3
          @scroll="scroll"
          :listen-scroll="listenScroll"
          >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup" :key="group.title">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.singer_id">
            <img class="avatar" v-lazy="item.singer_pic">
            <span class="name">{{item.singer_name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"  :data-index="index" :key="item" class="item"
            :class="{'current': currentIndex=== index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTilte!== ''" ref="fixedTitle">
      <h1 class="fixed-title">{{fixedTilte}}</h1>
    </div>
    <div class="loading" v-show="!data.length">
      <Loading></Loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue'
import { getData } from '@/common/js/dom'
import Loading from '@/base/loading/loading'

const ANCHOR_HEIGHT = 20.8
const TITLE_HEIGHT = 42 // 标题的高度
export default {
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: 0
    }
  },
  created () {
    this.touch = {} // 这里定义的数据没有必须要监听的需求
    this.listHeight = []
    this.listenScroll = true
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 通过computed属性动态获取右侧条的数据
    shortcutList () {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    // 标题的动态生成
    fixedTilte () {
      if (this.scrollY > 0) { // 这个逻辑也是处理边界的
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    onShortTouchStart (e) {
      // 获取点击的index索引
      let anchorIndex = getData(e.target, 'index') // 有value值进行属性设置，没有value值则获取value
      let firstTouch = e.touches[0] // 循环的index是从0开始的
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      // this.touch.y1 你首次滑动时开始触摸的那个点
      let firstTouch = e.touches[0]
      // this.touch.y2 结束滑动时的那个点坐标
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 取整的方法
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta // 获取最后的index
      this._scrollTo(anchorIndex)
    },
    scroll (ops) {
      // ops 为滚动时的实时坐标x y
      this.scrollY = ops.y
    },
    selectItem (param) {
      this.$emit('selectItem', param)
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    _scrollTo (index) {
      if (!index && index !== 0) { // 处理点击边界的情况
        return
      }
      if (index < 0) { // 处理划出右侧边界的情况
        index = 0
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight // clientHeight包括padding但是不包括border, 如果最后的子元素存在margin一样不包括
        this.listHeight.push(height) // 逐个获得各个li底部距离父元素的高度
      }
    }
  },
  watch: {
    // 数据变化后重新计算各个li底部距离父元素顶部的高度
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) { // newY也就是scrollY的值，也就是向上滚动的Y值
      const listHeight = this.listHeight
      if (newY > 0) { // 极限向下拉的情况
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) { // 中间滚动的情况
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.diff = height2 + newY // 滚动的差值,当小于30时就会发生偏移
          this.currentIndex = i
          return
        }
      }
      // this.currentIndex = listHeight.length - 1
    },
    diff (newY) {
      let needData = (newY <= TITLE_HEIGHT ? TITLE_HEIGHT - newY : 0)
      if (this.need === needData) { // 性能优化
        return
      }
      this.need = needData
      this.$refs.fixedTitle.style.transform = `translate3d(0, ${-needData}px, 0)`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.listview {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-fixed {
    background: $color-highlight-background;
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    .fixed-title {
      background: $color-highlight-background;
      height: 30px;
      line-height: 30px;
      font-size: $font-size-small;
      color: $color-text-l;
      padding-left: 15px;
    }
  }
  .list-group {
    .list-group-title {
      background: $color-highlight-background;
      height: 30px;
      line-height: 30px;
      font-size: $font-size-small;
      color: $color-text-l;
      padding-left: 15px;
    }
    .list-group-item {
      padding: 10px 5px;
      display: flex;
      align-items: center;
      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 30;
    right: 0;
    text-align: center;
    width: 25px;
    padding: 20px 0;
    border-radius: 10px;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 2.5px;
      height: 8px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme
      }
    }
  }
  .loading {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%)
  }
}
</style>
