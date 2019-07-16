<template>
  <scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          :class="listview"
          ref="listview">
  </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  export default {
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
</style>
