import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../src/assets/scss/style.scss'
import VueLazyload from 'vue-lazyload'

import loading from './assets/imageloader.gif'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: loading,
  attempt: 3,
  observer: true,
  listenEvents: ['scroll'],
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
