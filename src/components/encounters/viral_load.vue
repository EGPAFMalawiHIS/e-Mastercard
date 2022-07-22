<template>
  <div>
    <div class="row" v-if="errorMessage">
      <div class="col-md-12">
        <div class="alert alert-warning">
          {{ errorMessage }}
        </div>
      </div>
    </div>
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
                  v-model="$v.form.orderDate.$model"
                  :style="(!$v.form.orderDate.required || !$v.form.orderDate.isValidDate) && $v.form.orderDate.$dirty ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Reason: </label>
                <v-select 
                  :options="Object.keys(reasons)" 
                  v-model="$v.form.reason.$model" 
                  :style="!$v.form.reason.required && $v.form.reason.$dirty ? 'border: 1.5px solid red;' : ''"
                  placeholder="select reason" 
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Specimen: </label>
                <v-select 
                  :options="Object.keys(specimens)" 
                  v-model="$v.form.specimen.$model"
                  :style="!$v.form.specimen.required && $v.form.specimen.$dirty ? 'border: 1.5px solid red;' : ''"
                  placeholder="specimen"
                />
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
                  aria-describedby="helpId"
                  v-model="$v.form.resultDate.$model"
                  :style="(!$v.form.resultDate.required || !$v.form.resultDate.isValidDate) && $v.form.resultDate.$dirty ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Result Modifier: </label>
                <v-select 
                  :options="modifiers" 
                  v-model="$v.form.modifier.$model"
                  :style="!$v.form.modifier.required && $v.form.modifier.$dirty ? 'border: 1.5px solid red;' : ''" 
                  placeholder="modifier" 
                  :disabled="ldl"
                ></v-select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Result Value: </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder
                  aria-describedby="helpId"
                  v-model="$v.form.viralLoad.$model"
                  :style="!$v.form.viralLoad.required && $v.form.viralLoad.$dirty ? 'border: 1.5px solid red;' : ''"
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
import {
  required,
  requiredIf,
  between
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import moment from "moment";

export default {
  components: {
    "v-select": VueSelect
  },
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        orderDate: {
          required,
          isValidDate(orderDate) {
            const date = moment(orderDate);
            return date.isValid() &&
              date.isSameOrBefore(moment());
          }
        },
        reason: {
          required,
        },
        specimen: {
          required,
        },
        resultDate: {
          required,
          isValidDate(resultDate) {
            const date = moment(resultDate);
            return date.isValid() &&
              date.isSameOrAfter(moment(this.form.orderDate)) && 
              date.isSameOrBefore(moment());
          },
        },
        modifier: {
          required: requiredIf(() => !this.ldl),
        },
        viralLoad: {
          required: requiredIf(() => !this.ldl),
        } 
      }
    };
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
      form:{
        modifier: null,
        viralLoad: null,
        resultDate: null,
        orderDate: null,
        specimen: null,
        reason: null,
      },
      ldl: false,
      errorMessage: null,
    };
  },
  methods: {
    validateForm: function() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
    createLabOrder: async function(personId) {
      const encounter = await EncounterService.createEncounter(personId, 13, this.form.orderDate);
      if (encounter.status === 200 || encounter.status === 201) {
        const response = await ApiClient.post("/lab/orders", {
          encounter_id: encounter.encounter_id,
          orders: [{
            encounter_id: encounter.encounter_id,
            tests: [{ concept_id: 856 }],
            reason_for_test_id: this.reasons[this.form.reason],
            target_lab: this.location,
            requesting_clinician: this.user,
            date: this.form.orderDate,
            specimen: {
              concept_id: this.specimens[this.form.specimen]
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
      const encounter = await EncounterService.createEncounter(personId, 57, this.form.resultDate);
      if (encounter.status === 200 || encounter.status === 201) {
        const response = await ApiClient.post(`lab/tests/${testID}/results`, {
          encounter_id: encounter.encounter_id,
          date: this.form.resultDate,
          measures: [{
            indicator: {
              concept_id: 856,
            },
            value: this.ldl ? "LDL" : parseInt(this.form.viralLoad),
            value_modifier: this.ldl ? "=" : this.form.modifier,
            value_type: this.ldl? "text" : "numeric"
          }]
        });
        return response.status === 200 || response.status === 201;
      }
      return false;
    },
    saveEncounter: async function() {
      if(!this.validateForm()){
        return this.errorMessage = "Complete all required fields";
      }
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
