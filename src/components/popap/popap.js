import VueStrap from 'vue-strap';
import { SHOW_WINDOW } from '../../store/modules/popap-store';

export default {
  name: 'Popap',
  components: {
    modal: VueStrap.modal,
  },
  computed: {
    showPopap() { return this.$store.state.popapStore.show_window; },
    fireWindow() { return this.$store.state.cardStore.count_succes; },
  },
  methods: {
    hideWindow() {
      this.$store.commit({
        type: SHOW_WINDOW,
        show: false,
      });
    }, // eslint-disable-line
  },
  watch: {
    fireWindow: function fcb() {
      if (this.fireWindow === 2) {
        this.$store.commit({
          type: SHOW_WINDOW,
          show: true,
        });
      }
    },
  },
};



