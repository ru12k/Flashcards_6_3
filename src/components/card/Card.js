import { LOAD_RU, ADD_INPUT, ADD_RESULT, CHANGE_SUCCES, CHANGE_WRONG } from './card-store';

export default {
  name: 'Card',
  props: ['id'],
  data() {
    return {
      form: '',
    };
  },
  computed: {
    en() { return this.$store.state.cardStore.words[this.id].en; },
    ru() { return this.$store.state.cardStore.words[this.id].ru; },
    input() { return this.$store.state.cardStore.words[this.id].input; },
    result() { return this.$store.state.cardStore.words[this.id].result; },
    isRed() { if (this.result === false) return true; }, // eslint-disable-line
    isGreen() { if (this.result) return true; }, // eslint-disable-line
    showAnswer() { return this.result === undefined ? '' : `${this.input} is ${this.result}`; }, // eslint-disable-line 
  },
  methods: {
    isOk() {
      this.$store.commit({
        type: ADD_RESULT,
        id: this.id,
        result: this.ru.some(function someCb(item) { return item === this.input; }),
      });
      if (this.result) this.$store.commit(CHANGE_SUCCES, 1);
      else this.$store.commit(CHANGE_WRONG, 1);
    },
    submit() {
      this.$store.commit({
        type: ADD_INPUT,
        id: this.id,
        input: this.form,
      });
      this.form = '';
      this.$store.dispatch({
        type: LOAD_RU,
        key: this.id,
        en: this.en,
      })
      .then(function cb(status) { if (status === 'Ok') return this.isOk(); }); // eslint-disable-line
    },
  },
};
