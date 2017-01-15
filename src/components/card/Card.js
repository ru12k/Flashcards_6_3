import VueStrap from 'vue-strap';
import { LOAD_RU } from '../../store/modules/card-store';

export default {
  name: 'Card',
  props: ['id'],
  components: {
    'bs-input': VueStrap.input,
  },
  data() {
    return {
      form: '',
    };
  },
  computed: {
    en() { return this.$store.state.cardStore.words[this.id].en; },
    input() { return this.$store.state.cardStore.words[this.id].input; },
    result() { return this.$store.state.cardStore.words[this.id].result; },
    isWrong() { if (this.result === false) return true; }, // eslint-disable-line
    isSuccess() { if (this.result === true) return true; }, // eslint-disable-line
    isStart() { if (this.result === undefined) return true; }, // eslint-disable-line
    showAnswer() { return this.result === undefined ? '' : `${this.input} is ${this.result}`; }, // eslint-disable-line
    isDisabled() {
      if (this.form === '') {
        return 'disabled';
      }
      return null;
    },
  },
  methods: {
    submit() {
      this.$store.dispatch({
        type: LOAD_RU,
        key: this.id,
        en: this.en,
        form: this.form.toLowerCase(),
      });
      this.form = '';
    },
  },
};
