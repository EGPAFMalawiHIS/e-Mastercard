<template>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">Appointment Date</span>
  </div>
  <input type="date" class="form-control" name="" id="" v-model="date.value_datetime">
</div>
</template>

<script>
export default {

data: function() {
    return {

      date: {
        value_datetime: null,
        concept_id: 5096
      },
    }
},
methods: {
  saveEncounter: function() {
    let encounterObject = {
      hiv_staging: {
        encounter_id: 7,
        obs: {
          date: this.date,
        }
      }
    }
    this.$emit('addEncounter', encounterObject);
  }
}
}
</script>

<style>

</style>