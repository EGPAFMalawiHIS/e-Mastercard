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

        <!-- <report-overlay :reportLoading="reportLoading"> -->
        <vue-bootstrap4-table
          :rows="rows"
          :columns="columns"
          :config="config"
          :show-loader="reportLoading"
          :actions="actions"
          @on-download="onDownload"
        >
        </vue-bootstrap4-table>
        <!-- </report-overlay> -->
      </div>
    </div>
    <b-modal id="modal-1" :title="`Drill Down Clients`">
      <!-- btable  -->
      <b-table
        striped
        hover
        id="my-table"
        :items="drillClients"
        :fields="columns"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rowCount"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </b-modal>
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
    initRows: function () {
      this.rows = [];
      var client_sex = ["F", "M"];
      let num = 0
      client_sex.forEach((element) => {
        this.ageGroups.forEach((el, index) => {
          num = num + 1
          this.rows.push({
            number: num,
            age_group: el,
            gender: element,
            new_six_h: 0,
            new_three_p_h: 0,
            prev_six_h: 0,
            prev_three_p_h: 0,
            comp_new_six_h: 0,
            comp_new_three_h: 0,
            comp_prev_six_h: 0,
            comp_prev_three_p_h: 0,
          });
        });
      });
    },
    async fetchDates(dates) {
      // try {
      this.initRows();
      let group;
      let min_age;
      let max_age;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportTitle =
        "PEPFAR " + sessionStorage.location_name + " TB PREV report ";
      this.reportTitle += moment(dates[0]).format("DDMMMYYYY");
      this.reportTitle += " - " + moment(dates[1]).format("DDMMMYYYY");
      this.reportLoading = true;
      let url_path =
        "tb_prev?start_date=" +
        this.startDate +
        "&date=" +
        moment().format("YYYY-MM-DD");
      url_path += "&end_date=" + this.endDate + "&program_id=1";
      console.log(url_path);
      this.loadData(url_path);
    },
    async loadData(url) {
      await ApiClient.get(url, {}, {}).then((res) => {
        res.json().then((f) => {
          console.log(f)
          if(Object.keys(f).length === 0) return this.reportLoading = false 
          this.buildReportData(f);
        });
      });
    },

    buildReportData(data) {
      let number = 1
      this.rows = this.GENDERS.map( gender => {
        return this.ageGroups.map((age_group, index) => {
          number=+ index
          const constantsData = data[age_group][gender];
          return {
            number,
            age_group,
            gender,
            new_six_h: constantsData['6H'].started_new_on_art,
            new_three_p_h: constantsData['3PH'].started_new_on_art,
            prev_six_h: constantsData['6H'].started_previously_on_art,
            prev_three_p_h: constantsData['3PH'].started_previously_on_art,
            comp_new_six_h: constantsData['6H'].completed_new_on_art,
            comp_new_three_h: constantsData['3PH'].completed_new_on_art,
            comp_prev_six_h: constantsData['6H'].completed_previously_on_art,
            comp_prev_three_p_h: constantsData['3PH'].completed_previously_on_art,
          };
        });
      });

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
      GENDERS: ["F", "M"],
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      columns: [
        {
          key: "arv_number",
          label: "ARV Number",
        },
        {
          key: "dob",
          label: "DOB",
        },
        {
          key: "gender",
          label: "Gender",
        },
        {
          key: "current_village",
          label: "Village",
        },
      ],
      startDate: null,
      endDate: null,
      reportLoading: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      reportTitle: null,
      ageGroups: [
        "<1 year",
        "1-4 years",
        "5-9 years",
        "10-14 years",
        "15-19 years",
        "20-24 years",
        "25-29 years",
        "30-34 years",
        "35-39 years",
        "40-44 years",
        "45-49 years",
        "50 plus years",
        "Unknown"
      ],
      showLoader: false,
      slots: [
        'new_six_h',
        'new_three_p_h',
        'prev_six_h',
        'prev_three_p_h',
        'comp_new_six_h',
        'comp_new_three_h',
        'comp_prev_six_h',
        'comp_prev_three_p_h'
      ],
      rows: [],
      columns: [
        {
          label: "#",
          name: "number",
          sort: true,
        },
        {
          label: "Age Group",
          name: "age_group",
          sort: false,
        },
        {
          label: "Gender",
          name: "gender",
          sort: false,
        },
        {
          label: "3PH",
          name: "new_three_p_h",
          slot_name: "new_three_p_h",
        },
        {
          label: "6H",
          name: "new_six_h",
          sort_name: "new_six_h",
        },
        {
          label: "3PH",
          name: "prev_three_p_h",
          sort_name: "old_three_p_h",
        },
        {
          label: "6H",
          name: "prev_six_h",
          sort_name: "prev_six_h",
        },
        {
          label: "3PH",
          name: "comp_new_three_h",
          sort_name: "comp_new_three_h"
        },
        {
          label: "6H",
          name: "comp_new_six_h",
          sort_name: "comp_new_six_h",
        },
        {
          label: "3PH",
          name: "comp_prev_three_p_h",
          sort_name: "comp_prev_three_p_h"
        },
        {
          label: "6H",
          name: "comp_prev_six_h",
          sort_name: "comp_prev_six_h",
        },
      ],
      config: {
        card_title: `TB Prev`,
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