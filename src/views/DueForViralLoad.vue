<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-md-12">
            <sdPicker :onSubmit="fetchDates"></sdPicker>
          </div>
        </div>

        <report-overlay :reportLoading="reportLoading">
        <vue-bootstrap4-table
          :rows="rows"
          :columns="columns"
          :config="config"
          :show-loader="showLoader"
					:actions="actions"
          @redirect="onRedirect"
					@on-download="onDownload"
        >
          <template slot="patient_id" slot-scope="props">
            <button
              type="button"
              class="btn btn-primary"
              @click="redirect('/patient/mastercard/' + props.cell_value)"
            >
              select
            </button>
          </template>
        </vue-bootstrap4-table>
        <tfoot>
              <tr>
                <td>
                  Date Created:  {{moment().format('YYYY-MM-DD:h:m:s')}} 
                  e-Mastercard Version : {{EMCVersion}} 
                  API Version {{APIVersion}}
                </td>
              </tr>
            </tfoot>
        </report-overlay>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiClient from "../services/api_client";
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import DateUtils from "../services/date_utils";
import TopNav from "@/components/topNav.vue";

import VueBootstrap4Table from "vue-bootstrap4-table";

import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "txML",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
    VueBootstrap4Table,
  },
  methods: {
    redirect: function (url) {
      this.$router.push(url);
    },
    onRedirect: function (url) {
      this.$router.push(url.event_payload.url);
    },
    initRows: function () {
      this.rows = [];
    },
    async fetchDates(dates) {
      this.reportLoading = true;
      this.initRows();
      let group;
      let min_age;
      let max_age;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportTitle =
        "PEPFAR " +
        sessionStorage.location_name +
        " Clients Due for Viral Load ";
      this.reportTitle += moment(dates[0]).format("DDMMMYYYY");
      this.reportTitle += " - " + moment(dates[1]).format("DDMMMYYYY");
      this.reportLoading = true;

      let url_path = "clients_due_vl?date=" + moment().format("YYYY-MM-DD");
      url_path += "&start_date=" + this.startDate;
      url_path += "&end_date=" + this.endDate;
      url_path += "&program_id=1";

      this.loadData(url_path);
    },
    async loadData(url) {
      await ApiClient.get(url, {}, {}).then((res) => {
        res.json().then((f) => {
          console.log(f);
          if (Object.keys(f).length === 0) return (this.reportLoading = false);
          this.buildReportData(f);
        });
      });
    },

    buildReportData(data) {
			let rowCount = 0
			this.rows = data.map(patient => {
				rowCount += 1
				const { arv_number, given_name, family_name, gender, birthdate, appointment_date, months_on_art, mile_stone, patient_id } = patient
				return {
					rowCount,
					arv_number,
					given_name,
					family_name,
					gender,
					birthdate,
					appointment_date,
					months_on_art,
					mile_stone,
					patient_id
				}
			})
      this.reportLoading = false;
    },
    onDownload() {
      let y = null;
      this.columns.forEach((element) => {
        y += `"${element.label}",`;
      });
      y = y.replace("null", "");
      this.rows.forEach((element) => {
        y += "\n";
        Object.keys(element).forEach((innerElement) => {
          let value = element[innerElement];
          if (Array.isArray(element[innerElement])) {
            value = element[innerElement].length;
          }
          y += `"${value}",`;
        });
      });

      y += "\n";
      y += `Date Created:  ${moment().format("YYYY-MM-DD:h:m:s")} 
                          e-Mastercard Version : ${sessionStorage.EMCVersion} 
                          API Version ${sessionStorage.APIVersion}`;
      for (let index = 0; index < 34; index++) {
        y += ",";
      }
      var csvData = new Blob([y], { type: "text/csv;charset=utf-8;" });
      //IE11 & Edge
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
      } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute("download", `${this.reportTitle}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  },
  data: function () {
    return {
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      rows: [],
      columns: [
				{
          label: "#",
          name: "rowCount",
          slot_name: "rowCount",
          sort: true,
        },
        {
          label: "ARV#",
          name: "arv_number",
          slot_name: "arv_number",
          sort: false,
        },
        {
          label: "First Name",
          name: "given_name",

          sort: false,
        },
        {
          label: "Last Name",
          name: "family_name",
          sort: false,
        },
        {
          label: "Gender",
          name: "gender",
          sort: false,
        },
        {
          label: "Birthdate",
          name: "birthdate",
          sort: false,
        },
        {
          label: "App Date",
          name: "appointment_date",
          sort: false,
        },
        {
          label: "Months on ART",
          name: "months_on_art",
          sort: false,
        },
        {
          label: "Milestone",
          name: "mile_stone",
          sort: false,
        },
        {
          label: "Action",
          name: "patient_id",
          slot_name: "patient_id",
        },
      ],
      config: {
        card_title: `Clients Due for Viral Load`,
        show_refresh_button: false,
        show_reset_button: false,
      },
			actions: [
        {
          btn_text: "CSV",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
        },
      ],
      startDate: null,
      endDate: null,
      reportLoading: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      reportTitle: null,
      showLoader: false,
    };
  },
  computed: {
    ...mapState(["location"]),
    rowCount() {
      return this.drillClients.length;
    },
  },
  mounted() {
    this.initRows();
  },
};
</script>

<style scoped>
.drillable {
  color: blue;
  text-decoration: underline;
}
</style>