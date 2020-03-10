<template>
  <div style="margin: auto; width: 95%">
    <div class="row" style="margin: auto;">
      <div class="col-md-12" style="background: rgba(137, 140, 145, 0.2); height: 37px ">
        <div style="margin-top: 6px; float: left">
          <span style="font-weight: bold;">Agrees to follow up?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" style="margin-left: 50px" />
              <span class="checkbox-custom rectangular" style="margin-left: 188px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin: auto; margin-top: 15px">
      <div class="col-md-12" style="background: rgba(137, 140, 145, 0.2); height: 37px ">
        <div style="margin-top: 6px; float: left">
          <span style="font-weight: bold;">Ever recieved ARVs for treatment or prophylaxis?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" style="margin-left: 50px" @click="everRecieved()" />
              <span class="checkbox-custom rectangular" style="margin-left: 405px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if = "recievedTreatment" class="row" style="margin-top: 10px">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Year last taken ARVs</label>
          </div>
        </div>
        <div class="form-group">
          <input
            type="date"
            class="form-control"
            name
            v-model="clinicRegistration.obs.dateARTLastTaken.value_datetime"
          />
        </div>
      </div>
    </div>
    <div v-if = "recievedTreatment"  class="row" style="margin: auto">
      <div class="col-md-12" style="background: rgba(137, 140, 145, 0.2); height: 37px ">
        <div style="margin-top: 6px;float: left">
          <span style="font-weight: bold;">Ever registered at an ART clinic?</span>
          <div>
            <label class="checkbox-label" style="margin-left: 50px">
              <input type="checkbox" style="margin-left: 50px" />
              <span class="checkbox-custom rectangular" style="margin-left: 280px; margin-top: 6px"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if = "recievedTreatment"  class="row" style="margin-top: 8px">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Location of ART Initiation</label>
          </div>
        </div>
        <div class="form-group">
          <v-select :options="locations" @search="getlocations" @input="getLoc"></v-select>
        </div>
      </div>
    </div>
    <div v-if = "recievedTreatment"  class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-4">
            <label style="float: left; font-weight: bold">Year started ART</label>
          </div>
        </div>
        <div class="row" style="float: left;">
          <div class="col-md-12">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
            >Year started ART Unknown?</span>
            <div>
              <label class="checkbox-label" style="margin-left: 50px">
                <input type="checkbox" style="margin-left: 50px" />
                <span class="checkbox-custom rectangular" style="margin-left: 243px;"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input
            type="date"
            class="form-control"
            name
            v-model="clinicRegistration.obs.dateARTLastTaken.value_datetime"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">ART Number</label>
          </div>
        </div>
        <div class="row" style="float: left;">
          <div class="col-md-12">
            <span
              style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
            >ARV Number Unknown?</span>
            <div>
              <label class="checkbox-label" style="margin-left: 50px">
                <input type="checkbox" style="margin-left: 50px" />
                <span class="checkbox-custom rectangular" style="margin-left: 215px;"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name placeholder="ARV Number" />
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
          <v-select
            :options="options"
            v-model="clinicRegistration.obs.confirmatoryTest.value_coded"
            :reduce="option => option.value"
          ></v-select>
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
export default {
  components: {
    "v-select": VueSelect
  },
  data: function() {
    return {
      recievedTreatment: false,
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
    everRecieved(){
      if(this.recievedTreatment == true){
        this.recievedTreatment = false
      }else if(this.recievedTreatment == false){
        this.recievedTreatment = true
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
      this.$emit("addEncounter", {
        clinicRegistration: this.clinicRegistration
      });
    }
  },
  created() {
    this.getlocations();
  },
  mounted() {}
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