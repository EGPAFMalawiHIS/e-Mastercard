<template>

<div class="d-flex" id="wrapper">
  <side-bar />
  <div id="page-content-wrapper">
    <top-nav />
    <!-- Page Content -->

    <div id="main-container">
      <div class="row">
        <div class="col-sm-12">
          <div class="alert alert-info">
            <strong>TX ML</strong> Clients that were Alive and on treatment before the reporting period and their “next appointment date / drug runout” date falls within the reporting period. 30 or more days have gone between their appointment date and the end of the reporting period without any clinical dispensation visit.
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12" style="z-index: 30"> <!-- report-overlay below has a z-index of 20 -->
          <sdPicker :onSubmit="fetchDates"></sdPicker>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <!-- <span>{{reportTitle}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span> -->
          <report-overlay :reportLoading="reportLoading">
            <table class="table table-striped report" id="cohort-clients">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age group</th>
                  <th>Gender</th>
                  <th class="disaggregated-numbers">Defaulted</th>
                  <th class="disaggregated-numbers">Died</th>
                  <th class="disaggregated-numbers">Stopped</th>
                  <th class="disaggregated-numbers">Transferred out</th>
                  <th class="disaggregated-numbers">Unknown</th>
                </tr>
              </thead>
              <tbody ref="tableBody">
              </tbody>
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
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import DateUtils from "../services/date_utils";
import TopNav from "@/components/topNav.vue";

import moment from 'moment';
import { mapState } from 'vuex';

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
            title:  this.reportTitle
          },
          {
            extend: 'csv',
            title:  this.reportTitle
          },
          {
            extend: 'pdf',
            title:  this.reportTitle
          },
          {
            extend: 'print',
            title:  this.reportTitle
          }
        ]
      });
    },
    async fetchDates(dates){
      try {
        this.startDate = dates[0];
        this.endDate = dates[1];
        
        this.reportLoading = true;
        await this.loadXLdata();
        this.reportLoading = false;
      } catch (e) {
        console.error(e);
        this.router.push({name: 'error', params: {message: e.message}});
      }
    },
    loadXLdata: async function(){
      let url = "tx_ml?date=" + moment().format('YYYY-MM-DD');
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        this.loadGroupData(await response.json());
      }
    },
    loadGroupData(data){
      //this.loadXLdata();
      let counter = 1;
      let report_gender = ['F','M'];
      let set_age_groups = this.ageGroups;
      this.dTable.fnClearTable();

      for(let j = 0; j < report_gender.length; j++){
        let age_group_found = false;
        for(let i = 0; i < set_age_groups.length; i++){

          for(let age_group in data){
            let gender = data[age_group];  
            for(let sex in gender){
              if (age_group == set_age_groups[i]  &&  sex == report_gender[j]) {  
                let numbers = gender[sex];
                this.dTable.fnAddData([ counter++, age_group, sex, numbers[0],
                    numbers[1], numbers[2], numbers[3], numbers[4]]);
                age_group_found = true;

              }
            }
          }
          if(!age_group_found){
            this.dTable.fnAddData([ counter++, set_age_groups[i], report_gender[j], 0,0,0,0,0 ]);
          }else{
            age_group_found = false;
          }
        }
      }

    }
  }, data: function() {
      return {
        startDate: null,
        endDate: null,
        reportLoading: false,
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
    reportTitle() {
      const period = this.startDate && this.endDate ? `${DateUtils.localDate(this.startDate)} - ${DateUtils.localDate(this.endDate)}`
                                                    : '';
      return `${this.location.name} TX ML: ${period} ` +  moment().format('YYYY_MM_DD_h_m_s')+" EMC("+sessionStorage.EMCVersion+") " + "API("+sessionStorage.APIVersion+")";
    }
  },
  mounted(){
    this.$nextTick(this.initDataTable);
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

.alert-info {
  width: 98%;
  margin: 10px;
  text-align: left;
}

</style>