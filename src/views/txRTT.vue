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
import { mapState } from "vuex";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS, GENDERS } from '../services/report_service';
import { exportToCSV } from "../utils/exports";
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
      this.aggregations = [];
      try {
        const report = new ReportService();
        report.setStartDate(dates[0])
        report.setEndDate(dates[1])
        this.period = report.getDateIntervalPeriod();
        this.reportLoading = true;
        const data = await report.getPepfarTxRttReport();
        this.reportLoading = false;
        this.buildRows(data);
        this.buildTotalMalesRow();
        await this.buildMaternityRows(report)
      } catch (e) {
        console.error(e);
        this.router.push({ name: "error", params: { message: e.message } });
      }
    },
    fetchDrillDown(clients) {
      console.log(clients)
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
    hasRow(age_group, gender) {
      return this.rows.filter((element) => { element.age_group === age_group && element.gender === gender } ).length > 0;
    },
    sortDataByMonth(dataList, comparator) {
      return dataList.filter(i => comparator(i.months)).map(i => i.patient_id)
    },
    buildRows(data) {
      let counter = 1;
      for (const gender of GENDERS) {
        for (const age_group of AGE_GROUPS) {
          if (data.hasOwnProperty(age_group) && data[age_group].hasOwnProperty(gender) && !this.hasRow(age_group, gender)) {
            const s = (comparator) => this.sortDataByMonth(data[age_group][gender], comparator)
            const return_less_than_3_mo = s((months) => months < 3)
            const return_by_3_to_5_mo = s((months) => months >= 3 && months <= 5)
            const return_6_plus_mo = s((months) => months >= 6)

            this.rows.push({
              number: counter++,
              age_group: age_group,
              gender: formatGender(gender),
              return_less_than_3_mo,
              return_by_3_to_5_mo,
              return_6_plus_mo,
            });
            this.aggregations.push({
              gender,
              return_less_than_3_mo,
              return_by_3_to_5_mo,
              return_6_plus_mo,
            })
          }else {
            this.rows.push({
              age_group,
              number: counter++,
              gender: formatGender(gender),
              return_less_than_3_mo: 0,
              return_by_3_to_5_mo: 0,
              return_6_plus_mo: 0
            });
          }
          
        }
      }
    },
    aggregate(gender, indicator) {
      return this.aggregations.reduce((totals, cur) => {
        return cur.gender === gender && cur[indicator] ? [...totals, ...cur[indicator]] : totals
      }, [])
    },
    buildTotalMalesRow() {
      this.rows.push({
        number: AGE_GROUPS.length * 2 + 1,
        age_group: "All",
        gender: "Male",
        return_less_than_3_mo: this.aggregate('M', "return_less_than_3_mo"),
        return_by_3_to_5_mo: this.aggregate('M', "return_by_3_to_5_mo"),
        return_6_plus_mo: this.aggregate('M', "return_6_plus_mo"),
      });
    },
    async buildMaternityRows(report) {
      let counter = AGE_GROUPS.length * 2 + 2;
      const indicators = [
        'return_less_than_3_mo',
        'return_by_3_to_5_mo',
        'return_6_plus_mo'
      ].reduce((aggregated, indicator) => [
        ...aggregated, 
        { indicator, data: this.aggregate('F', indicator)}
      ], [])

      const maternalStatus = await report.getMaternalStatus(
        uniq(indicators.reduce((totals, cur) => [...totals, ...cur.data], []).map((id) => id))
      )

      const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)

      const groupBy = (indicator) => indicators.reduce(
        (all, i) => i.indicator === indicator ? [...all, ...i.data] : all, []
      )

      const fP = (femaleGroup, indicator) => {
        return groupBy(indicator).filter((patient) => maternalStatus[femaleGroup].includes(patient))
      }

      const fnP = (indicator) => {
        return groupBy(indicator).filter((patient) => !allPregnant.includes(patient))
      }

      this.rows.push({
        number: counter++,
        age_group: "All",
        gender: "FP",
        return_less_than_3_mo: fP('FP', "return_less_than_3_mo"),
        return_by_3_to_5_mo: fP('FP', "return_by_3_to_5_mo"),
        return_6_plus_mo: fP('FP', "return_6_plus_mo"),
      });

      this.rows.push({
        number: counter++,
        age_group: "All",
        gender: "FNP",
        return_less_than_3_mo: fnP("return_less_than_3_mo"),
        return_by_3_to_5_mo: fnP("return_by_3_to_5_mo"),
        return_6_plus_mo: fnP("return_6_plus_mo"),
      });

      this.rows.push({
        number: counter++,
        age_group: "All",
        gender: "FBF",
        return_less_than_3_mo:fP('FBf', "return_less_than_3_mo"),
        return_by_3_to_5_mo: fP('FBf', "return_by_3_to_5_mo"),
        return_6_plus_mo: fP('FBf', "return_6_plus_mo"),
      });
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, `PEPFAR TX RTT Report ${this.period}`, {
        startDate: this.period.split('-')[0],
        endDate: this.period.split('-')[1]
      })
    },
  },
  data: function () {
    return {
      drillClients: [],
      aggregations: [],
      perPage: 15,
      currentPage: 1,
      period: null,
      reportLoading: false,
      slots: [
        "return_less_than_3_mo",
        "return_by_3_to_5_mo",
        "return_6_plus_mo"
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
          label: "Returned <3 mo",
          name: "return_less_than_3_mo",
          slot_name: "return_less_than_3_mo",
          sort: true,
        },
        {
          label: "Returned 3-5 mo",
          name: "return_by_3_to_5_mo",
          slot_name: "return_by_3_to_5_mo",
          sort: true,
        },
        {
          label: "Returned 6+ mo",
          name: "return_6_plus_mo",
          slot_name: "return_6_plus_mo",
          sort: true,
        }
      ],
      config: {
        card_title:
          "TX RTT: Clients that have their clinical dispensation visit falling in the reporting period and there is a difference of 30 or more days between their visit date and their previous appointment date / runout date",
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
  },
};
</script>

<style scoped>

.drillable {
  color: blue;
  text-decoration: underline;
}
</style>