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
          <b-overlay :show="hideReport" :no-center="true" spinner-type="grow" spinner-variant="primary">
            <template v-slot:overlay>
              <div style="display: block; min-height: 720px; width: 100%; padding-top: 20%">
                <h1 v-if="!reportSelected">No Report Selected</h1>
                <b-spinner v-if="reportSelected" type="grow" variant="primary"></b-spinner>
              </div>
            </template>
            <div id="printReport">
              <cohortvalidation :dataparams="validationData"/>
              <cohortheader :reportparams="reportData"/>
              <cohort-ft :params="cohortData" :reportid="reportID"/>
            </div>

            <cohort-print :onPrint="printReport" />
          </b-overlay>
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

export default {
  name: "reports",
  components: {
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
    fetchData: async function(report_parameters) {
      if(!report_parameters)
        return;

      let qtr = report_parameters[0];
      let regenerate = report_parameters[1];
      if(qtr == 'Select cohort quarter')
        return;

      this.reportSelected = true;
      this.reportLoading = true;

      const response = await ApiClient.get("programs/1/reports/cohort?name=" + qtr + "&regenerate=" + regenerate, {}, {});

      if (response.status === 200) {
        //response.json.then(function(data) { this.checkResult(data.values) });
        this.reportLoading = false;
        this.reportData = qtr;
        response.json().then((data) => this.checkResult(data) );
      }else{
        console.log("We here ......" + response.status);
        setTimeout(() => this.fetchData([qtr, false]), 10000);
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
      msg: 'MoH cohort report version 24',
      cohortData: [],
      validationData: [],
      reportData: null,
      reportID: null,
      reportSelected: false,
      reportLoading: false
    }
  },
  computed: {
    hideReport() {
      return this.reportLoading || !this.reportSelected;
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

  .cohort > div {
    display: none;
  }

  .cohort #printReport {
    display: block;
  }
}
</style>
