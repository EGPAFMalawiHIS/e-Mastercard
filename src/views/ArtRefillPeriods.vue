<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div class="alert alert-info">
          <strong>TX CURR MMD</strong> Clients that are alive and on treatment in the reporting period and
the difference in days between their clinical dispensation visit and next appointment / drug-runout date is:
          <ul>
            <li>&lt;3 months (1 – 89 days)</li>
            <li>3-5 months (90-179 days)</li>
            <li>6+ months (180 or more days)</li>
          </ul>
        </div>

        <div id="main-container" class="col-12 table-col">
          <div class="row">
            <div class="col-sm-12">
              <!--span><button @click="$router.go(-1)" class="btn btn-primary">Back</button></span--> 
              <sdPicker :onSubmit="fetchDates" style="z-index: 50"></sdPicker>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <ReportOverlay :reportLoading="reportLoading">
                <table class="table table-striped report" id="cohort-clients">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col" style="width: 20%;">Age group</th>
                      <th scope="col" style="width: 20%;">Gender</th>
                      <th class="center-text" scope="col"># of clients on &lt;3 months of ARVs</th>
                      <th class="center-text" scope="col"># of clients on 3 - 5 months of ARVs</th>
                      <th class="center-text" scope="col"># of clients on >= 6 months of ARVs</th>
                    </tr>
                  </thead> 
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
              </ReportOverlay>
            </div>
          </div>
        </div>
        <!-- Page Content end -->
    </div>

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">{{this.selectedGender}}&nbsp;{{this.selectedAgeGroup}}</h4>
          </div>
          <div class="modal-body">
            <table id="drill-down">
              <tr>
                <th>ARV number</th>
                <th>Regimen</th>
                <th>Qty</th>
                <th>Dispensed date</th>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
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
import moment, { max } from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import ReportOverlay from "../components/reports/ReportOverlay.vue";
import { mapState } from 'vuex';

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
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },
  computed: {
    ...mapState(['location']),
    reportTitle() {
      if (this.startDate && this.endDate) {
        const formatDate = date => moment(date).format('dddd, Do of MMM YYYY');

        return `${this.location.name} TX CURR MMD between ${formatDate(this.startDate)} and ${formatDate(this.endDate)} `;
      } else {
        return `${this.location.name} TX CURR MMD`;
      }
    }
  },
  methods: {
    fetchDates(dates) {
      if (!this.validateDateRange(dates)) return;

      this.startDate = dates[0];
      this.endDate = dates[1];

      this.reportLoading = true;


      this.report_title = 'PEPFAR ' + sessionStorage.location_name + ' TX CURR MMD report ';
      this.report_title += moment(dates[0]).format('DDMMMYYYY');
      this.report_title += " - " + moment(dates[1]).format('DDMMMYYYY');
      this.initReportingGroups();
      this.fetchData();
    },
    fetchData: async function() {
      let group;
      let min_age;
      let max_age;
      if(this.reportingGroups.length > 0){
        let ages = this.setMinMaxAges(this.reportingGroups[0]);
        min_age = ages[0];
        max_age = ages[1];
      } else {
        this.reportLoading = false;
        this.$nextTick(this.renderTable);
        return;
      }
      
      let url_path = 'arv_refill_periods?start_date=' + this.startDate + "&date=" + moment().format('YYYY-MM-DD');
      url_path += "&end_date=" + this.endDate + "&program_id=1&org=pepfar";
      url_path += "&min_age=" + min_age;
      url_path += "&max_age=" + max_age;

      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.addRow(data) );
        setTimeout(() => this.fetchData(), 500);
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    addLink(age_group, gender, count, column_num){
      console.log(age_group + " --- " + gender);
      let span = document.createElement("span");
      let a = document.createElement("a");
      a.setAttribute("href", "#");
      //a.setAttribute("data-target", "#myModal");
      //a.setAttribute("data-toggle","modal");
      a.setAttribute("age-group", age_group);
      a.setAttribute("gender", gender);
      a.setAttribute("column_number", column_num);
      a.setAttribute("click", "showPoPBox('" + age_group + "');");
      a.innerHTML = count;
      span.appendChild(a);
      return span.innerHTML;
    },
    showPoPBox(age_group){
      console.log(age_group);
    },
    initDataTable(data){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        paging: false,
        dom: 'Bfrtip',
        destroy: true,
        data: data,
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
          {"className": "center-text", "targets": 3},
          {"className": "center-text", "targets": 4},
          {"className": "center-text", "targets": 5}
        ]
      });
    },
    initReportingGroups() {
      this.reportingGroups = [
          '<1 year', '1-4 years','5-9 years',
          '10-14 years', '15-19 years', '20-24 years',
          '25-29 years', '30-34 years', '35-39 years',
          '40-44 years', '45-49 years', '50 plus years'
        ];
        this.tableRows = [];
    },
    addRow(data){
  /* ................................................................ */
      var client_sex = ["Female", "Male"];
      var ageGroups = this.reportingGroups;

      for(let i = 0; i < client_sex.length; i++){
        let gender = client_sex[i];
        if(this.column_3[gender] == undefined){
          this.column_3[gender] = {};
          this.column_3[gender][ageGroups[0]] = 0;
        }else if(this.column_3[gender][ageGroups[0]] == undefined){
          this.column_3[gender][ageGroups[0]] = 0;
        }
        
        if(this.column_4[gender] == undefined){
          this.column_4[gender] = {};
          this.column_4[gender][ageGroups[0]] = 0;
        }else if(this.column_4[gender][ageGroups[0]] == undefined){
          this.column_4[gender][ageGroups[0]] = 0;
        }

        if(this.column_5[gender] == undefined){
          this.column_5[gender] = {};
          this.column_5[gender][ageGroups[0]] = 0;
        }else if(this.column_5[gender][ageGroups[0]] == undefined){
          this.column_5[gender][ageGroups[0]] = 0;
        }
            
        for(let g in data){
          if(g != client_sex[i])
            continue;
            
          let patient_ids = data[gender];
          for(let patinet_id in patient_ids){ 
            let info =  data[gender][patinet_id];
            let prescribed_days = info.prescribed_days;
            
            if(prescribed_days < 60)
              this.column_3[gender][ageGroups[0]]  += 1

            if(prescribed_days >= 60 && prescribed_days <= 150)
              this.column_4[gender][ageGroups[0]]  += 1

            if(prescribed_days > 150)
              this.column_5[gender][ageGroups[0]]  += 1

          }
        }

        //let gender = client_sex[i];
        this.tableRows.push([ ageGroups[0], gender,  
          this.column_3[gender][ageGroups[0]], 
          this.column_4[gender][ageGroups[0]], 
          this.column_5[gender][ageGroups[0]] 
        ]);

      }
  /* ................................................................ */



      this.reportingGroups.shift();
    },
    setMinMaxAges(group){
      if(group == '<1 year')
        return [0, 0];

      if(group == '1-4 years')
        return [1, 4];

      if(group == '5-9 years')
        return [5, 9];

      if(group == '10-14 years')
        return [10, 14];

      if(group == '15-19 years')
        return [15, 19];

      if(group == '20-24 years')
        return [20, 24];

      if(group == '25-29 years')
        return [25, 29];

      if(group == '30-34 years')
        return [30, 34];

      if(group == '35-39 years')
        return [35, 39];

      if(group == '40-44 years')
        return [40, 44];

      if(group == '45-49 years')
        return [45, 49];

      if(group == '50 plus years')
        return [50, 10000];

    },
    renderTable() {
      const table = jQuery('#cohort-clients').DataTable();
      table.clear();

      const buttons = ['copy', 'csv', 'pdf', 'print'];

      buttons.forEach(() => table.button().remove());

      buttons.forEach((method, i) => {
        table.button().add(i, {
          extend: method,
          title: this.report_title,
          footer: true
        });
      });

      let gender = ["Female", "Male"];
      let counter = 1;
      let rowData = this.tableRows;

      for(let g = 0; g < gender.length; g++){
        for(let i = 0; i < rowData.length; i++){
          if(gender[g] != rowData[i][1])
            continue;

          table.row.add([ 
            counter++, rowData[i][0], rowData[i][1], 
            rowData[i][2], rowData[i][3], rowData[i][4]
          ]);    
        }
      }

      table.draw();
    },
    validateDateRange([startDate, endDate]) {
      if (!(startDate && endDate) || startDate === 'Invalid date' || endDate === 'Invalid date') {
        this.$bvToast.toast('Please select a start date and an end date', {title: 'Error', variant: 'warning'});
        return false;
      } else if (moment(startDate).isAfter(endDate)) {
        this.$bvToast.toast('Start date can not be less than end date', {title: 'Error', variant: 'warning'});
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initReportingGroups();
      this.initDataTable();
    });
  }, data: function() {
      return {
        report_title: 'TX CURR MMD ',
        reportData: null,
        dTable: null,
        startDate: null,
        endDate: null,
        rowCounter: 1,
        column_3: {},
        column_4: {},
        column_5: {},
        tableRows: [],
        selectedAgeGroup:  null,
        selectedGender: null,
        reportingGroups: [],
        reportLoading: false,
        APIVersion: sessionStorage.APIVersion,
        EMCVersion: sessionStorage.EMCVersion,
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

.alert-info {
  width: 98%;
  margin: 10px;
  text-align: left;
}

.modal-content {
  width: 90vh;
}
</style>


<style>
.center-text {
    text-align: right;
    margin-right: 5px;
}

.show-btn {
  font-size: 14px;
}
</style>
