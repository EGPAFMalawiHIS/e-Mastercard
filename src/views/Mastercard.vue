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
       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>
       <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <clinic-registration></clinic-registration>
              <!-- ... -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
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
import clinicRegistration from '@/components/encounters/clinicRegistration.vue'

export default {
  name: 'home',
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-information": PatientInformation,
    "visit-data": VisitData,
    "clinic-registration": clinicRegistration
  }
}
</script>

<style >

</style>