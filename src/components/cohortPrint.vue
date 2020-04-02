<template>
  <div class="footer" style="margin-bottom: 20px; text-align: right; margin-right: 5px;">
    <button class="btn btn-success" @click="printCohort">Print report</button>
  </div>
</template>


<style scoped>
</style>

<script>

export default {
  props: ["onPrint"],
  data: function() {
    return{
      endDate: null
    };
  },
  methods: {
    printCohort: function(){
      this.onPrint();
    }
  },
  mounted() {
  }    
}
</script>