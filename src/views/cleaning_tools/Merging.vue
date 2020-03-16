<template>
  <PageView>
    <div class="row">
      <div v-for="(error, i) in errors"
           :key="i"
           class="alert alert-danger alert-dismissible fade show col-md-8 offset-md-2"
           role="alert">
        {{error}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="() => onDeleteError(i)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 offset-md-1">
        <PatientList @on-search="searchTargetPatients"
                     @on-patient-selected="onSelectTargetPatient"
                     :patients="targetPatients" /> 
      </div>

      <div class="col-md-5">
        <PatientList @on-search="searchSourcePatients"
                     @on-patient-selected="onSelectSourcePatient"
                     :patients="sourcePatients" />
      </div>
    </div>

    <button id="merge-button" class="btn btn-primary btn-lg shadow" @click="mergeSelectedPatients">
      Merge
    </button>
  </PageView>
</template>

<script>
import ApiClient from "@/services/api_client";
import PatientService from "@/services/patient_service";

import PatientList from "@/components/PatientList";
import PageView from "@/components/PageView";

export default {
  components: {PatientList, PageView},
  props: ['patients'],
  data() {
    return {
      targetPatients: [], // Pool of patients from which a target is to be chosen
      targetName: null,
      targetPatientId: null,
      sourcePatients: [],  // Pool of patiens from which a source is to be chosen
      sourceName: null,
      sourcePatientId: null,
      errors: []
    };
  },
  methods: {
    async searchTargetPatients(searchText) {
      try {
        this.targetPatients = await PatientService.searchPatients({searchText});
      } catch (exception) {
        alert(exception);
      }
    },
    async searchSourcePatients(searchText) {
      try {
        this.sourcePatients = await PatientService.searchPatients({searchText});
      } catch (exception) {
        alert(exception);
      }
    },
    onSelectTargetPatient(patientId) {
      this.targetPatientId = patientId;
    },
    onSelectSourcePatient(patientId) {
      this.sourcePatientId = patientId;
    },
    onDeleteError(i) {
      this.errors.splice(i, 1); // Pop the i-th element
    },
    async mergeSelectedPatients() {
      if (!this.validateSelection()) return;

      const secondary = [{doc_id: null, patient_id: this.sourcePatientId}]; // TODO: Allow selection of multiple sources
      const primary = {doc_id:null, patient_id: this.targetPatientId};

      const response = await ApiClient.post('dde/patients/merge', {secondary, primary, program_id: 1});
      if (response.status !== 200) {
        const apiError = await response.text();
        this.errors = [`Merge failed: API responded: ${apiError}`];
        return;
      }

      this.sourcePatients = this.sourcePatients.filter(({patient_id}) => patient_id != this.sourcePatientId);
      this.targetPatients = this.targetPatients.filter(({patient_id}) => patient_id != this.sourcePatientId);
      this.sourcePatientId = null;
    },
    validateSelection() {
      if (!this.targetPatientId) {
        this.errors = ['Please select a target patient'];
        return false;
      }

      if (!this.sourcePatientId) {
        this.errors = ['Please select a source patient'];
        return false;
      }
      
      if (this.targetPatientId === this.sourcePatientId) {
        this.errors = ["Can't merge patient to self"];
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
#merge-button-container {
  margin-top: auto;
  margin-bottom: auto;
}

#merge-button {
  position: fixed;
  border: none;
  bottom: 20px;
  right: 20px;
  /* border-radius: 50%;
  background-color: rgba(64, 64, 64, 0.2); */
}
</style>