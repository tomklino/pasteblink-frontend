import Vue from 'vue'
import Meta from 'vue-meta'
import './plugins/vuetify'
import App from './App.vue'

import VueClipboard from 'vue-clipboard2'
import VueScrollTo from 'vue-scrollto';
import router from './router'

Vue.use(VueScrollTo)

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.config.productionTip = false

Vue.use(Meta)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
