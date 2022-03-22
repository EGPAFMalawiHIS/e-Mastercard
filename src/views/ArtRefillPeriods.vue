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
import DateUtils from "../services/date_utils";
import TopNav from "@/components/topNav.vue";

import VueBootstrap4Table from "vue-bootstrap4-table";

import moment from "moment";
import { mapState } from "vuex";
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
      var client_sex = ["Female", "Male"];
      client_sex.forEach((element) => {
        this.ageGroups.forEach((el, index) => {
          let num = element === "Female" ? index + 1 : index + this.ageGroups.length + 1;
          this.rows.push({
            number: num,
            age_group: el,
            gender: element,
            sixty: [],
            ninety: [],
            oneeighty: [],
          });
        });
      });
    },
    async fetchDates(dates) {
      // try {
      this.initRows();  
      let group;
      let min_age;
      let max_age;
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportTitle =
        "PEPFAR " + sessionStorage.location_name + " TX CURR MMD report ";
      this.reportTitle += moment(dates[0]).format("DDMMMYYYY");
      this.reportTitle += " - " + moment(dates[1]).format("DDMMMYYYY");
      this.reportLoading = true;
      this.ageGroups.forEach((el, index) => {
        let ages = this.setMinMaxAges(el);
        min_age = ages[0];
        max_age = ages[1];
        let url_path =
          "arv_refill_periods?start_date=" +
          dates[0] +
          "&date=" +
          moment().format("YYYY-MM-DD");
        url_path += "&end_date=" + dates[1] + "&program_id=1&org=pepfar";
        url_path += "&min_age=" + min_age;
        url_path += "&max_age=" + max_age;
        this.loadData(url_path, index, el);
      });
    },
    async loadData(url, ind, agp) {
      await ApiClient.get(url, {}, {}).then((res) => {
        res.json().then((f) => {
          this.addRow(f, ind, agp);
          if(ind == 11){
            this.reportLoading = false;
          }
        });
      });
      // const response = await ApiClient.get(url, {}, {});
      // if (response.status === 200) {
      // console.log(ind);
      //   response.json().then((data) => this.addRow(data, ind, agp));
      // } else {
      // }
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
    addRow(data, ind, agp) {
      /* ................................................................ */
      var client_sex = ["Female", "Male"];
      client_sex.forEach((element) => {
        let gen = element;
        let sixty = [];
        let ninety = [];
        let oneeighty = [];
        let num = element === "Female" ? ind + 1 : ind + this.ageGroups.length + 1;
        let finObj = {
          number: num,
          age_group: agp,
          gender: gen,
          sixty: [],
          ninety: [],
          oneeighty: [],
        };
        for (let g in data[element]) {
          let prescribed_days = data[element][g].prescribed_days;
          if (prescribed_days < 90) this.rows[num - 1].sixty.push(g);
          if (prescribed_days >= 90 && prescribed_days <= 150)
            this.rows[num - 1].ninety.push(g);
          if (prescribed_days > 150) this.rows[num - 1].oneeighty.push(g);
        }
      });
      
    },
    fetchDrillDown(clients) {
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
      toPush.gender = gender;
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
      startDate: null,
      endDate: null,
      reportLoading: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
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
      slots: ["sixty", "ninety", "oneeighty"],
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
          // sort: true,
        },
        {
          label: "Gender",
          name: "gender",
          // sort: true,
        },
        {
          label: "# of clients on <3 months of ARVs",
          name: "sixty",
          slot_name: "sixty",
          // sort: true,
        },
        {
          label: "# of clients on 3 - 5 months of ARVs",
          name: "ninety",
          slot_name: "ninety",
          // sort: true,
        },
        {
          label: "# of clients on >= 6 months of ARVs",
          name: "oneeighty",
          slot_name: "oneeighty",
          // sort: true,
        },
      ],
      config: {
        card_title: `TX CURR MMD Clients that are alive and on treatment in the reporting period and
the difference in days between their clinical dispensation visit and next appointment / drug-runout date is:
3 months (1 – 89 days), 
3-5 months (90-179 days), 
6+ months (180 or more days)
`,
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