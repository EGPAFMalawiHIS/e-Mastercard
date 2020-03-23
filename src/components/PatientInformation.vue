<template>
  <div class="container-fluid card" style="margin-top: 10px;">
    <div class="container-fluid">
      <table class="row">
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
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import EventBus from "../services/event-bus.js";
import moment from "moment";
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
      kaposisSarcoma: null,
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
        },{
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
            default: "No",  
          }
        },{
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
              default: "No",  
            }
          }
        },{
          conceptID: 2516,
          variableName: "startDate",
          valueType: "value_datetime",
          secondType: "value_text"
        },{
          conceptID: 7563,
          variableName: "startReason",
          valueType: "value_coded",
          secondType: "value_text"
        },{
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
        },
      ]
    };
  },
  computed: {},
  methods: {
      getPatient: async function() {
          let f = await ApiClient.get(`/patients/${this.patientID}`);
          return await f.json()
      },getGuardian: async function() {
          let guardian = await ApiClient.get(`/people/${this.patientID}/relationships`).then(res => {
             res.json().then(ret => {
               if(ret.length > 0) {
                let person_name = ret[0]["relation"]["names"][0];
                let relationship_type = (ret[0]["type"]["b_is_to_a"]);
                this.nameOfGuardian = person_name["given_name"] + " " + person_name["family_name"] + " (" + relationship_type + ")";
               }
             })
          })
      },
      getObs: async function(conceptSet) {
        let url = (`/observations?person_id=${this.patientID}&&concept_id=${conceptSet.conceptID}`);
        url = (conceptSet.params ? (url + `&&` + conceptSet.params) : url);
        let observations = await ApiClient.get(url);
        return await observations.json();
    },
    getConcept: async function(conceptSet, results, context) {
      await ApiClient.get(`/concepts/${results}`).then(res => {
        res.json().then(f => {
          context[conceptSet.variableName] = f.concept_names[0].name;
        })
      });
    },
    createOb: function(conceptSet,context) {
      this.getObs(conceptSet).then(res => {
        if (res.length > 0) {
          if(conceptSet.returnValue) {
            context[conceptSet.variableName] = conceptSet.returnValue
          }else if(conceptSet.subConcepts) {
            res.forEach(ret => {
              try {
                
                context[conceptSet.subConcepts[ret.value_coded].variableName] = conceptSet.subConcepts[ret.value_coded].returnValue;
              } catch (error) {
                
              }
            })
          }
          else {
            let val = (res[res.length-1][conceptSet.valueType] ? res[res.length -1][conceptSet.valueType] : res[res.length -1][conceptSet.secondType]);
            context[conceptSet.variableName] = (conceptSet.valueType === "value_datetime" ? moment(val).format('DD-MMM-YYYY') : val);  
            if (conceptSet.valueType === "value_coded") {
              this.getConcept(conceptSet, val, context);
            }
            if(conceptSet.conceptID === 5089) {
              let weight = (res[0][conceptSet.valueType] ? res[0][conceptSet.valueType] : res[0][conceptSet.secondType]);
              EventBus.$emit('set-initial-weight', weight);
            }
            if(conceptSet.conceptID === 5090) {
              let height = (res[0][conceptSet.valueType] ? res[0][conceptSet.valueType] : res[0][conceptSet.secondType]);
              EventBus.$emit('set-previous-height', height);
              this.$store.commit('setHeight', height);
            } 
          }
        }else {
          if(conceptSet.backupConcept) {
            this.createOb(conceptSet.backupConcept, context);  
          }
          if(conceptSet.default) {
            context[conceptSet.variableName] = conceptSet.default;
          }else {
            context[conceptSet.variableName] = "N/A";
          }
        }
      })
    },
    obsService: function (observations) {
      switch (key) {
        case value:
          
          break;
      
        default:
          break;
      }
    }, 
    getAtribute: function (patient, person_attribute_type_id) {
     let attribute = patient.person.person_attributes.filter(attr =>  {
              return attr.person_attribute_type_id == person_attribute_type_id;
            });
      return (attribute.length > 0 ? attribute[0].value : "");
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
            this.location = patient.person.addresses[0].city_village;
            this.landmark = this.getAtribute(patient, 19);
            this.occupation = this.getAtribute(patient, 13);
            let personObj = {
              name: this.name,
              dob: patient.person.birthdate,
              age: moment().diff(patient.person.birthdate, 'years',false),
              arvNumber:  this.arvNumber,
              sex: this.sex
            };
            this.$store.commit('setPatient', personObj);
            // console.log(moment().diff("2020-02-26", 'days',false))

      });
      this.obs.forEach(value => {
        this.createOb(value, this);
      });
      this.getGuardian();
  }, computed: {
    
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