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
        <vue-bootstrap4-table
          :rows="rows"
          :columns="columns"
          :config="config"
          :show-loader="showLoader"
          :actions="actions"
          @on-download="onDownload"
        >
          <template slot="sort-asc-icon">&#8593;</template>
          <template slot="sort-desc-icon">&#8595;</template>
          <template slot="no-sort-icon">&#8593;&#8595;</template>
          <template v-for="slot in slots" :slot="slot" slot-scope="props">
            <span @click="drillDown(props.cell_value)" :key="slot" :class="props.cell_value.length > 0 ? 'drillable' : ''">
              {{ props.cell_value.length }}
            </span>
          </template>
        </vue-bootstrap4-table>
      </div>
    </div>
    <b-modal id="modal-1" :title="`Drill Down Clients`" size="xl">
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
<style>
.my-custom-class {
  margin: 3px;
}
</style>
<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";
import ReportService from '../services/report_service';
import PatientService from "../services/patient_service";

export default {
  name: "TPTCohort",
  data: function () {
    return {
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      startDate: "",
      endDate: "",
      showLoader: false,
      rows: [],
      columns: [
        {
          label: "#",
          name: "index"
        },
        {
          label: "Age Group",
          name: "age_group",
        },
        {
          label: "Gender",
          name: "gender",
        },
        {
          label: "Initiated ART",
          name: "initiated_art",
          slot_name: "initiated_art",
        },
        {
          label: "Initiated TPT",
          name: "started_tpt",
          slot_name: "started_tpt",
        },
        {
          label: "Completed TPT",
          name: "completed_tpt",
          slot_name: "completed_tpt",
        },
        {
          label: "Died",
          name: "died",
          slot_name: "died",
        },
        {
          label: "Defaulted",
          name: "defaulted",
          slot_name: "defaulted",
        },
        {
          label: "Stopped ART",
          name: "stopped",
          slot_name: "stopped",
        },
        {
          label: "TO",
          name: "transfer_out",
          slot_name: "transfer_out",
        },
        {
          label: "Confirmed TB",
          name: "confirmed_tb",
          slot_name: "confirmed_tb",
        },
        {
          label: "Pregnant",
          name: "pregnant",
          slot_name: "pregnant",
        },
      ],
      slots: [
        'initiated_art',
        'started_tpt',
        'completed_tpt',
        'died',
        'defaulted',
        'stopped',
        'transfer_out',
        'confirmed_tb',
        'pregnant'
      ],
      config: {
        card_title: "MoH TPT Cohort Report",
        show_refresh_button: false,
        show_reset_button: false,
      },
      actions: [
        {
          btn_text: "CSV",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg",
          },
        },
      ],
    };
  },
  methods: {
    fetchDates: async function (dates) {
      this.rows = [];
      this.startDate = dates[0];
      this.endDate = dates[1];
      const today = moment().format("YYYY-MM-DD");
      const even = (element) => element === "Invalid date";
      if (dates.some(even)) {
        console.log("Check your dates");
      } else {
        this.showLoader = true;
        const reportService = new ReportService();
        reportService.setStartDate(this.startDate);
        reportService.setEndDate(this.endDate);
        this.config.card_title += " " + reportService.getDateIntervalPeriod();
        const data = await reportService.getMoHTptCohortReport();
        this.rows = this.getIndexData(data)
        this.showLoader = false;
      }
    },
    getIndexData(data) {
      return data.sort((row1, row2) => row1.gender > row2.gender ? 1 :
        row1.gender < row2.gender ? -1 : 0
      ).map((d, i) => ({ index: i + 1, ...d, gender: formatGender(d.gender) }))
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, this.config.card_title, {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
    drillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach(async (id) => {
          const patient = await PatientService.parsePatient(id);
          if (patient) {
            this.drillClients.push(patient)
          }
        });
      }
    },
  },
  components: {
    VueBootstrap4Table,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
  },
  computed: {},
};
</script>

<style scoped>
.drillable {
  color: blue;
  text-decoration: underline;
}
</style>
