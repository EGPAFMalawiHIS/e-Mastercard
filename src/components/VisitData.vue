<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th>Visit Date</th>
        <th>Given To</th>
        <th>Weight</th>
        <th>Height</th>
        <th>Side Effects</th>
        <th>ART Regimen</th>
        <th>Next Appointment</th>
        <th>Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(visit, index) in patientVisits" :key="index">
        <td>{{moment(visit.visitDate).format("DD-MMM-YYYY")}}</td>
        <td>{{visit.givenTo}}</td>
        <td>{{visit.weight}}</td>
        <td>{{visit.height}}</td>
        <td>{{visit.sideEffects}}</td>
        <td>{{visit.ARTRegimen}}</td>
        <td>{{visit.nextAppointment}}</td>
        <td>{{visit.outcome}}</td>
      </tr>
     
    </tbody>
  </table>
</template>

<script>
import ApiClient from "../services/api_client";
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
        outcoume: null
      },
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
    setVisits: function(details){
      let temp = [];
      details.forEach(element => {
              temp.push({
               visitDate: element 
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
                this.getConcept(element, val, context);
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
        this.patientVisits.push(tempob);
      });
        
        // this.setVisits(m);
        // this.$forceUpdate();
    }
  },
  mounted() {
    this.getVisits();
  }
};
</script>

<style>
</style>