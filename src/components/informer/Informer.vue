<template>
  <div class="footer-info">
    <span class="lable-info class">
      {{label}}
    </span>
    <span class="value-info class">
      {{value}}
    </span>
    <span>
      <slot name="addcontent"></slot>
    </span>
  </div>
</template>

<script src="./Informer.js">
</script>

<style>
  .footer-info {
    padding: 5px;
  }
  .label-info {
    padding: 5px;
  }
  .value-info {
    padding: 5px;
  }
</style>