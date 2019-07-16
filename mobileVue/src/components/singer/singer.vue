<template>
    <div class="singer">
        我是歌手
    </div>
</template>

<script>
import { getSingerInfo } from '@/api/singer.js'
export default {
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerInfo().then(res => {
        console.log(res)
      }).catch(err => { console.log(err) })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
