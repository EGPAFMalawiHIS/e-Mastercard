<template>
  
<div>
    <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <side-bar/>
    <!-- /#sidebar-wrapper -->
    
    <!-- Page Content -->
    <div id="page-content-wrapper">

    <top-nav/>
      <div class="container-fluid">
       <!-- <p>mastercard</p> -->
       <div class="row">
        <patient-information/>
       </div>
       <div class="row" style="margin: 0px; margin-top: 5px;">
         
       <visit-data></visit-data>
       </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/topNav.vue';
import Sidebar from '@/components/SideBar.vue';
import PatientInformation from '@/components/PatientInformation.vue';
import VisitData from '@/components/VisitData.vue';

export default {
  name: 'home',
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-information": PatientInformation,
    "visit-data": VisitData
  }
}
</script>

<style >

</style>