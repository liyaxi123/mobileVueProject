<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import tab from './components/tab/tab'
import player from './components/player/player.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    tab,
    player
  }
}
</script>

<style lang="scss">
</style>
