<template>
  <label :for="forInput" class="input-label"><slot></slot></label>
</template>

<script>
export default {
  props: ['forInput']
}
</script>

<style scoped>
.input-label {
  font-weight: bold; 
  width: 100%;
  text-align: left;
  padding-top: 2%;
  display: inline-block;
}  
</style>
