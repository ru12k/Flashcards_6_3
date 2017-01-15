import Vuex from 'vuex';
import Vue from 'vue';
import VueResource from 'vue-resource';

export const SHOW_WINDOW = 'app/show_window';

Vue.use(Vuex);
Vue.use(VueResource);

export const popapStore = {
  state: {
    show_window: false,
  },
  mutations: {
    [SHOW_WINDOW]: (state, payload) => { state.show_window = payload.show }, // eslint-disable-line
  },
};
