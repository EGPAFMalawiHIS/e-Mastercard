<template>
  <b-overlay :show="loading" spinner-type="grow" spinner-variant="primary" :spinner-small="true">
    <div style="background: rgba(164, 150, 242, 0.7); height: 105px; margin-top: 10px">
      <div class="row">
        <div class="col-md-12" style="margin-top: 10px">
          <div style="margin-left: 10px">
            <label style="font-weight: bold; float: left;"><slot></slot></label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" style="margin: auto">
          <div style="margin-left: 10px">
            <label style="font-weight: bold; color: white; font-size: 30px; float: left;">{{ value || 0 }}</label>
          </div>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    loading() {
      return this.value == -1;
    }
  }
}
</script>