<template>
<b-col cols="6">

  <b-row>
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
  </b-row>
</b-col>
</template>

<script>
import EventBus from "../../services/event-bus.js";
import ApiClient from "../../services/api_client";
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
      if(this.weight.value_numeric && (this.height.value_numeric || this.previousHeight)) {
        let height = this.previousHeight ? this.previousHeight : this.height.value_numeric; 
        let currentBmi = (this.weight.value_numeric / (height * height) * 10000).toFixed(1)
        encounterObject.vitals.obs.bmi = {
                concept_id: 2137, 
                value_numeric: currentBmi
          }
      }
      
      this.$emit("addEncounter", encounterObject);
    },
    setWeight: function() {
      EventBus.$emit("set-weight", this.weight.value_numeric);
    },
    getObs: async function() {
      let url = `/observations?person_id=${this.$route.params.id}&&concept_id=5090`;
      await ApiClient.get(url).then(
        res => {
          res.json().then(ret => {
            if(ret.length > 0) {

              this.previousHeight = ret[ret.length - 1]["value_numeric"]
                ? ret[ret.length - 1]["value_numeric"]
                : ret[ret.length - 1]["value_text"];
            }
          });
        }
      );
    },
  },
  mounted() {
    this.getObs();
  },
  computed: {
    showHeight() {
      let patient = this.$store.state.patient.age;
      let f = parseInt(patient) >= 18 && this.previousHeight !== null
        ? false
        : true;
      return f;
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