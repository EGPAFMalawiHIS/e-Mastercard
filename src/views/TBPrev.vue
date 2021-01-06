<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->

        <div id="main-container" class="col-12 table-col">
          <div class="row">
            <div class="col-sm-12">
              <!--span><button @click="$router.go(-1)" class="btn btn-primary">Back</button></span--> 

              <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
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
                      <th class="center-text" scope="col">Started New on ART</th>
                      <th class="center-text" scope="col">Started Previously on ART</th>
                      <th class="center-text" scope="col">Completed New on ART</th>
                      <th class="center-text" scope="col">Completed Previously on ART</th>
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


      this.report_title = 'PEPFAR ' + sessionStorage.location_name + ' TB PREV report ';
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
      
      let url_path = 'tb_prev?start_date=' + this.startDate + "&date=" + moment().format('YYYY-MM-DD');
      url_path += "&end_date=" + this.endDate + "&program_id=1";

      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.addRow(data) );
        // setTimeout(() => this.fetchData(), 500);
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
          {"className": "center-text", "targets": 5},
          {"className": "center-text", "targets": 6}
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
      var reporting_data = {}
      var age_groups = this.initReportingGroups();
      var genders = ["M","F"];

      for(var patient_id in data){
        var info  = data[patient_id];
        var group = info.age_group;
        var sex = info.gender;
        var client_type = info.client;
        var  outcome = info.outcome;

        if(reporting_data[group] == undefined)
          reporting_data[group]  = {};

        if(reporting_data[group][sex] == undefined) {
          reporting_data[group][sex]  = {
            new: [], old: [], art: [], defaulter: [], died: [],
            stopped: [], transfer_out: [], unknown: [], 
            new_initiated: [], old_initiated: []
          };
        }

        if(client_type == 'New on ART' && info.course_completed)
          reporting_data[group][sex].new.push(patient_id);

        if(client_type == 'Previously on ART' &&  info.course_completed)
          reporting_data[group][sex].old.push(patient_id);

        if(client_type == 'New on ART'){
          reporting_data[group][sex].new_initiated.push(patient_id);
        }else{
          reporting_data[group][sex].old_initiated.push(patient_id);
        }
      }
      this.repData =  reporting_data;
      this.renderResults();

    },
    renderResults(){
     const data_table = jQuery('#cohort-clients').DataTable();
      data_table.clear();

      const buttons = ['copy', 'csv', 'pdf', 'print'];

      buttons.forEach(() => data_table.button().remove());

      buttons.forEach((method, i) => {
        data_table.button().add(i, {
          extend: method,
          title: this.report_title,
          footer: true
        });
      });
    var  counter = 1;
    var age_groups = this.reportingGroups;
    var genders = ["F","M"];

    for(var g = 0; g < genders.length; g++){
      for(var i = 0; i < age_groups.length; i++){
        try {
          var info = this.repData[age_groups[i]][genders[g]];
        }catch(e){
          var info;
        }

        if(info == undefined){
          data_table.row.add([ counter++, age_groups[i], genders[g], 0, 0, 0,  0 ]).draw();
          continue;
        }else{
          data_table.row.add([ counter++, age_groups[i], genders[g], 
            this.setDrillClients(age_groups[i], genders[g], info.new_initiated, 1),
            this.setDrillClients(age_groups[i], genders[g], info.old_initiated, 2),
            this.setDrillClients(age_groups[i], genders[g], info.new, 3),
            this.setDrillClients(age_groups[i], genders[g], info.old, 4)
            ]).draw();
          info = undefined;
        }

      }
    }

        this.reportLoading = false;
},
setDrillClients(age_group, sex, patient_ids, column_number){
  let clients = {};
  if(patient_ids.length < 1)
    return 0;

  if(!clients[age_group])
    clients[age_group] = {};

  if(!clients[age_group][sex])
    clients[age_group][sex] = {};

  clients[age_group][sex][column_number] = patient_ids;
  
  var html = "drillDown(" + column_number;
  html += ", '" +  sex + "','" +  age_group + "')";

  
  //a.setAttribute("href","#");

  return patient_ids.length;
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
        report_title: 'TB PREV. ',
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
        repData: {},
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
