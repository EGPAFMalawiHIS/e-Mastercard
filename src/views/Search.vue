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
              class="form-control border-primary"
              id="myInput"
              type="text"
              placeholder="Search for a patient.."
              v-model="searchText"
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
                <input
                  type="checkbox"
                  name="ARV number"
                  id="arvNumber"
                  value="ARV Number"
                  v-model="arvNumber"
                />
                <label class="form-check-input" for="arvNumber">ARV Number</label>
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
export default {
  name: "home",
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
      arvNumber: false,
      gender: null,
      sitePrefix: null,
      loading: false
    };
  },
  methods: {
    searchPatients: async function() {
      this.loading = true;
      let personOBJ =
        this.searchText != null && this.searchText.length > 0
          ? this.splitName(this.searchText)
          : null;
      if (personOBJ !== null) {
        var urlParams = Object.keys(personOBJ)
          .map(key => {
            if (
              (personOBJ[key] + "").length == 0 ||
              personOBJ[key] === undefined
            ) {
              return "";
            } else {
              return (
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(personOBJ[key])
              );
            }
          })
          .filter(key => key.length > 0)
          .join("&");
        let response = await ApiClient.get(personOBJ.URL + urlParams);
        this.results = (await response.json()) || [];
        this.loading = false;
      }
    },
    toggleAdvanced: function() {
      this.showAdvanced = this.showAdvanced == false ? true : false;
    },
    splitName: function(name) {
      let tempName = name.split(" ").filter(function(entry) {
        return /\S/.test(entry);
      });
      let personOBJ = {};

      if (tempName.length > 0) {
        personOBJ.given_name = tempName[0];
        tempName[1] ? (personOBJ.family_name = tempName[1]) : null;
        personOBJ.URL = "search/patients?";
        if (tempName[2]) {
          personOBJ.middle_name = tempName[1];
          personOBJ.family_name = tempName[2];
        }
      }
      //var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/search/patients/by_identifier?type_id=" + identifier_type + "&identifier="  + identfier_id;
      if (this.gender) {
        personOBJ.gender = this.gender;
      }
      if (this.arvNumber) {
        // personOBJ.identifier = tempName[0];
        let f = this.getSitePrefix();
        // console.log(f);
        personOBJ = {};
        personOBJ.identifier = this.sitePrefix + "-ARV-" + tempName[0];
        personOBJ.URL = "/search/patients/by_identifier?type_id=4&&";
      }
      return personOBJ;
    },
    getSitePrefix: async function() {
      let prefix = await ApiClient.get(
        "global_properties?property=site_prefix"
      );
      let f = await prefix
        .json()
        .then(result => (this.sitePrefix = result.site_prefix));
      return;
    },
    redirect: function(url) {
      this.$router.push(url);
    }
  },
  mounted() {
    this.getSitePrefix();
  }
};
</script>

<style scoped>
</style>