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
              class="col-md-6 information"
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
            <div class="col-md-6 information">
              <p>{{name}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>DOB and Age at initiation</p>
            </div>
            <div class="col-md-6 information">
              <p>{{age}} ({{initialAge}})</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Sex</p>
            </div>
            <div class="col-md-6 information">
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
            <div class="col-md-6 information">
              <p>{{landmark}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row" @click="$bvModal.show('patient-info-modal')">
            <div class="col-md-6">
              <p>Phone Number</p>
            </div>
            <div class="col-md-6 information">
              <p>{{phoneNumber}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Name of Guardian</p>
            </div>
            <div class="col-md-6 information">
              <p>{{nameOfGuardian}}</p>
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
              <p>{{moment(startDate).format("DD-MM-YYYY")}}</p>
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
              <p>Extra Pulmonary Tuberculosis</p>
            </div>
            <div class="col-md-6 information">
              <p>{{EPTB}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Pulmonary Tuberculosis</p>
            </div>
            <div class="col-md-6 information">
              <p>{{PTB}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Kaposi's Sarcoma</p>
            </div>
            <div class="col-md-6 information">
              <p>{{kaposisSarcoma}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Tuberculosis withing the last 2 year</p>
            </div>
            <div class="col-md-6 information">
              <p>{{tbLastTwoYears}}</p>
            </div>
          </div>
        </div>
      </table>
    </div>
    <b-modal id="arv-number-modal" title="encounter" size="xl">
      <div class="row">
        <div class="col">
          <label for="exampleFormControlSelect1">ARV-Number</label>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              v-model="arv_num"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
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
          <b-input type="text" id="text-phone-number" v-model="updatedPhoneNumber"></b-input>
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
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import EventBus from "../services/event-bus.js";
import GlobalProperties from "@/services/global_properties";
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
      bmi: null,
      ti: null,
      location: null,
      landmark: null,
      occupation: null,
      nameOfGuardian: null,
      dateOfHIVTest: null,
      placeOfHIVTest: null,
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
          conceptID: 2516,
          variableName: "startDate",
          valueType: "value_datetime",
          secondType: "value_text",
          format: false
        },
        {
          conceptID: 7563,
          variableName: "startReason",
          valueType: "value_coded",
          secondType: "value_text"
        },
        {
          conceptID: 2743,
          subConcepts: {
            507: {
              variableName: "kaposisSarcoma",
              returnValue: "Yes"
            },
            1547: {
              variableName: "EPTB",
              returnValue: "Yes"
            },
            7539: {
              variableName: "tbLastTwoYears",
              returnValue: "Yes"
            },
            8206: {
              variableName: "PTB",
              returnValue: "Yes"
            }
          }
        }
      ]
    };
  },
  computed: {},
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
            let person_name = ret[0]["relation"]["names"][0];
            let relationship_type = ret[0]["type"]["b_is_to_a"];
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
    getObs: async function(conceptSet) {
      let url = `/observations?person_id=${this.patientID}&&concept_id=${conceptSet.conceptID}`;
      url = conceptSet.params ? url + `&&` + conceptSet.params : url;
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
    createOb: function(conceptSet, context) {
      this.getObs(conceptSet).then(res => {
        if (res.length > 0) {
          if (conceptSet.returnValue) {
            context[conceptSet.variableName] = conceptSet.returnValue;
          } else if (conceptSet.subConcepts) {
            res.forEach(ret => {
              try {
                context[conceptSet.subConcepts[ret.value_coded].variableName] =
                  conceptSet.subConcepts[ret.value_coded].returnValue;
              } catch (error) {}
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
              this.getConcept(conceptSet, val, context);
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
            if (conceptSet.conceptID === 2552) {
              this.$store.commit("setInitialRegistration", res[res.length - 1]);
            }

            if (conceptSet.conceptID === 5089) {
              this.$store.commit("setInitialVitals", res[res.length - 1]);
            }

            if (conceptSet.conceptID === 7563) {
              this.$store.commit("setInitialStaging", res[res.length - 1]);
            }
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
    getAtribute: function(patient, person_attribute_type_id) {
      let attribute = patient.person.person_attributes.filter(attr => {
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
        let toast = this.$toasted.show("Successfully saved", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 5000
        });
        this.arvNumber = finalNum;
        this.$root.$emit("bv::hide::modal", "arv-number-modal", "#btnShow");
        console.log("Succesfully done");
        // this.$router.go(0);
      } else {
        console.log("Failed to update");
      }
    },
    updateDetails: async function() {
      let params = {};
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
        params.cellphone = this.updatedPhoneNumber;
      }
      if (this.updatedAddress !== this.landmark) {
        params.landmark = this.updatedAddress;
      }
      if (Object.keys(params).length > 0) {
        const response = await ApiClient.put(
          `/people/${this.$route.params.id}`,
          params
        );
        if (response.status === 201 || response.status === 200) {
          let toast = this.$toasted.show("Successfully saved", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 5000
          });
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
        this.$root.$emit("bv::hide::modal", "patient-info-modal", "#btnShow");
      }
    },
    redirect: function(url) {
      this.$router.push(url);
    },
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
      this.landmark = this.getAtribute(patient, 19);
      this.updatedAddress = this.getAtribute(patient, 19);
      this.occupation = this.getAtribute(patient, 13);
      this.phoneNumber = this.getAtribute(patient, 12);
      this.updatedPhoneNumber = this.getAtribute(patient, 12);
      let personObj = {
        name: this.name,
        dob: patient.person.birthdate,
        age: moment().diff(patient.person.birthdate, "years", false),
        arvNumber: this.arvNumber,
        sex: this.sex
      };
      this.$store.commit("setPatient", personObj);
    });
    this.obs.forEach(value => {
      this.createOb(value, this);
    });
    this.getGuardian();
  },
  computed: {
    initialAge() {
      let initAge = "N/A";
      if (this.startDate !== "N/A") {
        initAge = moment(this.startDate).diff(this.dob, "years", false);
      }
      return initAge;
    }
  }
};
</script>

<style scoped>
.information {
  color: #537fb5;
  /* mix-blend-mode: difference; */
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
</style>