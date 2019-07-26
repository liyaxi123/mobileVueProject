<template>
<div class="song-list">
  <ul>
    <li class="item" v-for="(item, index) in data" :key="index" @click="selectItem(item, index)">
      <div class="content">
        <div class="name">{{item.songName}}</div>
        <div class="desc">{{item.singerName}}</div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  methods: {
    selectItem (item, index) {
      this.$emit('selectItem', item, index)
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
  .song-list {
    position: relative;
    .item {
      height: 60px;
      font-size: $font-size-medium;
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 15px;
        .name {
          @include no-wrap();
          color: $color-text;
          font-size: $font-size-small;
        }
        .desc {
          @include no-wrap();
          color: $color-text-d;
          margin-top: 10px;
          font-size: $font-size-small;
        }
      }
    }
  }
</style>
