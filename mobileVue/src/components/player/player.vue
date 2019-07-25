<template>
<!-- play这个组件不受其他组件的影响所以放于app.vue下 -->
<div class="player" v-show="playlist.length"> 
  <div class="normal-player" v-show="fullScreen">
    播放器
  </div>
  <div class="mini-player" v-show="!fullScreen">
  </div>
</div>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist'
    ])
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
    background: $color-background
  }
  .min-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 180;
    bottom: 0;
    height: 60px;
    background: $color-highlight-background
  }
}
</style>
