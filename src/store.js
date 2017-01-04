import Vuex from 'vuex';
import Vue from 'vue';
import createLogger from 'vuex/dist/logger';
import { cardStore } from './components/card/card-store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cardStore,
  },
  plugins: [createLogger()],
});

window.store = store; // eslint-disable-line

export default store;
