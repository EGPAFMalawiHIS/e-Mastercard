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
    <b-modal id="modal-1" :title="`Drill Down Clients`" size="xl">
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
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import moment from "moment";
import { mapState } from "vuex";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS, GENDERS } from "../services/report_service";
import { uniq } from '../utils/arrays'
import HisDate from '../services/date_utils';

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
        AGE_GROUPS.forEach((age_group) => {
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
      this.buildTotalMalesRow(data);
      await this.buildMaternityRows(data, report)
    },
    aggregate(data, gender, tptType, indicator) {
      return Object.values(data).reduce((patients, curr) => {
        return patients.concat(curr[gender][tptType][indicator])
      }, [])
    },
    buildReportRows(data) {
      this.rows = [];
      let number = 1;
      GENDERS.forEach((gender) => {
        AGE_GROUPS.forEach((age_group, index) => {
          const constantsData = data[age_group][gender];
          this.rows.push({
            number: number++,
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
    buildTotalMalesRow(data){
      this.rows.push({
        number: AGE_GROUPS.length * 2 + 1,
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
    async buildMaternityRows(data, report) {
      let number = AGE_GROUPS.length * 2 + 2;
      const indicators = [
        'started_new_on_art',
        'started_previously_on_art',
        'completed_new_on_art',
        'completed_previously_on_art'
      ].reduce((aggregated, indicator) => [
        ...aggregated,
        { tpt: '3HP', indicator, patients: this.aggregate(data, 'F', '3HP', indicator) },
        { tpt: '6H', indicator, patients: this.aggregate(data, 'F', '6H', indicator) }
      ], [])

      const allFemales = uniq(indicators.reduce((totals, cur) => totals.concat(cur.patients), []).map(p => p.patient_id)) 
      const maternalStatus = await report.getMaternalStatus(allFemales)
      const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)

      const groupBy = (indicator, tpt) => indicators.reduce((all, i) => {
        return i.indicator === indicator && tpt === i.tpt ? all.concat(i.patients) : all
      }, [])

      const fP = (femaleGroup, tpt, indicator) => {
        return groupBy(indicator, tpt).filter((patient) => maternalStatus[femaleGroup].includes(patient.patient_id))
      }

      const fnP = (tpt, indicator) => {
        return groupBy(indicator, tpt).filter((patient) => !allPregnant.includes(patient.patient_id))
      }

      this.rows.push({
        number: number++,
        age_group: 'All',
        gender: "FP",
        new_three_p_h: fP('FP', "3HP", "started_new_on_art"),
        new_six_h: fP('FP', "6H", "started_new_on_art"),
        prev_three_p_h: fP('FP', "3HP", "started_previously_on_art"),
        prev_six_h: fP('FP', "6H", "started_previously_on_art"),
        comp_new_three_h: fP('FP', "3HP", "completed_new_on_art"),
        comp_new_six_h: fP('FP', "6H", "completed_new_on_art"),
        comp_prev_three_p_h: fP('FP', "3HP", "completed_previously_on_art"),
        comp_prev_six_h: fP('FP', "6H", "completed_previously_on_art"),
      })

      this.rows.push({
        number: number++,
        age_group: 'All',
        gender: "FNP",
        new_three_p_h: fnP("3HP", "started_new_on_art"),
        new_six_h: fnP("6H", "started_new_on_art"),
        prev_three_p_h: fnP("3HP", "started_previously_on_art"),
        prev_six_h: fnP("6H", "started_previously_on_art"),
        comp_new_three_h: fnP("3HP", "completed_new_on_art"),
        comp_new_six_h: fnP("6H", "completed_new_on_art"),
        comp_prev_three_p_h: fnP("3HP", "completed_previously_on_art"),
        comp_prev_six_h: fnP("6H", "completed_previously_on_art"),
      })

      this.rows.push({
        number: number++,
        age_group: 'All',
        gender: "FBF",
        new_three_p_h: fP('FBf', "3HP", "started_new_on_art"),
        new_six_h: fP('FBf', "6H", "started_new_on_art"),
        prev_three_p_h: fP('FBf', "3HP", "started_previously_on_art"),
        prev_six_h: fP('FBf', "6H", "started_previously_on_art"),
        comp_new_three_h: fP('FBf', "3HP", "completed_new_on_art"),
        comp_new_six_h: fP('FBf', "6H", "completed_new_on_art"),
        comp_prev_three_p_h: fP('FBf', "3HP", "completed_previously_on_art"),
        comp_prev_six_h: fP('FBf', "6H", "completed_previously_on_art"),
      })
    },
    fetchDrillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = clients.map(c => ({
          arv_number: c.arv_number,
          birthdate: HisDate.localDate(c.birthdate),
          gender: formatGender(c.gender),
          tpt_initiation_date: HisDate.localDate(c.tpt_initiation_date),
          outcome: c.outcome
        }))
      }
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
          key: "Birthdate",
          label: "Birthdate",
        },
        {
          key: "gender",
          label: "Gender",
        },
        {
          key: "tpt_initiation_date",
          label: "TPT Initiation Date",
        },
        {
          key: "outcome",
          label: "Outcome",
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