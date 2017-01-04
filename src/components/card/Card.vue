<template>
  <div class="card" v-bind:class="{ red: isRed, green: isGreen }">
    <h3>{{en}}</h3>
    <span>id:{{id}}</span>
    <input type="text" v-model="form">
    <button type="submit" v-on:click="submit">Check</button>
    <div>{{showAnswer}}</div>
  </div>
</template>

<script src = "./Card.js">
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 1px solid grey;
  border-left: none;
  border-top: none;
}
h3 {
  color: dimgray;
  text-transform: uppercase;
}
.green {
  background-color: lightgreen;
}

.red {
  background-color: pink;
}
button {
  border: 1px solid dimgray;
  padding: 10px 20px 10px 20px;
  margin: 20px;
  background-color:azure;
  text-transform: uppercase;
  color:dimgray;
}
span {
  color: lightslategray;
  font-size: 10px; 
}
</style>
