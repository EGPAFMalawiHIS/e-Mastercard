<template>
  <div>
    <div class="row">
      <div class="col">
        <p>Patient Present</p>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              v-model="patient.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              v-model="patient.value_coded"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Guardian Present</p>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              v-model="guardian.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              v-model="guardian.value_coded"
              :disabled="patient.value_coded === '1066'"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
export default {
  data: function() {
    return {
      patient: {
        value_coded: null,
        concept_id: 1805 
      },
      guardian: {
        value_coded: null,
        concept_id: 2122
      }
    };
  },
  methods: {
    saveEncounter: function() {
      let encounterObject = {
        reception: {
          encounter_id: 51,
          obs: {
            patient: this.patient,
            guardian: this.guardian
          }
        }
      };
      this.$emit("addEncounter", encounterObject);
    }, 
    setPresent: function() {
    EventBus.$emit('set-present', this.patient.value_coded);
    if(this.patient.value_coded === "1066") {
      this.guardian.value_coded = 1065;
    }
  }
  }, 
  watch: {
     patient: {
     handler(val){
       this.setPresent();
     },
     deep: true
  }
  }
};
</script>

<style>
</style>