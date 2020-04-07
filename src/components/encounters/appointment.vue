<template>
  <!-- <input type="date" class="form-control" name="" id="" v-model="date.value_datetime"> -->
  <b-row>
    <b-col>

  <label for="appointment-datepicker">Choose an appointment date</label>
  <b-form-datepicker  id="appointment-datepicker" class="mb-2" v-model="date.value_datetime"></b-form-datepicker>
    </b-col>
  </b-row>
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