<template>
  <div class="card" v-bind:class="{ 'bg-info': isStart, 'bg-danger': isWrong, 'bg-success': isSuccess }">
    <h4 class="text-primary">{{en}}</h4>
    <span>id:{{id}}</span>
    <input type="text" v-model="form" class="form-control" placeholder="Insert translate">
    <button v-on:click="submit" type="button" class="btn btn-default" v-bind:disabled="isDisabled">Check</button>
    <h5 v-bind:class="{ 'text-info': isStart, 'text-danger': isWrong, 'text-success': isSuccess }">{{showAnswer}}</h5>
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
h4, h5 {
  text-transform: uppercase;
}
.green {
  background-color: lightgreen;
}

.red {
  background-color: pink;
}
button {
  margin: 20px;
}
span {
  color: lightslategray;
  font-size: 10px; 
}
input {
  width: 180px; 
}
</style>
