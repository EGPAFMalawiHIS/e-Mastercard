<template>
  <div class="container-fluid card" style="margin-top: 35px;">
    <button
      @click="redirect(`/registration/${patientID}/false`)"
      class="btn btn-info"
      style="z-index: 1; position: absolute; left: 47.5%; bottom: 99%; font-size: 13px;"
    >Edit/Void</button>
    <div class="container-fluid" style="margin-top: 8px;">
      <table class="row">
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>ARV #</p>
            </div>
            <div
              class="col-md-6 information editable"
              data-toggle="modal"
              @click="$bvModal.show('arv-number-modal')"
            >
              <p>{{arvNumber}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Name</p>
            </div>
            <div class="col-md-6 information editable">
              <p>{{name}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>DOB and Age at initiation</p>
            </div>
            <div class="col-md-6 information editable">
              <p>{{age}} ({{initialAge}})</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Sex</p>
            </div>
            <div class="col-md-6 information editable">
              <p>{{sex}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Initial Weight</p>
            </div>
            <div class="col-md-6 information">
              <p>{{initialWeight}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Initial Height</p>
            </div>
            <div class="col-md-6 information">
              <p>{{initialHeight}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>BMI</p>
            </div>
            <div class="col-md-6 information">
              <p>{{bmi}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>TI</p>
            </div>
            <div class="col-md-6 information">
              <p>{{ti}}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Physical Address</p>
            </div>
            <div class="col-md-6 information editable">
              <p>{{landmark}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Phone Number</p>
            </div>
            <div class="col-md-6 information editable">
              <p>{{phoneNumber}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('guardian-info-modal')">
            <div class="col-md-6">
              <p>Name of Guardian</p>
            </div>
            <div class="col-md-6 information editable" v-if="guardianFirstName">
              <p>{{guardianFirstName + " " + guardianLastName + " (" + guardianRelation + ")" + " (" + guardianNumber + ")"}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Date and Place of HIV Test</p>
            </div>
            <div class="col-md-6 information">
              <p>{{dateOfHIVTest}} {{placeOfHIVTest}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Agrees to follow up</p>
            </div>
            <div class="col-md-6 information">
              <p>{{followUp}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Date of starting first line ARV Regimen</p>
            </div>
            <div class="col-md-6 information">
              <p>{{parseStartDate}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Reason for Starting ART</p>
            </div>
            <div class="col-md-6 information">
              <p>{{startReason}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Pregnant at initiation</p>
            </div>
            <div class="col-md-6 information">
              <p>{{pregnant}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Breastfeeding at initiation</p>
            </div>
            <div class="col-md-6 information">
              <p>{{breastfeeding}}</p>
            </div>
          </div>
        </div>
      
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>TB Status at initiation</p>
            </div>
            <div class="col-md-6 information">
              <p>{{tbLastTwoYears}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>WHO Stage</p>
            </div>
            <div class="col-md-6 information">
              <p>{{whoStage}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-12">
              <p>Staging conditions</p>
              <ul style="padding: 0;">
                <li v-for="(item, index) in stagingConditions" :key="index" class="horizontal-list">
                  {{item}}, 
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </table>
    </div>
    <b-modal id="arv-number-modal" title="Edit ARV number" size="xl">
      <div class="row">
        <div class="col">
          <label for="exampleFormControlSelect1">{{arvNumber}} -></label>
        </div>
        <div class="col">
          <b-input-group :prepend="sitePrefix + '-ARV-'" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="inline-form-input-username" v-model="arv_num" type="number"></b-input>
          </b-input-group>
        </div>
        <div class="col">
          <button @click="saveARVNumber" class="btn btn-primary">Submit</button>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>
    <b-modal id="patient-info-modal" title="patient detials" size="xl">
      <div>
        <b-form>
          <label for="text-name">First Name</label>
          <b-input type="text" id="text-name" v-model="firstName"></b-input>
          <label for="text-last-name">Last Name</label>
          <b-input type="text" id="text-last-name" v-model="lastName"></b-input>

          <label for="text-phone-number">Phone Number</label>
            <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-form-checkbox v-model="phoneNumberUnknown" name="check-button" switch>Unknown </b-form-checkbox>
            </b-input-group-prepend>
              <b-input :type="inputType" id="text-phone-number" v-model="updatedPhoneNumber" :state="numberState" :disabled="phoneNumberUnknown"></b-input>
            </b-input-group>
          <label for="text-address">Physical Address</label>
          <b-input type="text" id="text-address" v-model="updatedAddress"></b-input>
          <label for="input-sex">Sex</label>
          <b-form-select
            id="inline-form-custom-select-pref"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="[{ text: 'Male', value: 'M' }, { text: 'Female', value: 'F' }]"
            v-model="updatedSex"
          ></b-form-select>
          <label for="example-datepicker">Date of birth</label>
          <b-form-datepicker id="example-datepicker" class="mb-2" v-model="updatedDOB"></b-form-datepicker>

          <div class="row justify-content-center">
            <b-button variant="primary" @click="updateDetails">Save</b-button>
          </div>
        </b-form>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>
    <b-modal id="guardian-info-modal" title="guardian detials" size="xl" v-if="guardianFirstName">
      <div>
        <b-form>
          <label for="text-name">First Name</label>
          <b-input type="text" id="text-name" v-model="updatedguardianFirstName"></b-input>
          <label for="text-last-name">Last Name</label>
          <b-input type="text" id="text-last-name" v-model="updatedguardianLastName"></b-input>
          <label for="text-phone-number">Phone Number</label>
            <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-form-checkbox v-model="guardianphoneNumberUnknown" name="guardian-check" switch>Unknown </b-form-checkbox>
            </b-input-group-prepend>
          <b-input :type="guardianinputType" id="guardian-phone-number" v-model="updatedguardianNumber" :state="guardianNumberState" :disabled="guardianphoneNumberUnknown"></b-input>
          </b-input-group>

          <div class="row justify-content-center">
            <b-button variant="primary" @click="updateGuardianDetails">Save</b-button>
          </div>
        </b-form>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import EventBus from "../services/event-bus.js";
import GlobalProperties from "@/services/global_properties";
import {conditions} from "../services/staging_condition_service.js";
import moment from "moment";
export default {
  data: function() {
    return {
      arvNumber: null,
      arv_num: null,
      name: null,
      firstName: null,
      lastName: null,
      age: null,
      sex: null,
      updatedDOB: null,
      updatedSex: null,
      dob: null,
      initialWeight: null,
      initialHeight: null,
      updatedAddress: null,
      pregnant: null,
      breastfeeding:  null,
      bmi: null,
      ti: null,
      location: null,
      landmark: null,
      occupation: null,
      nameOfGuardian: null,
      dateOfHIVTest: null,
      placeOfHIVTest: null,
      whoStage: null,
      followUp: null,
      startDate: null,
      startReason: null,
      EPTB: null,
      PTB: null,
      kaposisSarcoma: null,
      tbLastTwoYears: null,
      patientID: null,
      sitePrefix: null,
      showARVNumber: false,
      phoneNumber: null,
      updatedPhoneNumber: null,
      guardianID: null,
      guardianFirstName: null,
      guardianLastName: null,
      guardianRelation: null,
      guardianNumber: null,
      updatedguardianFirstName: null,
      updatedguardianLastName: null,
      updatedguardianRelation: null,
      updatedguardianNumber: null,
      phoneNumberUnknown: false,
      guardianphoneNumberUnknown: false,
      stagingConditions: [],
      obs: [
        {
          conceptID: 2552
        },
        {
          conceptID: 5089,
          variableName: "initialWeight",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 5090,
          variableName: "initialHeight",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 2137,
          variableName: "bmi",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 7881,
          variableName: "placeOfHIVTest",
          valueType: "value_text"
        },
        {
          conceptID: 7882,
          variableName: "dateOfHIVTest",
          valueType: "value_datetime",
          secondType: "value_text"
        },
        {
          conceptID: 7754,
          variableName: "ti",
          valueType: "value_coded",
          secondType: "value_text",
          returnValue: "Yes",
          default: "No",
          params: "value_coded=1065",
          backupConcept: {
            conceptID: 7751,
            variableName: "ti",
            valueType: "value_datetime",
            secondType: "value_text",
            returnValue: "Yes",
            default: "No"
          }
        },
        {
          conceptID: 6131,
          variableName: "pregnant",
          valueType: "value_coded",
          secondType: "value_text",
          returnValue: "Yes",
          default: "No",
          params: "value_coded=1065",
        },
        {
          conceptID: 7965,
          variableName: "breastfeeding",
          valueType: "value_coded",
          secondType: "value_text",
          returnValue: "Yes",
          default: "No",
          params: "value_coded=1065",
        },
        {
          conceptID: 2552,
          variableName: "followUp",
          valueType: "value_coded",
          secondType: "value_text",
          returnValue: "Yes",
          default: "No",
          params: "value_coded=1065",
          backupConcept: {
            conceptID: 9685,
            variableName: "followUp",
            valueType: "value_datetime",
            secondType: "value_text",
            returnValue: "Yes",
            default: "No",
            backupConcept: {
              conceptID: 9686,
              variableName: "followUp",
              valueType: "value_datetime",
              secondType: "value_text",
              returnValue: "Yes",
              default: "No"
            }
          }
        },
        {
          conceptID: 7459,
          variableName: "tbLastTwoYears",
          valueType: "value_coded",
          secondType: "value_text",
          conceptNames: {
            7454: "TB NOT suspected",
            7455: "TB suspected",
            7456: "Confirmed TB NOT on treatment",
            7458: "Confirmed TB on treatment"
          }
        },
        {
          conceptID: 7563,
          variableName: "startReason",
          valueType: "value_coded",
          secondType: "value_text"
        },
        {
          conceptID: 7562,
          variableName: "whoStage",
          valueType: "value_text",
          secondType: "value_coded"
        },
        {
          conceptID: 2743,
          subConcepts: [],
        }
      ], initialObs: [

      ],
    };
  },
  computed: {
    
  },
  methods: {
    getPatient: async function() {
      let f = await ApiClient.get(`/patients/${this.patientID}`);
      return await f.json();
    },

    getGuardian: async function() {
      let guardian = await ApiClient.get(
        `/people/${this.patientID}/relationships`
      ).then(res => {
        res.json().then(ret => {
          if (ret.length > 0) {
            this.guardianID = ret[0].person_b;
            let person_name = ret[0]["relation"]["names"][0];
            let relationship_type = ret[0]["type"]["b_is_to_a"];
            this.guardianFirstName = person_name["given_name"];
            this.guardianLastName = person_name["family_name"];
            this.guardianRelation = relationship_type;
            this.updatedguardianFirstName = person_name["given_name"];
            this.updatedguardianLastName = person_name["family_name"];
            this.updatedguardianRelation = relationship_type;
            this.guardianNumber = this.getAtribute(
              ret[0].relation.person_attributes,
              12
            );
            this.updatedguardianNumber = this.getAtribute(
              ret[0].relation.person_attributes,
              12
            );
            if(this.guardianphoneNumber === "Unknown") {
              this.guardianphoneNumberUnknown = true;
            }
            this.nameOfGuardian =
              person_name["given_name"] +
              " " +
              person_name["family_name"] +
              " (" +
              relationship_type +
              ")";
          }
        });
      });
    },
    getObs: async function(conceptSet, startDate) {
      let url = `/observations?person_id=${this.patientID}&&concept_id=${conceptSet.conceptID}`;
      url = conceptSet.params ? url + `&&` + conceptSet.params : url;
      url = startDate ? url + `&&obs_datetime=`+ startDate : url;
      let observations = await ApiClient.get(url);
      return await observations.json();
    },
    getConcept: async function(conceptSet, results, context) {
      await ApiClient.get(`/concepts/${results}`).then(res => {
        res.json().then(f => {
          context[conceptSet.variableName] = f.concept_names[0].name;
        });
      });
    },
    createOb: function(conceptSet, context, startDate) {

    this.$store.state.currentHeight = null;
      this.getObs(conceptSet).then(res => {
        if (res.length > 0) {
          if (conceptSet.returnValue) {
            context[conceptSet.variableName] = conceptSet.returnValue;
          } else if (conceptSet.subConcepts) {
            context.stagingConditions = [];
            res.forEach(ret => {
              context.stagingConditions.push(conditions[ret.value_coded]);
            });
          } else {
            let val = res[res.length - 1][conceptSet.valueType]
              ? res[res.length - 1][conceptSet.valueType]
              : res[res.length - 1][conceptSet.secondType];
            context[conceptSet.variableName] =
              conceptSet.valueType === "value_datetime" &&
              conceptSet.format !== false
                ? moment(val).format("DD-MMM-YYYY")
                : val;
            if (conceptSet.valueType === "value_coded") {
                if(conceptSet.conceptNames) {
                    context[conceptSet.variableName] = conceptSet.conceptNames[val]; 
                }else {

                 this.getConcept(conceptSet, val, context);
                  
                }
                
                
            }
            if (conceptSet.conceptID === 5089) {
              let weight = res[0][conceptSet.valueType]
                ? res[0][conceptSet.valueType]
                : res[0][conceptSet.secondType];
              EventBus.$emit("set-initial-weight", weight);
              this.$store.commit("setWeight", weight);
            }
            if (conceptSet.conceptID === 5090) {
              let height = res[0][conceptSet.valueType]
                ? res[0][conceptSet.valueType]
                : res[0][conceptSet.secondType];
              EventBus.$emit("set-previous-height", height);
              this.$store.commit("setHeight", height);
            }
          }

          if (conceptSet.conceptID === 2552) {
            this.$store.commit("setInitialRegistration", res[res.length - 1]);
          }

          if (conceptSet.conceptID === 5089) {
            this.$store.commit("setInitialVitals", res[res.length - 1]);
          }

          if (conceptSet.conceptID === 7563) {
            this.$store.commit("setInitialStaging", res[res.length - 1]);
          }
        } else {
          if (conceptSet.backupConcept) {
            this.createOb(conceptSet.backupConcept, context);
          }
          if (conceptSet.default) {
            context[conceptSet.variableName] = conceptSet.default;
          } else {
            context[conceptSet.variableName] = "N/A";
          }
        }
      });
    },
    obsService: function(observations) {
      switch (key) {
        case value:
          break;

        default:
          break;
      }
    },
    getAtribute: function(person_attributes, person_attribute_type_id) {
      let attribute = person_attributes.filter(attr => {
        return attr.person_attribute_type_id == person_attribute_type_id;
      });
      return attribute.length > 0 ? attribute[0].value : "";
    },
    getPrefix: async function() {
      this.sitePrefix = await GlobalProperties.getSitePrefix();
    },
    saveARVNumber: async function() {
      let finalNum = `${this.sitePrefix}-ARV-${this.arv_num}`;
      let identifier_data = {
        identifier: finalNum,
        identifier_type: 4,
        patient_id: this.$route.params.id
      };
      const response = await ApiClient.post(
        `/patient_identifiers/`,
        identifier_data
      );
      if (response.status === 201 || response.status === 200) {
        this.showMessage("ARV number updated");
        this.arvNumber = finalNum;
        this.$root.$emit("bv::hide::modal", "arv-number-modal", "#btnShow");
      } else if (response.status === 400) {
        this.showMessage("ARV number already in use");
      }
    },
    showMessage: function(message) {
      let toast = this.$toasted.show(message, {
        theme: "toasted-primary",
        position: "top-right",
        duration: 5000
      });
    },
    updateDetails: async function() {
      let params = {};
      let errors = [];
      if (`${this.firstName} ${this.lastName}` !== this.name) {
        params.given_name = this.firstName;
        params.family_name = this.lastName;
      }
      if (this.updatedDOB !== this.dob) {
        params.birthdate = this.updatedDOB;
        params.birthdate_estimated = 0;
      }
      if (this.updatedSex !== this.sex) {
        params.gender = this.updatedSex;
      }
      if (this.updatedPhoneNumber !== this.phoneNumber) {
        if(!this.numberState) {
          errors.push("fix phone number");
        }
        if(this.phoneNumberUnknown) {
         params.cell_phone_number = "Unknown"; 
        }
        params.cell_phone_number = this.updatedPhoneNumber;
      }
      if (this.updatedAddress !== this.landmark) {
        params.landmark = this.updatedAddress;
      }
      if (Object.keys(params).length > 0 && errors.length === 0) {
        const response = await ApiClient.put(
          `/people/${this.$route.params.id}`,
          params
        );
        if (response.status === 201 || response.status === 200) {
          this.showMessage("Successfully saved");
          if (`${this.firstName} ${this.lastName}` !== this.name) {
            this.name = `${this.firstName} ${this.lastName}`;
          }
          if (this.updatedDOB !== this.dob) {
            this.dob = this.updatedDOB;
            this.age = ` ${moment(this.dob).format("DD-MMM-YYYY")}`;
          }
          if (this.updatedSex !== this.sex) {
            this.sex = this.updatedSex;
          }
          if (this.updatedPhoneNumber !== this.phoneNumber) {
            this.phoneNumber = this.updatedPhoneNumber;
          }
          if (this.updatedAddress !== this.landmark) {
            this.landmark = this.updatedAddress;
          }
          this.$root.$emit("bv::hide::modal", "patient-info-modal", "#btnShow");
        } else {
          console.log("Failed to update");
        }
      } else {
          errors.forEach(element => {
            this.showMessage(element);
          });
        // this.$root.$emit("bv::hide::modal", "patient-info-modal", "#btnShow");
      }
    },
    updateGuardianDetails: async function() {
      let params = {};
      let errors = [];
      if (this.guardianFirstName !== this.updatedguardianFirstName) {
        params.given_name = this.updatedguardianFirstName;
      }
      if (this.guardianLastName !== this.updatedguardianLastName) {
        params.family_name = this.updatedguardianLastName;
      }
      if (this.updatedguardianNumber !== this.guardianNumber) {
        if(!this.guardianNumberState) {
          errors.push("fix phone number");
        }
        if(this.guardianphoneNumberUnknown) {
         params.cell_phone_number = "Unknown"; 
        }
        params.cell_phone_number = this.updatedguardianNumber;
      }

      if (Object.keys(params).length > 0) {
        const response = await ApiClient.put(
          `/people/${this.guardianID}`,
          params
        );
        if (response.status === 201 || response.status === 200) {
          this.showMessage("Successfully saved");
          if (this.guardianFirstName !== this.updatedguardianFirstName) {
            this.guardianFirstName = this.updatedguardianFirstName;
          }
          if (this.guardianLastName !== this.updatedguardianLastName) {
            this.guardianLastName = this.updatedguardianLastName;
          }
          if (this.updatedguardianNumber !== this.guardianNumber) {
            this.guardianNumber = this.updatedguardianNumber;
          }
          this.$root.$emit(
            "bv::hide::modal",
            "guardian-info-modal",
            "#btnShow"
          );
        } else {
          console.log("Failed to update");
        }
      } else {
        this.$root.$emit("bv::hide::modal", "guardian-info-modal", "#btnShow");
      }
    },
    redirect: function(url) {
      this.$router.push(url);
    }, 
    parseObs: function(startDate) {
      this.obs.forEach(value => {
        this.createOb(value, this, startDate);
      });
    },
    getStartDate: async function (){
    this.$store.state.currentHeight = null;
      let startDateSet = {
          conceptID: 2516,
          variableName: "startDate",
          valueType: "value_datetime",
          secondType: "value_text",
          format: false
        };

      this.getObs(startDateSet).then(res => {
        if(res.length > 0) {

        this[startDateSet.variableName] = res[res.length - 1][startDateSet.valueType]
              ? res[res.length - 1][startDateSet.valueType]
              : res[res.length - 1][startDateSet.secondType];
        this.parseObs(this[startDateSet.variableName]);
        }else {

          this.retrieveStarDate().then(orders => {
              if(orders.length > 0) {
                this[startDateSet.variableName] = orders[orders.length -1].order.start_date;
                this.parseObs(this[startDateSet.variableName]);
              }else {
                this[startDateSet.variableName] = "N/A";
                this.parseObs(null);
              }
          });
        }
      });
    },
    retrieveStarDate: async function() {
      let url = `/patients/${this.$route.params.id}/drugs_orders_by_program?program_id=1`;
      let observations = await ApiClient.get(url);
      return await observations.json();
    }
  },
  mounted() {
    this.getPrefix();
    this.patientID = this.$route.params.id;
    this.getPatient().then(patient => {
      this.name = `${patient["person"].names[0].given_name} ${patient.person.names[0].family_name}`;
      this.firstName = patient["person"].names[0].given_name;
      this.lastName = patient["person"].names[0].family_name;
      this.dob = patient.person.birthdate;
      this.updatedDOB = patient.person.birthdate;
      this.age = ` ${moment(patient.person.birthdate).format("DD-MMM-YYYY")}`;
      let identifier = patient.patient_identifiers.filter(function(entry) {
        return entry.type.name === "ARV Number";
      });
      this.arvNumber = identifier.length > 0 ? identifier[0].identifier : "N/A";
      this.sex = patient.person.gender;
      this.updatedSex = patient.person.gender;
      this.location =
        patient.person.addresses.length > 0
          ? patient.person.addresses[0].city_village
          : "";
      this.landmark = this.getAtribute(patient.person.person_attributes, 19);
      this.updatedAddress = this.getAtribute(
        patient.person.person_attributes,
        19
      );
      this.occupation = this.getAtribute(patient.person.person_attributes, 13);
      this.phoneNumber = this.getAtribute(patient.person.person_attributes, 12);
      this.updatedPhoneNumber = this.getAtribute(
        patient.person.person_attributes,
        12
      );
      if(this.phoneNumber === "Unknown") {
        this.phoneNumberUnknown = true;
      }
      let personObj = {
        name: this.name,
        dob: patient.person.birthdate,
        age: moment().diff(patient.person.birthdate, "years", false),
        arvNumber: this.arvNumber,
        sex: this.sex
      };
      this.$store.commit("setPatient", personObj);
    });
    
    this.getGuardian();
    this.getStartDate();
    EventBus.$on('reload-first-visits', payload => {
      this.getStartDate();
    });
   
  },
  computed: {
    initialAge() {
      let initAge = "N/A";
      if (this.startDate !== "N/A") {
        initAge = moment(this.startDate).diff(this.dob, "years", false);
      }
      return initAge;
    }, 
    parseStartDate() {
      let dateofStarting = null;
      if(this.startDate !== "N/A" && this.startDate !== null) {
        dateofStarting = moment(this.startDate).format("DD-MMM-YYYY");
      }else {
        dateofStarting = "N/A";
      }
      return dateofStarting;
    },numberState() {
      let state = true;
      if(!this.phoneNumberUnknown) {
        state =  `${this.updatedPhoneNumber}`.match(/^(\+?265|0)(((88|99)\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/) === null ? false : true ;
      }
      return state;
    }, inputType: function() {
      let type = "number";
      if(this.phoneNumberUnknown) {
        type = "text";
        this.updatedPhoneNumber = "Unknown";
      }else {
        if(this.phoneNumber === "Unknown") {
          this.updatedPhoneNumber = null;
        }else {
          this.updatedPhoneNumber = this.phoneNumber;
        }
      }
      
      return type;
    },guardianNumberState() {
      let state = true;
      if(!this.guardianphoneNumberUnknown) {
        state =  `${this.updatedguardianNumber}`.match(/^(\+?265|0)(((88|99)\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/) === null ? false : true ;
      }
      return state;
    }, guardianinputType: function() {
      let type = "number";
      if(this.guardianphoneNumberUnknown) {
        type = "text";
        this.updatedguardianNumber = "Unknown";
      }else {
        if(this.guardianphoneNumber === "Unknown") {
          this.updatedguardianNumber = null;
        }else {
          this.updatedguardianNumber = this.guardianNumber;
        }
      }
      
      return type;
    }
  }
};
</script>

<style scoped>
.information {
  color: #62676e;
  /* mix-blend-mode: difference; */
}
.editable{
  
  color: #537fb5;
}
.col-md-3 {
  border: 0.5px black solid;
  border-radius: 2px;
  line-height: 20px;
  font-size: 15px;
  background-color: #f6f6f6;
  text-align: left;
  padding: 3px;
  /* margin: auto; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* padding: 10px; */
}
.horizontal-list {
      display: inline-block;
}
</style>