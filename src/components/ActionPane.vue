<template>
  <div class="action-pane bg-light border-top border-bottom">
    <h5>Actions</h5>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.action-pane {
  margin-top: 2%;
  padding-top: 5px;
  padding-left: 0;
}

.action-pane ul {
  list-style-type: none;
  text-align: left;
  padding-left: 10%;
}
</style>