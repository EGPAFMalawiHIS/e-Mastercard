<template>
  <div>
    <div class="row ">
      <div class="col d-flex justify-content-start">
        <p>Drugs given to patient</p>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              name="patient"
              v-model="patient.value_coded"
              :disabled="hasWeight"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              name="patient"
              v-model="patient.value_coded"
              :disabled="hasWeight"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
      </div>
      <div class="col d-flex justify-content-start">
        <p>Drugs given to guardian</p>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              name="guardian"
              v-model="guardian.value_coded"
              :disabled="hasWeight"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              name="guardian"
              v-model="guardian.value_coded"
              :disabled="hasWeight"
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
      }, 
      hasWeight: false,
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
    if(this.patient.value_coded === "1066") {
      this.guardian.value_coded = "1065";
    }
    else if(this.patient.value_coded === "1065"){

      this.guardian.value_coded = "1066";
    }
    else if(this.guardian.value_coded === "1066") {
      console.log('bbaaa');
      this.patient.value_coded = "1065";
    }
    else if(this.guardian.value_coded === "1065"){

      console.log('aaa');
      this.patient.value_coded = "1066";
    }
    EventBus.$emit('set-present', this.patient.value_coded);
  }
  }, 
  watch: {
    patient: {
     handler(val){
       this.setPresent();
     },
     deep: true
    },
    guardian: {
     handler(val){
       this.setPresent();
     },
     deep: true
    }
  }, mounted() {
    EventBus.$on('set-weight', payload => {
      if(payload !== null && payload !==  "" && payload !== 0) {
         this.patient.value_coded = "1065";
         this.guardian.value_coded = "1066";
         this.hasWeight = true;
       }else {
        this.patient.value_coded = null;
        this.guardian.value_coded = null;
         this.hasWeight = false;
       }
    
    });
  }
};
</script>

<style>
</style>