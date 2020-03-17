import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from "moment";
import ApiClient from './services/api_client';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/css/emastercard.css';

Vue.config.productionTip = false
Vue.prototype.moment = moment;
ApiClient.setRouter(router);

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
