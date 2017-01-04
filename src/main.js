import Vue from 'vue';
import App from './App.vue';

/* eslint-disable no-new */
Vue.component('vue-carousel', {
  template: '<App/>',
  components: { App },
});

new Vue({
  el: '#app',
});

