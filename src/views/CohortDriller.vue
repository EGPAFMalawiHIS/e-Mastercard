<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container" class="col-12 table-col">
          <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
          <table class="table table-striped report">
            <thead>
              <tr>
                <th scope="col">ARV number</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th class="center-text" scope="col">Gender</th>
                <th class="center-text" scope="col">DOB</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in reportData">
                <td>{{record.arv_number}}</td>
                <td>{{record.given_name}}</td>
                <td>{{record.family_name}}</td>
                <td class="center-text">{{record.gender}}</td>
                <td class="center-text">{{moment(record.birthdate).format('DD/MMM/YYYY')}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
</template>


<script>
import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from 'moment';


export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar
  },methods: {
    fetchData: async function() {
      let url_path = 'cohort_report_drill_down?id=' + this.$route.params.id;
      url_path += '&date=2020-01-01';  
      url_path += '&program_id=1';
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.checkResult(data) );
      }else{
        setTimeout(() => this.fetchData(), 5000);
      }
    },
    checkResult(data){
        const url_string = window.location;
        const parsedURL = new URL(url_string);
        const resource_id = parsedURL.searchParams.get("resource_id");
        this.reportData = data;
    }
  },
  mounted() {
    setTimeout(() => this.fetchData(), 300);
  }, data: function() {
      return {
        report_title: 'MoH cohort report drill down (version 24)',
        reportData: null
      }
    }
}

</script>

<style scoped>
#main-container {
    padding-top: 10px !important;
}

span {
  text-align: left;
  float: left;
  padding-bottom: 10px;
  width:  100%;
}

button {
  float: right;
  right: 10px;
}

table {
    text-align: left;
    margin-left: 5px;
}
.center-text {
    text-align: center;
}

</style>