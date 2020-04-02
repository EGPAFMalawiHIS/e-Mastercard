import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from "moment";
import ApiClient from './services/api_client';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/css/emastercard.css';
import Toasted from 'vue-toasted';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ClickConfirm from 'click-confirm/dist/click-confirm'

Vue.component('clickConfirm', ClickConfirm);
Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.use(Toasted)
Vue.use(BootstrapVue)
ApiClient.setRouter(router);

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
