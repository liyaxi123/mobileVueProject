<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="hotSongList" v-if="hotSongList.length">
      <div>
      <div class="slider-wrapper" v-if="recommends.length">
         <slider>
          <li v-for="item in recommends" :key="item.linkUrl">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" @load="loadIamge" class="needsclick">
            </a>
          </li>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in hotSongList" :key="item.accessnum" class="item">
            <div class="icon">
              <img v-lazy="item.cover" width="96" height="96">
            </div>
            <div class="text">
              <h1 class="desc">{{item.title}}</h1>
              <h1 class="name">播放量:{{item.listen_num}}</h1>
            </div>
          </li>
        </ul>
        <loading v-if="!hotSongList.length" class="loading"></loading>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider.vue'
import Scroll from '@/base/scroll/scroll.vue'
import { getRecommendData, getRecommendList } from '@/api/recommend.js'
import Loading from '@/base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      hotSongList: [],
      checkImg: true
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  methods: {
    _getRecommend () {
      getRecommendData().then(res => {
        let data = res.data
        if (data.code === 0) {
          this.recommends = data.data.slider
        }
      })
    },
    // @load事件是在src资源加载后才会触发
    loadIamge () {
      if (this.checkImg) {
        this.checkImg = false
        this.$refs.scroll.refresh()
      }
    },
    // 获取推荐歌曲菜单
    _getRecommendList () {
      getRecommendList().then(res => {
        this.hotSongList = res.data.recomPlaylist.data.v_hot
      })
    }
  },
  created () {
    // 获取轮播图数据
    this._getRecommend()
    this._getRecommendList()
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/variable.scss';
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
  height: 100%;
  overflow: hidden;
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .recommend-list {
    position: relative;
    .loading {
      position: absolute;
      top: 20%;
    }
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
  }
}
//  .recommend {
//     position: fixed;
//     width: 100%;
//     top: 88px;
//     bottom: 0;
//     .recommend-content {
//       height: 100%;
//       overflow: hidden;
//       .slider-wrapper {
//         position: relative;
//         width: 100%;
//         overflow: hidden }
//       .recommend-list {
//         .list-title {
//           height: 65px;
//           line-height: 65px;
//           text-align: center;
//           font-size: $font-size-medium;
//           color: $color-theme}
//         .item {
//           display: flex;
//           box-sizing: border-box;
//           align-items: center;
//           padding: 0 20px 20px 20px ;
//           .icon {
//             flex: 0 0 60px;
//             width: 60px;
//             padding-right: 20px}
//           .text {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             flex: 1;
//             line-height: 20px;
//             overflow: hidden;
//             font-size: $font-size-medium }
//             .name {
//               margin-bottom: 10px;
//               color: $color-text }
//             .desc {
//               color: $color-text-d }}}}}
</style>
