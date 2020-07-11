// 引入vue，vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

// 生产环境下关闭提示，阻止生产模式产生的提示信息
Vue.config.productionTip = false;

// 初始话Vue
new Vue({
  render: (h) => h(App),
}).$mount('#app');

// 模拟http请求，演示proxy
const xhr = new XMLHttpRequest();
// 请求
xhr.open('GET', '/api/user', true);
// 加载之后
xhr.onload = function () {
  console.log(xhr.response);
};
// 发送
xhr.send();
