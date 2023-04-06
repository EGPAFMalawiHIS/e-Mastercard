<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container">
          <div class="row">
            <div class="col-md-12 mb-4">
              <sdPicker :onSubmit="fetchData"></sdPicker>
            </div>
            <div class="col-lg-3">
              <b-card header="Statistics Summary" class="text-left mx-2">
                <b-list-group class="m-0">
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Total Attendance:</span>
                    <b-badge pill variant="primary" href="#" @click="onSummaryDrill(totalAttendance)">{{ totalAttendance.length }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Patient visit:</span>
                    <b-badge pill variant="primary" href="#" @click="onSummaryDrill(totalAttendance)">{{ patientVisits.length }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Guardian visit:</span>
                    <b-badge pill variant="primary" href="#" @click="onSummaryDrill(totalAttendance)">{{ guardianVisits.length }}</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </div>
            <div class="col-lg-9">
              <b-card class="mr-2">
                <highcharts :options="chartOptions" style="width: 100%;"></highcharts>
              </b-card>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="modal-1" :title="drillTitle" size="xl">
        <!-- btable  -->
        <b-table
          striped
          hover
          id="my-table"
          :items="drillClients"
          :per-page="perPage"
          :current-page="currentPage"
        ></b-table>
        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="drillClients.length"
          aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </b-modal>
      <!-- Page Content end -->
    </div>
</template>
<script type="text/javascript" src="../../../src/assets/HighCharts/highcharts.js"></script>
<script type="text/javascript" src="../../../src/assets/HighCharts/highcharts-vue.min.js"></script>

<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import ApiClient from "../../services/api_client";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import {Chart} from 'highcharts-vue'
import { formatGender } from '../../utils/str';

export default {
  name: "cleaning_tools",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker,
    highcharts: Chart
  }, methods: {
    redirect: function () {
      this.$router.push('/cleaning_tools');
    },
    fetchData: async function(dates) {
      let start_date = moment(dates[0]).format('YYYY-MM-DD');
      let end_date = moment(dates[1]).format('YYYY-MM-DD');
      
      let set_url = "patient_visit_types?program_id=1";
      set_url += "&date=" + moment().format("YYYY-MM-DD");
      set_url += "&start_date=" + start_date + "&end_date=" + end_date;
      const response = await ApiClient.get(set_url, {}, {});

      if (response.status === 200) {
        this.reportLoading = false;
        response.json().then((data) => this.checkResult(data) );
      }else{
      }
    },
    updateChart (seriesData) {
      this.chartOptions.series = [
        { name: "Patient present",  data: seriesData.patientsOnly }, 
        { name: "Guardian present",  data: seriesData.guardiansOnly },
        { name: "Both patient and guardian present", data: seriesData.both }
      ]
    },
    buildSummaryData (patients, guardians, both) {
      this.patientVisits = Object.values(patients).reduce((acc, curr) => acc.concat(curr), [])
      this.guardianVisits = Object.values(guardians).reduce((acc, curr) => acc.concat(curr), [])
      this.totalAttendance = [
        ...this.patientVisits,
        ...this.guardianVisits,
        ...Object.values(both).reduce((acc, curr) => acc.concat(curr), [])
      ];
    },
    checkResult(visits){
      let patientsOnly = {};
      let guardiansOnly = {};
      let bothPatientsAndGuardians = {};
      let seriesData = {
        patientsOnly: [],
        guardiansOnly: [],
        both: []
      }

      for(let date in visits){
        patientsOnly[date] = [];
        guardiansOnly[date] = [];
        bothPatientsAndGuardians[date] = [];
        Object.entries(visits[date]).forEach(([patientId, {guardian_present, patient_present}]) => {
          if(guardian_present && patient_present) bothPatientsAndGuardians[date].push({patientId, date})
          else if (patient_present) patientsOnly[date].push({patientId, date})
          else if (guardian_present) guardiansOnly[date].push({patientId, date})
        })
        seriesData.patientsOnly.push([new Date(date).getTime(), patientsOnly[date].length])
        seriesData.guardiansOnly.push([new Date(date).getTime(), guardiansOnly[date].length])
        seriesData.both.push([new Date(date).getTime(), bothPatientsAndGuardians[date].length])
      }
      this.updateChart(seriesData);
      this.buildSummaryData(patientsOnly, guardiansOnly, bothPatientsAndGuardians);
    },
    redraw(){
    },
    getARVNumber (patientIdentifiers = []) {
      const arvNumber = patientIdentifiers.find(id => id.identifier_type == 4)
      return arvNumber ? arvNumber.identifier : ""
    },
    toDateString (date) {
      return moment(date).format("YYYY/MMM/DD");
    },
    getPatientDetails (patientId) {
      return ApiClient.get(`patients/${patientId}`, {}, {})
        .then(async (res) => {
          if (res.status === 200) {
            const patient = await res.json()
            return {
              arv_number: this.getARVNumber(patient.patient_identifiers),
              first_name: patient.person?.names[0]?.given_name,
              last_name: patient.person?.names[0]?.family_name,
              birthdate: this.toDateString(patient.person?.birthdate),
              gender: formatGender(patient.person?.gender),
            }
          }
          return null
        })
    },
    onSummaryDrill (patients) {
      if(patients.length) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        patients.forEach(async ({patientId, date}) => {
          const patient = await this.getPatientDetails(patientId)
          if(patient) this.drillClients.push({...patient, visit_date: this.toDateString(date) })
        });
      }
    }
  },
  data () {
    return {
      page_title: 'Visit stats',
      drillTitle: 'Drill Down Clients',
      reportLoading: false,
      perPage: 10,
      currentPage: 1,
      drillClients: [],
      patientVisits: [],
      guardianVisits: [],
      totalAttendance: [],
      chartOptions: {
        chart: {
          zoomType: 'x'
        },
        series: [{
          name: "Patient present",
          data: this.sorted_data_patients
        }, {
          name: "Guardian present",
          data: this.sorted_data_guardians
        }, {
          name: "Both patient and guardian present",
          data: this.sorted_data_both_patient_guardians
        }],
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        title: {
          text: 'HIV Reception encounters'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          plotAreaHeight: 900,
          title: {
            text: 'Number of clients'
          }
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          series:{
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 5
            }
          }
        },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            }
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
             hover: {
               lineWidth: 1
             }
           },
           threshold: null
         }
      }
    }
  },
  mounted(){
  },
  watch:{
    data(){this.redraw()},
    steven(){this.redraw()},
    agePotValue(){this.redraw()}
  }
}

</script>

<style>
</style>
