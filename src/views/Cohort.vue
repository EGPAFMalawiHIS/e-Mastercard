<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->
        

        <div class="cohort">
          <report-date-picker :onSubmit="fetchData"></report-date-picker>
          <report-overlay :reportLoading="reportLoading" :reportSelected="reportSelected">
            <div>
              <div id="printReport">
                <cohortvalidation :dataparams="validationData"/>
                <cohortheader :reportparams="reportData"/>
                <cohort-ft :params="cohortData" :reportid="reportID" :quarter="quarter" ref="rep"/>
              </div>
                <div class="row">
                  <div class="col">

               <button class="btn btn-success footer" @click="printReport">Print report</button> 
                  </div>
                  <div class="col">

               <button class="btn btn-success footer" @click="exportCSV">Export CSV</button>
                  </div>
                </div>
              <!-- <cohort-print :onPrint="printReport" /> -->
            </div>
          </report-overlay>
        </div>

        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>

<style scope>
.cohort {
  margin: 15px;
}

</style>




<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";

import reportDatePicker from '@/components/reportDatePicker.vue';
import cohortValidation from '@/components/cohortReportValidation.vue';
import cohortHeader from '@/components/cohortHeader.vue';
import cohortFT from '@/components/cohortFT.vue';
import ApiClient from "../services/api_client";
import cohortPrint from "@/components/cohortPrint.vue";
import ReportOverlay from "../components/reports/ReportOverlay.vue";
import moment from 'moment';

export default {
  name: "reports",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker,
    'cohortheader': cohortHeader,
    'cohort-ft': cohortFT,
    'cohortvalidation': cohortValidation,
    'cohort-print': cohortPrint
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    exportCSV: function() {
      this.$refs.rep.onDownload();
    },
    fetchData: async function(report_parameters) {
      if(!report_parameters)
        return;

      let qtr = report_parameters[0];
      let regenerate = report_parameters[1];
      this.quarter = qtr;
      this.reportData = qtr;
      if(report_parameters[2] !== "" && report_parameters[3] !== ""){
        qtr = "Cohort-" + report_parameters[2] + "-" + report_parameters[3];
        qtr += "&start_date="  + report_parameters[2];
        qtr += "&end_date="  + report_parameters[3];
        this.quarter = "Custom";
        this.reportData = `Custom ${moment(report_parameters[2]).format("DD/MMM/YYYY")}-${moment(report_parameters[3]).format("DD/MMM/YYYY")}`
      }else if(qtr == 'Select cohort quarter') {
        return
      }
      this.reportSelected = true;
      this.reportLoading = true;
      const response = await ApiClient.get("programs/1/reports/cohort?name=" + qtr + "&regenerate=" + regenerate, {}, {});

      if (response.status === 200) {
        //response.json.then(function(data) { this.checkResult(data.values) });
        this.reportLoading = false;
        response.json().then((data) => this.checkResult(data) );
      }else{
        console.log("We here ......" + response.status);
        report_parameters[1] =false;
        setTimeout(() => this.fetchData(report_parameters), 10000);
      }
    },
    checkResult(cohort_data){
      let data  = cohort_data.values;
      this.reportID = cohort_data.id;
      this.cohortData = data;
      this.validationData = data;
    },
    printReport(){
      print();
    }
  },
  data () {
    return {
      msg: 'MoH cohort report version 26',
      cohortData: [],
      validationData: [],
      reportData: null,
      reportID: null,
      reportSelected: false,
      reportLoading: false,
      quarter: null
    }
  },
  mounted(){
  }
}

</script>

<style>
@media print {
  body {
    overflow-y: visible !important;
    display: block;
  }

  div#wrapper {
    display: block !important;
  }

  .cohort div.control-container, .cohort .footer {
    display: none;
  }

  .cohort #printReport {
    display: block;
  }
}
</style>
