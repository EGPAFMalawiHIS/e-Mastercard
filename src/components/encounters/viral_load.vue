<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="form" id="form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Date Ordered: </label>
                <input
                  type="date"
                  name
                  id="date"
                  class="form-control"
                  placeholder
                  aria-describedby="helpId"
                  v-model="orderDate"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Reason: </label>
                <v-select :options="Object.keys(reasons)" v-model="reason" placeholder="reason"></v-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Specimen: </label>
                <v-select :options="Object.keys(specimens)" v-model="specimen" placeholder="specimen"></v-select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Result Date: </label>
                <input
                  type="date"
                  name
                  id="date"
                  class="form-control"
                  placeholder
                  aria-describedby="helpId"
                  v-model="resultDate"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Result Modifier: </label>
                <v-select :options="modifiers" v-model="modifier" placeholder="modifier" :disabled="ldl"></v-select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Value: </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder
                  aria-describedby="helpId"
                  v-model="viralLoad"
                  :disabled="ldl"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 my-2">
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="ldl" />
                <label class="form-check-label" for="exampleCheck1">LDL</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <button type="submit" form="form" class="btn btn-primary btn-lg" @click="saveEncounter">Save</button>
      </div>
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
      location: sessionStorage.location || "",
      user: sessionStorage.username || "",
      modifiers: ["=", ">", "<", "=>", "=<"],
      reasons: {
        'Routine': 432, 
        'Targeted': 3280, 
        'Confirmatory': 1345, 
        'Stat': 6368, 
        'Repeat / Missing': 9144
      },
      specimens: {
        'Blood': 8612, 
        'DBS (Free drop to DBS card)': 10095, 
        'DBS (Using capillary tube)': 10096
      },
      modifier: null,
      viralLoad: null,
      resultDate: null,
      orderDate: null,
      specimen: null,
      reason: null,
      ldl: false,
    };
  },
  methods: {
    createLabOrder: async function(personId) {
      const encounter = await EncounterService.createEncounter(personId, 13, this.orderDate);
      if (encounter.status === 200 || encounter.status === 201) {
        const response = await ApiClient.post("/lab/orders", {
          encounter_id: encounter.encounter_id,
          orders: [{
            encounter_id: encounter.encounter_id,
            tests: [{ concept_id: 856 }],
            reason_for_test_id: this.reasons[this.reason],
            target_lab: this.location,
            requesting_clinician: this.user,
            date: this.orderDate,
            specimen: {
              concept_id: this.specimens[this.specimen]
            }
          }]
        });
        if (response.status === 200 || response.status === 201) {
          const order = await response.json();
          return order[0].tests[0].id;
        }
      }
      return -1;
    },
    createLabResult: async function(personId, testID) {
      const encounter = await EncounterService.createEncounter(personId, 57, this.resultDate);
      if (encounter.status === 200 || encounter.status === 201) {
        const response = await ApiClient.post(`lab/tests/${testID}/results`, {
          encounter_id: encounter.encounter_id,
          date: this.resultDate,
          measures: [{
            indicator: {
              concept_id: 856,
            },
            value: this.ldl ? "LDL" : this.viralLoad,
            value_modifier: this.ldl ? "=" : this.modifier,
            value_type: this.ldl? "text" : "numeric"
          }]
        });
        return response.status === 200 || response.status === 201;
      }
      return false;
    },
    saveEncounter: async function() {
      const personId = this.$route.params.id;
      const testID = await this.createLabOrder(personId);
      if (testID > 0) {
        if (await this.createLabResult(personId, testID)) {
          this.posting = false;
          EventBus.$emit("reload-visits", "");
          this.$toasted.show("Viral Load Saved", { 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 2000
          });
          this.$root.$emit('bv::hide::modal', 'viral-load-modal', '#btnShow')
          return
        }
      }
      this.success = false;
      this.fail = true;
      this.postResponse = "Viral load  could not be set.";
    },
  }
};
</script>
