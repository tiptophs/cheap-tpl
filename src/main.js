//引入vue，vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

//生产环境下关闭提示，阻止生产模式产生的提示信息
Vue.config.productionTip = false

//初始话Vue
new Vue({
  render: h => h(App),
}).$mount('#app')
