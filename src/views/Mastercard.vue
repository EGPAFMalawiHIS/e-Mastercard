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
            @click="$bvModal.show('encounter-modal')"
          >Add Visit</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$bvModal.show('outcome-modal')"
          >Update Outcome</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$bvModal.show('viral-load-modal')"
          >Viral Load</button>
          <div class="row" style="margin: 10px; margin-top: 5px;">
            <visit-data></visit-data>
          </div>

          <b-modal id="encounter-modal" title="encounter" size="xl">
            <div class="row">
              
              <div class="col">
                <label for="encounter-datepicker">Choose a visit date</label>
                <b-form-datepicker id="encounter-datepicker" class="mb-2" v-model="date"></b-form-datepicker>
                <!-- <input type="date" class="form-control" name id v-model="date" /> -->
              </div>
            </div>
            <encounter :date="date" />
            <template v-slot:modal-footer>
              <div class="w-100"></div>
            </template>
          </b-modal>

          <b-modal id="outcome-modal" title="outcome" size="xl">
            <outcome />
            <template v-slot:modal-footer>
              <div class="w-100"></div>
            </template>
          </b-modal>

          <b-modal id="viral-load-modal" title="encounter" size="xl">
            <viral-load ref="viral-load"></viral-load>
            <template v-slot:modal-footer>
              <div class="w-100"></div>
            </template>
          </b-modal>
        </div>
      </div>
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
import encounter from "@/components/encounters/encounter.vue";
import outcome from "@/components/outcome.vue";
import viralLoad from "@/components/encounters/viral_load.vue";
import moment from "moment/moment";
export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-information": PatientInformation,
    "visit-data": VisitData,
    "clinic-registration": clinicRegistration,
    encounter: encounter,
    outcome: outcome,
    "viral-load": viralLoad
  },
  data: function() {
    return {
      date: moment().format("YYYY-MM-DD")
    };
  }
};
</script>

<style >
.btn-primary {
  margin: 10px; 
  margin-top: 5px;
}
</style>