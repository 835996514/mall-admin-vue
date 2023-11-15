import Vue from 'vue'
import App from './App.vue'

// import VCharts from 'v-charts'
// Vue.use(VCharts)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })

import '@/styles/index.scss'
import '@/fonts/iconfont.css'
import 'animate.css'
import '@/permission'
import '@/icons'

import router from './router'
import store from './store'

Vue.prototype.$config = window.$config[process.env.NODE_ENV];

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')