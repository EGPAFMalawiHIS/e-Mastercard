<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->
        <div class="cohort">
          <report-date-picker :onSubmit="fetchData"></report-date-picker>
        </div>

        <div style="width:100%; text-align: right; margin-top: 25px;">
            <select ref="subgroup" v-model="subgroup">
                <option>Select sub group</option>
                <option value="General">General</option>
                <option value="Children">Children</option>
                <option value="Women">Option B+</option>
            </select>
        </div>
        <report-overlay :reportLoading="reportLoading" :reportSelected="reportSelected">
          <table id="example" class="display" width="100%">
              <thead>
                <tr>
                  <th>Reg cohort</th>
                  <th>Interval (months)</th>
                  <th>Sub group</th>
                  <th class="disaggregated-numbers">Total Reg (database)</th>
                  <th class="disaggregated-numbers">Total Reg (confirmed)</th>
                  <th class="disaggregated-numbers count-separator">Alive</th>
                  <th class="disaggregated-numbers">Died</th>
                  <th class="disaggregated-numbers">Defaulted</th>
                  <th class="disaggregated-numbers">Stopped</th>
                  <th class="disaggregated-numbers">TO</th>
                  <th class="disaggregated-numbers">Unknown</th>
                </tr>
              </thead>
              <tbody id="table-body">
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

        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src
import ReportOverlay from "../components/reports/ReportOverlay";
import reportDatePicker from '@/components/reportDatePicker.vue';
import Sidebar from "@/components/SideBar.vue";
import TopNav from "@/components/topNav.vue";
import { mapState } from "vuex";

import moment from 'moment'
import ApiClient from "../services/api_client";


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
require("@/assets/datatable/js/buttons.print.min.js");



export default {
  name: "reports",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    async fetchData (report_parameters) {
      try {
        if(!report_parameters)
          return;

        this.reportQtr = report_parameters[0];
        this.regenerateReport = report_parameters[1];
        if(this.reportQtr == 'Select cohort quarter')
          return;

        if(this.$refs.subgroup.value == 'Select sub group')
          return;

        this.reportLoading = true;
        this.reportSelected = true;
        await this.fetchSurvivalAnalysisData();
      } finally {
        this.reportLoading = false;
      }

    },
    fetchSurvivalAnalysisData: async function(){
      let url = 'cohort_survival_analysis?date=' + moment().format('YYYY-MM-DD');
      url += "&quarter=" + this.reportQtr;
      url += "&age_group=" + this.$refs.subgroup.value + '&program_id=1';

      if(this.regenerateReport == true){
        this.regenerateReport = false;
        url += '&regenerate=true';
      }else{ 
        url += '&regenerate=false';
      }

      console.log(url)
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        this.loadData(await response.json(), this.$refs.subgroup.value);
      }else{
        //code
      }
    },loadData(data, age_group) {
      this.initDataTable();
      this.dTable.fnClearTable();
      for(let qtr in data) {
        let row_id = (qtr.split(' ')[1]);
        let outcome = data[qtr];
        let set_quarter = qtr;
        let qinterval = '';
        let alive = 0;
        let died = 0;
        let defaulted = 0;
        let stopped = 0;
        let to = 0;
        let unknown = 0;
        let total_reg = 0;

        for(let c in outcome) {
          let interval = outcome[c]
          for(let i in interval) {
            qinterval = i
            if(c == 'On antiretrovirals') {
              alive = outcome[c][i];
            }else if(c == 'Defaulted'){
              defaulted = outcome[c][i];
            }else if(c == 'Patient died'){
              died = outcome[c][i];
            }else if(c == 'Stopped'){
              stopped = outcome[c][i];
            }else if(c == 'Patient transferred out'){
              to = outcome[c][i];
            }else{
              unknown = outcome[c][i]
            }

            total_reg += outcome[c][i];
          }
        }

        if(total_reg > 0) {
          let row = this.dTable.fnAddData([set_quarter, qinterval, age_group, total_reg,
            '', alive, died, defaulted, stopped, to, unknown]);
          //.node().id = row_id;
          //this.dTable.draw();
          //addClass(row_id);
        }
      }
    },
    addClass(id) {
      var tr = document.getElementById(id);
      var cells = tr.getElementsByTagName('td');
      cells[5].setAttribute('class','count-separator');
    },
    initDataTable(){
      this.dTable = jQuery("#example").dataTable({
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
            title:  this.reportTitle,
            footer: true
          },
          {
            extend: 'pdf',
            title:  this.reportTitle
          },
          {
            extend: 'print',
            title:  this.reportTitle
          }
        ],
        columnDefs: [
          {"className": "dt-center", "targets": 4}
        ]
      });
    }
  },
  data () {
    return {
      reportQtr: [],
      regenerateReport: false,
      reportData: null,
      reportID: null,
      reportLoading: false,
      reportSelected: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      subgroup: "Select sub group"
    }
  },
  computed: {
    ...mapState(['location']),
    getSubGroup() {
    },
    reportTitle() {
      return `MOH ${this.location.name} cohort report (Survival analysis) ${this.subgroup}`;
    }
  },
  mounted(){
  }
}


</Script>

<style scoped>
#example {
  text-align: center;
  margin-top: 20px;  
  border-top-style: solid;
  border-top-width: 1px;;
}

.disaggregated-numbers {
  text-align: right;
  padding-right: 10px;
}

#spinner {
  position: absolute;
  top: 15%;
  left: 40%;
}

#report-cover {
  position: absolute;
  background-color: black;
  width: 100%;
  height: 102%;
  left: 0%;
  top: 0%;
  z-index: 990;
  opacity: 0.65;
}

.title-table {
  display: table;
  width: 100%;
}

.title-row {
  display: table-row;
}

.title-cell {
  display: table-cell;
  height: 30px;
  vertical-align: top;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
}


#title-cell-left {
  vertical-align: middle;
  width: 100px;
}

#title-cell-left img {
  height: 95px;
  width: 95px;
  margin: 5px;
}

#title-cell-right {
  margin-left: 5px;
}

#data-cell {
  display: table-cell;
  width: 100%;
}

#report {
  width: 100%;
}

th {
  text-align: left;
}
</style>

<style>
.dt-center {
  border-right-style: solid;
  border-right-width: 5px;
}
</style>