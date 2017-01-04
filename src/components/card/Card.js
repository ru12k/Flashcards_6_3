import { WORDS, LOAD_RU, ADD_INPUT, ADD_RESULT, CHANGE_SUCCES, CHANGE_WRONG } from './card-store';
import store from '../../store';

export default {
  name: 'Card',
  props: ['id'],
  data() {
    return {
      form: '',
    };
  },
  computed: {
    en: function () { return store.state.cardStore[WORDS][this.id].en; }, // eslint-disable-line
    ru: function () { return store.state.cardStore[WORDS][this.id].ru; }, // eslint-disable-line 
    input: function () { return store.state.cardStore[WORDS][this.id].input; }, // eslint-disable-line 
    result: function () { return store.state.cardStore[WORDS][this.id].result; }, // eslint-disable-line
    isRed: function() { if (this.result === false) return true }, // eslint-disable-line
    isGreen: function() { if (this.result) return true }, // eslint-disable-line
    showAnswer: function() { return this.result === undefined ? '' : `${this.input} is ${this.result}`; }, // eslint-disable-line 
  },
  methods: {
    isOk: function isOk() {
      store.commit({
        type: ADD_RESULT,
        id: this.id,
        result: this.ru.some(item => item === this.input),
      });
      if (this.result) store.commit(CHANGE_SUCCES, 1);
      else store.commit(CHANGE_WRONG, 1);
    },
    submit: function submit() {
      store.commit({
        type: ADD_INPUT,
        id: this.id,
        input: this.form,
      });
      this.form = '';
      store.dispatch({
        type: LOAD_RU,
        key: this.id,
        en: this.en,
      })
      .then((status) => { if (status === 'Ok') this.isOk(); });
    },
  },
};
