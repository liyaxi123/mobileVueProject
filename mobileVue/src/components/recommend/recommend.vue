<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="hotSongList" v-if="hotSongList.length">
      <div class="slider-wrapper">
         <slider v-if="recommends.length">
          <li v-for="item in recommends" :key="item.linkUrl">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </li>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in hotSongList" :key="item.accessnum" class="item">
            <div class="icon">
              <img :src="item.picUrl" width="96" height="96">
            </div>
            <div class="text">
              <h1 class="desc">{{item.songListDesc}}</h1>
              <h1 class="name">{{item.songListAuthor}}</h1>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider.vue'
import { getRecommendData } from '@/api/recommend.js'
import Loading from '@/base/loading/loading'
import Scroll from '@/base/scroll/scroll.vue'
export default {
  data () {
    return {
      recommends: [],
      hotSongList: []
    }
  },
  components: {
    Slider,
    Scroll
  },
  methods: {
    _getRecommend () {
      getRecommendData().then(res => {
        let data = res.data
        if (data.code === 0) {
          this.recommends = data.data.slider
          this.hotSongList = data.data.songList
        }
      })
    }
  },
  created () {
    // 获取轮播图数据
    this._getRecommend()
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/variable.scss';
.recommend-list {
  .list-title {
    width: 100%;
    height: 65px;
    line-height: 65px;
    color: $color-theme;
    text-align: center;
    font-size: $font-size-medium;
  }
  .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 5px 5px;
      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
      }
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-small;
        .name {
          color: $color-text-d;
          font-size: $font-size-small-s;
        }
        .desc {
          color: $color-text;
          margin-bottom: 10px;
        }
      }
    }
}
</style>
