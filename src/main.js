// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import '@/assets/roboto_fonts.css'



import $ from 'jquery'
// import VueHtml5Editor from './views/editor'


// Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.component('icon_point', {
  // 在 JavaScript 中是 camelCase 的
  props:{bg:{type:String, default: "#5aa2f2"}},
  template: '<svg t="1605163103683" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1694" width="16" height="16"><path d="M512 512m-160 0a160 160 0 1 0 320 0 160 160 0 1 0-320 0Z" v-bind:fill="bg" p-id="1695"></path></svg>'
})
// Vue.use(VueHtml5Editor,{
//   ℹi8n:''
// })

Vue.$cookies.config('10d')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
