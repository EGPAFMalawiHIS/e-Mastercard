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
          </table>


        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";

import reportDatePicker from '@/components/reportDatePicker.vue';
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
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    fetchData: async function(report_parameters) {
      if(!report_parameters)
        return;

      let qtr = report_parameters[0];
      let regenerate = report_parameters[1];
      if(qtr == 'Select cohort quarter')
        return;

      const response = await ApiClient.get("programs/1/reports/cohort?name=" + qtr + "&regenerate=" + regenerate, {}, {});

      if (response.status === 200) {
        //response.json.then(function(data) { this.checkResult(data.values) });
        this.reportData = qtr;
        response.json().then((data) => this.checkResult(data) );
      }else{
        console.log("We here ......" + response.status);
        setTimeout(() => this.fetchData([qtr, false]), 10000);
      }
    },
    checkResult(cohort_data){
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
        ]
      });
    }
  },
  data () {
    return {
      msg: 'MoH cohort report (Survival analysis)',
      cohortData: [],
      validationData: [],
      reportData: null,
      reportID: null
    }
  },
  mounted(){
    setTimeout(() => this.initDataTable(), 300);
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

.count-separator {
  border-style: solid;
  border-width: 0px 0px 0px 5px;
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