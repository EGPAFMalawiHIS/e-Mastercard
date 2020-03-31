<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th>Visit Date</th>
        <th>Given To</th>
        <th>Weight</th>
        <th>Height</th>
        <th>Preg</th>
        <th>B/F</th>
        <th>TB status</th>
        <th>Side Effects</th>
        <th>ART Regimen</th>
        <th>Next Appointment</th>
        <th>Outcome</th>
        <th>Viral Load</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(visit, index) in patientVisits" :key="index">
        <td>{{moment(visit.visitDate).format("DD-MMM-YYYY")}}</td>
        <td>{{visit.givenTo}}</td>
        <td>{{visit.weight}}</td>
        <td>{{visit.height}}</td>
        <td>{{visit.pregnant}}</td>
        <td>{{visit.breastfeeding}}</td>
        <td>{{visit.tbStatus}}</td>
        <td>{{visit.sideEffects}}</td>
        <td>{{visit.ARTRegimen}}</td>
        <td>{{visit.nextAppointment}}</td>
        <td>{{visit.outcome}}</td>
        <td>{{visit.viralLoad}}</td>
        <td>
          <button class="btn btn-danger" @click="deleteVisit(index, visit.encounters)" v-if="visit.encounters.length > 0">
            <template v-if="visit.state === 'deleting'">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="sr-only">Loading...</span>
            </template>

            
            <template v-else>
              <span>X</span>
            </template>
          </button>
        </td>
      </tr>
     
    </tbody>
  </table>
</template>

<script>
import ApiClient from "../services/api_client";
import EventBus from "../services/event-bus.js";
import moment from "moment";
export default {
  data: function() {
    return {
      patientVisits: [],
      mockOBJ: {
        visitDate: null,
        givenTo: null,
        weight: null,
        height: null,
        sideEffects: null,
        ARTRegimen: null,
        nextAppointment: null,
        viralLoad: null,
        outcoume: null,
        encounters: [],
        state: null,
        tbStatus: null,
        pregnant: null,
        breastfeeding: null,
      },
      encountersToDelete: [],
      obs: [
        {
          conceptID: 5089,
          variableName: "weight",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 5090,
          variableName: "height",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 5096,
          variableName: "nextAppointment",
          valueType: "value_datetime",
          secondType: "value_text"
        },
        {
          conceptID: 7459,
          variableName: "tbStatus",
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
          conceptID: 856,
          variableName: "viralLoad",
          valueType: "value_numeric",
          secondType: "value_text",
          prepend: "value_text"
        }
      ]
    };
  },
  methods: {
    getVisits: async function() {
      // let temp = [];
      await ApiClient.get(`/patients/${this.$route.params.id}/visits`).then(
        res => {
          res.json().then(ret => {
            this.setVisits(ret);
          });
        }
      );
    },
    deleteVisit: function(index, encounters) {
      let itemsProcessed = encounters.length;
      this.patientVisits[index].state = "deleting";
      encounters.forEach(encounter=> {
        this.removeEncounter(encounter).then(el => {
          if(el.status == 204) {
            itemsProcessed -= 1;
            if(itemsProcessed === 0) {
              this.patientVisits.splice(index, 1)
            }
          }else {
            console.log("not deleted")
          }
        })
      })
      
    },
    removeEncounter: async function(encounter) {
      let response = await ApiClient.remove('encounters/'+encounter);
      return response;
    },
    setVisits: function(details){
      let temp = [];
      let encounters = [];
      details.forEach(element => {
               
              temp.push({
               visitDate: element,
               encounters: this
              });
      });
      this.createOb(temp);
    },
    getObs: async function(conceptSet, element) {

      let url = `/observations?person_id=${this.$route.params.id}&&concept_id=${conceptSet.conceptID}&&obs_datetime=${element.visitDate}`;
      url = conceptSet.params ? url + `&&` + conceptSet.params : url;
      let observations = await ApiClient.get(url);
      return await observations.json();
    },
    getEncounters: async function(date) {

      let url = `/encounters?patient_id=${this.$route.params.id}&&date=${date}`;
      let observations = await ApiClient.get(url);
      return await observations.json();
    },
    getCurrentPatientInfo: async function(element) {
      let url = `programs/1/patients/${this.$route.params.id}?date=${element.visitDate}`;
      let observations = await ApiClient.get(url);
      return await observations.json();
    },
    getNextAppointMent: async function() {
      let url = `programs/1/patients/${this.$route.params.id}/next_appointment_date`;
      let observations = await ApiClient.get(url);
      return await observations.json();
    },
    getConcept: async function(results) {
      let concepts = await ApiClient.get(`/concepts/${results}`);
      return await concepts.json();
      
    },
    createOb: function(visits) {
      let m = [];
      visits.forEach(element => {
        let tempob = {...this.mockOBJ};
        tempob.visitDate = element.visitDate;
        this.obs.forEach(innerElement => {
        this.getObs(innerElement, element).then(res => {
          if (res.length > 0) {
            if (innerElement.returnValue) {
              element.variableName = innerElement.returnValue;
              
            } else if (innerElement.subConcepts) {
              res.forEach(ret => {
                try {
                    element.subConcepts[ret.value_coded].variableName = element.subConcepts[ret.value_coded].returnValue;
                } catch (error) {}
              });
            } else {
              
              let val = res[res.length - 1][innerElement.valueType]
                ? res[res.length - 1][innerElement.valueType]
                : res[res.length - 1][innerElement.secondType];
                  tempob[innerElement.variableName] = innerElement.valueType === "value_datetime"
                  ? moment(val).format("DD-MMM-YYYY")
                  : val;
              if (innerElement.valueType === "value_coded") {
                if(innerElement.conceptNames) {
                    tempob[innerElement.variableName] = innerElement.conceptNames[val]; 
                }else {
                  this.getConcept(val).then(con => {
                    tempob[innerElement.variableName] =  con.concept_names[0].name;
                  });
                }
                
                
              }
              if(innerElement.prepend) {
                tempob[innerElement.variableName]= res[res.length - 1][innerElement.prepend] + " " + val;
              }
            }
          } else {
            if (innerElement.backupConcept) {
            }
            if (innerElement.default) {
              element.variableName = innerElement.default;
            } else {
              element[innerElement.variableName] = "N/A";
            }
          }
        });
        });
        this.getCurrentPatientInfo(element).then(el=> {
          element.ARTRegimen = el.current_regimen;
          element.outcome = el.current_outcome;
          tempob.ARTRegimen = el.current_regimen;
          tempob.outcome = el.current_outcome;

        })
        this.getObs({conceptID: 7755}, element).then(el=> {
          let sideEffects = el.filter(function(curr, index) {
            return el[index].children[0].value_coded == 1065;
          }).length;
          sideEffects = sideEffects === 0 ? "No" : "Yes";
          element.sideEffects = sideEffects;
          tempob.sideEffects = sideEffects;
        })
        this.getObs({conceptID: 1805, params: "value_coded=1065"}, element).then(el=> {
          if(el.length > 0) {
            element.givenTo = "Patient";
            tempob.givenTo = "Patient";
          }else {
            element.givenTo = "Guardian";
            tempob.givenTo = "Guardian";
          }
        })
        this.getObs({conceptID: 6131, params: "value_coded=1065"}, element).then(el=> {
          if(el.length > 0) {
            element.pregnant = "Yes";
            tempob.pregnant = "Yes";
          }else {
            element.pregnant = "";
            tempob.pregnant = "";
          }
        })
        this.getObs({conceptID: 7965, params: "value_coded=1065"}, element).then(el=> {
          if(el.length > 0) {
            element.breastfeeding = "Yes";
            tempob.breastfeeding = "Yes";
          }else {
            tempob.breastfeeding = "";
            element.breastfeeding = "";
          }
        })
        this.getEncounters(element.visitDate).then(el => {
            let j = [];
            el.forEach(f => {
              j.push(f.encounter_id);
            })
            tempob.encounters = [...j];
        });
        this.patientVisits.push(tempob);
      });
        
        // this.setVisits(m);
        // this.$forceUpdate();
    },
    returnConcept: async function() {
      
    }
  },
  mounted() {
    this.getVisits();
    EventBus.$on('reload-visits', payload => {
      this.patientVisits = [];
      this.encountersToDelete = [];
      this.getVisits();
    });

    // this.getEncounters('2020-02-24');
  }
};
</script>

<style scoped>
  /* .available */
</style>