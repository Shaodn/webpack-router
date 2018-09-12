// script src="vue路径"
import Vue from 'vue'
// 引入我们的组件
import App from './App.vue'

new Vue({
  el: '#app',
  components:{
  	App
  },
  template:'<App />'
})
