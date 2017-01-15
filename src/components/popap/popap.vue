<template>
  <div>
     <modal :show.sync="showPopap" effect="fade" width="50%">
        <div slot="modal-header" class="modal-header">
          <h4> Хотите вступить в группу JavaScript.Ninja на VK?</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <a href="https://vk.com/smartjs" class="btn btn-primary btn-lg active" role="button">JavaScript.Ninja - Все будет JavaScript!</a>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click="hideWindow()">Exit</button>
        </div>
      </modal>    
  </div>
  <!--<div class="popap" v-if="show">
  </div>-->
</template>

<script src="./popap.js">
</script>

<style scoped>
  
</style>