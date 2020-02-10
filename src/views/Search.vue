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
          <div class="input-group mb-3 rounded">
            <input class="form-control border-primary" id="myInput" type="text" placeholder="Search for a patient.." v-model="search_text"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="searchPatients">search</button>
            </div>
          </div> 
          <button class="btn btn-primary" @click="toggleAdvanced"> advanced search </button>   

          <div v-show="showAdvanced">

          
          <select name="gender" id="gender">
            <option value="male">male</option>
            <option value="female"> female</option>
          </select>

          </div>
          <br />
          <br />
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4" v-for="(result, index) in results" v-bind:key="index">
                <patient-card :patient="result"/>
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
          search_text : null,
          showAdvanced: false,
          results: [],
      }
  }, methods: {
    searchPatients: async function(){
            
            let personOBJ = this.search_text != null && this.search_text.length > 0 ? this.splitName(this.search_text) : null;
            if (personOBJ !== null) {
              var urlParams = Object.keys(personOBJ).map((key) => {
                  if((personOBJ[key] + "").length == 0 || personOBJ[key] ===undefined){
                      return ""
                  }else{
                      return encodeURIComponent(key) + '=' + encodeURIComponent(personOBJ[key])
                  }
              }).filter(key=> key.length > 0).join("&");
              let response = await ApiClient.get("search/patients?"+urlParams);
              this.results = (await response.json()) || [];
            }
               
    }, toggleAdvanced: function () {
      this.showAdvanced = (this.showAdvanced == false ? true : false); 
    },
    splitName: function(name) {

      let tempName = name.split(" ").filter(function(entry) { return /\S/.test(entry); });
      let personOBJ = {};
      
      if (tempName.length > 0) {
        personOBJ.given_name = tempName[0];
        tempName[1] ? personOBJ.family_name = tempName[1] : null;
        if (tempName[2]){
          personOBJ.middle_name = tempName[1];
          personOBJ.family_name = tempName[2];
        }
      }
      return personOBJ;
    }
  }
};
</script>

<style scoped>
</style>