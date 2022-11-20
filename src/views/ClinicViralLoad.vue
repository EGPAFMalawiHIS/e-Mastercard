<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <div id="main-container" class="col-12 table-col">
        <span
          >{{ report_title
          }}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span
        >

        <b-row>
          <b-col>
            <div class="form-group">
              <label for="resultType">Result Type</label>
              <select class="form-control" id="resultType" v-model="resultType">
                <option value="viraemia-1000">Viraemia 1000+</option>
                <option value="suppressed">Suppressed</option>
                <option value="low-level-viraemia">Low level viraemia</option>
              </select>
            </div>
          </b-col>
          <b-col>
            <sdPicker :onSubmit="fetchDates"></sdPicker>
          </b-col>
        </b-row>
        <table class="table table-striped report" id="cohort-clients">
          <thead>
            <tr>
              <th scope="col">ARV number</th>
              <th class="center-text" scope="col">Gender</th>
              <th class="center-text" scope="col">Birthdate</th>
              <th class="center-text" scope="col">Specimen</th>
              <th class="center-text" scope="col">Ordered</th>
              <th class="center-text" scope="col">Result</th>
              <th class="center-text" scope="col">Released</th>
              <th class="center-text" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="reportData">
              <tr v-for="(patient, index) in reportData" :key="index">
                <td>{{ patient.arv_number }}</td>
                <td class="center-text">{{ formatGender(patient.gender) }}</td>
                <td class="center-text">{{ localDate(patient.birthdate)}}</td>
                <td>{{ patient.specimen }}</td>
                <td>{{ localDate(patient.order_date) }}</td>
                <td>{{ patient.result_modifier + ' ' + patient.result }}</td>
                <td>{{ localDate(patient.result_date) }}</td>
                <td>
                  <b-button
                    variant="primary"
                    @click="$router.push(`/patient/mastercard/${patient.patient_id}`)"
                    >show</b-button
                  >
                </td>
              </tr>
            </template>
            <tr v-else>
              <td style="width: 100%; height: 450px; text-align: center; vertical-align: middle;" colspan="8">
                No report is selected
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Date Created: {{ moment().format("YYYY-MM-DD h:m:s") + "\n"}} <br>
                Quarter: {{ period }} <br>
                e-Mastercard Version : {{ EMCVersion }} <br>
                API Version: {{ APIVersion }} <br>
                Site UUID: {{ siteUUID }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css");
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import jQuery from "jquery";
import { formatGender } from "../utils/str";
import date_utils from "../services/date_utils";
require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js");
import ReportService from '../services/report_service';

export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
  },
  methods: {
    fetchDates: async function (dates) {
      if(!this.resultType || !dates.length) return
      const report = new ReportService();
      report.setStartDate(dates[0])
      report.setEndDate(dates[1])
      this.period = report.getDateIntervalPeriod();
      this.report_title += this.period + ` (result type: ${this.resultType})`;
      this.reportLoading = true;
      this.reportData = await report.getViralLoadResults(this.resultType);
      this.reportLoading = false;
      this.reportSelected = true;
      setTimeout(() => this.initDataTable(), 400);
    },
    initDataTable() {
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[0, "asc"]],
        fixedHeader: true,
        dom: "Bfrtip",
        retrieve: true,
        buttons: [
          {
            extend: "copy",
            title: this.report_title,
          },
          {
            extend: "csv",
            title: this.report_title,
            footer: true,
          },
          {
            extend: "pdf",
            title: this.report_title,
          },
          {
            extend: "print",
            title: this.report_title,
          },
        ],
      });
    },
  },
  mounted() {},
  computed: {
    hideReport() {
      return this.reportLoading || !this.reportSelected;
    },
  },
  data: function () {
    return {
      report_title: "Clinic Viral Load Report ",
      reportData: null,
      dTable: null,
      period: null,
      resultType: null,
      reportSelected: false,
      reportLoading: false,
      formatedData: [],
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      siteUUID: sessionStorage.siteUUID,
      localDate: date_utils.isoDate,
      formatGender: formatGender,
    };
  },
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
