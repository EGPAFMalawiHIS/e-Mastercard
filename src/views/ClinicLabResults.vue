<template>
  <div class="d-flex" id="wrapper">
    <side-bar></side-bar>
    <div id="page-content-wrapper">
      <top-nav></top-nav>
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-md-6">
            <sdPicker :onSubmit="fetchData"></sdPicker>
          </div>
          <div class="col-md-3 mt-4">
            <div class="form-group">
              <v-select :options="availableTests" v-model="selectedTests"  placeholder="Select Test" :multiple="true"></v-select>
            </div>
          </div>
          <div class="col-md-3 mt-4">
            <div class="form-group">
              <v-select :options="['Disagregated', 'Patient Level']" v-model="type"  placeholder="Report type"></v-select>
            </div>
          </div>
        </div>
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config" :show-loader="reportLoading" :actions="actions" @on-download="onDownload">
          <template slot="sort-asc-icon">&#8593;</template>
          <template slot="sort-desc-icon">&#8595;</template>
          <template slot="no-sort-icon">&#8593;&#8595;</template>
          <template slot="birthdate" slot-scope="props">
            <b>{{ props.cell_value ? moment(props.cell_value).format("DD/MMM/YYYY") : "" }}</b>
          </template>
          <template slot="order_date" slot-scope="props">
            <b>{{ props.cell_value ? moment(props.cell_value).format("DD/MMM/YYYY") : "" }}</b>
          </template>
          <template slot="result_date" slot-scope="props">
            <b>{{ props.cell_value ? moment(props.cell_value).format("DD/MMM/YYYY") : "" }}</b>
          </template>
          <template slot="gender" slot-scope="{ cell_value }">
            {{ formatGender(cell_value) }}
          </template>
          <template v-for="test in selectedTests" :slot="test.label" slot-scope="props">
              <span
                @click="fetchDrillDown(props.cell_value)"
                :class="props.cell_value.length > 0 ? 'drillable' : ''"
                :key="test.label"
                >{{
                  props.cell_value.length > 0 ? props.cell_value.length : 0
                }}</span
              >
            </template>
        </vue-bootstrap4-table>
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
        :total-rows="drillClients.length"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </b-modal>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import sdPicker from "@/components/StartAndEndDatePicker.vue";
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS } from '../services/report_service';
import moment from 'moment';
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import ApiClient from "../services/api_client";
import date_utils from '../services/date_utils';

export default {
  name: "OtherOutcomes",
  components: {
    "v-select": VueSelect,
    sdPicker,
    VueBootstrap4Table,
    SideBar,
    TopNav,
  },
  data: () => ({
    formatGender,
    availableTests: [],
    selectedTests: [],
    drillClients: [],
    perPage: 15,
    currentPage: 1,
    type: "",
    reportLoading: false,
    period: "",
    actions: [{
      btn_text: "CSV",
      event_name: "on-download",
      class: "btn btn-primary my-custom-class",
      event_payload: {
        msg: "my custom msg",
      },
    }],
  }),
  computed: {
    config() {
      return {
        card_title: `Lab Results Report ${this.period}`,
        show_refresh_button: false,
        show_reset_button: false,
      }
    },
    rows() {
      if(this.availableTests.length) {
        if(!this.type) this.type = "Disagregated";
        if(!this.selectedTests.length) this.selectedTests = this.availableTests;
        return this.type === "Disagregated" 
          ? this.buildDisagregatedRows() 
          : this.buildPatientLevelRows()
      }
      return []
    },
    columns() {
      return this.type === "Disagregated" 
        ? [
          { label: "Age Group", name: "age_group", sort: true },
          { label: "Gender", name: "gender", slot_name: "gender" },
          ...this.selectedTests.map(({ label }) => ({ label, name: label, slot_name: label, drillable: true }))
        ].filter(Boolean)
      : [
          { label: "ARV Number", name: "arv_number", sort: true },
          { label: "Gender", name: "gender", slot_name: "gender" },
          { label: "Birthdate", name: "birthdate", slot_name: "birthdate", sort: true },
          { label: "Ordered", name: "order_date", slot_name: "order_date", sort: true },
          { label: "Specimen", name: "test", slot_name: "test", sort: true },
          { label: "Result", name: "result", slot_name: "result", sort: true },
          { label: "Released", name: "result_date", slot_name: "result_date", sort: true },
        ]
    },
  },
  methods: {
    showError(message){
      this.$bvToast.toast(message, {
        variant: "danger",
        duration: 3000
      })
    },
    isValid(startDate, endDate) {
      if(!startDate || !endDate) {
        this.showError("Please, select report period")
        return false
      }

      if(moment(startDate).isAfter(moment(endDate))) {
        this.showError("Invalid date range")
        return false;
      }
      return true
    },
    async fetchData(dates){
      const [start, end ] = dates;
      if(this.isValid(start, end)) {
        const report = new ReportService();
        report.setProgramID(23);
        report.setStartDate(start)
        report.setEndDate(end)
        this.reportLoading = true;
        const data = await report.getLabResultsReport()
        this.reportLoading = false;
        this.period = report.getDateIntervalPeriod()
        const tests = this.buildAvailableTests(data)
        this.availableTests = this.buildAvailableTestOptions(tests)
      }
    },
    buildAvailableTests(results) {
      const tests = {}
      results.forEach((result) => {
        result.measures.forEach((measure) => {
          if (!(measure.name in tests)) {
            tests[measure.name] = []
          }
          tests[measure.name].push({
            ...result,
            test:  measure.name,
            result: `${measure.modifier} ${measure.value}`,
          })
        })
      })
      return tests
    },
    buildAvailableTestOptions(availableTests) {
      const options = []
      for(const test in availableTests) {
          const result = availableTests[test]
          options.push({
              label: test,
              value: result.length,
              other: result
          })
      }
      return options
    },
    onDownload(){
      exportToCSV(columns.value, rows.value, config.card_title, {
        startDate: period.value.split('-')[0],
        endDate: period.value.split('-')[1]
      })
    },
    buildDisagregatedRows() {
      const males = []
      const females = []
      let rows = []
      for(const age_group of AGE_GROUPS) {
        const maleRow = {age_group, gender: "Male"}
        const femaleRow = {age_group, gender: "Female"}
        this.selectedTests.forEach(({label, other}) => {
            const filterByGender = (gender) => other
              .filter(i => i.gender === gender && i.age_group === age_group)
              .map(i => i.patient_id)

            maleRow[label] = filterByGender('M')
            femaleRow[label] = filterByGender('F')
        })
        males.push(maleRow)
        females.push(femaleRow)
        rows = [...females, ...males]
      }
      return rows;
    },
    buildPatientLevelRows() {
      return this.selectedTests.map(({other}) => other).flat(1);
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

      return {
        arv_number: identifier,
        gender: formatGender(gender),
        birthdate: date_utils.localDate(age),
        current_village: addressl1,

      };
    },
  },
}
</script>

<style scoped>
.drillable {
  color: blue;
  text-decoration: underline;
}
</style>