// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

// router 首先需要 Vue.use() => 全局注册
// 然后要在 new Vue() 去注册
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
