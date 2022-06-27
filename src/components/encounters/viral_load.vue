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
            <div class="col-md-5">
              <div class="form-group">
                <label for>Result Modifier: </label>
                <v-select :options="modifiers" v-model="modifier" placeholder="modifier" :disabled="ldl"></v-select>
              </div>
            </div>
            <div class="col-md-5">
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
            <div class="col-md-2 mt-5">
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
    saveEncounter: async function() {
      const personId = this.$route.params.id;
      let encounterObject = {
        order_type_id: 4,
        concept_id: 856,
        start_date: this.resultDate,
        observation: {
          concept_id: 856,
          obs_datetime: this.resultDate,
          value_numeric: (this.ldl === true? 1 : this.viralLoad),
          value_text: (this.ldl === true? "=" : this.modifier)
        }
      };
      let order= {
        order_type_id: 4,
        concept_id: 856,
        start_date: this.orderDate,
        patient_id: personId, 
        reason_for_test_id: this.reasons[this.reason],
        date: this.orderDate,
        specimen: {
          concept_id: this.specimens[this.specimen]
        }
      }
      const encounter = await EncounterService.createEncounter(
        personId,
       13,
       this.resultDate 
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
              this.postResponse = "Viral load  could not be set.";
            }
        } else {
          this.success = false;
          this.fail = true;
          this.postResponse = "Viral load  could not be set.";
        }
      } else {
        this.success = false;
        this.fail = true;
        this.postResponse = "Viral load  could not be set.";
      }
      console.log(encounterObject);
      // this.$emit("addEncounter", encounterObject);
    } 
  }
};
</script>
