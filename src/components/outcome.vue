<template>
  <div>
    <div class="alert alert-dark">
      Patient is <strong v-if="!isEnrolled"> not </strong> enrolled in porgram.
      <span v-if="enrollDate"
        >Date enrolled is {{ moment(enrollDate).format("DD-MMM-YYYY") }}</span
      >
    </div>
    <programs></programs>
    <br />
    <div class="row">
      <div class="col-5">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="height">Outcome</span>
          </div>
          <select
            class="form-control"
            name=""
            id=""
            v-if="states.length > 0"
            v-model="state"
          >
            <option
              v-for="(state, index) in states"
              :key="index"
              :value="{
                state_id: state.program_workflow_state_id,
                name: state.name,
              }"
            >
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-5">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Outcome Date</span>
          </div>
          <b-form-datepicker
            id="encounter-datepicker"
            v-model="date"
            :min="moment(enrollDate).format('YYYY-MM-DD')"
          ></b-form-datepicker>
        </div>
      </div>

      <div class="col-5" v-if="state.name === 'Patient transferred out'">
        <div class="form-group">
          <v-select
            :options="locations"
            @search="getlocations"
            @input="getVal"
            placeholder="Next facility"
          ></v-select>
        </div>
      </div>
      <div class="col-5" v-if="state.name === 'Patient transferred out'">
        <div class="form-group">
          <v-select
            v-model="transferOutReason"
            :options="transferOutReasons"
            placeholder="Reason for Transferring out"
          ></v-select>
        </div>
      </div>
      <div class="col-7" v-if="state.name === 'Patient transferred out' && transferOutReason === 'Other'">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Other reason for transfer out</span>
          </div>
          <b-input
            v-model="otherTransferOutReason"
            placeholder="Other reason for transfer out"
          ></b-input>
        </div>
      </div>
      <div class="col-2">
        <button @click="postOutcome" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="text-center">
      <p v-for="(error, index) in errors" :key="index" style="color: red">
        {{ error }}
      </p>
    </div>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Outcome</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(outcome, index) in outcomes" :key="index">
          <td>{{ outcome.name }}</td>
          <td>{{ moment(outcome.start_date).format("DD-MMM-YYYY") }}</td>
          <td v-if="outcome.end_date">
            {{ moment(outcome.end_date).format("DD-MMM-YYYY") }}
          </td>
          <td v-else></td>
          <!-- <td>{{moment(visit.visitDate).format("DD-MMM-YYYY")}}</td> -->
          <td>
            <click-confirm>
              <button
                class="btn btn-danger"
                @click="voidState(outcome.patient_state_id, index)"
              >
                <template v-if="voiding">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Loading...</span>
                </template>

                <template v-else>
                  <span>X</span>
                </template>
              </button>
            </click-confirm>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import moment from "moment";
import EventBus from "../services/event-bus.js";
import programs from "@/components/Programs.vue";
import EncounterService from "@/services/encounter_service";
export default {
  components: {
    "v-select": VueSelect,
    programs: programs,
  },
  data: function () {
    return {
      states: [],
      errors: [],
      state: {},
      outcomes: [],
      date: null,
      locations: [],
      location: null,
      location_name: null,
      voiding: false,
      enrollDate: null,
      programs: [],
      otherTransferOutReason: "",
      transferOutReason: "",
      transferOutReasons: [
        'Workplace transfer/lost job-related reasons',
        'Relocation to another place/home village',
        'Transport due to long distance',
        'School',
        'Business',
        'Marriage',
        'Unknown',
        'Clinic not helping',
        'Other'
      ]
    };
  },
  methods: {
    getOutcomes: async function () {
      await ApiClient.get(`/programs/1/workflows`).then((res) => {
        res.json().then((f) => {
          this.states = f[0].states;
        });
      });
    },
    getPatientOutcomes: async function () {
      await ApiClient.get(`/patients/${this.$route.params.id}/programs`).then(
        (res) => {
          res.json().then((f) => {
            if (f.length > 0) {
              this.programs = f;
              this.outcomes = f.filter((y) => {
                return y.program_id === 1;
              })[0]["patient_states"];
              this.enrollDate = f[0].date_enrolled;
            }
          });
        }
      );
    },
    voidState: async function (id, index) {
      this.voiding = true;
      let url = `/programs/1/patients/${this.$route.params.id}/states/${id}?reason='duplicate / system error'`;
      const response = await ApiClient.remove(url);
      if (response.status === 201 || response.status === 204) {
        EventBus.$emit("reload-visits", "");
        let toast = this.$toasted.show("Outcome deleted", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 2000,
        });
        this.voiding = false;
        this.outcomes.splice(index, 1);
        // this.$root.$emit('bv::hide::modal', 'outcome-modal', '#btnShow')
      } else {
        console.log(response.status);
        console.log("Failed to update");
      }
    },
    postOutcome: async function () {
      this.errors = [];
      if (Object.keys(this.state).length === 0) {
        this.errors.push("Outcome is required");
      }
      if (this.date === null || this.date === "") {
        this.errors.push("Date is required");
      }
      let outcomeData = {
        state: this.state.state_id,
        date: moment(this.date).format("YYYY-MM-DD"),
      };
      if (this.state.name === "Patient transferred out") {
        outcomeData.location_id = this.location;
        if (this.location == null) {
          this.errors.push("Location is required");
        } else if (!this.transferOutReason || (this.transferOutReason === "Other" && !this.otherTransferOutReason)) {
          this.errors.push("Reason for transfer out is required")
        } else  {
          let patientID = this.$route.params.id;
          const encounter = await EncounterService.createEncounter(
            patientID,
            119,
            this.date
          );
          if (encounter.status === 201 || encounter.status === 200) {
            let encounterID = encounter.encounter_id;
            let enc = {
              encounter_id: encounterID,
              observations: [
                {
                  value_text: this.location_name,
                  value_coded: this.location,
                  concept_id: 3003,
                },
                {
                  value_text: this.transferOutReason !== 'Other' ? this.transferOutReason : this.otherTransferOutReason,
                  concept_id: 3004,
                }
              ],
            };
            const response = await ApiClient.post("observations", enc);
          }
        }
      }
      if (this.errors.length === 0) {
        let patientID = this.$route.params.id;
        const response = await ApiClient.post(
          `programs/1/patients/${patientID}/states`,
          outcomeData
        );
        if (response.status === 201 || response.status === 200) {
          EventBus.$emit("reload-visits", "");
          let toast = this.$toasted.show("Outcome Saved", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 2000,
          });
          this.$root.$emit("bv::hide::modal", "outcome-modal", "#btnShow");
        } else {
          console.log("Failed to update");
        }
      }
    },
    getlocations: async function (val) {
      this.locations = [];
      await ApiClient.get(`/locations?name=` + val).then((res) => {
        res.json().then((ret) => {
          let loc = ret.forEach((element) => {
            this.locations.push({
              label: element.name,
              code: element.name,
              location_id: element.location_id,
            });
          });
        });
      });
    },
    getVal(val) {
      this.location = val.location_id;
      this.location_name = val.label;
    },
  },
  mounted() {
    this.getOutcomes();
    this.getlocations("");
    this.getPatientOutcomes();
  },
  computed: {
    isEnrolled() {
      return this.programs.filter((l) => {
        return l.program.name === "HIV PROGRAM";
      }).length > 0
        ? true
        : false;
    },
  },
};
</script>

<style>
</style>