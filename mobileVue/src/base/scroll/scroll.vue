<template>
    <div ref="wrappers">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1 // 获取滚动位置的方式
    },
    click: {
      type: Boolean,
      defaut: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrappers) {
        return true
      }
      this.scroll = new BScroll(this.$refs.wrappers, {
        probeType: this.probeType, // scroll事件触发方式
        click: true // better-scroll会默认阻止click点击事件，设置为true会派发一个click事件
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', pos => {
          me.$emit('scroll', pos)
        })
      }
      // if (this.pullup) {
      //     this.scroll.on('scrollEnd', () => { // maxScrollY纵向最大滚动位置
      //         if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //             this.$emit('scrollToEnd')
      //         }
      //     })
      // }
      // if (this.beforeScroll) {
      //     this.scroll.on('beforeScrollStart', () => {
      //         this.$emit('beforeScroll')
      //     })
      // }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh() // 重新计算better-scroll， 当DOM结构发生变化时，务必要调用
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
