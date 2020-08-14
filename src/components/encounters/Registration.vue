<template>
  <div class="container" style="width: 100%; margin: auto;">
    <div class="row">
      <div class="col-md-12">
        <form id="msform">
          <!-- HIV CLINIC REGISTRATION -->
          <form
            id="pDetails"
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template tab"
          >
            <h5 style="font-weight: bold">HIV Clinic Registration</h5>

            <clinic-registration
              v-bind:patientId="PATIENT_ID"
              v-on:addEncounter="addEncounter"
              ref="clinicRegistration"
            ></clinic-registration>

            <input
              type="button"
              name="next"
              class="btn btn-primary clinical action-button"
              value="Next Step"
              style="position: absolute; bottom: 17px; right: 45%"
              @click="registrationObject"
            />
            <div class="errorTxt" style="margin-top: 10px; text-align: center; font-weight: bold"></div>
          </form>

          <!--STAGING -->

          <form
            id="gDetails"
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template tab"
          >
            <div class="row">
              <h5 style="font-weight: bold; margin: auto; margin-bottom: 10px">Staging</h5>
            </div>
            <staging v-on:addEncounter="addEncounter" v-bind:patientId="PATIENT_ID" ref="staging" />
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="position: absolute; bottom: 30px; right: 50%"
            />
            <input
              type="button"
              name="next"
              class="btn btn-primary staging action-button"
              value="Next Step"
              style="position: absolute; bottom: 30px; right: 40%"
              @click="stagingObject"
            />
            <div
              class="guardianError"
              style="margin-top: 10px; height: 1px; text-align: center; font-weight: bold"
            ></div>
          </form>

          <!-- SUBMIT -->

          <form
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
          >
            <div class="row">
              <div class="col-md-12">
                <h5 style="font-weight: bold; margin: auto; margin-bottom: 10px">Summary</h5>
              </div>
            </div>
            <div
              v-if="Object.entries(registrationEncounter).length > 0 && Object.entries(stagingEncounter).length > 0"
              class="row"
            >
              <div class="col-md-6" style="text-align: left">
                <label style="font-weight: bold">HIV Clinic Registration</label>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Year Last Taken ARVs</td>
                      <td>{{registrationEncounter['encounter']['obs']['yearLastTakenARVs']['value_datetime'] == 'Invalid date' ? "Unknown" : registrationEncounter['encounter']['obs']['yearLastTakenARVs']['value_datetime'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>Ever registered at a clinic</td>
                      <td>{{CONCEPTS[registrationEncounter['encounter']['obs']['everRegisteredAtClinic']['value_coded']] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>ART # at previous location</td>
                      <td>{{registrationEncounter['encounter']['obs']['artNumberAtPreviousLocation']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>Confirmatory Test</td>
                      <td>{{CONCEPTS[registrationEncounter['encounter']['obs']['confirmatoryTest']['value_coded']] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>ART Start Location</td>
                      <td>{{registrationEncounter['encounter']['obs']['ARTStartLocation']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>Date ART Started</td>
                      <td>{{registrationEncounter['encounter']['obs']['dateARTStarted']['value_datetime'] == null || registrationEncounter['encounter']['obs']['dateARTStarted']['value_datetime'] == "Invalid date" ? "N/A" : registrationEncounter['encounter']['obs']['dateARTStarted']['value_datetime'] }}</td>
                    </tr>
                    <tr>
                      <td>Test Location</td>
                      <td>{{registrationEncounter['encounter']['obs']['testLocation']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>Date of Test</td>
                      <td>{{registrationEncounter['encounter']['obs']['testDate']['value_datetime'] == "Invalid date" ? "N/A" : registrationEncounter['encounter']['obs']['testDate']['value_datetime'] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6" style="text-align: left">
                <label style="font-weight: bold">Staging</label>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Reason for Starting</td>
                      <td>{{stagingEncounter['encounter']['obs']['reason']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>Stage</td>
                      <td>{{stagingEncounter['encounter']['obs']['stage']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>CD4 Count Date</td>
                      <td>{{stagingEncounter['encounter']['obs']['cd4CountDate']['value_datetime'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>CD4 Count</td>
                      <!-- ["encounter"]["obs"] -->
                      <td>{{ Object.entries(stagingEncounter['encounter']['obs']['cd4Count']['value_numeric']).length > 0 ? stagingEncounter['encounter']['obs']['cd4Count']['value_modifier'] +"" + stagingEncounter['encounter']['obs']['cd4Count']['value_numeric'] : "N/A"}}</td>
                    </tr>
                    <tr>
                      <td>CD4 Count Location</td>
                      <td>{{stagingEncounter['encounter']['obs']['cd4CountLocation']['value_text'] || "N/A"}}</td>
                    </tr>
                    <tr>
                      <!-- make this fields scrollable -->
                      <td>Condition(s)</td>
                      <td>
                        <ul
                          style="height:150px; overflow:hidden; overflow-y:scroll; list-style-type: decimal;"
                        >
                          <li
                            v-for="name in conditionList"
                            :key="name"
                            class="condtions"
                          >{{ name || 'NA' }}</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="position: absolute; bottom: 30px; right: 50%"
            />
            <button
              style="position: absolute; bottom: 30px; right: 43%"
              type="button"
              class="btn btn-primary"
              @click="createEncounters"
            >save</button>
          </form>

          <!-- SUCCESS PAGE -->

          <form
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
          >
            <div class="form-card">
              <h2 class="fs-title text-center">Success !</h2>
              <br />
              <br />
              <div class="row justify-content-center">
                <div class="col-3">
                  <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image" />
                </div>
              </div>
              <br />
              <br />
              <div class="row justify-content-center">
                <div class="col-7 text-center">
                  <h5>Patient added</h5>
                </div>
              </div>
            </div>
          </form>
          <!-- progressbar -->
          <ul id="progressbar">
            <li class="active" id="registration">
              <strong>Clinical Registration</strong>
            </li>
            <li id="staging">
              <strong>Staging</strong>
            </li>
            <li id="summary">
              <strong>Summary</strong>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template> 
<script>
import clinicRegistration from "./clinicRegistration.vue";
import staging from "./staging.vue";
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import moment from "moment";
import $ from "jquery";
import EventBus from "../../services/event-bus.js";

export default {
  data: function() {
    return {
      encounters: {},
      PATIENT_ID: this.$route.params.id,
      NEW_REGISTER: this.$route.params.new,
      registrationEncounter: {},
      stagingEncounter: {},
      CONCEPTS: {
        1065: "Yes",
        1066: "No",
        1040: "Rapid Antibody Test",
        844: "DNA PCR",
        1118: "Not Done"
      },
      clinicRegistrationFormValidations: [],
      stagingFormValidations: []
    };
  },
  computed: {
    conditionList() {
      const conditionsKeysFilters = Object.keys(
        this.stagingEncounter["encounter"]["obs"]
      ).filter(reason => reason.match(/condition/));

      const conditions = conditionsKeysFilters.map(
        filter => this.stagingEncounter["encounter"]["obs"][filter]
      );

      return conditions.map(name => name["value_text"]);
    }
  },
  components: {
    "clinic-registration": clinicRegistration,
    staging: staging
  },
  methods: {
    addEncounter(encounterData) {
      let key = Object.keys(encounterData)[0];
      // console.log("here" + Object.keys(encounterData));
      this.encounters[key] = encounterData[key];
    },
    saveEncounter: async function(encounterOb) {
      let observations = [];
      let enc = {
        url: "observations"
      };
      if (Object.keys(encounterOb).includes("obs")) {
        Object.keys(encounterOb.obs).forEach(element => {
          observations.push(encounterOb.obs[element]);
        });
        enc.observations = observations;
      } else if (Object.keys(encounterOb).includes("drug_orders")) {
        enc.drug_orders = encounterOb.drug_orders;
        enc.url = "drug_orders";
      }

      // pass params
      const encounter = await EncounterService.createEncounter(
        this.PATIENT_ID,
        encounterOb.encounter_id,
        encounterOb.encounter_datetime
      );
      this.successfulOperation = true;
      if (encounter.status === 201 || encounter.status === 200) {
        let encounterID = encounter.encounter_id;
        enc.encounter_id = encounterID;
        const response = await ApiClient.post(enc.url, enc);
        if (response.status === 201 || response.status === 200) {
          this.success = true;
          this.fail = false;
          this.postResponse = "Appointment has been set.";
          // this.$router.go(0);
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
    },
    createEncounters: function() {
      if (!this.NEW_REGISTER || this.NEW_REGISTER == "false") {
        this.voidFirstVisitEncounters();
      }
      let encounters = Object.keys(this.$refs);
      console.log(encounters);
      encounters.forEach(el => {
        //    console.log(el);
        this.$refs[el].saveEncounter();
      });
      // console.log()
      let keys = Object.keys(this.encounters);
      keys.forEach(enc => {
        console.log(this.encounters[enc]);
        this.saveEncounter(this.encounters[enc]);
      });
      // patient/mastercard/
      this.redirect(`/patient/mastercard/${this.PATIENT_ID}`);
    },
    redirect: function(url) {
      this.$router.push(url);
    },
    getExpected: function(element) {
      let expected = [
        "value_group_id",
        "value_boolean",
        "value_coded",
        "value_coded_name_id",
        "value_drug",
        "value_datetime",
        "value_numeric",
        "value_modifier",
        "value_text"
      ];
      let key = "";
      Object.keys(element).filter(function(elem) {
        if (expected.includes(elem)) {
          key = elem;
        }
      });
      return key;
    },
    initileWizard(registration) {
      let Registration = this;
      $(document).ready(function() {
        let current_fs, next_fs, previous_fs; //fieldsets
        let opacity;

        console.log(registration['form_is_valid'])

        let pDetails = $("#pDetails");
        const message =
          "<label style='color:red'> All required fields (*) must be completed before proceeding. </label>";

        // CLINICAL

        $(".clinical").click(function() {
          const registration = Registration.registrationEncounter;

          if (registration['form_is_valid']) {
            $(".errorTxt").html("");
            current_fs = $(this).parent();
            next_fs = $(this)
              .parent()
              .next();
            //Add Class Active
            $("#progressbar li")
              .eq($(".content-tab").index(next_fs))
              .addClass("active");

            //show the next fieldset
            next_fs.show();

            current_fs.animate(
              { opacity: 0 },
              {
                step: function(now) {
                  // for making fielset appear animation
                  opacity = 1 - now;

                  current_fs.css({
                    display: "none",
                    position: "relative"
                  });
                  next_fs.css({ opacity: opacity });
                },
                duration: 600
              }
            );
          } else {
            $(".errorTxt").html(message);
            return;
          }
        });

        // STAGING

        $(".staging").click(function() {
          
          const formIsValid = Registration.stagingEncounter["form_is_valid"];

          // validate if checkbox checked to register
          if (formIsValid) {
            $(".guardianError").html("");
            current_fs = $(this).parent();
            next_fs = $(this)
              .parent()
              .next();
            //Add Class Active
            $("#progressbar li")
              .eq($(".content-tab").index(next_fs))
              .addClass("active");

            //show the next fieldset
            next_fs.show();

            current_fs.animate(
              { opacity: 0 },
              {
                step: function(now) {
                  // for making fielset appear animation
                  opacity = 1 - now;

                  current_fs.css({
                    display: "none",
                    position: "relative"
                  });
                  next_fs.css({ opacity: opacity });
                },
                duration: 600
              }
            );
          } else {
            $(".guardianError").html(message);
            return;
          }
        });

        $(".previous").click(function() {
          current_fs = $(this).parent();
          previous_fs = $(this)
            .parent()
            .prev();

          //Remove class active
          $("#progressbar li")
            .eq($(".content-tab").index(current_fs))
            .removeClass("active");

          //show the previous fieldset
          previous_fs.show();

          //hide the current fieldset with style
          current_fs.animate(
            { opacity: 0 },
            {
              step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                  display: "none",
                  position: "relative"
                });
                previous_fs.css({ opacity: opacity });
              },
              duration: 600
            }
          );
        });

        $(".confirm").click(function() {
          console.log("confirm clicked");
          current_fs = $(this).parent();
          next_fs = $(this)
            .parent()
            .next();
          //Add Class Active
          $("#progressbar li")
            .eq($(".content-tab").index(next_fs))
            .addClass("active");

          //show the next fieldset
          next_fs.show();

          current_fs.animate(
            { opacity: 0 },
            {
              step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                  display: "none",
                  position: "relative"
                });
                next_fs.css({ opacity: opacity });
              },
              duration: 600
            }
          );
        });

        $(".radio-group .radio").click(function() {
          $(this)
            .parent()
            .find(".radio")
            .removeClass("selected");
          $(this).addClass("selected");
        });

        $(".submit").click(function() {
          console.log("Patient Details submitted!!!");
          return false;
        });
      });
    },

    registrationObject() {
      EventBus.$emit('validate-clinic-registration', '');
      this.registrationEncounter = this.$store.state.registration.registration;
      console.log(this.registrationEncounter);
      this.initileWizard(this.registrationEncounter);
    },
    stagingObject() {
      EventBus.$emit('validate-staging', '');
      this.stagingEncounter = this.$store.state.staging.staging;
      this.initileWizard(this.registrationEncounter);
      console.log(this.stagingEncounter);
    },
    removeEncounter: async function(encounter = "") {
      return await ApiClient.remove(`encounters/${encounter}`);
    },
    voidEncounters: function(encounters = []) {
      encounters.forEach(encounter => {
        this.removeEncounter(encounter).then(data => {
          console.log(data);
        });
      });
    },
    voidFirstVisitEncounters() {
      const encounters = [this.$store.state.initialRegistration,
                          this.$store.state.initialVitals,
                          this.$store.state.initialStaging];

      const encounterIds = encounters.map(encounter => encounter?.encounter_id)
                                     .filter(encounter_id => encounter_id != null);

      this.voidEncounters(encounterIds);
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.initileWizard(this.$store.state.registration.registration);
    this.initileWizard(this.$store.state.staging.staging);
  }
};
</script> 
<style scoped>
#msform {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  margin-top: 20px;
}

#msform .content-tab {
  background: white;
  border: 0 none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding-bottom: 20px;
  position: relative;
}

#msform .content-tab:not(:first-of-type) {
  display: none;
}

#msform .content-tab .form-card {
  text-align: left;
  color: #9e9e9e;
}

select.list-dt {
  border: none;
  outline: 0;
  border-bottom: 1px solid #ccc;
  padding: 2px 5px 3px 5px;
  margin: 2px;
}

select.list-dt:focus {
  border-bottom: 2px solid skyblue;
}

.card {
  z-index: 0;
  border: none;
  border-radius: 0.5rem;
  position: relative;
}

.fs-title {
  font-size: 25px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

#progressbar {
  overflow: hidden;
  color: lightgrey;
}

#progressbar .active {
  color: #000000;
}

#progressbar li {
  list-style-type: none;
  font-size: 12px;
  width: 32%;
  float: left;
  position: relative;
}

#progressbar #registration:before {
  font-family: FontAwesome;
  content: "1";
}

#progressbar #staging:before {
  font-family: FontAwesome;
  content: "2";
}

#progressbar #summary:before {
  font-family: FontAwesome;
  content: "3";
}

#progressbar li:before {
  width: 50px;
  height: 50px;
  line-height: 45px;
  display: block;
  font-size: 18px;
  color: #ffffff;
  background: lightgray;
  border-radius: 50%;
  margin: 0 auto 10px auto;
  padding: 2px;
}

#progressbar li:after {
  content: "";
  width: 100%;
  height: 2px;
  background: lightgray;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: -1;
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: skyblue;
}

.fit-image {
  width: 100%;
  object-fit: cover;
}

.form-template {
  height: 690px;
}

.input-label {
  float: left;
  font-weight: bold;
}

.summary {
  border-radius: 5px;
  border-style: ridge;
  height: 150px;
  margin-bottom: 30px;
}

.input-column {
  margin: auto;
  margin-bottom: 10px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.condtions:nth-child(even) {
  background-color: #f2f2f2;
}
</style>