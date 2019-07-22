// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import '@/common/scss/index.scss'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 2,
  loading: require('@/common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
