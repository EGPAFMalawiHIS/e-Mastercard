<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <div class="container-fluid">
          <!-- <p>mastercard</p> -->
          <div class="row">
            <patient-information />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            style="margin: 0px; margin-top: 5px;"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >Add Visit</button>
          <div class="row" style="margin: 0px; margin-top: 5px;">
            <visit-data></visit-data>
          </div>

          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">New Visit</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <encounter/>
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
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import PatientInformation from "@/components/PatientInformation.vue";
import VisitData from "@/components/VisitData.vue";
import clinicRegistration from "@/components/encounters/clinicRegistration.vue";
import encounter from "@/components/encounters/encounter.vue"
export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-information": PatientInformation,
    "visit-data": VisitData,
    "clinic-registration": clinicRegistration,
    "encounter": encounter
  }
};
</script>

<style >
</style>