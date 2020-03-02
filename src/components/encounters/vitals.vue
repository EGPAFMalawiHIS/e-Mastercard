<template>
  <div>
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="weight">Weight</span>
  </div>
  <input type="number" class="form-control" v-model="weight.value_numeric" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">Height</span>
  </div>
  <input type="number" class="form-control" v-model="height.value_numeric" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
  </div>
</template>

<script>
export default {

data: function() {
    return {

      weight: {
        value_numeric: null,
        concept_id: 5090
      },
      height: {
        value_numeric: null,
        concept_id: 5089
      }
    }
},
methods: {
  saveEncounter: function() {
    let encounterObject = {
      vitals: {
        encounter_id: 6,
        obs: {
          weight: this.weight,
          height: this.height
        }
      }
    }
    this.$emit('addEncounter',  encounterObject);
  }
}
}
</script>

<style>

</style>