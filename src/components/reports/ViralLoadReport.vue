<template>
  <!-- Page Content -->
  <div id="main-container" class="col-12 table-col">
    <span>
      {{report_title}}
      <button @click="$router.go(-1)" class="btn btn-primary">Back</button>
    </span>
    <sdPicker :onSubmit="fetchDates"></sdPicker>
    <table class="table table-striped report" id="cohort-clients">
      <thead>
        <tr>
          <th>#</th>
          <th>Age group</th>
          <th class="disaggregated-numbers">0A</th>
          <th class="disaggregated-numbers">2A</th>
          <th class="disaggregated-numbers">4A</th>
          <th class="disaggregated-numbers">5A</th>
          <th class="disaggregated-numbers">6A</th>
          <th class="disaggregated-numbers">7A</th>
          <th class="disaggregated-numbers">8A</th>
          <th class="disaggregated-numbers">9A</th>
          <th class="disaggregated-numbers">10A</th>
          <th class="disaggregated-numbers">11A</th>
          <th class="disaggregated-numbers">12A</th>
          <th class="disaggregated-numbers">13A</th>
          <th class="disaggregated-numbers">14A</th>
          <th class="disaggregated-numbers">15A</th>
          <th class="disaggregated-numbers">16A</th>
          <th class="disaggregated-numbers">17A</th>
          <th class="disaggregated-numbers">0P</th>
          <th class="disaggregated-numbers">2P</th>
          <th class="disaggregated-numbers">4P</th>
          <th class="disaggregated-numbers">9P</th>
          <th class="disaggregated-numbers">11P</th>
          <th class="disaggregated-numbers">14P</th>
          <th class="disaggregated-numbers">15P</th>
          <th class="disaggregated-numbers">16P</th>
          <th class="disaggregated-numbers">17P</th>
          <th class="disaggregated-numbers">Unknown</th>
        </tr>
      </thead>
      <tbody ref="tableBody">
        <tr v-for="(item, index) in viralLoadReport" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{item.age_group}}</td>
          <td>{{item.zero_a}}</td>
          <td>{{item.two_a}}</td>
          <td>{{item.four_a}}</td>
          <td>{{item.five_a}}</td>
          <td>{{item.six_a}}</td>
          <td>{{item.seven_a}}</td>
          <td>{{item.eight_a}}</td>
          <td>{{item.nine_a}}</td>
          <td>{{item.ten_a}}</td>
          <td>{{item.eleven_a}}</td>
          <td>{{item.twelve_a}}</td>
          <td>{{item.thirteen_a}}</td>
          <td>{{item.fourteen_a}}</td>
          <td>{{item.fifteen_a}}</td>
          <td>{{item.sixteen_a}}</td>
          <td>{{item.seventeen_a}}</td>
          <td>{{item.zero_p}}</td>
          <td>{{item.two_p}}</td>
          <td>{{item.four_p}}</td>
          <td>{{item.nine_p}}</td>
          <td>{{item.eleven_p}}</td>
          <td>{{item.fourteen_p}}</td>
          <td>{{item.fifteen_p}}</td>
          <td>{{item.sixteen_p}}</td>
          <td>{{item.seventeen_p}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

//require("@/assets/datatable/jquery-ui.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css");
require("@/assets/datatable/css/fixedColumns.dataTables.min.css");

import ApiClient from "../../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import jQuery from "jquery";
import datatable from "datatables";

require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js");
require("@/assets/datatable/js/dataTables.fixedHeader.min.js");

export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker
  },
  data: function() {
    return {
      report_title: "Viral Load Report ",
      reportData: null,
      dTable: null,
      formatedData: [],
      rebuildOutcome: true,
      startDate: null,
      endDate: null,
      AGE_GROUPS: [
        "0 - 1 Years",
        "2 - 4 Years",
        "5 - 9 Years",
        "10 - 14 Years",
        "15 - 17 Years",
        "18 - 19 Years",
        "20 - 24 Years",
        "25 - 29 Years",
        "30 - 34 Years",
        "35 - 39 Years",
        "40 - 44 Years",
        "45 - 50 Years",
        "50 Years +"
      ],
      viralLoadReportData: {},
      viralLoadReport: {}
    };
  },
  methods: {
    fetchDates: function(dates) {
      this.fetchReport(dates);
    },
    initDataTable() {
      let start_date = moment(this.startDate).format("DD/MMM/YYYY");
      let end_date = moment(this.endDate).format("DD/MMM/YYYY");
      this.report_title = sessionStorage.location_name + " Viral Load Report. ";

      if (!start_date == "Invalid date") {
        this.report_title += " Reporting  period: " + start_date;
        this.report_title += " " + end_date;
      }

      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[0, "asc"]],
        fixedHeader: false,
        searching: false,
        paging: false,
        Processing: false,
        ServerSide: false,
        scrollY: "50vh",
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
          leftColumns: 2,
          rightColumns: 1
        },
        scroller: {
          loadingIndicator: true
        },
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copy",
            title: this.report_title
          },
          {
            extend: "csv",
            title: this.report_title
          },
          {
            extend: "pdf",
            title: this.report_title
          },
          {
            extend: "print",
            title: this.report_title
          }
        ]
      });
    },
    fetchReport: async function(dates = {}) {
      const startDate = moment(dates[0]).format("YYYY-MM-DD");
      const endDate = moment(dates[1]).format("YYYY-MM-DD");

      const url = `programs/1/reports/vl_disaggregated?start_date=${startDate}&end_date=${endDate}&from=0&to=10000000`; // rememeber to Fix From and To

      let btns = document.getElementsByClassName("dt-button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("disabled", true);
        btns[i].style = "display: none;";
      }

      const response = await ApiClient.get(url, {}, {});
      if (response.status === 200) {
        response.json().then(data => {
          this.viralLoadReportData = data;
          console.log(this.viralLoadReportData);
          this.buildReportData();
        }); // outputing report data
      }
    },

    buildReportData() {
      this.viralLoadReport = this.AGE_GROUPS.map(ageGroup => {
        return this.viralLoadData(ageGroup);
      });
      this.initDataTable()
      console.log(this.viralLoadReport);
    },

    viralLoadData(ageGroup = {}) {
      return {
        age_group: ageGroup,
        zero_a: this.report(ageGroup, "0A") || 0,
        two_a: this.report(ageGroup, "2A") || 0,
        four_a: this.report(ageGroup, "4A") || 0,
        five_a: this.report(ageGroup, "5A") || 0,
        six_a: this.report(ageGroup, "6A") || 0,
        seven_a: this.report(ageGroup, "7A") || 0,
        eight_a: this.report(ageGroup, "8A") || 0,
        nine_a: this.report(ageGroup, "9A") || 0,
        ten_a: this.report(ageGroup, "10A") || 0,
        eleven_a: this.report(ageGroup, "11A") || 0,
        twelve_a: this.report(ageGroup, "12A") || 0,
        thirteen_a: this.report(ageGroup, "13A") || 0,
        fourteen_a: this.report(ageGroup, "14A") || 0,
        fifteen_a: this.report(ageGroup, "15A") || 0,
        sixteen_a: this.report(ageGroup, "16A") || 0,
        seventeen_a: this.report(ageGroup, "17A") || 0,
        zero_p: this.report(ageGroup, "0A") || 0,
        two_p: this.report(ageGroup, "2P") || 0,
        four_p: this.report(ageGroup, "4A") || 0,
        nine_p: this.report(ageGroup, "9A") || 0,
        eleven_p: this.report(ageGroup, "11P") || 0,
        fourteen_p: this.report(ageGroup, "14P") || 0,
        fifteen_p: this.report(ageGroup, "15P") || 0,
        sixteen_p: this.report(ageGroup, "16P") || 0,
        seventeen_p: this.report(ageGroup, "17P") || 0
      };
    },

    // return the count
    report(ageGroup, regimen) {
      if (this.viralLoadReportData[ageGroup] != undefined) {
        return this.viralLoadReportData[ageGroup][regimen];
      } else {
        return 0;
      }
    }
  },
  created() {
  }
};
</script>

<style scoped>
#main-container {
  padding-top: 10px !important;
}

span {
  text-align: left;
  float: left;
  padding-bottom: 30px;
  width: 100%;
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

/* Ensure that the demo table scrolls */
th,
td {
  white-space: nowrap;
}
div.dataTables_wrapper {
  /* width: 800px;*/
  margin: 0 auto;
}
</style>
