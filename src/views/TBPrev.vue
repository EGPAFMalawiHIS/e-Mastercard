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
            :show-loader="reportLoading"
            :actions="actions"
            @on-download="onDownload"
          >
            <template slot="sort-asc-icon">&#8593;</template>
            <template slot="sort-desc-icon">&#8595;</template>
            <template slot="no-sort-icon">&#8593;&#8595;</template>
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
          <tfoot>
            <tr>
              <td>
                Date Created:
                {{ moment().format("YYYY-MM-DD:h:m:s") }} e-Mastercard Version :
                {{ EMCVersion }} API Version {{ APIVersion }}
              </td>
            </tr>
          </tfoot>
        </report-overlay>
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
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import moment from "moment";
import { mapState } from "vuex";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS, GENDERS } from "../services/report_service";

export default {
  name: "TbPrev",
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
      let number = 0;
      GENDERS.forEach((gender) => {
        this.ageGroups.forEach((age_group) => {
          number = number + 1;
          this.rows.push({
            gender,
            number,
            age_group,
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
      this.initRows();
      const report = new ReportService();
      report.setStartDate(dates[0])
      report.setEndDate(dates[1])
      this.period = report.getDateIntervalPeriod();
      this.reportTitle = "PEPFAR " + sessionStorage.location_name + " TB PREV report ";
      this.reportTitle += this.period;
      this.reportLoading = true;
      const data = await report.getTbPrevReport();
      this.reportLoading = false;
      this.buildReportRows(data);
    },

    buildReportRows(data) {
      this.rows = [];
      GENDERS.forEach((gender) => {
        AGE_GROUPS.forEach((age_group, index) => {
          const number = gender === "F" ? index + 1 : index + 12 + 1;
          const constantsData = data[age_group][gender];
          this.rows.push({
            number,
            age_group,
            gender: formatGender(gender),
            new_three_p_h: constantsData["3HP"].started_new_on_art,
            new_six_h: constantsData["6H"].started_new_on_art,
            prev_three_p_h: constantsData["3HP"].started_previously_on_art,
            prev_six_h: constantsData["6H"].started_previously_on_art,
            comp_new_three_h: constantsData["3HP"].completed_new_on_art,
            comp_new_six_h: constantsData["6H"].completed_new_on_art,
            comp_prev_three_p_h: constantsData["3HP"].completed_previously_on_art,
            comp_prev_six_h: constantsData["6H"].completed_previously_on_art,
          });
        });
      });
      this.reportLoading = false;
    },
    aggregate(data, gender, tptType, indicator) {
      return Object.values(data).reduce((patients, curr) => {
        return patients.concat(curr[gender][tptType][indicator])
      }, [])
    },
    buildTotalMalesRow(data){
      this.rows.push({
        number: AGE_GROUPS.length,
        age_group: 'All',
        gender: "Male",
        new_three_p_h: this.aggregate(data, "M", "3HP", "started_new_on_art"),
        new_six_h: this.aggregate(data, "M", "6H", "started_new_on_art"),
        prev_three_p_h: this.aggregate(data, "M", "3HP", "started_previously_on_art"),
        prev_six_h: this.aggregate(data, "M", "6H", "started_previously_on_art"),
        comp_new_three_h: this.aggregate(data, "M", "3HP", "completed_new_on_art"),
        comp_new_six_h: this.aggregate(data, "M", "6H", "completed_new_on_art"),
        comp_prev_three_p_h: this.aggregate(data, "M", "3HP", "completed_previously_on_art"),
        comp_prev_six_h: this.aggregate(data, "M", "6H", "completed_previously_on_art"),
      })
    },
    fetchDrillDown(clients) {
      console.log(clients);
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach((element) => {
          this.getClient(element.patient_id);
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
      try {
        var addressl1 = results.person.addresses[0].city_village;
      } catch (e) {
        var addressl1 = "";
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
      toPush.gender = formatGender(gender);
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
                          Quarter: ${this.startDate} to ${this.endDate}
                          e-Mastercard Version : ${sessionStorage.EMCVersion}
                          Site UUID: ${sessionStorage.siteUUID} 
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
      period: null,
      reportLoading: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      reportTitle: null,
      showLoader: false,
      slots: [
        "new_six_h",
        "new_three_p_h",
        "prev_six_h",
        "prev_three_p_h",
        "comp_new_six_h",
        "comp_new_three_h",
        "comp_prev_six_h",
        "comp_prev_three_p_h",
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
          sort: true,
        },
        {
          label: "Gender",
          name: "gender",
          sort: true,
        },
        {
          label: "3HP(Started New on ART)",
          name: "new_three_p_h",
          slot_name: "new_three_p_h",
        },
        {
          label: "6H(Started New on ART)",
          name: "new_six_h",
          sort_name: "new_six_h",
        },
        {
          label: "3HP(Started Previously on ART)",
          name: "prev_three_p_h",
          sort_name: "old_three_p_h",
        },
        {
          label: "6H(Started Previously on ART)",
          name: "prev_six_h",
          sort_name: "prev_six_h",
        },
        {
          label: "3HP(Completed New on ART)",
          name: "comp_new_three_h",
          sort_name: "comp_new_three_h",
        },
        {
          label: "6H(Completed New on ART)",
          name: "comp_new_six_h",
          sort_name: "comp_new_six_h",
        },
        {
          label: "3HP(Completed Previously on ART)",
          name: "comp_prev_three_p_h",
          sort_name: "comp_prev_three_p_h",
        },
        {
          label: "6H(Completed Previously on ART)",
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
<style>
.my-custom-class {
  right: 500px;
}
</style>