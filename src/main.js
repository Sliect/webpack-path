import Vue from 'vue'
import APP from './APP'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

new Vue({
  el: '#app',
  components: {
    APP
  },
  template: '<APP />'
})