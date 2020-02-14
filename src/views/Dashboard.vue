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
        <dashboard style="margin-top:10px"/>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
    
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/topNav.vue'
import Sidebar from '@/components/SideBar.vue'
import PatientDashboard from '@/components/dashboard/PatientDashboard.vue'

export default {
  name: 'home',
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "dashboard": PatientDashboard
  }
}
</script>

<style >
 
</style>