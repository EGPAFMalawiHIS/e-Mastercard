<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <v-select :options="options" v-model="modifier" placeholder="modifier" :disabled="ldl"></v-select>
        </div>
      </div>
      <div class="col-md-8">
        <div class="form-inline">
          <div class="form-group">
            <label for>Viral Load</label>
            <input
              type="number"
              name
              id
              class="form-control"
              placeholder
              aria-describedby="helpId"
              v-model="viralLoad"
              :disabled="ldl"
            />

            <label for>Date</label>
            <input
              type="date"
              name
              id="date"
              class="form-control"
              placeholder
              aria-describedby="helpId"
              v-model="date"
            />
            <label >LDL</label>
            <input
              type="checkbox"
              name
              id="ldl"
              class="form-control"
              placeholder
              aria-describedby="helpId"
              v-model="ldl"
            />
          </div>
        </div>
      </div>
      <br />
      <button type="submit" class="btn btn-primary" @click="saveEncounter">Save</button>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import VueSelect from "vue-select";
import EventBus from "../../services/event-bus.js";
export default {
  components: {
    "v-select": VueSelect
  },
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
      options: ["=", ">", "<", "=>", "=<"],
      modifier: null,
      viralLoad: null,
      date: null,
      ldl: false,
    };
  },
  methods: {
    saveEncounter: async function() {
      const personId = this.$route.params.id;
      let encounterObject = {
        order_type_id: 4,
        concept_id: 856,
        start_date: this.date,
        observation: {
          concept_id: 856,
          obs_datetime: this.date,
          value_numeric: (this.ldl === true? 1 : this.viralLoad),
          value_text: (this.ldl === true? "=" : this.modifier)
        }
      };
      let order= {
        order_type_id: 4,
        concept_id: 856,
        start_date: this.date,
        patient_id: personId, 
      }
      const encounter = await EncounterService.createEncounter(
        personId,
       13 
      );
      if (encounter.status === 201 || encounter.status === 200) {
        let encounterID = encounter.encounter_id;
        order.encounter_id = encounterID;
        const response = await ApiClient.post("orders", order);
        if (response.status === 201 || response.status === 200) {
            const obs = await ApiClient.post("observations", {encounter_id: encounterID, observations: [encounterObject.observation]});
            if (obs.status === 201 || obs.status === 200) {
              this.posting = false;
                    EventBus.$emit("reload-visits", "");
                    let toast = this.$toasted.show("Viral Load Saved", { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000
                });
                this.$root.$emit('bv::hide::modal', 'viral-load-modal', '#btnShow')
            } else {
              this.success = false;
              this.fail = true;
              this.postResponse = "Appointment could not be set.";
            }
        } else {
          this.success = false;
          this.fail = true;
          this.postResponse = "Appointment could not be set.";
        }
      } else {
        this.success = false;
        this.fail = true;
        this.postResponse = "Appointment could not be set.";
      }
      console.log(encounterObject);
      // this.$emit("addEncounter", encounterObject);
    } 
  }
};
</script>

<style>
</style>