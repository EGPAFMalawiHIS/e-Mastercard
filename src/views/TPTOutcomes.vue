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
            :show-loader="reportLoading"
            :actions="actions"
            @on-download="onDownload"
          >
            <template slot="sort-asc-icon">&#8593;</template>
            <template slot="sort-desc-icon">&#8595;</template>
            <template slot="no-sort-icon">&#8593;&#8595;</template>
            <template v-for="slot in slots" :slot="slot" slot-scope="props">
              <span @click="drillDown(props.cell_value)" :class="props.cell_value.length > 0 ? 'drillable' : ''">
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
import ApiClient from "../services/api_client";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import TopNav from "@/components/topNav.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import moment from "moment";
import { mapState } from "vuex";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";

export default {
  name: "TPTOutcomes",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
    VueBootstrap4Table,
  },
  methods: {
    async fetchDates(dates) {
      this.reportLoading = true;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.config.card_title += " " + moment(dates[0]).format("DDMMMYYYY");
      this.config.card_title += " - " + moment(dates[1]).format("DDMMMYYYY");
       let url_path = '/programs/1/reports/tpt_outcome?start_date=' + this.startDate + "&date=" + moment().format('YYYY-MM-DD');
      url_path += "&end_date=" + this.endDate + "&program_id=1";
      await this.loadData(url_path);
      this.reportLoading = false;
    },
    async loadData(url) {
      await ApiClient.get(url, {}, {}).then((res) => {
        res.json().then((data) => {
          this.rows = data.sort((a, b) => a.tpt_type > b.tpt_type ? 1 : 0).map((d, i) => ({number: i, ...d}))
        });
      });
   
    },
    drillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach(async (id) => {
          const res = await ApiClient.get(`patients/${id}`, {}, {})
          if (res.status === 200) {
            res.json().then((data) => {
              this.drillClients.push(this.parsePatient(data))
            });
          }
        });
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
      toPush.gender = formatGender(gender)
      toPush.current_village = addressl1;
      return toPush;
    },
    toExportableFormat(rows){
      return rows.map(row => {
        const obj = {}
        for (const key in row) {
          obj[key] = Array.isArray(row[key]) ? row[key].length : row[key]
        }
        return obj
      })
    },
    onDownload() {
      exportToCSV(
        this.columns,
        this.toExportableFormat(this.rows),
        this.config.card_title,
        {
          startDate: this.startDate,
          endDate: this.endDate,
        }
      )
    },
  },
  data: function () {
    return {
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      startDate: null,
      endDate: null,
      reportLoading: false,
      slots: [
        'started_tpt',
        'completed_tpt', 
        'not_completed_tpt', 
        'died', 
        'stopped', 
        'defaulted', 
        'transfer_out', 
        'confirmed_tb',
        'pregnant'
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
          label: "TPT Type",
          name: "tpt_type",
          sort: true,
        },
        {
          label: "Started TPT",
          name: "started_tpt",
          slot_name: "started_tpt",
        },
        {
          label: "Completed TPT",
          name: "completed_tpt",
          slot_name: "completed_tpt",
        },
        {
          label: "Not completed TPT",
          name: "not_completed_tpt",
          slot_name: "not_completed_tpt",
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
          label: "Transfered Out",
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
      config: {
        card_title: `TPT Outcomes`,
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
};
</script>

<style scoped>
.drillable {
  color: blue;
  text-decoration: underline;
}
</style>