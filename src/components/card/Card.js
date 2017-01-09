import { LOAD_RU } from './card-store';

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
    input() { return this.$store.state.cardStore.words[this.id].input; },
    result() { return this.$store.state.cardStore.words[this.id].result; },
    isRed() { if (this.result === false) return true; }, // eslint-disable-line
    isGreen() { if (this.result) return true; }, // eslint-disable-line
    showAnswer() { return this.result === undefined ? '' : `${this.input} is ${this.result}`; }, // eslint-disable-line 
  },
  methods: {
    submit() {
      this.$store.dispatch({
        type: LOAD_RU,
        key: this.id,
        en: this.en,
        form: this.form,
      });
      this.form = '';
    },
  },
};
