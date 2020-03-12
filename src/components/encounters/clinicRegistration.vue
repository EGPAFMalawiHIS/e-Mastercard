<template>
  <div style="margin: auto; width: 95%">
    <div class="row">
      <div class="col-md-6" style="height: 37px; float: left">
        <div style="margin-top: 6px; float: left">
          <span style="font-weight: bold;">Agrees to follow up?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" v-model="agreesToFollowUp" style="margin-left: 50px" />
              <span class="checkbox-custom rectangular" style="margin-left: 480px; margin-top: 6px"></span>
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
              <span class="checkbox-custom rectangular" style="margin-left: 480px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row" style="margin-top: 10px">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">ART Clinic registration</label>
          </div>
        </div>
        <div
          class="col-md-12"
          style="background: rgba(137, 140, 145, 0.2); height: 37px; margin-top: 15px"
        >
          <div style="margin-top: 6px; float: left;">
            <span style="font-weight: bold;">Ever registered at an ART clinic?</span>
            <div>
              <label class="checkbox-label" style="margin-left: 50px">
                <input type="checkbox" style="margin-left: 50px" @click="everRegistered()" />
                <span
                  class="checkbox-custom rectangular"
                  style="margin-left: 465px; margin-top: 6px"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-5">
            <label style="float: left; font-weight: bold">Year last taken ARVs</label>
          </div>
          <div class="col-md-6">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
            >Year last taken Unknown?</span>
            <div>
              <label class="checkbox-label">
                <input type="checkbox" @click="yearLastTakenUknownCheck()" />
                <span class="checkbox-custom rectangular" style="margin-left: 260px;"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input type="date" class="form-control" name v-model="yearLastTaken" />
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row" style="margin-top: 8px">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Location of ART Initiation</label>
              </div>
              <div class="col-md-5">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Location Unknown?</span>
                <div>
                  <label class="checkbox-label">
                    <input type="checkbox" @click="locationOfInitiationCheck()" />
                    <span class="checkbox-custom rectangular" style="margin-left: 220px;"></span>
                  </label>
                </div>
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
              <div class="col-md-5">
                <label style="float: left; font-weight: bold">Year started ART</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Year started ART Unknown?</span>
                <div>
                  <label class="checkbox-label" style="margin-left: 50px">
                    <input type="checkbox" style="margin-left: 50px" @click="startDateUnknown()" />
                    <span class="checkbox-custom rectangular" style="margin-left: 260px;"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <input type="date" class="form-control" name v-model="artStartDate" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <label style="float: left; font-weight: bold">ART Number</label>
          </div>
          <div class="col-md-6">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
            >Number Unknown?</span>
            <div>
              <label class="checkbox-label" style="margin-left: 50px">
                <input type="checkbox" style="margin-left: 50px" @click="arvNumberUnkownCheckbox()" />
                <span class="checkbox-custom rectangular" style="margin-left: 220px;"></span>
              </label>
            </div>
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
      <div class="col-md-6" style="margin-top: 20px">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <label style="float: left; font-weight: bold">Confirmatory Test</label>
            </div>
          </div>
          <div class="form-group">
            <v-select :options="options" v-model="confirmatory" :reduce="option => option.value"></v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
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
                <div>
                  <label class="checkbox-label">
                    <input type="checkbox" @click="locationOfConfirmatoryCheck()" />
                    <span class="checkbox-custom rectangular" style="margin-left: 220px;"></span>
                  </label>
                </div>
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
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Confirmatory HIV test year</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Test year unknown?</span>
                <div>
                  <label class="checkbox-label">
                    <input type="checkbox" @click="confirmatoryYearCheck()" />
                    <span class="checkbox-custom rectangular" style="margin-left: 220px;"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <input type="date" class="form-control" name v-model="hivTestYear" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
            //DONE
            concept_id: 7751,
            value_datetime: null
          },
          everReceivedART: {
            // DONE
            value_coded: null,
            concept_id: 7754
          },
          everRegisteredAtClinic: {
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
        }
      },
      locations: []
    };
  },
  methods: {
    initial() {
      this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everReceivedART.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066; // No answer
    },

    // Agrees to follow up
    followUp() {
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
      if (this.recievedTreatment == true) {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1066;
        this.recievedTreatment = false;
      } else if (this.recievedTreatment == false) {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1065;
        this.recievedTreatment = true;
      }
    },

    // Year last taken ARVs
    yearLastTakenUknownCheck() {
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
      if (this.yearStartedKnown == true) {
        this.yearStartedKnown = false;
      } else if (this.yearStartedKnown == false) {
        this.clinicRegistration.obs.dateARTStarted.value_datetime = "Unknown"; // FIX THIS
        this.yearStartedKnown = true;
      }
    },
    arvNumberUnkownCheckbox() {
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

    locationOfConfirmatoryCheck(){
      if (this.locationOfConfirmatoryUnknown == true) {
        this.locationOfConfirmatory = "Select Location";
        this.locationOfConfirmatoryUnknown = false;
      } else if (this.locationOfConfirmatoryUnknown == false) {
        this.locationOfConfirmatory = "Unknown";
        this.clinicRegistration.obs.ARTStartLocation.value_text = "Unknown";
        this.locationOfConfirmatoryUnknown = true;
      }
    },

    confirmatoryYearCheck(){
      if (this.hivTestYearUnknown == true) {
        this.hivTestYear = "";
        this.hivTestYearUnknown = false;
      } else if (this.hivTestYearUnknown == false) {
        this.hivTestYear = "Unknown";
        this.clinicRegistration.obs.testDate.value_datetime =
          "Unknown";
        this.hivTestYearUnknown = true;
      }
    },

    getlocations: async function(val = "") {
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
      const yearLastTaken = moment(this.yearLastTaken).format("YYYY-MM-DD");
      this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = yearLastTaken;

      // ART Number
      this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = this.arvNumber;

      //ART start date
      const startDate = moment(this.artStartDate).format("YYYY-MM-DD");
      this.clinicRegistration.obs.dateARTStarted.value_datetime = startDate; // this looks ok
      this.clinicRegistration.obs.confirmatoryTest.value_coded = this.confirmatory;

      const testYear = moment(this.hivTestYear).format("YYYY-MM-DD");
      this.clinicRegistration.obs.testDate.value_datetime = testYear
    },
    getVal(val) {
      this.clinicRegistration.obs.testLocation.value_text = val.label;
      this.clinicRegistration.obs.testLocation.location_id = val.location_id;
    },
    getLoc(val) {
      this.clinicRegistration.obs.ARTStartLocation.value_text = val.label;
      this.clinicRegistration.obs.ARTStartLocation.location_id =
        val.location_id;
    },
    getStuff(val) {
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