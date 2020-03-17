<template>
  <div class="patient-list-container shadow rounded">
    <form class="form" @submit.prevent="triggerSearch">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text"><i class="fas fa-search"></i></div>
        </div>
        <input type="text" class="form-control" placeholder="Name or ARV Number" v-model="searchText">
      </div> 
    </form>

    <div class="patient-list">
      <PatientListItem v-for="patient in patients"
                       :patient="patient"
                       :key="patient.patient_id"
                       :selected="patient.patient_id === selectedPatientId"
                       @on-click="onPatientCardSelected"
                       style="width: 96%" />
    </div>
  </div>
</template>

<script>
import PatientListItem from "@/components/PatientListItem";

export default {
  components: {PatientListItem},
  props: ['patients'],
  data() {
    return {
      searchText: '',
      selectedPatientId: null
    };
  },
  methods: {
    triggerSearch() {
      this.$emit('on-search', this.searchText);
    },
    onPatientCardSelected(patientId) {
      this.selectedPatientId = patientId;
      this.$emit('on-patient-selected', patientId);
    }
  }
}
</script>

<style scoped>

.patient-list {
  padding: 2%;
  min-height: 540px;
  max-height: 540px;
  overflow-y: scroll;
}

@media (min-height: 900px) {
  .patient-list {
    min-height: 700px;
    max-height: 700px;
  }
}
</style>