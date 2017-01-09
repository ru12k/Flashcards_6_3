import Vuex from 'vuex';
import Vue from 'vue';
import VueResource from 'vue-resource';

export const ADD_EN = 'app/add_enWord';
export const ADD_RU = 'app/add_ruWord';
export const LOAD_EN = 'app/load_en';
export const LOAD_RU = 'app/load_ru';
export const ADD_INPUT = 'app/input';
export const ADD_RESULT = 'app/result';
export const SIZE_EN = 'app/size';
export const CHANGE_SUCCES = 'app/change_right_answers';
export const CHANGE_WRONG = 'app/change_wrong_answers';

Vue.use(Vuex);
Vue.use(VueResource);

export const cardStore = {
  state: {
    words: {},
    count_succes: 0,
    count_wrong: 0,
  },
  mutations: {
    [ADD_EN]: (state, payload) => Vue.set(state.words, payload.id, payload.en),
    [ADD_RU]: (state, payload) => Vue.set(state.words[payload.id], 'ru', payload.ru),
    [ADD_INPUT]: (state, payload) => Vue.set(state.words[payload.id], 'input', payload.input),
    [ADD_RESULT]: (state, payload) => Vue.set(state.words[payload.id], 'result', payload.result),
    [CHANGE_SUCCES]: (state, payload) => { state.count_succes += payload.n }, // eslint-disable-line
    [CHANGE_WRONG]: (state, payload) => { state.count_wrong += payload.n }, // eslint-disable-line
  },
  actions: {
    [LOAD_EN]: (context) => {
      fetch('https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=idiom&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5') // eslint-disable-line
        .then(r => r.json())
        .then((data) => {
          console.log('data', data); // eslint-disable-line
          data.forEach((item) => {
            context.commit({
              type: ADD_EN,
              id: item.id,
              en: { en: item.word },
            });
          });
        });
    },
    [LOAD_RU]: function (context, payload) { // eslint-disable-line
      const apiURL = `https://glosbe.com/gapi/translate?from=eng&dest=rus&format=json&phrase=${payload.en}&pretty=true&pageSize=1&`;
      const options = {
        jsonp: 'callback',
      };
      Vue.http.jsonp(apiURL, options)
        .then(function(response){ // eslint-disable-line
          const ru = []; // eslint-disable-line
          if (response.data.result === 'ok') {
            response.data.tuc.forEach((item) => {
              if (item.hasOwnProperty('phrase')) {// eslint-disable-line
                ru.push(item.phrase.text);
              }
            });
          }
          return ru;
        })
        .then((ruWords) => { // eslint-disable-line
          console.log(ruWords); // eslint-disable-line
          context.commit({
            type: ADD_RU,
            id: payload.key,
            ru: ruWords,
          });
        })
        .then(() => {
          context.commit({
            type: ADD_INPUT,
            id: payload.key,
            input: payload.form,
          });
        })
        .then(() => {
          context.commit({
            type: ADD_RESULT,
            id: payload.key,
            result: context.state.words[payload.key].ru.some(item => item === payload.form),
          });
        })
        .then(() => {
          if (context.state.words[payload.key].result) {
            context.commit({
              type: CHANGE_SUCCES,
              n: 1,
            });
          } else {
            context.commit({
              type: CHANGE_WRONG,
              n: 1,
            });
          }
        })
        .catch(error => console.log(error)); // eslint-disable-line
    },
  },

  getters: {
    [SIZE_EN]: state => Object.keys(state.words).length,
  },
};
