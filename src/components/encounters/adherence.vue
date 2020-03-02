<template>
  <div>
  
  </div>
</template>

<script>
export default {

data: function() {
    return {

    //   weight: {
    //     value_numeric: null,
    //     concept_id: 5090
    //   },
    //   height: {
    //     value_numeric: null,
    //     concept_id: 5089
    //   }
    }
},
methods: {
  saveEncounter: function() {
    let encounterObject = {
      hiv_staging: {
        encounter_id: 68,
        obs: {
        //   weight: this.weight,
        //   height: this.height
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