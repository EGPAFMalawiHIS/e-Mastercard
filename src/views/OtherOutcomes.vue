<template>
  <div class="d-flex" id="wrapper">
    <side-bar></side-bar>
    <div id="page-content-wrapper">
      <top-nav></top-nav>
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-md-6 mt-4">
            <div class="form-group">
              <select class="form-control" id="outcome" v-model="outcome">
                <option selected hidden disabled value="">Select Outcome</option>
                <option value="Transfer Out">Transfer Out</option>
                <option value="Died">Died</option>
                <option value="Stopped">Stopped</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <sdPicker :onSubmit="fetchData"></sdPicker>
          </div>
        </div>
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config" :show-loader="reportLoading" :actions="actions" @on-download="onDownload">
          <template slot="sort-asc-icon">&#8593;</template>
          <template slot="sort-desc-icon">&#8595;</template>
          <template slot="no-sort-icon">&#8593;&#8595;</template>
          <template slot="birthdate" slot-scope="props">
            <b>{{ props.cell_value ? moment(props.cell_value).format("DD/MMM/YYYY") : "" }}</b>
          </template>
          <template slot="start_date" slot-scope="props">
            <b>{{ props.cell_value ? moment(props.cell_value).format("DD/MMM/YYYY") : "" }}</b>
          </template>
          <template slot="gender" slot-scope="{ cell_value }">
            {{ formatGender(cell_value) }}
          </template>
          <template slot="patient_id" slot-scope="props">
            <button type="button" class="btn btn-primary" @click="$router.push(`/patient/mastercard/${props.cell_value}`)" >
              show
            </button>
          </template>
        </vue-bootstrap4-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import sdPicker from "@/components/StartAndEndDatePicker.vue";
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";
import ReportService from '../services/report_service';
import moment from 'moment';

export default {
  name: "OtherOutcomes",
  components: {
    sdPicker,
    VueBootstrap4Table,
    SideBar,
    TopNav,
  },
  data: () => ({
    formatGender,
    outcome: "",
    rows: [],
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
        card_title: `${this.outcome || "Other Outcomes"} Report ${this.period}`,
        show_refresh_button: false,
        show_reset_button: false,
      }
    },
    columns() {
      return [
        { label: "ARV Number", name: "identifier" },
        { label: "First Name", name: "given_name", exportable: false, sort: true },
        { label: "Last Name", name: "family_name", exportable: false, sort: true },
        { label: "date of Birth", name: "birthdate", slot_name: "birthdate" },
        { label: "Gender", name: "gender", slot_name: "gender" },
        { label: "Outcome Date", name: "start_date", slot_name: "start_date" },
        (/transfer/i.test(this.outcome) ? { label: "To Location", name: "transferred_out_to" }: null),
        { label: "Action", name: "patient_id", slot_name: "patient_id", exportable: false },
      ].filter(Boolean)
    }
  },
  methods: {
    showError(message){
      this.$bvToast.toast(message, {
        variant: "danger",
        duration: 3000
      })
    },
    isValid(startDate, endDate) {
      if(!this.outcome) {
        this.showError("Please, select outcome")
        return false
      }

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
        report.setStartDate(start)
        report.setEndDate(end)
        this.period = report.getDateIntervalPeriod()
        this.reportLoading = true;
        this.rows = (await report.getOtherOutcome(this.outcome)) || [];
        this.reportLoading = false;
      }
    },
    onDownload(){
      exportToCSV(columns.value, rows.value, config.card_title, {
        startDate: period.value.split('-')[0],
        endDate: period.value.split('-')[1]
      })
    }
  },
}
</script>