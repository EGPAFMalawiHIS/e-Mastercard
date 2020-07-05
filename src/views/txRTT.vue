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
            <strong>TX RTT</strong> Clients that have their clinical dispensation visit falling in the
    reporting period and there is a difference of 30 or more days between their visit date and their previous appointment date / runout date
          </div>
        </div>
      </div>
      
      <!--span>{{reportTitle}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span-->  
      <div class="row">
        <div class="col-sm-12" style="z-index: 40"> <!-- Report overlay below is at z-index === 30 -->
          <sdPicker :onSubmit="fetchDates"></sdPicker>
        </div>
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
                  <th class="disaggregated-numbers">Returned after 30+ days</th>
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
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import ReportOverlay from "../components/reports/ReportOverlay";
import DateUtils from "../services/date_utils";

import moment from 'moment';
import { mapState } from 'vuex';
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
      let url = "tx_rtt?date=" + moment().format('YYYY-MM-DD');
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
                this.dTable.fnAddData([ counter++, age_group, sex, numbers.length ]);
                age_group_found = true;
                break;
              }
              if(age_group_found == true)
                break;

            }
            if(age_group_found == true)
              break;

          }
          
          if(!age_group_found){
            this.dTable.fnAddData([ counter++, set_age_groups[i], report_gender[j], 0 ]);
          }else{
            age_group_found = false
          }
        }
      }

    }
  }, data: function() {
      return {
        reportLoading: false,
        startDate: null,
        endDate: null,
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
      return `${this.location.name} TX RTT: ${period}`
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