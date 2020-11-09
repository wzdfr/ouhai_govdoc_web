// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import $ from 'jquery'
// import VueHtml5Editor from './views/editor'


// Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
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
