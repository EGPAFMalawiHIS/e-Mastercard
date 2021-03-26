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
          <template v-for="slot in slots" :slot="slot" slot-scope="props">
            <span
              @click="fetchDrillDown(props.cell_value)"
              :class="props.cell_value.length > 0 ? 'drillable' : ''"
              :key="slot"
              >{{
                props.cell_value.length > 0 ? props.cell_value.length : 0
              }}</span
            >
          </template>
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
      client_sex.forEach((element) => {
        this.ageGroups.forEach((el, index) => {
          let num = element === "Female" ? index + 1 : index + 12 + 1;
          this.rows.push({
            number: num,
            age_group: el,
            gender: element,
            new: [],
            old: [],
            new_initiated: [],
            old_initiated: [],
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
          console.log(f);
          this.addRow(f);
        });
      });
    },
    setMinMaxAges(group) {
      if (group == "<1 year") return [0, 0];

      if (group == "1-4 years") return [1, 4];

      if (group == "5-9 years") return [5, 9];

      if (group == "10-14 years") return [10, 14];

      if (group == "15-19 years") return [15, 19];

      if (group == "20-24 years") return [20, 24];

      if (group == "25-29 years") return [25, 29];

      if (group == "30-34 years") return [30, 34];

      if (group == "35-39 years") return [35, 39];

      if (group == "40-44 years") return [40, 44];

      if (group == "45-49 years") return [45, 49];

      if (group == "50 plus years") return [50, 10000];
    },

    addAll(data) {

      this.rows = this.GENDERS.map((gender, num) => {
        return ageGroups.map((group) => {
          const constantsData = data[group][gender];
          return {
            num,
            group,
            gender,
            started_new_on_art: {
              six_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc + constantsData[regimen].started_new_on_art.length);
              }, 0),

              three_p_h: this.REGIMENS.reduce((acc, curr) => {
                return (acc =
                  acc + constantsData[regimen].started_new_on_art.length);
              }, 0),
            },

            started_previously_on_art: {
              six_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc +
                  constantsData[regimen].started_previously_on_art.length);
              }, 0),

              three_p_h: this.REGIMENS.reduce((acc, curr) => {
                return (acc =
                  acc +
                  constantsData[regimen].started_previously_on_art.length);
              }, 0),
            },

            completed_new_on_art: {
              six_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc + constantsData[regimen].completed_new_on_art.length);
              }, 0),

              three_p_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc + constantsData[regimen].completed_new_on_art.length);
              }, 0),
            },

            completed_previously_on_art: {
              six_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc +
                  constantsData[regimen].completed_previously_on_art.length);
              }, 0),

              three_p_h: this.REGIMENS.reduce((acc, regimen) => {
                return (acc =
                  acc +
                  constantsData[regimen].completed_previously_on_art.length);
              }, 0), 
            },
          };
        });
      });

      this.reportLoading = false;
    },

    fetchDrillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach((element) => {
          this.getClient(element);
        });
      }
    },
    getClient: async function (id) {
      let url = "patients/" + id;

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response
          .json()
          .then((data) => this.drillClients.push(this.parsePatient(data)));
      }
    },
    parsePatient(results) {
      var age = results.person.birthdate;
      var gender = results.person.gender;
      var identifier = "";
      var patient_name =
        results.person.names[0].given_name +
        " " +
        results.person.names[0].family_name;

      var arv_number = results.patient_identifiers.filter((el) => {
        return el.identifier_type === 4 ? el.identifier : "";
      });
      try {
        var addressl1 = results.person.addresses[0].city_village;
        var addressl2 = results.person.addresses[0].address2;
        var phone_number = results.person.person_attributes[1].value;
      } catch (e) {
        var addressl1 = "";
        var addressl2 = "";
        var phone_number = "";
      }
      try {
        for (
          var index = 0;
          index < results.patient_identifiers.length;
          index++
        ) {
          if (results.patient_identifiers[index]["identifier_type"] == 4) {
            identifier = results.patient_identifiers[index]["identifier"];
          }
        }
      } catch (e) {
        console.log(e);
      }
      var toPush = {};
      toPush.dob = age;
      toPush.arv_number = identifier;
      toPush.gender = gender;
      toPush.current_village = addressl1;
      return toPush;
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

      GENDERS: ["M", "F"],
      REGIMENS: ["6H", "3PH"],
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
      ],
      showLoader: false,
      slots: ["new", "old", "new_initiated", "old_initiated"],
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
          sort: true,
        },
        {
          label: "Gender",
          name: "gender",
          sort: true,
        },
        {
          label: "3PH",
          name: "new_three_p_h",
          slot_name: "new_three_p_h",
        },
        {
          label: "6HP",
          name: "new_six_p_h",
          sort_name: "new_six_p_h",
        },
        {
          label: "3PH",
          name: "prev_three_p_h",
          sort_name: "old_three_p_h",
        },
        {
          label: "6HP",
          name: "prev_six_p_h",
          sort_name: "old_six_p_h",
        },
        {
          label: "3PH",
          name: "comp_three_p_h",
          sort_name: "old_init_three_p_h",
        },
        {
          label: "6HP",
          name: "comp_six_p_h",
          sort_name: "old_init_six_p_h",
        },
        {
          label: "Started New in ART",
          name: "new",
          slot_name: "new",
          // sort: true,
        },
        {
          label: "Started Previously on ART",
          name: "old",
          slot_name: "old",
          // sort: true,
        },
        {
          label: "Completed New on ART",
          name: "new_initiated",
          slot_name: "new_initiated",
          // sort: true,
        },
        {
          label: "Completed Previously on ART",
          name: "old_initiated",
          slot_name: "old_initiated",
          // sort: true,
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