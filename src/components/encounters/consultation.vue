<template>
  <div></div>
</template>

<script>
export default {

data: function() {
    return {

      // weight: {
      //   value_numeric: null,
      //   concept_id: 5090
      // }
    }
},
methods: {
  saveEncounter: function() {
    let encounterObject = {
      vitals: {
        encounter_id: 53,
        obs: {
          // weight: this.weight,
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