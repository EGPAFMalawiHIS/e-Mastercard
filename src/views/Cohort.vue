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
          <div id="printReport">
            <cohortvalidation :dataparams="validationData"/>
            <cohortheader :reportparams="reportData"/>
            <cohort-ft :params="cohortData" :reportid="reportID"/>
          </div>
          <cohort-print :onPrint="printReport" />
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

      const response = await ApiClient.get("programs/1/reports/cohort?name=" + qtr + "&regenerate=" + regenerate, {}, {});

      if (response.status === 200) {
        //response.json.then(function(data) { this.checkResult(data.values) });
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
      //code here ...
    }
  },
  data () {
    return {
      msg: 'MoH cohort report version 24',
      cohortData: [],
      validationData: [],
      reportData: null,
      reportID: null
    }
  },
  mounted(){
  }
}

</script>