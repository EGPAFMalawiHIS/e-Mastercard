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
        :fields="drillColumns"
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

<style scope>
</style>




<script>
// @ is an alias to /src
import ApiClient from "../services/api_client";
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { mapState } from "vuex";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS, GENDERS } from '../services/report_service';
import { exportToCSV } from "../utils/exports";
import date_utils from '../services/date_utils';
import { uniq } from '../utils/arrays'

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
    async fetchDates(dates) {
      this.rows = [];
      try {
        const report = new ReportService();
        report.setStartDate(dates[0])
        report.setEndDate(dates[1])
        this.period = report.getDateIntervalPeriod();
        this.reportLoading = true;
        const data = await report.getPepfarTxMLReport();
        this.reportLoading = false;
        this.buildRows(data);
        this.buildTotalMalesRow(data);
        await this.buildMaternityRows(data, report)
      } catch (e) {
        console.error(e);
        this.$router.push({ name: "error", params: { message: e.message } });
      }
    },
    fetchDrillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach((id) => this.getClient(id));
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
      toPush.dob = age ? date_utils.localDate(age) : '';
      toPush.arv_number = identifier;
      toPush.gender = formatGender(gender);
      toPush.current_village = addressl1;
      return toPush;
    },
    hasRow(age_group, gender) {
      return this.rows.filter((element) => { element.age_group === age_group && element.gender === gender } ).length > 0;
    },
    buildRows(data) {
      let counter = 1;
      for (const gender of GENDERS) {
        for (const age_group of AGE_GROUPS) {
          if (data.hasOwnProperty(age_group)) {
            let groupData = data[age_group];
            if (groupData.hasOwnProperty(gender) && !this.hasRow(age_group, gender)) {
              let numbers = groupData[gender];
              this.rows.push({
                number: counter++,
                age_group: age_group,
                gender: formatGender(gender),
                died: numbers[0],
                iit_less_than_3_mo: numbers[1],
                iit_3_to_5_mo: numbers[2],
                iit_6_plus_mo: numbers[3],
                transferred_out: numbers[4],
                refused: numbers[5]
              });
            } else {
              this.rows.push({
                age_group,
                number: counter++,
                gender: formatGender(gender),
                died: 0,
                iit_less_than_3_mo: 0,
                iit_3_to_5_mo: 0,
                iit_6_plus_mo: 0,
                transferred_out: 0,
                refused: 0
              });
            }
          } else {
            this.rows.push({
              age_group,
              number: counter++,
              gender: formatGender(gender),
              died: 0,
              iit_less_than_3_mo: 0,
              iit_3_to_5_mo: 0,
              iit_6_plus_mo: 0,
              transferred_out: 0,
              refused: 0
            });
          }
        }
      }

      this.reportLoading = false;
    },
    aggregate(data, gender, indicatorIndex){
      return Object.values(data).reduce((patients, c) => {
        return c[gender] ? [...c[gender][indicatorIndex], ...patients] : patients
      }, [])
    },
    buildTotalMalesRow(data) {
      this.rows.push({
        number: AGE_GROUPS.length * 2 + 1,
        age_group: 'All',
        gender: "Male",
        died: this.aggregate(data, 'M', 0),
        iit_less_than_3_mo: this.aggregate(data, 'M', 1),
        iit_3_to_5_mo: this.aggregate(data, 'M', 2),
        iit_6_plus_mo: this.aggregate(data, 'M', 3),
        transferred_out: this.aggregate(data, 'M', 4),
        refused: this.aggregate(data, 'M', 5)
      })
    },
    async buildMaternityRows(data, report) {
      let counter = AGE_GROUPS.length * 2 + 2;
      const indicators = [...Array(5).keys()].reduce((aggregated, index) => [
        ...aggregated, 
        { indicator: index, data: this.aggregate(data, 'F', index)}
      ], [])
      const allFemales = uniq(indicators.reduce((totals, cur) => [...totals, ...cur.data], []).map((id) => id))
      const maternalStatus = await report.getMaternalStatus(allFemales)
      const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)
      
      const groupBy = (indicator) => {
        return indicators.reduce((all, i) => i.indicator === indicator ?all.concat(i.data) : all, [])
      }

      const fP = (femaleGroup, indicator) => {
        return groupBy(indicator).filter((patient) => maternalStatus[femaleGroup].includes(patient))
      }


      const fnP = (indicator) => {
        return groupBy(indicator).filter((patient) => !allPregnant.includes(patient))
      }

      this.rows.push({
        number: counter++,
        age_group: 'All',
        gender: "FP",
        died: fP("FP", 0),
        iit_less_than_3_mo: fP("FP", 1),
        iit_3_to_5_mo: fP("FP", 2),
        iit_6_plus_mo: fP("FP", 3),
        transferred_out: fP("FP", 4),
        refused: fP("FP", 5)
      })
      this.rows.push({
        number: counter++,
        age_group: 'All',
        gender: "FNP",
        died: fnP(0),
        iit_less_than_3_mo: fnP(1),
        iit_3_to_5_mo: fnP(2),
        iit_6_plus_mo: fnP(3),
        transferred_out: fnP(4),
        refused: fnP(5)
      })
      this.rows.push({
        number: counter++,
        age_group: 'All',
        gender: "FBF",
        died: fP("FBf", 0),
        iit_less_than_3_mo: fP("FBf", 1),
        iit_3_to_5_mo: fP("FBf", 2),
        iit_6_plus_mo: fP("FBf", 3),
        transferred_out: fP("FBf", 4),
        refused: fP("FBf", 5)
      })
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, `PEPFAR TX ML report ${this.period}`, {
        startDate: this.period.split('-')[0],
        endDate: this.period.split('-')[1]
      })
    },
  },
  data: function () {
    return {
      drillClients: [],
      perPage: 15,
      currentPage: 1,
      drillColumns: [
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
      slots: [
        "died",
        "iit_less_than_3_mo",
        "iit_3_to_5_mo",
        "iit_6_plus_mo",
        "transferred_out",
        "refused",
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
          label: "Died",
          name: "died",
          slot_name: "died",
          sort: true,
        },
        {
          label: "IIT <3 mo",
          name: "iit_less_than_3_mo",
          slot_name: "iit_less_than_3_mo",
          sort: true,
        },
        {
          label: "IIT 3-5 mo",
          name: "iit_3_to_5_mo",
          slot_name: "iit_3_to_5_mo",
          sort: true,
        },
        {
          label: "IIT 6+ mo",
          name: "iit_6_plus_mo",
          slot_name: "iit_6_plus_mo",
          sort: true,
        },
        {
          label: "Transferred out",
          name: "transferred_out",
          slot_name: "transferred_out",
          sort: true,
        },
        {
          label: "Refused (Stopped)",
          name: "refused",
          slot_name: "refused",
          sort: true,
        },
      ],
      config: {
        card_title:
          "TX ML: Clients that were Alive and on treatment before the reporting period and their “next appointment date / drug runout” date falls within the reporting period. 30 or more days have gone between their appointment date and the end of the reporting period without any clinical dispensation visit.",
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
  mounted() {},
};
</script>

<style scoped>
.drillable {
  color: blue;
  text-decoration: underline;
}
</style>