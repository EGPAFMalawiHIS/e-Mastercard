<template>
  <div id="loader" class="d-flex justify-content-center" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style scoped>
#loader {
  margin: auto;
}
</style>