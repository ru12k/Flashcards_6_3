import Vuex from 'vuex';
import Vue from 'vue';
import createLogger from 'vuex/dist/logger';
import { cardStore } from './modules/card-store';
import { popapStore } from './modules/popap-store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cardStore,
    popapStore,
  },
  plugins: [createLogger()],
});

window.store = store; // eslint-disable-line

export default store;
