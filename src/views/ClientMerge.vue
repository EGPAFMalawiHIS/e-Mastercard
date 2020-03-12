<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
          <div class="row">
           <div class="col">
               
          <search />
           </div> 
           <div class="col">
               
          <search />
           </div> 
          </div>
        <div class="container-fluid" style="width: 40%; margin: auto; margin-top: 12px">
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
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import PatientCard from "@/components/PatientCard.vue";
import PatientSearch from "@/components/Search.vue";
import ApiClient from "../services/api_client";
export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-card": PatientCard,
    "search": PatientSearch
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