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
          <cohortheader/>
          <cohort-ft  :params="cohortData"/>
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
import cohortHeader from '@/components/cohortHeader.vue';
import cohortFT from '@/components/cohortFT.vue';

import ApiClient from "../services/api_client";


export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker,
    'cohortheader': cohortHeader,
    'cohort-ft': cohortFT
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    fetchData: async function(qtr) {
      //this.$refs.myid.disabled=true;
      let prefix = await ApiClient.get(
        "programs/1/reports/cohort?name=" + qtr
      );
      let f = await prefix
      .json();
      this.checkResult(f.values);
      return;
    },
    checkResult(data){
      if(data.length > 0) {
        //this.$refs.myid.disabled=false;
        this.cohortData = data;
      }else{
        setTimeout(this.fetchData, 10000);
      }
    }
  },
  data () {
    return {
      msg: 'MoH cohort report version 24',
      cohortData: []
    }
  }
}



</script>
