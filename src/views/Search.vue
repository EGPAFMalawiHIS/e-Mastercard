<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <div class="container-fluid" style="width: 40%; margin: auto; margin-top: 12px">
          <div class="input-group mb-3 rounded">
            <input
              class="form-control mb-2 mr-sm-2" :class="$v.searchText.$error && 'form-input-error'"
              id="myInput"
              type="text"
              placeholder="Search by Name or ARV Number"
              v-model.trim="$v.searchText.$model"
              v-on:keyup.enter="searchPatients"
            /> 
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="searchPatients"
                style="margin-left: 10px"
              >search</button>
            </div>
          </div>

          <span v-if="$v.searchText.$dirty">
            <p class="text-danger form-error" v-if="!$v.searchText.required">A name or an ARV number is required</p>
          </span>

          <div class="justify-content-center" style="width: 80%; margin: auto; margin-left: 60px">
            <form class="form-inline">
              <div class="form-group">
                <label for="gender">Gender:</label>
                <!-- <input type="password" class="form-control" id="pwd"> -->
                <select
                  name="gender"
                  id="gender"
                  class="form-control form-control"
                  v-model="gender"
                >
                  <option value selected disabled>Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            
              <div class="form-group" style="margin-left: 20px">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="redirect('/patient_registration')"
                >Add New Patient</button>
              </div>
            </form>
          </div>
          <br />
          <br />
        </div>
        <div class="d-flex justify-content-center" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <p> number of results: ({{results.length}})</p>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4" v-for="(result, index) in results" v-bind:key="index">
              <patient-card :patient="result" />
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
import PatientCard from "@/components/PatientCard.vue";
import ApiClient from "../services/api_client";
import PatientService from "../services/patient_service";

import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "home",
  mixins: [validationMixin],
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-card": PatientCard
  },
  data: function() {
    return {
      searchText: null,
      showAdvanced: false,
      results: [],
      gender: null,
      loading: false
    };
  },
  validations() {
    return {
      searchText: {required}
    };
  },
  methods: {
    async searchPatients() {
      if (!this.validateForm()) return;

      this.loading = true;

      this.results = await PatientService.searchPatients({
        searchText: this.searchText,
        gender: this.gender
      });

      this.loading = false;
    },
    toggleAdvanced: function() {
      this.showAdvanced = this.showAdvanced == false ? true : false;
    },
    redirect: function(url) {
      this.$router.push(url);
    },
    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid;
    } 
  }
};
</script>

<style scoped>
</style>