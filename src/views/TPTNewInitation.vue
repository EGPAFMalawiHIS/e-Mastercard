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
        <!-- </report-overlay> -->
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
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";
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
          let num = element === "F" ? index + 1 : index + 12 + 1;
          this.rows.push({
            number: num,
            age_group: el,
            gender: formatGender(element),
            threehpnew: [],
            threehpprev: [],
            sixhnew: [],
            sixhprev: [],
          });
        });
      });
    },
    async fetchDates(dates) {
      this.showLoader = true;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.config.card_title += " " + moment(dates[0]).format("DDMMMYYYY");
      this.config.card_title += " - " + moment(dates[1]).format("DDMMMYYYY");
       let url_path = '/programs/1/reports/tpt_newly_initiated?start_date=' + this.startDate + "&date=" + moment().format('YYYY-MM-DD');
      url_path += "&end_date=" + this.endDate + "&program_id=1";
      await this.loadData(url_path);
      this.showLoader = false;
    },
    async loadData(url) {
      await ApiClient.get(url, {}, {}).then((res) => {
        res.json().then((f) => {
          this.addRow(f);
        });
      });
   
    },
    setMinMaxAges(group) {
      const valueTokens = group.split(' ')

      const [valueRange] = valueTokens

      if (valueRange === '<1') return [0, 0]

      if (valueTokens.includes('plus')) {
        return [parseInt(valueRange), 100000]
      }

      const [min, max] = valueRange.split('-').map(i => parseInt(i))

      return min && max ? [min, max] : undefined
    },
    addRow(data) {
      const client_sex = ["F", "M"];
      this.rows = [];
      
      client_sex.forEach(gender => {
        Object.keys(data).forEach((element, index) => {
          let idx = -1;
          let num;
          const location = data.Location;
          if(element !== "Unknown" && element !== "Location") {
          
          if(gender === 'F') {
            num = index + 1 + idx;
          }else if(gender === 'M') {
            num = index + 16 + idx ;
          }
           this.rows.push(
             {
               number: num,
               location: location,
               age_group: element,
               gender : formatGender(gender),
               threehpnew : data[element]["3HP_new"][gender],
               threehpprev : data[element]["3HP_prev"][gender],
               sixhnew : data[element]["6H_new"][gender],
               sixhprev : data[element]["6H_prev"][gender],
             }
            )
        }
        }); 
      })
    },
    fetchDrillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        this.drillClients = clients;
        // clients.forEach((element) => {
        //   this.getClient(element);
        // });
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
      toPush.gender = formatGender(gender);
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
      showLoader: false,
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      startDate: null,
      endDate: null,
      reportLoading: false,
      reportTitle: null,
      ageGroups: [
        '<1 year',
        '1-4 years', 
        '5-9 years', 
        '10-14 years', 
        '15-19 years', 
        '20-24 years', 
        '25-29 years', 
        '30-34 years', 
        '35-39 years', 
        '40-44 years', 
        '45-49 years', 
        '50-54 years',
        '55-59 years',
        '60-64 years',
        '65-69 years',
        '70-74 years',
        '75-79 years',
        '80-84 years',
        '85-89 years',
        '90 plus years'
      ],
      showLoader: false,
      slots: ['sixhnew','sixhprev', 'threehpnew', 'threehpprev'],
      rows: [],
      columns: [
        {
          label: "#",
          name: "number",
          sort: true,
        },
        {
          label: "District",
          name: "location",
          sort: false,
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
          label: "3HP (Started New on ART)",
          name: "threehpnew",
          slot_name: "threehpnew",
          // sort: true,
        },
        {
          label: "6H (Started New on ART)",
          name: "sixhnew",
          slot_name: "sixhnew",
          // sort: true,
        },
        {
          label: "3HP (Started Previous on ART)",
          name: "threehpprev",
          slot_name: "threehpprev",
          // sort: true,
        },
        {
          label: "6H (Started Previous on ART)",
          name: "sixhprev",
          slot_name: "sixhprev",
          // sort: true,
        }
      ],
      config: {
        card_title: `TPT new initiation`,
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