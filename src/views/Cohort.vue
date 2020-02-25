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
          <cohortvalidation :dataparams="validationData"/>
          <cohortheader :reportparams="reportData"/>
          <cohort-ft :params="cohortData"/>
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
import cohortFTVue from '../components/cohortFT.vue';


export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker,
    'cohortheader': cohortHeader,
    'cohort-ft': cohortFT,
    'cohortvalidation': cohortValidation
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    fetchData: async function(qtr) {
      if(!qtr)
        return;

      if(qtr == 'Select cohort quarter')
        return;

      const response = await ApiClient.get("programs/1/reports/cohort?name=" + qtr, {}, {});

      if (response.status === 200) {
        //response.json.then(function(data) { this.checkResult(data.values) });
        this.reportData = qtr;
        response.json().then((data) => this.checkResult(data.values) );
      }else{
        console.log("We here ......" + response.status);
        setTimeout(() => this.fetchData(qtr), 10000);
      }
    },
    checkResult(data){
      this.cohortData = data;
      this.validationData = data;
    }
  },
  data () {
    return {
      msg: 'MoH cohort report version 24',
      cohortData: [],
      validationData: [],
      reportData: null
    }
  }
}

</script>