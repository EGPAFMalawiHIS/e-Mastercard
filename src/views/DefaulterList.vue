<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        
        <div id="main-container">
          <div class="spinner-overlay" v-if="loading">
            <loader type="grow" :loading="loading"></loader>
          </div>

          <div class="row">
            <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
          </div>
          <div class="row">
             <sdPicker :onSubmit="fetchDates"></sdPicker>
          </div>
          <div class="row">
            <div class="col-md-12">
              <table class="table table-striped report" id="cohort-clients">
                <thead>
                  <tr>
                    <th scope="col">ARV number</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th class="center-text" scope="col">Gender</th>
                    <th class="center-text" scope="col">DoB (Age)</th>
                    <th class="center-text" scope="col">&nbsp;</th>
                  </tr>
                </thead>
              </table>
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
import Loader from "../components/Loader";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import { mapState } from 'vuex';
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
    Loader,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },methods: {
    fetchDates: async function(dates) {
      this.report_title = this.location.name + ' MoH Defaulter list ';
      this.report_title += " between " + moment(dates[0]).format('dddd, Do of MMM YYYY');
      this.report_title += " and " + moment(dates[1]).format('dddd, Do of MMM YYYY');
      let url_path = '/defaulter_list?start_date=' + dates[0] + "&date=" + dates[1];
      url_path += "&end_date=" + dates[1] + "&program_id=1&pepfar=false"; 
      
      this.loading = true;
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        this.checkResult(await response.json());
        this.loading = false;
      } else{
        setTimeout(() => this.fetchData(), 5000);
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        data: this.formatedData,
        dom: 'Bfrtip',
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
          {"className": "center-text", "targets": 3},
          {"className": "center-text", "targets": 4}
        ]
      });
    },
    checkResult(data){
      const url_string = window.location;
      const parsedURL = new URL(url_string);
      const resource_id = parsedURL.searchParams.get("resource_id");
      this.reportData = data;
      setTimeout(() => this.datatableEnable(data), 10);
    },
    datatableEnable(data) {

      data.forEach(({birthdate, ...patient}) => {
        /*this.dTable.fnAddData( [data[i].arv_number,
          data[i].given_name, data[i].family_name,
          data[i].gender, data[i].birthdate] );*/
        birthdate = birthdate ? `${moment(birthdate).format('DD/MMM/YYYY')} (${moment().diff(birthdate, 'Years')})`
                              : 'N/A (N/A)';
        this.formatedData.push([patient.arv_number, patient.given_name, patient.family_name,
                                patient.gender, birthdate, this.createdShowBTN(patient.person_id)]);
      });
      this.dTable.api().destroy();
      this.initDataTable();
    },
    createdShowBTN(person_id){
      var span = document.createElement('span');
      var button  = document.createElement('button');
      button.setAttribute("onclick", 'javascript:location="/patient/mastercard/' + person_id + '"');
      button.innerHTML = "Show";
      button.setAttribute('class','btn-warning show-btn');
      span.appendChild(button);
      return span.innerHTML;
    }
  },
  mounted() {
    setTimeout(() => this.initDataTable(), 300);
  }, data: function() {
      return {
        report_title: 'Defaulted clients ',
        reportData: null,
        dTable: null,
        formatedData: [],
        loading: false
      }
    },
    computed: {
      ...mapState(['location'])
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

.spinner-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
  overflow: hidden;
  align-content: center;
  align-items: center;
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>


<style>
.center-text {
    text-align: center;
}

.show-btn {
  font-size: 14px;
}
</style>
