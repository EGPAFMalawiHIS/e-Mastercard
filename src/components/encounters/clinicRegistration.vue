<template>
  <div style="margin: auto; width: 95%">
    <div class="row">
      <div class="col-md-6" style="height: 37px; float: left">
        <div style="margin-top: 6px; float: left">
          <span style="font-weight: bold;">Agrees to follow up?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" v-model="agreesToFollowUp" style="margin-left: 50px" />
              <span class="checkbox-custom rectangular" style="margin-left: 180px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6" style="height: 37px;">
        <div style="margin-top: 6px; float: left">
          <span style="font-weight: bold;">Ever recieved ARVs for treatment or prophylaxis?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" style="margin-left: 50px" @click="everRecieved()" />
              <span class="checkbox-custom rectangular" style="margin-left: 400px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <label style="float: left; font-weight: bold">Year last taken ARVs</label>
          </div>
          <div class="col-md-6">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic;"
            >Year Unknown?</span>
            <input type="checkbox" @click="yearLastTakenUknownCheck()" style="margin-left: 10px" />
          </div>
        </div>
        <div class="form-group">
          <input
            v-if="!yearLastTakenUknown"
            type="date"
            class="form-control"
            name
            v-model="yearLastTaken"
          />
          <input
            v-if="yearLastTakenUknown"
            type="text"
            class="form-control"
            value="Unknown"
            v-model="yearLastTaken"
            disabled
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Registered at a clinic</label>
          </div>
        </div>
        <div class="col-md-12" style="background: rgba(137, 140, 145, 0.2); height: 37px;">
          <div style="margin-top: 6px; float: left;">
            <span style="font-weight: bold;">Ever registered at an ART clinic?</span>
            <div>
              <label class="checkbox-label" style="margin-left: 50px">
                <input type="checkbox" style="margin-left: 50px" @click="everRegistered()" />
                <span
                  class="checkbox-custom rectangular"
                  style="margin-left: 275px; margin-top: 6px"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && yearLastTakenUknown" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">ARVs taken 2 months prior?</label>
          </div>
        </div>
        <div class="form-group">
          <input
            v-if="!yearLastTakenUknown"
            type="date"
            class="form-control"
            name
            v-model="yearLastTaken"
          />
          <select
            v-model="arvsTakenTwoMonthsPrior"
            id="patient-gender"
            name="patient-gender"
            class="form-control"
            v-if="yearLastTakenUknown"
          >
            <option disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">ARVs taken 2 weeks prior?</label>
          </div>
        </div>
        <div class="col-md-12">
          <select
            v-model="arvsTakenTwoWeeksPrior"
            id="patient-gender"
            name="patient-gender"
            class="form-control"
            v-if="yearLastTakenUknown"
            :disabled="arvsTakenTwoMonthsPrior != 'Yes'"
          >
            <option disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3">
                <label style="float: left; font-weight: bold">Location of ART Initiation</label>
              </div>
              <div class="col-md-3">
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
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Year started ART</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Year Unknown?</span>
                <input type="checkbox" @click="startDateUnknown()" style="margin-left: 10px" />
              </div>
            </div>
            <div class="form-group">
              <input
                v-if="!yearStartedKnown"
                type="date"
                class="form-control"
                name
                v-model="artStartDate"
              />
              <select
                v-if="yearStartedKnown"
                id="patient-gender"
                name="patient-gender"
                class="form-control"
              >
                <option disabled>Select</option>
                <option value="Yes">6 months</option>
                <option value="No">12 months</option>
                <option value="Unknown">18 months</option>
                <option value="No">24 months</option>
                <option value="Unknown">Over 2 years</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <label style="float: left; font-weight: bold">ARV Number</label>
          </div>
          <div class="col-md-6">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
            >Number Unknown?</span>
            <input type="checkbox" style="margin-left: 10px" @click="arvNumberUnkownCheckbox()" />
          </div>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name
            placeholder="Enter ARV Number"
            v-model="arvNumber"
            :disabled="arvNumberUnkown"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Confirmatory Test</label>
          </div>
        </div>
        <div class="form-group">
          <v-select :options="options" v-model="confirmatory" :reduce="option => option.value" v-on:input="setRegistration"></v-select>
        </div>
      </div>
    </div>
    <div v-if="confirmatory == 1040 || confirmatory == 844" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Location of confirmatory</label>
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
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Confirmatory HIV test year</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Year Unknown?</span>
                <input type="checkbox" @click="confirmatoryYearCheck()" style="margin-left: 10px" />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <input
                v-if="!hivTestYearUnknown"
                type="date"
                class="form-control"
                name
                v-model="hivTestYear"
              />
              <input
                v-if="hivTestYearUnknown"
                type="text"
                class="form-control"
                value="Unknown"
                name
                v-model="hivTestYear"
                disabled
              />
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
export default {
  components: {
    "v-select": VueSelect
  },
  data: function() {
    return {
      recievedTreatment: false,
      agreesToFollowUp: false,
      registered: false,
      yearStartedKnown: false,
      arvNumberUnkown: false,
      arvNumber: null,
      artStartDate: null,
      yearLastTakenUknown: false,
      yearLastTaken: null,
      locationOfInitiation: "Select Location of Initiation",
      locationOfInitiationUnknown: false,
      locationOfConfirmatory: "Select Location Confirmatory",
      locationOfConfirmatoryUnknown: false,
      confirmatory: "Select Confirmatory Test",
      hivTestYear: null,
      hivTestYearUnknown: false,
      arvsTakenTwoMonthsPrior: "Select",
      arvsTakenTwoWeeksPrior: "Select",

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
          }
        }
      },
      locations: []
    };
  },
  methods: {
    initial() {
      this.setRegistration()
      this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everReceivedART.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066; // No answer
    },

    // Agrees to follow up
    followUp() {
      this.setRegistration()
      if (this.agreesToFollowUp == true) {
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066;
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066;
        this.agreesToFollowUp = false;
      } else if (this.agreesToFollowUp == false) {
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1065;
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1065;
        this.agreesToFollowUp = true;
      }
    },

    // Ever recieved ARVs for treatment
    everRecieved() {
      this.setRegistration()
      if (this.recievedTreatment == true) {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1066;
        this.registered = false;
        this.recievedTreatment = false;
      } else if (this.recievedTreatment == false) {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1065;
        this.recievedTreatment = true;
      }
    },

    // Year last taken ARVs
    yearLastTakenUknownCheck() {
      this.setRegistration()
      if (this.yearLastTakenUknown == true) {
        const yearLastTaken = moment(this.yearLastTaken).format("YYYY-MM-DD");
        this.yearLastTaken = "";
        this.yearLastTakenUknown = false;
      } else if (this.yearLastTakenUknown == false) {
        this.yearLastTaken = "Unknown";
        this.clinicRegistration.obs.yearLastTakenARVs.value_datetime =
          "Unknown";
        this.yearLastTakenUknown = true;
      }
    },

    // Ever registered at an ART Clinic
    everRegistered() {
      this.setRegistration()
      if (this.registered == true) {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066;
        this.registered = false;
      } else if (this.registered == false) {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1065;
        this.registered = true;
      }
    },

    //Location of ART initiation
    locationOfInitiationCheck() {
      this.setRegistration()
      this.estimateYearLastTaken() // REMOVE THIS
      if (this.locationOfInitiationUnknown == true) {
        this.locationOfInitiation = "Select Location";
        this.locationOfInitiationUnknown = false;
      } else if (this.locationOfInitiationUnknown == false) {
        this.locationOfInitiation = "Unknown";
        this.clinicRegistration.obs.ARTStartLocation.value_text = "Unknown";
        this.locationOfInitiationUnknown = true;
      }
    },

    startDateUnknown() {
      this.setRegistration()
      if (this.yearStartedKnown == true) {
        this.yearStartedKnown = false;
      } else if (this.yearStartedKnown == false) {
        this.artStartDate = "Unknown"; // FIX THIS
        this.yearStartedKnown = true;
      }
    },
    arvNumberUnkownCheckbox() {
      this.setRegistration()
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
      this.setRegistration()
      if (this.locationOfConfirmatoryUnknown == true) {
        this.locationOfConfirmatory = "Select Location";
        this.locationOfConfirmatoryUnknown = false;
      } else if (this.locationOfConfirmatoryUnknown == false) {
        this.locationOfConfirmatory = "Unknown";
        this.clinicRegistration.obs.testLocation.value_text = "Unknown";
        this.locationOfConfirmatoryUnknown = true;
      }
    },

    confirmatoryYearCheck() {
      this.setRegistration()
      if (this.hivTestYearUnknown == true) {
        this.hivTestYear = "";
        this.hivTestYearUnknown = false;
      } else if (this.hivTestYearUnknown == false) {
        this.hivTestYear = "Unknown";
        this.clinicRegistration.obs.testDate.value_datetime = "Unknown";
        this.hivTestYearUnknown = true;
      }
    },

    estimateYearLastTaken() {
      this.setRegistration()
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
          this.arvsTakenTwoWeeksPrior = "Select"
          console.log(monthEstimated);
        }
      }
    },

    getlocations: async function(val = "") {
      this.setRegistration()
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

    buildObservations() {
      // YEAR LAST TAKEN
      this.setRegistration()
      const yearLastTaken = moment(this.yearLastTaken).format("YYYY-MM-DD");
      this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = yearLastTaken;

      // ART Number
      this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = this.arvNumber;

      //ART start date
      const startDate = moment(this.artStartDate).format("YYYY-MM-DD");
      this.clinicRegistration.obs.dateARTStarted.value_datetime = startDate; // this looks ok
      this.clinicRegistration.obs.confirmatoryTest.value_coded = this.confirmatory;

      const testYear = moment(this.hivTestYear).format("YYYY-MM-DD");
      this.clinicRegistration.obs.testDate.value_datetime = testYear;

    },
    setRegistration(){
      this.$store.commit('setRegistration', this.clinicRegistration)
    },
    getVal(val) {
      this.setRegistration()
      this.clinicRegistration.obs.testLocation.value_text = val.label;
      this.clinicRegistration.obs.testLocation.location_id = val.location_id;
    },
    getLoc(val) {
      this.setRegistration()
      this.clinicRegistration.obs.ARTStartLocation.value_text = val.label;
      this.clinicRegistration.obs.ARTStartLocation.location_id =
        val.location_id;
    },
    getStuff(val) {
      this.setRegistration()
      this.encounters.push(val);
    },
    saveEncounter() {
      this.buildObservations();
      console.log(this.clinicRegistration);
      this.$emit("addEncounter", {
        clinicRegistration: this.clinicRegistration
      });
    }
  },
  created() {
    this.getlocations();
  },
  mounted() {
    this.initial();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
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