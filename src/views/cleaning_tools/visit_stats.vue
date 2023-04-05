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
                    <b-badge pill variant="primary" href="#">{{ totalAttendance.length }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Patient visit:</span>
                    <b-badge pill variant="primary" href="#">{{ patientVisits.length }}</b-badge>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Guardian visit:</span>
                    <b-badge pill variant="primary" href="#">{{ guardianVisits.length }}</b-badge>
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
          if(guardian_present && patient_present) bothPatientsAndGuardians[date].push(patientId)
          else if (patient_present) patientsOnly[date].push(patientId)
          else if (guardian_present) guardiansOnly[date].push(patientId)
        })
        seriesData.patientsOnly.push([new Date(date).getTime(), patientsOnly[date].length])
        seriesData.guardiansOnly.push([new Date(date).getTime(), guardiansOnly[date].length])
        seriesData.both.push([new Date(date).getTime(), bothPatientsAndGuardians[date].length])
      }
      this.updateChart(seriesData);
      this.buildSummaryData(patientsOnly, guardiansOnly, bothPatientsAndGuardians);
    },
    redraw(){
    }
  },
  data () {
    return {
      page_title: 'Visit stats',
      reportLoading: false,
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
