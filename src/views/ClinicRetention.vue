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
import { mapState } from "vuex";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";
import ReportService, { AGE_GROUPS, GENDERS } from '../services/report_service';
import date_utils from '../services/date_utils';

export default {
  name: "ClinicRetention",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
    VueBootstrap4Table,
  },
  methods: {
    async fetchDates(dates) {
      const report = new ReportService();
      report.setStartDate(dates[0])
      report.setEndDate(dates[1])
      this.period = report.getDateIntervalPeriod();
      this.config.card_title += this.period;
      this.reportLoading = true;
      const data = await report.getClientRentention();
      this.reportLoading = false;
      this.buildTableRows(data);
    },
    buildTableRows(data) {
      let index = 1;
      for (const gender of GENDERS) {
        for(const age_group of AGE_GROUPS) {
          const getValue = (month, prop) =>  {
            try{
              return data[month][prop]
                .filter(p => p.gender === gender && p.age_group === age_group)
                .map(p => p.patient_id);
            } catch (e) {
              console.log(e)
              return 0
            }
          }
          this.rows.push({
            age_group,
            index: index++,
            gender: formatGender(gender),
            'initiated_one_month': getValue(1, 'all'),
            'completed_one_month': getValue(1, 'retained'),
            'initiated_three_months': getValue(3, 'all'),
            'completed_three_months': getValue(3, 'retained'),
            'initiated_six_months': getValue(6, 'all'),
            'completed_six_months': getValue(6, 'retained'),
          })
        }
      }
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
     
      return {
        arv_number: identifier,
        birthdate: date_utils.localDate(age),
        gender: formatGender(gender),
        current_village: addressl1,
      };
    },
    onDownload() {
      exportToCSV(
        this.columns,
        this.rows,
        this.config.card_title,
        {
          startDate: this.period.split('-')[0],
          endDate: this.period.split('-')[1]
        }
      )
    },
  },
  data: function () {
    return {
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      period: null,
      reportLoading: false,
      slots: [
        'initiated_one_month',
        'completed_one_month',
        'initiated_three_months',
        'completed_three_months',
        'initiated_six_months',
        'completed_six_months'
      ],
      rows: [],
      columns: [
        {
          label: "#",
          name: "index",
          sort: true
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
          label: "Initiated one month",
          name: "initiated_one_month",
          slot_name: "initiated_one_month",
        },
        {
          label: "Completed one month",
          name: "completed_one_month",
          slot_name: "completed_one_month",
        },
        {
          label: "Initiated three months",
          name: "initiated_three_months",
          slot_name: "initiated_three_months",
        },
        {
          label: "Completed three months",
          name: "completed_three_months",
          slot_name: "completed_three_months",
        },
        {
          label: "Initiated six months",
          name: "initiated_six_months",
          slot_name: "initiated_six_months",
        },
        {
          label: "Completed six months",
          name: "completed_six_months",
          slot_name: "completed_six_months",
        },
      ],
      config: {
        card_title: `Clinic Retention Report `,
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