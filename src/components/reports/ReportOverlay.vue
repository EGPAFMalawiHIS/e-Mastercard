<template>
  <b-overlay :show="hideReport" :no-center="true" spinner-type="grow" spinner-variant="primary">
    <template v-slot:overlay>
      <div style="display: block; min-height: 720px; width: 100%; padding-top: 20%">
        <h1 v-if="!reportSelected">No Report Selected</h1>
        <b-spinner v-if="reportSelected" type="grow" variant="primary"></b-spinner>
      </div>
    </template>
    <slot></slot>
  </b-overlay>
</template>

<script>
export default {
  name: 'report-overlay',
  props: {
    reportLoading: {
      type: Boolean,
      required: true
    },
    reportSelected: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hideReport() {
      return this.reportLoading || !this.reportSelected;
    }
  }
}
</script>