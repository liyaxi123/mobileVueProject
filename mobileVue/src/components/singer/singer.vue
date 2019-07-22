<template>
    <div class="singer" ref="singer">
      <list-view :data="singerList" @selectItem="selectItem"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
import { getSingerInfo } from '@/api/singer.js'
import ListView from '@/base/listview/listview.vue'
import pinyin from 'js-pinyin'
import { mapMutations, mapGetters } from 'vuex'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  data () {
    return {
      singerList: []
    }
  },
  computed: {
    ...mapGetters([
      'transition1'
    ])
  },
  components: {
    ListView
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerInfo().then(res => {
        this.singerList = this._normalSingerList(res.data.singerList.data.singerlist)
      }).catch(err => { console.log(err) })
    },
    _normalSingerList (list) {
      let map = {
        hot: {
          title: HOT_NAME, // 热门 A B C D E .....
          items: []
        }
      }
      let reg = /G/
      list.forEach((item, index) => {
        // 获取数据的前十作为热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(item)
        }
        let firstLetter = pinyin.getCamelChars(item.singer_name.substring(0, 1))
        // 先创建数据结构
        if (!map[firstLetter] && !reg.test(firstLetter)) {
          map[firstLetter] = {
            title: firstLetter,
            items: []
          }
        } else if (reg.test(firstLetter)) {
          map.D = {
            title: 'D',
            items: []
          }
        }
        // 再插入数据     必须先创建结构再插入数据不然会报错！！！
        if (reg.test(firstLetter)) {
          map.D.items.push(item)
        } else {
          map[firstLetter].items.push(item)
        }
      })
      // 为了得到有序列表，对map进行进一步处理
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      // 使用charCodeAt()方法来进行排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectItem (param) {
      this.$router.push({path: `/singer/${param.singer_id}`})
      this.SET_SINGER(param)
      this.SET_TRANSITIONFLAGS(!this.transition1)
    },
    ...mapMutations([
      'SET_SINGER',
      'SET_TRANSITIONFLAGS'
    ])
  }
}
</script>

<style scoped lang="scss">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
