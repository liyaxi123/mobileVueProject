<template>
    <div class="recommend">
        <scroll class="recommend-content">
            <div>
              <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends">
                        <a :href=""></a>
                        <img :src="" class="needsclick">
                    </div>
                </slider>
              </div>
              <div class="recommend-list">
                  <h1 class="list-title">热门歌单推荐</h1>
                  <ul>
                      <li @click="selectItem(item)" v-for="item in discList" class="item">
                          <div class="icon">
                              <img width="60" height="60">
                          </div>
                          <div class="text">
                              <h2 class="name"></h2>
                              <p class="desc"></p>
                          </div>
                      </li>
                  </ul>
              </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import Slider from '@/base/slider/slider'
export default {
}
</script>

<style scoped lang="scss">
</style>
