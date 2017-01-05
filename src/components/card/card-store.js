import Vuex from 'vuex';
import Vue from 'vue';

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
    [CHANGE_SUCCES]: (state, n) => { state.count_succes += n }, // eslint-disable-line
    [CHANGE_WRONG]: (state, n) => { state.count_wrong += n }, // eslint-disable-line
  },
  actions: {
    [LOAD_EN]: (context) => {
      fetch('https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=idiom&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5') // eslint-disable-line
        .then(r => r.json())
        .then((data) => {
          data.forEach((item) => {
            context.commit({
              type: ADD_EN,
              id: item.id,
              en: { en: item.word },
            });
          });
        });
    },
    [LOAD_RU]: (context, payload) => { // eslint-disable-line
      return new Promise((resolve, reject) => {
        const response = [];
        window.cb = (data) => { // eslint-disable-line
          if (data.result === 'ok') {
            data.tuc.forEach((item) => {
              if (item.hasOwnProperty('phrase')) {// eslint-disable-line
                response.push(item.phrase.text);
              }
            });
          }
        };
        const url = `https://glosbe.com/gapi/translate?from=eng&dest=rus&format=json&phrase=${payload.en}&pretty=true&pageSize=1&callback=cb`;
        const script = document.createElement('script'); // eslint-disable-line
        script.src = url;
        document.head.appendChild(script); // eslint-disable-line
        script.addEventListener('load', () => {
          console.log('response:', response); // eslint-disable-line
          resolve(response);
        });
        script.addEventListener('error', () => { reject('error'); });
      })
      .then((ruWords) => { // eslint-disable-line
        context.commit({
          type: ADD_RU,
          id: payload.key,
          ru: ruWords,
        });
        if (ruWords) return 'Ok';
      })
      .catch(error => console.log(error)); // eslint-disable-line
    },
  },

  getters: {
    [SIZE_EN]: state => Object.keys(state.words).length,
  },
};
