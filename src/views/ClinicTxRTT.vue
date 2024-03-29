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
              >{{ props.cell_value.length ? props.cell_value.length : 0 }}</span
            >
          </template>
        </vue-bootstrap4-table>
          </report-overlay>
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
    async fetchDates(dates) {
      this.rows = [];
      try {
        this.startDate = dates[0];
        this.endDate = dates[1];
        this.reportTitle =
          "Clinic " + sessionStorage.location_name + " TX RTT report ";
        this.reportTitle += moment(dates[0]).format("DDMMMYYYY");
        this.reportTitle += " - " + moment(dates[1]).format("DDMMMYYYY");
        this.reportLoading = true;
        await this.loadXLdata();
      } catch (e) {
        console.error(e);
        this.router.push({ name: "error", params: { message: e.message } });
      }
    },
    loadXLdata: async function () {
      let url = "programs/1/reports/clinic_tx_rtt?date=" + moment().format("YYYY-MM-DD");
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";

      const response = await ApiClient.get(url);

      if (response.status === 200) {
        await this.loadGroupData(await response.json());
      }
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
    async loadGroupData(data) {
      let counter = 1;
      let report_gender = ["F", "M"];
      let set_age_groups = this.ageGroups;
      for (let j = 0; j < report_gender.length; j++) {
        let age_group_found = false;
        for (let i = 0; i < set_age_groups.length; i++) {
          let age_group = set_age_groups[i];
          if (data.hasOwnProperty(age_group)) {
            let gender = data[age_group];
            // for (let sex in gender) {
              let sex = report_gender[j]
            if (gender.hasOwnProperty(sex) && !this.hasRow(age_group, sex)) {
                let numbers = gender[sex];
                const s = (comparator) => this.sortDataByMonth(numbers, comparator)
                this.rows.push({
                  number: counter++,
                  age_group: age_group,
                  gender: formatGender(sex),
                  return_less_than_3_mo: s((months) => months < 3),
                  return_by_3_to_5_mo: s((months) => months >= 3 && months <= 5),
                  return_6_plus_mo: s((months) => months >= 6)
                });
                age_group_found = true;
            }else {
             this.rows.push({
              number: counter++,
              age_group: set_age_groups[i],
              gender: formatGender(report_gender[j]),
              return_less_than_3_mo: 0,
              return_by_3_to_5_mo: 0,
              return_6_plus_mo: 0  
            }); 
            }
          }else {
            this.rows.push({
              number: counter++,
              age_group: set_age_groups[i],
              gender: formatGender(report_gender[j]),
              return_less_than_3_mo: 0,
              return_by_3_to_5_mo: 0,
              return_6_plus_mo: 0
            });
          }
        }
      }
      this.buildAllMalesRow(this.rows, counter)
      await this.buildAllFemaleRows(this.rows, counter)
      this.reportLoading = false;
    },
    reducer(rows, column, gender){
      return rows.filter(row => row.gender === gender)
        .reduce((acc, curr) => {
          if(Array.isArray(curr[column])) return acc.concat(curr[column])
          return acc
        }, [])
    },
    buildAllMalesRow(data, index){
      this.rows.push({
        index: index++,
        gender: 'Male',
        'age_group': 'All',
        "return_less_than_3_mo": this.reducer(data, 'return_less_than_3_mo', "Male"),
        "return_by_3_to_5_mo": this.reducer(data, 'return_by_3_to_5_mo', "Male"),
        "return_6_plus_mo": this.reducer(data, 'return_6_plus_mo', "Male"),
      })
    },
    async getMaternalStatus(patientIds) {
      let url = "vl_maternal_status?&program_id=1"
      url += "&start_date=" + this.startDate
      url += '&end_date=' + this.endDate
      url += '&date=' + this.date
      url += '&report_definition=pepfar'
      return ApiClient.post(url, { 'patient_ids': patientIds })
        .then(response => response.json())
    },
    async buildAllFemaleRows(data, index){
      const columns = ['return_less_than_3_mo', 'return_by_3_to_5_mo', 'return_6_plus_mo']
      const categories = ['FP', 'FNP', 'FBf']

      const allFemales = columns.map(column => this.reducer(data, column, 'Female'))
        .reduce((a, c) => a.concat(c), [])
        .filter((value, index, self) => self.indexOf(value) === index)

      const maternalStatus = await this.getMaternalStatus(allFemales)
      const allFp = maternalStatus.FBf.concat(maternalStatus.FP)

      const buildColumn = (column, category) => this.reducer(data, column, "Female").filter((id) => {
        if(category === 'FNP') return !allFp.includes(id)
        return maternalStatus[category].includes(id)
      })

      for (const category of categories) {
        const row = { index: index++, gender: category, "age_group": "All"}
        columns.forEach(column => row[column] = buildColumn(column, category))
        this.rows.push(row)
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
      perPage: 15,
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
        "Clinic TX RTT: Clients that have their clinical dispensation visit falling in the reporting period and there is a difference of 30 or more days between their visit date and their previous appointment date / runout date",
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