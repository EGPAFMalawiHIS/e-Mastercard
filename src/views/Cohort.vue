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
          <report-date-picker/>
          <cohortheader/>
          <cohort-ft/>
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
    }
  },
  data () {
    return {
      msg: 'MoH cohort report version 24'
    }
  }
}



</script>
