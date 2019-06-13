import Vue from 'vue/dist/vue.esm.js'
import App from '../app'
import rem from './util/rem.js'
new Vue ({
    el: '#app',
    components: { App },
    template: '<App/>'
})