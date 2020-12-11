<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container" class="col-12 table-col">
           <sdPicker :onSubmit="fetchData"></sdPicker>
           <!--div id="chart-container" style="margin-top:50px; width: 100%; height: 90%;"-->
           <highcharts :options="chartOptions" style="width: 100%;"></highcharts>
           </div>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
</template>

<style scope>

</style>

<script type="text/javascript" src="../../../src/assets/HighCharts/highcharts.js"></script>
<script type="text/javascript" src="../../../src/assets/HighCharts/highcharts-vue.min.js"></script>


<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";

import ApiClient from "../../services/api_client";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import jQuery from 'jquery'

import {Chart} from 'highcharts-vue'


/*require("@/assets/HighCharts/code/highcharts.js");
require("@/assets/HighCharts/code/modules/data.js");
require("@/assets/HighCharts/code/modules/exporting.js");
require("@/assets/HighCharts/code/modules/export-data.js");
require("@/assets/HighCharts/code/modules/accessibility.js");*/


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
    checkResult(visits){
      for(let visit_date in visits){
        this.visit_dates.push(visit_date);
      }
      this.visit_dates = this.visit_dates.sort();
      let visit_dates = this.visit_dates;

      let patient_visit_type_hash = {};
      let guardian_visit_type_hash = {};
      let patient_guardian_visit_type_hash = {};

      for(var i = 0; i < visit_dates.length; i++){
        patient_visit_type_hash[visit_dates[i]] = 0;
        guardian_visit_type_hash[visit_dates[i]] = 0;
        patient_guardian_visit_type_hash[visit_dates[i]] = 0;

        for(let visit_date in visits){
          if(visit_date != visit_dates[i])
            continue;

          let data = visits[visit_date];

          for(let patient_id in data) {

            if(visits[visit_date][patient_id].guardian_present == true
              && visits[visit_date][patient_id].patient_present == true) {
                patient_guardian_visit_type_hash[visit_dates[i]] += 1;
                continue;
            }

            if(visits[visit_date][patient_id].patient_present == true)
              patient_visit_type_hash[visit_dates[i]] += 1;

            if(visits[visit_date][patient_id].guardian_present == true)
              guardian_visit_type_hash[visit_dates[i]] += 1;

          }

        }
      }
      this.sortReadyForRendering(patient_visit_type_hash, guardian_visit_type_hash,
      patient_guardian_visit_type_hash);

      this.chartOptions = {
        series: [{
          name: "Patient present",
          data: this.sorted_data_patients
        }, {
          name: "Guardian present",
          data: this.sorted_data_guardians
        }, {
          name: "Both patient and guardian present",
          data: this.sorted_data_both_patient_guardians
        }]
      }


    },
    sortReadyForRendering(patients, guardians, both_patient_and_guardian){
       let visit_dates = this.visit_dates;

       for(let i = 0; i < visit_dates.length; i++){
        this.sorted_data_patients.push([new Date(visit_dates[i]).getTime(),
          patients[visit_dates[i]]]);

        this.sorted_data_guardians.push([new Date(visit_dates[i]).getTime(),
          guardians[visit_dates[i]]]);

        this.sorted_data_both_patient_guardians.push([new Date(visit_dates[i]).getTime(),
          both_patient_and_guardian[visit_dates[i]]]);
      }
      //document.getElementById('spinner').style = 'display: none;';
      //document.getElementById('report-cover').style = 'display: none;'
    },
    redraw(){
    }
  },
  data () {
    return {
      page_title: 'Visit stats',
      reportLoading: false,
      sorted_data_patients: [],
      sorted_data_guardians: [],
      sorted_data_both_patient_guardians: [],
      visit_dates: [],
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
        /*allowPointSelect: true,
        point: {
          events:{
            click: ({e}) => { 
              try {
                let valueDescription = e.target.accessibility.valueDescription;
                //showClients(e.target.series.name,
                //e.target.accessibility.valiceDescription);
                console.log(valueDescription)
              }catch(x){
                let show_message = `Something went wrong. 
                Please try changing the date parameters or <b>Zooming in</b>.`;
                console.log(show_message);
              }
            }
          }
        },*/
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            }/*,
            stops: [
              [0, this.highcharts.getOptions().colors[0]],
              [1, this.highcharts.color(this.highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]*/
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
