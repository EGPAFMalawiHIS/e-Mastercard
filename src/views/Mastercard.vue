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
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >Add Visit</button>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#outcomeModal"
          >Update Outcome</button>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#viral-load"
          >Viral Load</button>
          <div class="row" style="margin: 10px; margin-top: 5px;">
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
                  <div class="row">
                    <div class="col" style="text-align:left;">
                      <label for="">Encounter Date</label>
                  </div>   
                    <div class="col">
                      
                      <input type="date" class="form-control" name="" id="" v-model="date">
                    </div>
                    </div>
                  </div>
                  <encounter :date="date"/>
                </div>
              </div>
            </div>
            
          </div>
          <div
            class="modal fade"
            id="outcomeModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="outcomeModal"
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
                  <outcome />
                </div>
              </div>
            </div>
            
          </div>
          <div
            class="modal fade"
            id="viral-load"
            tabindex="-1"
            role="dialog"
            aria-labelledby="viral-load"
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
                  <viral-load  ref="viral-load"></viral-load>      
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </div>
     
      <!-- /#page-content-wrapper -->
    </div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import PatientInformation from "@/components/PatientInformation.vue";
import VisitData from "@/components/VisitData.vue";
import clinicRegistration from "@/components/encounters/clinicRegistration.vue";
import encounter from "@/components/encounters/encounter.vue"
import outcome from "@/components/outcome.vue"
import viralLoad from '@/components/encounters/viral_load.vue';
export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-information": PatientInformation,
    "visit-data": VisitData,
    "clinic-registration": clinicRegistration,
    "encounter": encounter,
    "outcome": outcome,
    "viral-load": viralLoad
  }, data: function() {
    return {
      date: null,
    }
  }
};
</script>

<style >
.btn-primary {
  margin: 10px; 
  margin-top: 5px;
}
</style>