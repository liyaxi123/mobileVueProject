import Vue from 'vue'
import Router from 'vue-router'
const Singer = () => import('../components/singer/singer.vue')
const Rank = () => import('../components/rank/rank.vue')
const Search = () => import('../components/search/search.vue')
const Recommend = () => import('../components/recommend/recommend.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/recommend',
      component: Recommend
    }
  ]
})
