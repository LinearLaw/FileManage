import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

import './assets/css/common.less';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
