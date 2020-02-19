<template>
  <div class="container-fluid">
    <div class="container-fluid">
      <div class="row table table-bordered">
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>ARV #</p>
            </div>
            <div class="col-md-6 information">
              <p>{{arvNumber}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Name</p>
            </div>
            <div class="col-md-6 information">
              <p>{{name}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>AGE</p>
            </div>
            <div class="col-md-6 information">
              <p>{{age}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
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
          <div class="row">
            <div class="col-md-6">
              <p>Location</p>
            </div>
            <div class="col-md-6 information">
              <p>{{location}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Landmark</p>
            </div>
            <div class="col-md-6 information">
              <p>{{landmark}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-6">
              <p>Occupation</p>
            </div>
            <div class="col-md-6 information">
              <p>{{occupation}}</p>
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
              <p>Date and Place of HIV TEST</p>
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
              <p>{{startDate}}</p>
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
              <p>{{karposisSarcoma}}</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import moment from "moment";
import func from '../../vue-temp/vue-editor-bridge';
export default {
  data: function() {
    return {
      arvNumber: null,
      name: null,
      age: null,
      sex: null,
      initialWeight: null,
      initialHeight: null,
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
      karposisSarcoma: null,
      tbLastTwoYears: null,
      patientID: null,
      obs: [
        {
          conceptID: 5089,
          variableName: "initialWeight",
          valueType: "value_numeric",
          secondType: "value_text"
        },{
          conceptID: 5090,
          variableName: "initialHeight",
          valueType: "value_numeric",
          secondType: "value_text"
        },{
          conceptID: 2137,
          variableName: "bmi",
          valueType: "value_numeric",
          secondType: "value_text"
        },{
          conceptID: 7881,
          variableName: "placeOfHIVTest",
          valueType: "value_text",
        },{
          conceptID: 7882,
          variableName: "dateOfHIVTest",
          valueType: "value_datetime",
          secondType: "value_text"
        }
      ]
    };
  },
  computed: {},
  methods: {
      getPatient: async function() {
          let f = await ApiClient.get(`/patients/${this.patientID}`);
          return await f.json()
      },
      getObs: async function(conceptID) {
        let observations = await ApiClient.get(`/observations?person_id=${this.patientID}&&concept_id=${conceptID}`)
        return await observations.json();
    },
    createOb: function(conceptID, variable, valueType, secondType, context) {
      this.getObs(conceptID).then(res => {
        if (res.length > 0) {
          context[variable] = (res[res.length-1][valueType] ? res[res.length -1][valueType] : res[res.length -1][secondType]);
        }else {
          context[variable] = "N/A";
        }
      })
    },
    obsFilter: function (observations) {

    }
  },
  mounted() {

     this.patientID = this.$route.params.id;
     this.getPatient().then(patient=> {
            this.name = ` ${patient['person'].names[0].given_name} ${patient.person.names[0].family_name} `;
            this.age = ` ${moment(patient.person.birthdate).format('DD-MMM-YYYY')} (${moment().diff(patient.person.birthdate, 'years',false)} years old)`;
            let identifier = patient.patient_identifiers.filter(function(entry) { return entry.type.name === "ARV Number"; });
            this.arvNumber = identifier.length > 0 ? identifier[0].identifier : "N/A";
            this.sex = patient.person.gender;
      });
      this.obs.forEach(value => {
        this.createOb(value.conceptID, value.variableName, value.valueType, value.secondType, this);
      });
  }, computed: {
    
  }
};
</script>

<style scoped>
.information {
  color: blue;
}
</style>