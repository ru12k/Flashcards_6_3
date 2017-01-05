<template>
  <div class="carousel">

    <div class="main-wrapp">
      <button class="arrow" v-on:click="left"> &lt; </button>
      <div class="card-wrapp">
        <div class="inner-wrapper" v-bind:style ="{left: deltaLeft + 'px'}">
          <div>
            <card v-for="(item, key) in en" v-bind:id="key"></card>
          </div>
        </div>
      </div>
      <button class="arrow" v-on:click="right"> &gt; </button>
    </div>

    <div class="footer-wrapp">
      <button class="load-btn" v-on:click="load">more...</button>
      <informer label="current position:" v-bind:value="sliderPos"></informer>
      <informer v-bind:label="showMaxPos"><input type="text" slot="addcontent" v-model="currentPos"></informer>
      <informer label="right answers:" v-bind:value="done"></informer>
      <informer label="wrong answers:" v-bind:value="fail"></informer>
    </div>

  </div>
</template>

<script>
import Card from './components/card/Card.vue';
import Informer from './components/informer/Informer.vue';
import store from './store';
import { LOAD_EN, SIZE_EN } from './components/card/card-store';

export default {
  store,
  name: 'app',
  data() {
    return {
      sliderPos: 0,
      currentPos: 0,
    };
  },
  computed: {
    deltaLeft: function left() { return -this.pos * 1000; },
    en: () => store.state.cardStore.words,
    done: () => store.state.cardStore.count_succes,
    fail: () => store.state.cardStore.count_wrong,
    maxPos: () => Math.floor(store.getters[SIZE_EN] / 5) - 1,
    showMaxPos: function show() { return `set positin(max: ${this.maxPos})`; },
    pos: function pos() {
      if (this.currentPos < this.maxPos && this.currentPos > 0) {
        return this.sliderPos = this.currentPos; // eslint-disable-line
      }
      if (this.currentPos <= 0) {
        this.currentPos = 0;
        return this.sliderPos = this.currentPos; // eslint-disable-line
      }
      if (this.currentPos >= this.maxPos) {
        this.currentPos = this.maxPos;
        return this.sliderPos = this.currentPos; // eslint-disable-line
      }
      return this.sliderPos = 0; // eslint-disable-line
    },
  },
  components: {
    Card, Informer,
  },
  methods: {
    load() { store.dispatch({ type: LOAD_EN }); },
    left() { this.currentPos -= 1; },
    right() { this.currentPos += 1; },
  },
  mounted() {
    this.load();
  },
};
</script>

<style>
 * {
  box-sizing: border-box;
}

.carousel {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color:azure;
  min-height: 300px;
  width: 1115px;
  border: 1px solid dimgray;
}

.main-wrapp {
  display: flex;
  align-items: center;
}

.footer-wrapp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  min-height: 80px;
  width: 1000px;
  border: 1px solid dimgray;
  border-top: none;
}

.footer-info input {
  width: 30px;
}

.load-btn {
  border: 1px solid dimgray;
  padding: 10px 20px 10px 20px;
  background-color:azure;
  text-transform: uppercase;
  color:dimgray;
  cursor: pointer;
}


.arrow {
  width: 35px;
  height: 35px;
  border: 1px solid grey;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.inner-wrapper {
 
  position: relative;
  transition: 0.7s;
  transition-timing-function: ease-in;
  display: flex;
  left: 0px;
}
.inner-wrapper div {
  display: flex
}
.card-wrapp {
  width: 1000px;
  height: 200px;
  overflow: hidden;
  border: 1px solid dimgray;
  
}
</style>
