<template>
  <div style="margin: auto; width: 95%">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <label style="float: left; font-weight: bold;">ARV Number (*)</label>
          </div>
        </div>
        <div class="form-group" style="font-weight: bold; color: rgba(300, 149, 100, 1);">
          <div style="float: left; margin-top: 7px">
            <label style=" display: inline-block">{{`${sitePrefix}-ARV-`}}</label>
          </div>
          <div style="float: right; width: 80%; margin: auto">
            <input
              type="number"
              class="form-control"
              name
              placeholder="Enter ARV Number"
              v-model="arvNumber"
              :disabled="arvNumberUnkown"
              v-on:input="setRegistration"
              style="display: inline"
            />
          </div>
        </div>
      </div>
 
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial Visit Date (*)</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="visitDateDay"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="visitDateMonth"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="visitDateYear"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" style="float: left">
        <div style="float: left">
          <span style="font-weight: bold;">Agrees to follow up? (*)</span>
        </div>
        <div class="form-group">
          <select name="stage" class="form-control" v-model="shouldFollowUp" @change="followUp">
            <option disabled selected>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <span
          style="font-weight: bold; float: left"
        >Ever received ARVs for treatment or prophylaxis? (*)</span>
        <div class="form-group">
          <select
            name="stage"
            class="form-control"
            v-model="receievedARVTreatmentBefore"
            @change="everRecieved"
          >
            <option disabled selected>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Date last taken ARVs (*)</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <input
              v-model="dateLastTakenARVday"
              type="number"
              class="form-control"
              placeholder="DD"
              maxlength="2"
              minlength="2"
              v-on:input="setRegistration"
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="dateLastTakenARVmonth"
              type="number"
              class="form-control"
              placeholder="MM"
              maxlength="2"
              minlength="2"
              v-on:input="setRegistration"
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="dateLastTakenARVyear"
              type="number"
              class="form-control"
              placeholder="YYYY"
              maxlength="4"
              minlength="4"
              v-on:input="setRegistration"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Ever registered at an ART clinic? (*)</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <select
                name="stage"
                class="form-control"
                v-model="everRegisteredAtClinicValue"
                @change="everRegistered"
              >
                <option disabled selected>Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6" style="padding-right: 0">
                <label style="float: left; font-weight: bold">Location of ART Initiation (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Location Unknown?</span>
                <input
                  type="checkbox"
                  @click="locationOfInitiationCheck()"
                  style="margin-left: 10px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <v-select
                :options="locations"
                @search="getlocations"
                @input="getLoc"
                v-model="locationOfInitiation"
                :disabled="locationOfInitiationUnknown"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Date started ART (*)</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="artStartDateDay"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="artStartDateMonth"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="artStartDateYear"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial Vitals (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="float: left; font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic; margin-left: 38px"
                >Vitals Unknown?</span>
                <input
                  type="checkbox"
                  @click="initialVitalsCheck()"
                  style="margin-left: 10px; float:left; margin-top: 6px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                name
                v-model="initialWeight"
                :placeholder="initialVitalsUnknown ? 'Unknown Weight' : 'Enter Weight'"
                v-on:input="setRegistration"
                :disabled="initialVitalsUnknown"
              />
            </div>
          </div>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              name
              v-model="initialHeight"
              :placeholder="initialVitalsUnknown ?  'Unknown Height' : 'Enter Height'"
              v-on:input="setRegistration"
              :disabled="initialVitalsUnknown"
            />
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial TB Status (*)</label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <select
                class="form-control"
                name
                id
                v-model="initialTbStatus"
                @change="setRegistration"
              >
                <option disabled selected>Select Option</option>
                <option
                  v-for="(status, index) in Object.keys(TB_STATUS)"
                  :key="index"
                  :value="TB_STATUS[status]"
                >{{status}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Confirmatory Test (*)</label>
          </div>
        </div>
        <div class="form-group">
          <v-select
            :options="options"
            v-model="confirmatory"
            :reduce="option => option.value"
            v-on:input="setRegistration"
          ></v-select>
        </div>
      </div>
    </div>
    <div v-if="confirmatory == 1040 || confirmatory == 844" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6" style="padding-right: 0">
                <label style="float: left; font-weight: bold">Location of confirmatory (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Location unknown?</span>
                <input
                  type="checkbox"
                  @click="locationOfConfirmatoryCheck()"
                  style="margin-left: 10px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <v-select
                :options="locations"
                @search="getlocations"
                @input="getVal"
                v-model="locationOfConfirmatory"
                :disabled="locationOfConfirmatoryUnknown"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="confirmatory == 1040 || confirmatory == 844" class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <label style="float: left; font-weight: bold">Confirmatory HIV test date (*)</label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="hivTestDateDay"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="hivTestDateMonth"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="hivTestDateYear"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

<script>
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import vitals from "@/components/encounters/vitals.vue";
import moment from "moment";
import GlobalProperties from "@/services/global_properties";
export default {
  components: {
    "v-select": VueSelect
  },
  props: ["patientId"],
  data: function() {
    return {
      recievedTreatment: false,
      receievedARVTreatmentBefore: "Select Option",
      everRegisteredAtClinicValue: "Select Option",
      agreesToFollowUp: false,
      shouldFollowUp: "Select Option",
      registered: false,
      arvNumberUnkown: false,
      arvNumber: null,
      artStartDateDay: null,
      artStartDateMonth: null,
      artStartDateYear: null,
      yearLastTaken: null,
      estimatedYearLastTaken: null,
      locationOfInitiation: "Select Option",
      locationOfInitiationUnknown: false,
      locationOfConfirmatory: "Select Option",
      locationOfConfirmatoryUnknown: false,
      confirmatory: "Select Option",
      hivTestDateDay: null,
      hivTestDateMonth: null,
      hivTestDateYear: null,
      arvsTakenTwoMonthsPrior: "Select Option",
      arvsTakenTwoWeeksPrior: "Select Option",
      initialWeight: null,
      initialHeight: null,
      initialVitalsUnknown: false,
      initialTbStatus: "Select Option",
      sitePrefix: null,
      dateLastTakenARVday: null,
      dateLastTakenARVmonth: null,
      dateLastTakenARVyear: null,
      visitDateDay: null,
      visitDateMonth: null,
      visitDateYear: null,
      TB_STATUS: {
        "TB NOT suspected": 7454,
        "TB suspected": 7455,
        "Confirmed TB NOT on treatment": 7456,
        "Confirmed TB on treatment": 7458
      },
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
        }
      ],
      clinicRegistration: {
        encounter_id: 9,
        encounter_datetime: null,
        obs: {
          phoneFollowUp: {
            // DONE
            concept_id: 2552,
            value_coded: 9685,
            child: {
              concept_id: 9685,
              value_coded: null
            }
          },
          homeFollowUp: {
            // DONE
            concept_id: 2552,
            value_coded: 9686,
            child: {
              concept_id: 9686,
              value_coded: null
            }
          },
          yearLastTakenARVs: {
            // OPTIONAL FIELD
            //DONE
            concept_id: 7751,
            value_datetime: null
          },
          everReceivedART: {
            // OPTIONAL FIELD
            // DONE
            value_coded: null,
            concept_id: 7754
          },
          everRegisteredAtClinic: {
            // MA
            // DONE
            concept_id: 7937,
            value_coded: null
          },
          artNumberAtPreviousLocation: {
            // DONE
            concept_id: 6981,
            value_text: null
          },
          confirmatoryTest: {
            value_coded: null,
            concept_id: 7880
          },
          ARTStartLocation: {
            // Location of ART Initiation
            value_text: null,
            concept_id: 7750,
            location_id: null
          },
          dateARTStarted: {
            concept_id: 2516,
            value_datetime: null
          },
          testLocation: {
            // Location of ART Confirmatory
            value_text: null,
            concept_id: 7881,
            location_id: null
          },
          testDate: {
            concept_id: 7882,
            value_datetime: null
          },
          initialTbStatus: {
            concept_id: 7459,
            value_coded: null
          }
        }
      },

      // make vitals optional
      vitalsEncounter: {
        encounter_id: 6,
        encounter_datetime: null,
        obs: {
          weight: {
            concept_id: 5089,
            value_numeric: null
          },
          height: {
            concept_id: 5090,
            value_numeric: null
          }
        }
      },
      locations: []
    };
  },
  computed: {
    visitDate() {
      return this.makeISODateString(this.visitDateYear, this.visitDateMonth, this.visitDateDay);
    }
  },
  methods: {
    initial() {
      this.setRegistration();
      this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everReceivedART.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066; // No answer
    },

    followUp() {
      this.setRegistration();
      if (this.shouldFollowUp == "No") {
        console.log("No");
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
        this.agreesToFollowUp = false;
      } else if (this.shouldFollowUp == "Yes") {
        console.log("Yes");
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1065; // No answer
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1065; // No answer
        this.agreesToFollowUp = true;
      }
    },

    // Ever recieved ARVs for treatment
    everRecieved() {
      this.setRegistration();
      console.log(this.receievedARVTreatmentBefore);
      if (this.receievedARVTreatmentBefore == "No") {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1066;
        this.registered = false;
        this.recievedTreatment = false;
      } else if (this.receievedARVTreatmentBefore == "Yes") {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1065;
        this.recievedTreatment = true;
      }
    },

    // Ever registered at an ART Clinic
    everRegistered() {
      this.setRegistration();
      if (this.everRegisteredAtClinicValue == "No") {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066;
        this.registered = false;
      } else if (this.everRegisteredAtClinicValue == "Yes") {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1065;
        this.registered = true;
      }
    },

    //Location of ART initiation
    locationOfInitiationCheck() {
      this.setRegistration();
      if (this.locationOfInitiationUnknown == true) {
        this.locationOfInitiation = "Select Location";
        this.locationOfInitiationUnknown = false;
      } else if (this.locationOfInitiationUnknown == false) {
        this.locationOfInitiation = "Unknown";
        this.clinicRegistration.obs.ARTStartLocation.value_text = "Unknown";
        this.locationOfInitiationUnknown = true;
      }
    },

    arvNumberUnkownCheckbox() {
      this.setRegistration();
      if (this.arvNumberUnkown == true) {
        this.arvNumber = "";
        this.arvNumberUnkown = false;
      } else if (this.arvNumberUnkown == false) {
        this.arvNumber = "Unknown";
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text =
          "Unknown";
        this.arvNumberUnkown = true;
      }
    },

    locationOfConfirmatoryCheck() {
      this.setRegistration();
      if (this.locationOfConfirmatoryUnknown == true) {
        this.locationOfConfirmatory = "Select Location";
        this.locationOfConfirmatoryUnknown = false;
      } else if (this.locationOfConfirmatoryUnknown == false) {
        this.locationOfConfirmatory = "Unknown";
        this.clinicRegistration.obs.testLocation.value_text = "Unknown";
        this.locationOfConfirmatoryUnknown = true;
      }
    },

    initialVitalsCheck() {
      this.setRegistration();
      if (this.initialVitalsUnknown == true) {
        this.initialVitalsUnknown = false;
      } else if (this.initialVitalsUnknown == false) {
        this.initialVitalsUnknown = true;
      }
    },

    estimateYearLastTaken() {
      this.setRegistration();
      if (this.yearLastTakenUknown) {
        if (this.arvsTakenTwoMonthsPrior == "Yes") {
          if (this.arvsTakenTwoWeeksPrior == "Yes") {
            let date = new Date();
            date.setDate(date.getDate() - 14); //two weeks
            date = date.toDateString();
            const weekEstimate = moment(date).format("YYYY-MM-DD");
            console.log(weekEstimate);
          }
          if (this.arvsTakenTwoWeeksPrior == "No") {
            let date = new Date();
            date.setDate(date.getDate() - 60); // 2 months
            date = date.toDateString();
            const monthEstimated = moment(date).format("YYYY-MM-DD");
            console.log(monthEstimated);
          }
        }
        if (this.arvsTakenTwoMonthsPrior == "No") {
          let date = new Date();
          date.setDate(date.getDate() - 90); //3 months
          date = date.toDateString();
          const monthEstimated = moment(date).format("YYYY-MM-DD");
          this.arvsTakenTwoWeeksPrior = "Select";
          console.log(monthEstimated);
        }
      }
    },

    getlocations: async function(val = "") {
      this.setRegistration();
      await ApiClient.get(`/locations?name=` + val).then(res => {
        res.json().then(ret => {
          this.locations = ret.map(element => {
            return {
              label: element.name,
              code: element.name,
              location_id: element.location_id
            };
          });
        });
      });
    },
    buildForRegistrationGlobalState() {

      if (!this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      if (
        this.dateLastTakenARVyear != null &&
        this.dateLastTakenARVmonth != null &&
        this.dateLastTakenARVday != null
      ) {
        const dateInput = `${this.dateLastTakenARVyear}-${this.dateLastTakenARVmonth}-${this.dateLastTakenARVday}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = date;
      }

      if (
        this.artStartDateYear != null &&
        this.artStartDateMonth != null &&
        this.artStartDateDay != null
      ) {
        const dateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.dateARTStarted.value_datetime = date;
      }

      if (this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      if (this.arvNumber != null) {
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = `${this.sitePrefix}-ARV-${this.arvNumber}`;
      }

      if (this.confirmatory != null) {
        this.clinicRegistration.obs.confirmatoryTest.value_coded = this.confirmatory;
      }

      if (this.hivTestDateYear != null && this.hivTestDateMonth !=  null && this.hivTestDateDay) {
        const dateInput = `${this.hivTestDateYear}-${this.hivTestDateMonth}-${this.hivTestDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");

        this.clinicRegistration.obs.testDate.value_datetime = date;
      }

      if (this.initialTbStatus) {
        const dateInput = `${this.hivTestDateYear}-${this.hivTestDateMonth}-${this.hivTestDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.testDate.value_datetime = date;
      }

      if (this.initialWeight != null) {
        this.vitalsEncounter.obs.height.value_numeric = this.initialWeight;
      }

      if (this.initialHeight != null) {
        this.vitalsEncounter.obs.weight.value_numeric = this.initialHeight;
      }

      if (this.initialTbStatus != null) {
        this.clinicRegistration.obs.initialTbStatus.value_coded = this.initialTbStatus;
      }

      if (
        this.artStartDateYear != null &&
        this.artStartDateMonth != null &&
        this.artStartDateDay != null
      ) {
        const dateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      }

      if (this.registered) {
        const dateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      } else {
        this.vitalsEncounter.encounter_datetime = this.visitDate;
      }
    },

    buildObservations() {
      // YEAR LAST TAKEN

      if (!this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      // optional
      if (this.recievedTreatment) {
        const dateInput = `${this.dateLastTakenARVyear}-${this.dateLastTakenARVmonth}-${this.dateLastTakenARVday}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = date;
      } else {
        delete this.clinicRegistration.obs.yearLastTakenARVs;
      }

      // also location of ART initiation
      //optional
      if (this.registered) {
        // ART Number
        const dateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.dateARTStarted.value_datetime = date; // this looks ok
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = `${this.sitePrefix}-ARV-${this.arvNumber}`;
        this.clinicRegistration.obs.initialTbStatus.value_coded = this.initialTbStatus;
      } else {
        //ART start date
        delete this.clinicRegistration.obs.dateARTStarted;
        // ART Number
        delete this.clinicRegistration.obs.artNumberAtPreviousLocation;

        delete this.clinicRegistration.obs.ARTStartLocation;
        delete this.clinicRegistration.obs.ARTStartLocation;
        delete this.clinicRegistration.obs.initialTbStatus;
      }

      //optional
      if (this.confirmatory == 1040 || this.confirmatory == 844) {
        this.clinicRegistration.obs.confirmatoryTest.value_coded = this.confirmatory;
        const dateInput = `${this.hivTestDateYear}-${this.hivTestDateMonth}-${this.hivTestDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.testDate.value_datetime = date;
      } else {
        delete this.clinicRegistration.obs.confirmatoryTest;
        delete this.clinicRegistration.obs.testDate;

        delete this.clinicRegistration.obs.testLocation;
        delete this.clinicRegistration.obs.testLocation;
      }

      this.saveARVNumber();

    },

    buildVitalsObservations() {
      if (this.initialHeight != null && this.initialWeight != null) {
        this.vitalsEncounter.obs.height.value_numeric = this.initialHeight;
        this.vitalsEncounter.obs.weight.value_numeric = this.initialWeight;
      } else {
        delete this.vitalsEncounter.obs;
      }

      if (this.registered) {
        const dateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      } else {
        const todaysDate = moment(new Date()).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = todaysDate;
      }
    },

    setRegistration() {
      const dateInput = `${this.dateLastTakenARVyear}-${this.dateLastTakenARVmonth}-${this.dateLastTakenARVday}`;
      const date = moment(new Date(dateInput)).format("YYYY-MM-DD");

      const startDateInput = `${this.artStartDateYear}-${this.artStartDateMonth}-${this.artStartDateDay}`;
      const startDate = moment(new Date(startDateInput)).format("YYYY-MM-DD");

      const testDateInput = `${this.hivTestDateYear}-${this.hivTestDateMonth}-${this.hivTestDateDay}`;
      const testDate = moment(new Date(testDateInput)).format("YYYY-MM-DD");

      this.buildForRegistrationGlobalState();
      console.log("Set Registration");
      let registration = {};
      registration = {
        encounter: this.clinicRegistration,
        agrees_to_follow: this.shouldFollowUp,
        initial_visit_date: this.visitDate,
        receieved_treatment: {
          ever_received: this.receievedARVTreatmentBefore,
          last_date_received: date,
          ever_registered: this.everRegisteredAtClinicValue
        },
        art_registration: {
          ever_registered: this.everRegisteredAtClinicValue,
          location: this.locationOfInitiation,
          start_date: startDate,
          arv_number: this.arvNumber
        },
        confirmatory_test: {
          test: this.confirmatory,
          location: this.locationOfConfirmatory,
          test_date: testDate
        },
        vitals: this.vitalsEncounter
      };

      console.log(registration)

      this.$store.commit("setRegistration", registration);
    },
    getVal(val) {
      //location of confirmatory
      this.setRegistration();
      this.clinicRegistration.obs.testLocation.value_text = val.label;
      this.clinicRegistration.obs.testLocation.location_id = val.location_id;
    },
    getLoc(val) {
      //location of initiation
      this.setRegistration();
      this.clinicRegistration.obs.ARTStartLocation.value_text = val.label;
      this.clinicRegistration.obs.ARTStartLocation.location_id =
        val.location_id;
    },
    getStuff(val) {
      this.setRegistration();
      this.encounters.push(val);
    },
    saveEncounter() {
      this.ifPatientIsNotInHIVProgram(this.enrollPatientIntoHIVProgram);

      this.buildObservations();
      this.$emit("addEncounter", {
        clinicRegistration: this.clinicRegistration
      });

      if (!this.initialVitalsUnknown && this.everRegisteredAtClinicValue == 'Yes' && this.receievedARVTreatmentBefore == 'Yes') {
        this.buildVitalsObservations();
        console.log(this.vitalsEncounter);
        this.$emit("addEncounter", {
          initialVitals: this.vitalsEncounter
        });
      }
    },
    makeISODateString(year, month, day) {
      year = String(year).padStart(4, '0');
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    },
    async ifPatientIsNotInHIVProgram(success, fail = () => null) {
      const response = await ApiClient.get(`patients/${this.patientId}/programs`);
      const programs = await response.json();

      if (programs.findIndex(program => program.program_id === 1) < 0) {
        success();
      } else {
        fail();
      }
    },
    async enrollPatientIntoHIVProgram() {
      const response = await ApiClient.post(`patients/${this.patientId}/programs`, {
        program_id: 1,
        date_enrolled: this.visitDate
      });

      if (!response.ok) {
        const {errors} = await response.json();
        this.$bvToast.toast(`Failed to enroll patient in HIV Program: ${errors.join('; ')}`, {
          variant: 'warning'
        });

        return null;
      }

      return await response.json();
    },
    getPrefix: async function() {
      this.sitePrefix = await GlobalProperties.getSitePrefix();

      console.log("Site Prefix: " + this.sitePrefix);
    },
    //find site prefix
    saveARVNumber: async function() {
      let finalNum = `${this.sitePrefix}-ARV-${this.arvNumber}`;
      let identifier_data = {
        identifier: finalNum,
        identifier_type: 4,
        patient_id: this.patientId
      };
      const response = await ApiClient.post(
        `/patient_identifiers/`,
        identifier_data
      );
      if (response.status === 201 || response.status === 200) {
        console.log("ARV number OK");
      } else if (response.status === 400) {
        console.log("ARV number already taken");
      }
    }
  },
  created() {
    this.getPrefix();
    this.getlocations(sessionStorage.location_name);
  },
  mounted() {
    this.initial();
  }
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-label .checkbox-custom {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 24px;
  width: 24px;
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid black;
}

.checkbox-label input:checked ~ .checkbox-custom {
  background-color: #009bff;
  border-radius: 5px;
  -webkit-transform: rotate(0deg) scale(1);
  -ms-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  opacity: 1;
  border: 2px solid black;
}

.checkbox-label .checkbox-custom::after {
  position: absolute;
  content: "";
  left: 12px;
  top: 12px;
  height: 0px;
  width: 0px;
  border-radius: 5px;
  border: solid #009bff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(0deg) scale(0);
  -ms-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  opacity: 1;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

.checkbox-label input:checked ~ .checkbox-custom::after {
  -webkit-transform: rotate(45deg) scale(1);
  -ms-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  opacity: 1;
  left: 8px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  background-color: transparent;
  border-radius: 0;
}

/* For Ripple Effect */
.checkbox-label .checkbox-custom::before {
  position: absolute;
  content: "";
  left: 10px;
  top: 10px;
  width: 0px;
  height: 0px;
  border-radius: 5px;
  border: 2px solid black;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.checkbox-label input:checked ~ .checkbox-custom::before {
  left: -3px;
  top: -3px;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  -webkit-transform: scale(3);
  -ms-transform: scale(3);
  transform: scale(3);
  opacity: 0;
  z-index: 999;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

/* Style for Circular Checkbox */
.checkbox-label .checkbox-custom.circular {
  border-radius: 50%;
  border: 2px solid black;
}

.checkbox-label input:checked ~ .checkbox-custom.circular {
  background-color: #0067ff;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.checkbox-label input:checked ~ .checkbox-custom.circular::after {
  border: solid white;
  border-width: 0 2px 2px 0;
}
.checkbox-label .checkbox-custom.circular::after {
  border-radius: 50%;
}

.checkbox-label .checkbox-custom.circular::before {
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.checkbox-label input:checked ~ .checkbox-custom.circular::before {
  border-radius: 50%;
}
</style>