<template>
  <div>
    <div class="row">
        <div class="col">
        <p>Phone Follow Up</p>
        </div>
        <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="1065"
              v-model="clinicRegistration.obs.phoneFollowUp.child.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="1066"
              v-model="clinicRegistration.obs.phoneFollowUp.child.value_coded"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
        </div>
    </div>
    <form>
      <div class="row">
        <div class="col">
        <p>Home Follow Up</p>
        </div>
        <div class="col">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="1065"
            v-model="clinicRegistration.obs.homeFollowUp.child.value_coded"
          />
          <label class="form-check-label" for="inlineRadio1">Yes</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="1066"
            v-model="clinicRegistration.obs.homeFollowUp.child.value_coded"
          />
          <label class="form-check-label" for="inlineRadio2">No</label>
        </div>
      </div>
      </div>
    </form>
    <form>
      <div class="row">
        <div class="col">
        <p>Ever Recieved ART</p>
        </div>
        <div class="col">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="1065"
            v-model="clinicRegistration.obs.everReceivedART.value_coded"
          />
          <label class="form-check-label" for="inlineRadio1">Yes</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="1066"
            v-model="clinicRegistration.obs.everReceivedART.value_coded"
          />
          <label class="form-check-label" for="inlineRadio2">No</label>
        </div>
        </div>
      </div>
    </form>

    <div class="form-group">
      <label for="exampleFormControlSelect1">Confirmatory Test</label>
        <v-select :options="options" v-model="clinicRegistration.obs.confirmatoryTest.value_coded" :reduce="option => option.value"></v-select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Test Location</label>
      <v-select :options="locations" @search="getlocations" @input="getVal"></v-select>
    </div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">Test Date</span>
  </div>
    <input type="date" class="form-control" name v-model="clinicRegistration.obs.testDate.value_datetime" />
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">ARV Last Taken</span>
  </div>
    <input type="date" class="form-control" name v-model="clinicRegistration.obs.dateARTLastTaken.value_datetime" />
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="height">ARV Start Date</span>
  </div>
          <input type="date" class="form-control" name v-model="clinicRegistration.obs.dateARTStarted.value_datetime" />
</div>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import vitals from "@/components/encounters/vitals.vue";
export default {
  components: {
    "v-select": VueSelect,
  },
  data: function() {
    return {
        options: [
          {
            label: "Rapid Antibody Test",
            value: 1040
          },
          {
            label: "DNA PCR",
            value: 844
          },
          {
            label: "Not Done",
            value: 1118
          },
        ],
      clinicRegistration: {
        encounter_id: 9,
        obs: {
          phoneFollowUp: {
            concept_id: 2552,
            value_coded: 9685,
            child: {
              concept_id: 9685,
              value_coded: null
            }
          },
          homeFollowUp: {
            concept_id: 2552,
            value_coded: 9686,
            child: {
              concept_id: 9686,
              value_coded: null
            }
          },
          everReceivedART: {
            value_coded: null,
            concept_id: 7754
          },
          confirmatoryTest: {
            value_coded: null,
            concept_id: 7880
          },
          testLocation: {
            value_text: null,
            concept_id: 7881,
            location_id: null
          },
          ARTStartLocation: {
            value_text: null,
            concept_id: 7750,
            location_id: null
          },
          testDate: {
            concept_id: 7882,
            value_datetime: null
          },
          dateARTLastTaken: {
            concept_id: 7751,
            value_datetime: null
          },
          dateARTStarted: {
            concept_id: 2516,
            value_datetime: null
          }
        }
      },
      locations: []
    };
  },
  methods: {
    

    getlocations: async function(val) {
      this.locations = [];
      await ApiClient.get(`/locations?name=` + val).then(res => {
        res.json().then(ret => {
          let loc = ret.forEach(element => {
            this.locations.push({
              label: element.name,
              code: element.name,
              location_id: element.location_id
            });
          });
        });
      });
    },

    getVal(val) {
      this.clinicRegistration.obs.testLocation.value_text = val.label;
      this.clinicRegistration.obs.testLocation.location_id = val.location_id;
    },
    getLoc(val) {
      this.clinicRegistration.obs.ARTStartLocation.value_text = val.label;
      this.clinicRegistration.obs.ARTStartLocation.location_id = val.location_id;
    },
    getStuff(val) {
      this.encounters.push(val);
    },
    saveEncounter() {
      this.$emit('addEncounter',({clinicRegistration: this.clinicRegistration}));
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>