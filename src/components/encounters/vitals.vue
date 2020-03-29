<template>
  <div class="row">
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="weight">Weight</span>
        </div>
        <input
          type="number"
          class="form-control"
          v-model="weight.value_numeric"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          v-on:input="setWeight"
        />
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3" v-if="showHeight">
        <div class="input-group-prepend">
          <span class="input-group-text" id="height">Height</span>
        </div>
        <input
          type="number"
          class="form-control"
          v-model="height.value_numeric"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
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
        concept_id: 5089
      },
      height: {
        value_numeric: null,
        concept_id: 5090
      },
      previousHeight: null
    };
  },
  methods: {
    saveEncounter: function() {
      let encounterObject = {
        vitals: {
          encounter_id: 6,
          obs: {
            weight: this.weight
          }
        }
      };
      if (this.showHeight) {
        encounterObject.vitals.obs.height = this.height;
      }
      this.$emit("addEncounter", encounterObject);
    },
    setWeight: function() {
      EventBus.$emit("set-weight", this.weight.value_numeric);
    }
  },
  mounted() {},
  computed: {
    showHeight() {
      let patient = this.$store.getters.getPatient;
      if (patient.height) {
        this.previousHeight = patient.height;
      }
      return parseInt(patient.age) >= 18 && this.previousHeight !== null
        ? false
        : true;
    }
  },
  watch: {
     weight: {
     handler(val){
         this.setWeight();
     },
     deep: true
  }
}
}
</script>

<style>
</style>