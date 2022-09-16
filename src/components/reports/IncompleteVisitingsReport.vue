<template>
  <!-- Page Content -->
  <div id="main-container" class="col-12 table-col">
    <span>
      {{report_title}}
      <button @click="$router.go(-1)" class="btn btn-primary">Back</button>
    </span>
    <div class="row">
      <div class="col-md-12" style="z-index: 30">
        <div class="form-group">
          <sdPicker :onSubmit="fetchDates"></sdPicker>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ReportOverlay :reportLoading="reportLoading" :reportSelected="reportSelected">
          <table class="table table-striped report" id="cohort-clients">
            <thead>
              <tr>
                <th>#</th>
                <th class="disaggregated-numbers">ARV#</th>
                <th class="disaggregated-numbers">NHID</th>
                <th class="disaggregated-numbers">First name</th>
                <th class="disaggregated-numbers">Last name</th>
                <th class="disaggregated-numbers">Gender</th>
                <th class="disaggregated-numbers">Birthdate</th>
                <th class="disaggregated-numbers">Date(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in missingAppointmentReport" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>{{item.arv_number}}</td>
                <td>{{item.national_id}}</td>
                <td>{{item.given_name}}</td>
                <td>{{item.family_name}}</td>
                <td>{{ formatGender(item.gender) }}</td>
                <td>{{item.birthdate}}</td>
                <td>{{item.dates.join(", ")}}</td>
              </tr>
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
        </ReportOverlay>
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
require("@/assets/datatable/css/fixedColumns.dataTables.min.css");

import ApiClient from "../../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import jQuery from "jquery";
import datatable from "datatables";
import ReportOverlay from "./ReportOverlay";
import { formatGender } from "../../utils/str";

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
    sdPicker: StartAndEndDatePicker,
    ReportOverlay
  },
  data: function() {
    return {
      report_title: "Viral Load Report ",
      reportData: null,
      dTable: null,
      formatedData: [],
      rebuildOutcome: true,
      startDate: null,
      padding: false,
      endDate: null,
      minViralLoad: null,
      maxViralLoad: null,
      missingAppointmentReport: {},
      viralLoadReport: {},
      reportLoading: false,
      reportSelected: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
    };
  },
  methods: {
    async fetchDates(dates) {
      try {
        [this.startDate, this.endDate] = dates;

        const isValidDate = date => date && date !== "Invalid date";

        if (!(isValidDate(this.startDate) && isValidDate(this.endDate))) return;

        this.reportLoading = true;
        this.reportSelected = true;
        await this.fetchReport(dates);
        //await this.initializeReport();
      } catch (e) {
        this.$router.push({ name: "error", params: { message: e.message } });
      } finally {
        this.reportLoading = false;
      }
    },
    initDataTable() {
      let start_date = moment(this.startDate).format("DD/MMM/YYYY");
      let end_date = moment(this.endDate).format("DD/MMM/YYYY");
      this.report_title = sessionStorage.location_name + " Incomplete Visits Report. ";

      if (!start_date == "Invalid date") {
        this.report_title += " Reporting  period: " + start_date;
        this.report_title += " " + end_date;
      }

      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[0, "asc"]],
        fixedHeader: true,
        searching: false,
        paging: true,
        Processing: true,
        ServerSide: false,
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
            title: this.report_title,
            footer: true
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

      const URL = `incomplete_visits?program_id=1&start_date=${startDate}&end_date=${endDate}&tool_name=INCOMPLETE VISITS`;

      let btns = document.getElementsByClassName("dt-button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("disabled", true);
        btns[i].style = "display: none;";
      }

      const response = await ApiClient.get(URL, {}, {});
      if (response.status === 200) {
        response.json().then(data => {
          this.missingAppointmentReport = data;
          console.log(this.missingAppointmentReport);
          this.dTable.api().destroy();
          this.$nextTick(() => {
            this.initDataTable();
          });
        });
      }
    }
  },

  mounted() {
    setTimeout(() => this.initDataTable(), 300);
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
