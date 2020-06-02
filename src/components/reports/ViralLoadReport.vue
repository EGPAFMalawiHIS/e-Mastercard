<template>
      <!-- Page Content -->
      <div id="main-container">
        <div class="row">
          <div class="col-sm-12" style="z-index: 30">
            <span>
              {{reportTitle}}
              <button @click="$router.go(-1)" class="btn btn-primary">Back</button>
            </span>
            <sdPicker :onSubmit="fetchDates"></sdPicker>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <ReportOverlay :reportLoading="reportLoading" :reportSelected="reportSelected">
              <table class="table table-striped report" id="cohort-clients">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Age group</th>
                    <th class="disaggregated-numbers">0P</th>
                    <th class="disaggregated-numbers">2P</th>
                    <th class="disaggregated-numbers">4P</th>
                    <th class="disaggregated-numbers">9P</th>
                    <th class="disaggregated-numbers">11P</th>
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
                  </tr>
                </thead>
                <tbody ref="tableBody"></tbody>
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

import ApiClient from "../../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import { mapState } from "vuex";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import ReportOverlay from "./ReportOverlay";

import jQuery from "jquery";
import datatable from "datatables";

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
    sdPicker: StartAndEndDatePicker
  },
  methods: {
    async fetchDates(dates) {
      try {
        [this.startDate, this.endDate] = dates;

        const isValidDate = date => date && date !== "Invalid date";

        if (!(isValidDate(this.startDate) && isValidDate(this.endDate))) return;

        this.reportLoading = true;
        this.reportSelected = true;
        await this.initializeReport();
      } catch (e) {
        this.$router.push({ name: "error", params: { message: e.message } });
      } finally {
        this.reportLoading = false;
      }
    },
    initDataTable() {
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[0, "asc"]],
        fixedHeader: true,
        searching: false,
        paging: false,
        Processing: true,
        ServerSide: true,
        scroller: {
          loadingIndicator: true
        },
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copy",
            title: this.reportTitle
          },
          {
            extend: "csv",
            title: this.reportTitle
          },
          {
            extend: "pdf",
            title: this.reportTitle
          },
          {
            extend: "print",
            title: this.reportTitle
          }
        ]
      });
    },
    addTableBody() {
      let columns = [
        "0-5 months",
        "6-11 months",
        "12-23 months",
        "2-4 years",
        "5-9 years",
        "10-14 years",
        "15-17 years",
        "18-19 years",
        "20-24 years",
        "25-29 years",
        "30-34 years",
        "35-39 years",
        "40-44 years",
        "45-49 years",
        "50 plus years"
      ];

      setTimeout(() => this.initDataTable(), 300);
    },
    initializeReport: async function() {
      
    },
    async addData(data) {

    },
  },
  data: function() {
    return {
      reportData: null,
      dTable: null,
      formatedData: [],
      rebuildOutcome: true,
      startDate: null,
      endDate: null,
      screenedTB: [],
      givenIPT: [],
      totalMales: [0, 0, 0, 0],
      totalFemales: [0, 0, 0, 0],
      fpRow: null,
      fbfRow: null,
      ageGroups: [
        "0-5 months",
        "6-11 months",
        "12-23 months",
        "2-4 years",
        "5-9 years",
        "10-14 years",
        "15-17 years",
        "18-19 years",
        "20-24 years",
        "25-29 years",
        "30-34 years",
        "35-39 years",
        "40-44 years",
        "45-49 years",
        "50 plus years"
      ].reverse(),
      reportLoading: false,
      reportSelected: false
    };
  },
  computed: {
    ...mapState(["location"]),
    reportTitle() {
      return `${this.location.name} Viral Load Report`;
    }
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
</style>
