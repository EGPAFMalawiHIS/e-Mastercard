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
                        Quarter: {{startDate}} to {{endDate}}
                        Site UUID: {{siteUUID}}
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
  },
  methods: {
    fetchDates(dates) {
      if (!this.validateDateRange(dates)) return;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportLoading = true;
      this.report_title = 'MoH ' + sessionStorage.location_name + ' TX CURR MMD report ';
      this.report_title += moment(dates[0]).format('DDMMMYYYY');
      this.report_title += " - " + moment(dates[1]).format('DDMMMYYYY');
      this.initReportingGroups();
      this.fetchData();
    },
    fetchData: async function() {
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
      url_path += "&end_date=" + this.endDate + "&program_id=1&org=moh";
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
        '<1 year',
        '1-4 years', 
        '5-9 years', 
        '10-14 years', 
        '15-19 years', 
        '20-24 years', 
        '25-29 years', 
        '30-34 years', 
        '35-39 years', 
        '40-44 years', 
        '45-49 years', 
        '50-54 years',
        '55-59 years',
        '60-64 years',
        '65-69 years',
        '70-74 years',
        '75-79 years',
        '80-84 years',
        '85-89 years',
        '90 plus years'
      ];
      this.tableRows = [];
    },
    getValue (data, gender, comperator) {
      return Object.entries(data[gender])
        .filter(([_id, {prescribed_days}]) => comperator(prescribed_days))
        .map(([id, _details]) => id)
    },
    addRow(data){
      ["Female", "Male"].forEach(gender => this.tableRows.push({
        gender,
        age_group: this.reportingGroups[0],
        less_3_mo: gender in data ? this.getValue(data, gender, (month) => month < 90) : [],
        between_3_5_mo: gender in data ? this.getValue(data, gender, (month) => month >= 90 && month <= 150) : [],
        above_5_mo: gender in data ? this.getValue(data, gender, (month) => month > 150) : []
      }))
      this.reportingGroups.shift();
    },
    setMinMaxAges(group){
      const valueTokens = group.split(' ')

      const [valueRange] = valueTokens

      if (valueRange === '<1') return [0, 0]

      if (valueTokens.includes('plus')) {
        return [parseInt(valueRange), 100000]
      }

      const [min, max] = valueRange.split('-').map(i => parseInt(i))

      return min && max ? [min, max] : undefined
    },
    buildTotalMalesRow () {
      return [41, "All", "Male"].concat(this.tableRows.reduce((acc, curr) => {
        if(curr.gender === "Female") return acc;
        return [
          acc[0] + curr.less_3_mo.length,
          acc[1] + curr.between_3_5_mo.length,
          acc[2] + curr.above_5_mo.length
        ]
      }, [0, 0, 0]))
    },
    async getMaternalStatus(patientIds) {
      let url = "vl_maternal_status?&program_id=1"
      url += "&start_date=" + this.startDate
      url += '&end_date=' + this.endDate
      url += '&date=' + moment().format("YYYY-MM-DD")
      url += '&report_definition=pepfar'
      return ApiClient.post(url, { 'patient_ids': patientIds })
        .then(response => response.json())
    },
    reducer(column, gender){
      return this.tableRows.reduce((acc, curr) => curr.gender === gender ? acc.concat(curr[column]) : acc, [])
    },
    async buildAllFemaleRows(){
      const columns = ['less_3_mo', 'between_3_5_mo', 'above_5_mo']
      const categories = ['FP', 'FNP', 'FBf']
      const allFemales = columns.map(column => this.reducer(column, 'Female'))
        .reduce((a, c) => a.concat(c), [])
        .filter((value, index, self) => self.indexOf(value) === index)
      const maternalStatus = await this.getMaternalStatus(allFemales)
      const allFp = maternalStatus.FBf.concat(maternalStatus.FP)

      const buildColumn = (column, category) => this.reducer(column, "Female").filter((id) => (category === 'FNP') 
        ? !allFp.includes(id)
        : maternalStatus[category].includes(id)
      ).length

      let index = 42;
      const rows = [];
      for (const category of categories) {
        const row = [index++, category, "All"]
        columns.forEach(column => row.push(buildColumn(column, category)))
        rows.push(row)
      }
      return rows;
    },
    async renderTable() {
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
      this.tableRows
        .sort((row1, row2) => row1.gender > row2.gender ? 1 : -1)
        .forEach((row, index) => table.row.add([
          index + 1,
          row.age_group,
          row.gender,
          row.less_3_mo.length,
          row.between_3_5_mo.length,
          row.above_5_mo.length
        ]))
      table.row.add(this.buildTotalMalesRow())
      const femaleTotals = await this.buildAllFemaleRows()
      femaleTotals.forEach(row => table.row.add(row))
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
        siteUUID: sessionStorage.siteUUID,
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
