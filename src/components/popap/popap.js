import VueStrap from 'vue-strap';
import { SHOW_WINDOW } from '../card/card-store';

export default {
  name: 'Popap',
  data() {
    return {
      showCustomModal: false,
    };
  },
  components: {
    modal: VueStrap.modal,
  },
  computed: {
    success() {
      return this.$store.state.cardStore.show_window;
    },
  },
  methods: {
    hideWindow() {
      this.$store.commit({
        type: SHOW_WINDOW,
        show: false,
      });
    }, // eslint-disable-line
  },
};


