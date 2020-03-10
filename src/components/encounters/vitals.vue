<template>
  <div>
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="weight">Weight</span>
  </div>
  <input type="number" class="form-control" v-model="weight.value_numeric" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-on:input="setWeight"> 
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">Height</span>
  </div>
  <input type="number" class="form-control" v-model="height.value_numeric" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
</div>
  </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
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
      console.log(encounterObject);
  }, setWeight: function() {
    EventBus.$emit('set-weight', this.weight.value_numeric);
  }
},
}

</script>

<style>

</style>