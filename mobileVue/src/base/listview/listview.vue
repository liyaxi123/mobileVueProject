<template>
<!-- 这里：data=data是为了配合scroll组件中的watch，当data改变时，scroll就会重新初始化 -->
  <scroll class="listview" :data="data">
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
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue'
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.listview {
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    margin-bottom: 30px;
    .list-group-title {
      background: $color-highlight-background;
      height: 30px;
      line-height: 30px;
      font-size: $font-size-small;
      color: $color-text-l;
      padding-left: 15px;
    }
    .list-group-item {
      margin: 10px 5px;
      display: flex;
      align-items: center;
      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name {

      }
    }
  }
}
</style>
