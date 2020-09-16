<template>

<div class="d-flex" id="wrapper">
  <side-bar />
  <div id="page-content-wrapper">
    <top-nav />
    <!-- Page Content -->
    <div id="main-container" class="col-12 table-col">
      <div class="row">
        <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
        <sdPicker :onSubmit="fetchDates"></sdPicker>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <report-overlay :reportLoading="reportLoading">
            <table class="table table-striped report" id="cohort-clients">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age group</th>
                  <th>Gender</th>
                  <th class="disaggregated-numbers">Count</th>
                </tr>
              </thead>
              <tbody ref="tableBody">
              </tbody>
             <tfoot>
              <tr>
                <td>
                  Date Created:  {{moment().format('YYYY-MM-DD:h:m:s')}} 
                  e-Mastercard Version : {{EMCVersion}} 
                  API Version {{APIVersion}}
                </td>
              </tr>
            </tfoot>
            </table>
          </report-overlay>
        </div>
      </div>
    </div>
    <!-- Page Content ends -->
  </div>
</div>


</template>

<style scope>

</style>




<script>
// @ is an alias to /src
import ApiClient from "../services/api_client"
import { mapState } from "vuex";
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import TopNav from "@/components/topNav.vue";

import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import jQuery from 'jquery';
import datatable from 'datatables'

require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

//require("@/assets/datatable/jquery-ui.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css")



require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js")



export default {
  name: "txML",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },
  methods: {
    redirect: function(url) {
      this.$router.push(url);
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        searching: false,
        paging: false,
        Processing: true,
        ServerSide: true,
        scroller: {
          loadingIndicator: true
        },
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy',
            title:  this.report_title
          },
          {
            extend: 'csv',
            title:  this.report_title,
            footer: true
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
          {"className": "dt-center numbers", "targets": 0},
          {"className": "dt-center", "targets": 1},
          {"className": "dt-center", "targets": 2},
          {"className": "dt-right", "targets": 3}
        ]
      });
    },
    async fetchDates(dates){
      try {
        this.reportLoading = true;
        this.startDate = dates[0];
        this.endDate = dates[1];
        this.report_title = 'MOH ' + sessionStorage.location_name + ' IPT coverage (those completed six months: 168 days) report ';
        this.report_title += moment(dates[0]).format('DDMMMYYYY');
        this.report_title += " - " + moment(dates[1]).format('DDMMMYYYY');
        await this.loadXLdata();
      } finally {
        this.reportLoading = false;
      }
    },
    loadXLdata: async function(){
      let url = "ipt_coverage?date=" + moment().format('YYYY-MM-DD');
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        this.loadGroupData(await response.json());
      }
    },
    loadGroupData(data){
      //this.loadXLdata();
      this.initDataTable();
      let counter = 1;
      this.dTable.fnClearTable();
      let age_groups = this.ageGroups;
      let gender = ['Female', 'Male'];
      let row_counter = 1;

      for(let j = 0; j < gender.length; j++){
        for(let i = 0; i < age_groups.length; i++){
          let count = 0
          try {
            count = (data[age_groups[i]][gender[j]] ?  data[age_groups[i]][gender[j]].length : 0);  
          }catch(e){
            count  = 0
          }

          this.dTable.fnAddData([ (row_counter++), age_groups[i], gender[j], count ]);
        }
      }
    }
  }, data: function() {
      return {
        startDate: null,
        endDate: null,
        reportLoading: false,
        APIVersion: sessionStorage.APIVersion,
        EMCVersion: sessionStorage.EMCVersion,
        report_title: null,
        ageGroups: [
          '0-5 months', '6-11 months','12-23 months',
          '2-4 years', '5-9 years',
          '10-14 years', '15-17 years',
          '18-19 years', '20-24 years',
          '25-29 years', '30-34 years',
          '35-39 years', '40-44 years',
          '45-49 years', '50 plus years'
        ]
      }
  },
  computed: {
    ...mapState(['location']),
    
  },
  mounted(){
    setTimeout(() => this.initDataTable(), 300);
  }
};
</script>

<style scoped>
span {
  text-align: left;
  float: left;
  padding-bottom: 30px;
  width:  100%;
}

button {
  float: right;
  right: 10px;
  margin-top: 10px;
}

table {
    text-align: left;
    margin-left: 5px;
    padding-top: 10px;
}
</style>

<style>
.dt-center {
  text-align: center;
}

.dt-right {
  text-align: right;
  padding-right: 5px;
}

.numbers {
  width: 15px;
}
</style>