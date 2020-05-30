<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container">
          <div class="row">
            <div class="col-sm-12" style="z-index: 20"> <!-- elevate date picker above overlay below -->
             <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
            <sdPicker :onSubmit="fetchDates"></sdPicker>

            </div>
          </div>
         <div class="row">
             <div class="col-sm-12">
   <b-overlay :show="hideReport" spinner-type="grow" spinner-variant="primary">
                  <template v-if="!reportSelected" v-slot:overlay>
                    <h1>No Report Selected</h1>
                  </template>
          <table class="table table-striped report" id="cohort-clients">
            <thead>
              <tr>
                <th scope="col">ARV number</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th class="center-text" scope="col">Gender</th>
                <th class="center-text" scope="col">DOB</th>
                <th class="center-text" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reportData" :key="index">
                <td>{{item.arv_number}}</td>
                <td>{{item.given_name}}</td>
                <td>{{item.family_name}}</td>
                <td>{{item.gender}}</td>
                <td>{{item.birthdate}}</td>
                <td><button @click="$router.push(`/patient/mastercard/${item.patient_id}`)" class="btn-warning show-btn">Show</button></td>
              </tr>
            </tbody>
          </table>
   </b-overlay>

        </div>
        </div>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
</template>

<script>

require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

//require("@/assets/datatable/jquery-ui.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css");

import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import jQuery from 'jquery';
import datatable from 'datatables';



require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js");





export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },methods: {
    fetchDates: async function(date) {
      this.reportLoading = true;
      this.reportSelected = true;
      this.report_title = sessionStorage.location_name + " Patients pregnant";
      this.report_title += " Reporting  period: " + moment(date[0]).format("DD/MMM/YYYY");
      this.report_title += " " + moment(date[1]).format("DD/MMM/YYYY");
      let url_path = '/programs/1/reports/pregnant_patients?start_date=' + date[0] + 'end_date='+date[1];
      url_path += '&paginate=false';
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.checkResult(data) );
      }else{
        // setTimeout(() => this.fetchData(), 5000);
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        dom: 'Bfrtip',
        retrieve: true,
        buttons: [
          {
            extend: 'copy',
            title:  this.report_title
          },
          {
            extend: 'csv',
            title:  this.report_title
          },
          {
            extend: 'pdf',
            title:  this.report_title
          },
          {
            extend: 'print',
            title:  this.report_title
          }
        ],
        columnDefs: [
          // {"className": "center-text", "targets": 3},
          // {"className": "center-text", "targets": 4}
        ]
      });
    },
    checkResult(data){
      this.reportData = data;
      this.reportLoading = false;
      setTimeout(() => this.initDataTable(), 1000);
    },
  },
  mounted() {
    // setTimeout(() => this.initDataTable(), 300);
  }, data: function() {
      return {
        report_title: 'Pregnant Patients',
        reportData: null,
        dTable: null,
        formatedData: [],
        reportSelected: false,
        reportLoading: false,
      }
    }, 
    computed: {
      hideReport() {
        return this.reportLoading || !this.reportSelected;
      },
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
  padding-bottom: 30px;
  width:  100%;
}

button {
  float: right;
  right: 10px;
}

table {
    text-align: left;
    margin-left: 5px;
    padding-top: 10px;
}
</style>


<style>
.center-text {
    text-align: center;
}

.show-btn {
  font-size: 14px;
}
/* Ensure that the demo table scrolls */
th, td { white-space: nowrap; }
div.dataTables_wrapper {
   /* width: 800px;*/
    margin: 0 auto;
}
</style>
