<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <div id="main-container" class="col-12 table-col">
          <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
                
          <b-row>
              <b-col>
            <div class="form-group">
            <label for="">Regimen</label>
            <select class="form-control" name="" id="" v-model="selectedRegimen">
              <option v-for="(regimen, index) in regimens" :key="index">
                  {{ regimen }}
              </option>
            </select>
          </div>
              </b-col>
              <b-col>
                  <div class="form-group">
                    <label for="">Formulation</label>
                    <select class="form-control" name="" id="" v-model="formulation">
                      <option>pellets</option>
                      <option>tablets</option>
                      <option>granules</option>
                    </select>
                  </div>
              </b-col>
              <b-col>

           <sdPicker :onSubmit="fetchDates"></sdPicker>
              </b-col>
          </b-row>
            <b-overlay :show="hideReport" spinner-type="grow" spinner-variant="primary">
                  <template v-if="!reportSelected" v-slot:overlay>
                    <h1>No Report Selected</h1>
                  </template>
          <table class="table table-striped report" id="cohort-clients">
            <thead>
              <tr>
                <th scope="col">ARV number</th>
                <th class="center-text" scope="col">Gender</th>
                <th class="center-text" scope="col">DOB</th>
                <th class="center-text" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(patient, index) in reportData" :key="index">
                    <td >{{patient.arv_number}}</td>
                    <td class="center-text">{{patient.gender}}</td>
                    <td class="center-text">{{patient.birthdate}}</td>
                    <td><b-button variant="primary" @click="$router.push(`/patient/mastercard/${patient.patient_id}`)">show</b-button></td>
                </tr>
            </tbody>
          </table>
            </b-overlay>
        </div>
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
    fetchDates: async function(dates) {
      this.report_title = this.$store.state.location.name + " Regimen Formulation: patient level: ";
      this.report_title += " between " + moment(dates[0]).format('dddd, Do of MMM YYYY');
      this.report_title += " and " + moment(dates[1]).format('dddd, Do of MMM YYYY');
      this.report_title +=  moment().format('YYYY_MM_DD_h_m_s')+" EMC("+sessionStorage.EMCVersion+") " + "API("+sessionStorage.APIVersion+")";
      let url_path = `/programs/1/reports/regimens_and_formulations?start_date=${dates[0]}&end_date=${dates[1]}
        &regimen=${this.selectedRegimen}&formulation=${this.formulation}`; 
        this.reportLoading = true;
      this.reportSelected = true;
      const response = await ApiClient.get(encodeURI(url_path), {}, {});
      if (response.status === 200) {
        response.json().then((data) => this.checkResult(data) );
      }else {
        this.reportLoading = false;
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
        //   {"className": "center-text", "targets": 5},
        //   {"className": "center-text", "targets": 7}
        ]
      });

        this.reportLoading = false;
    },
    checkResult(data){
      this.reportData = data;
      setTimeout(() => this.initDataTable(), 400);
    },
    
  },
  mounted() {
  },
  computed: {
    hideReport() {
      return this.reportLoading || !this.reportSelected;
    },
  }, 
  data: function() {
      return {
        report_title: 'Regimen distribution ',
        reportData: null,
        dTable: null,
        selectedRegimen: null,
        formulation: null,
        reportSelected: false,
        reportLoading: false,
        formatedData: []
        ,regimens: ["0A",
                "2A",
                "4A",
                "5A",
                "6A",
                "7A",
                "8A",
                "9A",
                "10A",
                "11A",
                "12A",
                "13A",
                "14A",
                "15A",
                "16A",
                "17A",
                "0P",
                "2P",
                "4P",
                "9P",
                "11P",
                "14P",
                "15P",
                "16P",
                "17P",]
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
</style>
