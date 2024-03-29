<template>
  <div style="width:100%">
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
          <td>{{moment(visit.visitDate).format("DD-MMM-YYYY")}} ({{Math.round(moment(visit.visitDate).diff(moment(startDate), 'months', true))}}M)</td>
          <td>{{visit.givenTo}}</td>
          <td>{{visit.weight}}</td>
          <td>{{visit.height}}</td>
          <td>{{visit.pregnant}}</td>
          <td>{{visit.breastfeeding}}</td>
          <td>{{visit.tbStatus}}</td>
          <td>
            <button style="width:100%" class="btn btn-primary" @click="drillSideEffects(visit)"> 
              {{visit.sideEffects.length ? "Yes" : "No"}}
            </button>
          </td>
          <td>
            <button style="width:100%" class="btn btn-primary" @click="loadVisitDrugs(visit)"> 
              {{visit.ARTRegimen}} ({{visit.dispensed}})
            </button>
          </td>
          <td>{{visit.nextAppointment}}</td>
          <td>{{visit.outcome}}</td>
          <td>{{visit.viralLoad}}</td>
          <td>
            <click-confirm :disabled="visit.encounters.length === 0">
            <button class="btn btn-danger" @click="deleteVisit(index, visit.encounters)" :disabled="visit.encounters.length === 0">
              <template v-if="visit.state === 'deleting'">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
              </template>
              <template v-else>
                <span>X</span>
              </template>
            </button>
            </click-confirm>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal id="visit-drugs" :title="`Drugs dispensed on ${moment(selectedVisit.visitDate).format('DD/MMM/YYYY')}`" size="xl">
      <center v-if="isLoadingDrugs"> Please wait...</center>
      <table class="table" v-if="!isLoadingDrugs"> 
        <tr> 
          <th>Drug</th>
          <th>Quantity</th>
          <th>Units</th>
        </tr>
        <tr v-for="(order, dIndex) in visitDrugs" :key="dIndex"> 
          <td> {{order.drug.name}} </td>
          <td> {{order.quantity}}</td>
          <td> {{order.units}}</td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="side-effects" :title="`Side Effects on ${moment(selectedVisit.visitDate).format('DD/MMM/YYYY')}`" size="lg">
      <b-list-group flush>
        <b-list-group-item v-for="sideEffect in selectedVisit.sideEffects" :key="sideEffect">{{ sideEffect }}</b-list-group-item>
      </b-list-group>
    </b-modal>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import EventBus from "../services/event-bus.js";
import moment from "moment";
export default {
  data: function() {
    return {
      isLoadingDrugs: false,
      selectedVisit: '',
      patientVisits: [],
      startDate: null,
      visitDrugs: [],
      mockOBJ: {
        visitDate: null,
        givenTo: null,
        weight: null,
        height: null,
        sideEffects: [],
        ARTRegimen: null,
        nextAppointment: null,
        viralLoad: null,
        outcoume: null,
        encounters: [],
        state: null,
        tbStatus: null,
        pregnant: null,
        breastfeeding: null,
        dispensed: null,
        adherence: null
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
        },
        {
          conceptID: 2540,
          variableName: "adherence",
          valueType: "value_numeric",
          secondType: "value_text",
        }
      ]
    };
  },
  methods: {
    drillSideEffects (visit) {
      if(visit.sideEffects.length) {
        this.selectedVisit = visit;
        this.$bvModal.show('side-effects')
      }
    },
    getVisits: async function() {
      // let temp = [];
      await ApiClient.get(`/patients/${this.$route.params.id}/visits?program_id=1&include_defaulter_dates=true`).then(
        res => {
          res.json().then(ret => {
            this.setVisits(ret);
          });
        }
      );
    },
    loadVisitDrugs(visit) {
      this.isLoadingDrugs = true
      this.selectedVisit = visit
      this.$bvModal.show('visit-drugs')
      ApiClient.get(`/drug_orders?patient_id=${this.$route.params.id}&program_id=1&start_date=${this.selectedVisit.visitDate}`)
        .then(res => res.json().then(ret => {
          this.isLoadingDrugs = false
          this.visitDrugs = ret
        })).catch((e) => {
          alert(e)
          this.isLoadingDrugs = false
        })
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
              EventBus.$emit("reload-first-visits", "");
            }
          }else {
            console.log("not deleted")
          }
        })
      })
      
    },
    getLastOrder: async function(encounterDate) {
    let patientID = this.$route.params.id;
    let response =  await ApiClient.get(`/programs/1/patients/${patientID}/last_drugs_received?date=`+encounterDate);
    return await response.json();
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
      let url = `programs/1/patients/${this.$route.params.id}/visit?date=${element.visitDate}`;
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
                tempob[innerElement.variableName]= ((innerElement.conceptID === 856 && val === 1) ? "LDL" : res[res.length - 1][innerElement.prepend] + " " + val);
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
          element.ARTRegimen = el.regimen;
          element.outcome = el.outcome;
          tempob.ARTRegimen = el.regimen;
          tempob.outcome = el.outcome;
          el.visit_by = el.visit_by.replace(/Unk/ig, '');
          element.givenTo = el.visit_by;
          tempob.givenTo = el.visit_by;
          tempob.viralLoad = el.viral_load;
          tempob.sideEffects = el.side_effects;
          element.sideEffects = el.side_effects;
          if(el.pills_dispensed.length > 0) {
                element.dispensed = el.pills_dispensed[0][1];            
                tempob.dispensed = el.pills_dispensed[0][1];            
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
    EventBus.$on('set-start-date', payload => {
      this.startDate = payload;
    });
    // this.getEncounters('2020-02-24');
  }
};
</script>

<style scoped>
  /* .available */
</style>