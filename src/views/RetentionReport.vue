<template>
<div class="d-flex" id="wrapper">
  <side-bar />
  <div id="page-content-wrapper">
    <top-nav />
    <!-- Page Content -->
    <div id="main-container">

      <b-row style="margin: 0px 5px 0px 5px;">
        <span style="padding-bottom: 0px;">{{reportTitle}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span >
      </b-row>

      <b-row>
        <b-col style="padding: 18px;">
          <div class="form-group" style="padding: 2px; font-size: 18px; margin-top: 1px;">
            <label for="">Retention (Months) </label>
            <input type="number" name="" id="" v-model="retention"> 
          </div>
        </b-col>
        <b-col>
          <sdPicker :onSubmit="fetchDates"></sdPicker>
        </b-col>
      </b-row>

      <div class="row">
        <div class="col-sm-12">
          <report-overlay :reportLoading="reportLoading">
            <table class="table table-striped report" id="cohort-clients">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age group</th>
                  <th>Gender</th>
                  <th>Total Dispensed</th>
                  <th>Total Retained</th>
                  <th>Percentage Retained</th>
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

<script>
// @ is an alias to /src
import ApiClient from "@/services/api_client"
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import ReportOverlay from "@/components/reports/ReportOverlay";
import DateUtils from "@/services/date_utils";

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
      let url = "/programs/1/reports/retention?";
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&months=' + this.retention;
     
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        this.loadGroupData(await response.json());
      }
    },
    loadGroupData(data){
      let counter = 1;
      let report_gender = ['F','M'];
      let set_age_groups = this.ageGroups;
      this.dTable.fnClearTable();

      for(let j = 0; j < report_gender.length; j++){
        let age_group_found = false;
        for(let i = 0; i < set_age_groups.length; i++){

            let gender = data.retained;  
            let clients = 0;
            gender.forEach(element => {
              
              if (element.age_group === set_age_groups[i]  &&  element.gender == report_gender[j]) {  
                age_group_found = true;
                clients++;
              }
            });
            let dispensed = 0;
            data.all.forEach(element => {
              
              if (element.age_group === set_age_groups[i]  &&  element.gender == report_gender[j]) {  
                age_group_found = true;
                dispensed++;

              }
            });
            let percentage =(clients !== 0 ? parseFloat((clients / dispensed) * 100).toFixed(2) : 0);
            this.dTable.fnAddData([ counter++, set_age_groups[i], report_gender[j], dispensed, clients, percentage ]);
        }
      }

    }
  }, data: function() {
      return {
        reportLoading: false,
        startDate: null,
        endDate: null,
        retention: null,
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
      return `${this.location.name} Retention: ${period}`
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