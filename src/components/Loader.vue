<template>
  <div id="loader" class="d-flex justify-content-center" v-if="loading">
    <b-spinner type="grow" variant="primary" label="Loading"></b-spinner>
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