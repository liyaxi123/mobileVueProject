<template>
  <div class="recommend" ref="recommend">
    <slider v-if="recommends.length">
      <div v-for="item in recommends" :key="item.linkUrl">
        <a :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
      </div>
    </slider>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider.vue'
import { getRecommendData } from '@/api/recommend.js'
// import Loading from '@/base/loading/loading'
// import Scroll from '@/base/scroll/scroll.vue'
export default {
  data () {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  methods: {
    _getRecommend () {
      getRecommendData().then(res => {
        let data = res.data
        if (data.code === 0) {
          this.recommends = data.data.slider
        }
      })
    }
  },
  created () {
    this._getRecommend()
  }
}
</script>

<style scoped lang="scss">
</style>
