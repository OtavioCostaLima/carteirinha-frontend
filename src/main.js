window.axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8000/api/v2'

import Vue from 'vue';
import router from './vue-router'
import store from './store/store'
import Vuetify from 'vuetify'
import LoginInterceptors from './components/views/Login/interceptors'
Vue.use(Vuetify)


Vue.component('index',require("./components/Index.vue"))


LoginInterceptors.chek_empty_token(router)
LoginInterceptors.check_auth(router)
LoginInterceptors.check_auth_response(router)

new Vue({
  el: '#app',
 	router, store,
  template: '<index/>'
})
