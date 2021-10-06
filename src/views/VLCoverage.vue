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

<script>
// @ is an alias to /src
import ApiClient from "../services/api_client";
import ReportOverlay from "../components/reports/ReportOverlay";
import Sidebar from "@/components/SideBar.vue";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";

import TopNav from "@/components/topNav.vue";
import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "VLCoverage",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
    VueBootstrap4Table,
  },
  methods: {
    async fetchDates(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportTitle =
        "PEPFAR " + sessionStorage.location_name + " TX CURR MMD report ";
      this.reportTitle += moment(dates[0]).format("DDMMMYYYY");
      this.reportTitle += " - " + moment(dates[1]).format("DDMMMYYYY");
      this.reportLoading = true;
      let url_path =
        "programs/1/reports/viral_load_coverage?start_date=" + dates[0];
      url_path +=
        "&end_date=" +
        dates[1] +
        "&rebuild_outcomes=true&application=emastercard";
      const data = await ApiClient.get(url_path, {}, {});
      const j = await data.json();
      this.loadData(j);
    },
    async loadData(data) {
     let row_count = 1;
      const gender = ["F", "M"];
      const data_arry = [];
      for(const sex of gender){
        for(const age_group of this.ageGroups){
          for(const api_age_group in data){
            if(age_group != api_age_group)
              continue;

            data_arry.push({
              number: row_count++, 
              age_group: age_group,
              gender: sex === 'F' ? 'Female' : 'Male',
              "tx_curr": this.filterClients(data[api_age_group]["tx_curr"], sex),
              "due_for_vl": this.filterClients(data[api_age_group]["due_for_vl"], sex),
              "drawn_routine": this.filterClients(data[api_age_group]["drawn"]["routine"], sex),
              "drawn_targeted": this.filterClients(data[api_age_group]["drawn"]["targeted"], sex),
              "high_routine": this.filterClients(data[api_age_group]["high_vl"]["routine"], sex),
              "high_targeted": this.filterClients(data[api_age_group]["high_vl"]["targeted"], sex),
              "low_routine": this.filterClients(data[api_age_group]["low_vl"]["routine"], sex),
              "low_targeted": this.filterClients(data[api_age_group]["low_vl"]["targeted"], sex),
            });
          }
        }
      } 
      this.rows = data_arry;
      this.reportLoading = false;
    
    },
    filterClients(data, gender) {
      data.filter(d => console.log(d));
      return data.filter(d => d.gender === gender);

    },
    fetchDrillDown(clients) {
      if (clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = clients;
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
                          e-Mastercard Version : ${sessionStorage.EMCVersion} 
                          API Version ${sessionStorage.APIVersion}`;
      for (let index = 0; index < 34; index++) {
        y += ",";
      }
      var csvData = new Blob([y], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
      } else {
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
      drillColumns: [
        {
          key: "arv_number",
          label: "ARV Number",
        },
        {
          key: "birthdate",
          label: "DOB",
        },
        {
          key: "gender",
          label: "Gender",
        }
      ],
      startDate: null,
      endDate: null,
      reportLoading: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      reportTitle: null,
      ageGroups: [
        "0-5 months",
        "6-11 months",
        "12-23 months",
        "2-4 years",
        "5-9 years",
        "10-14 years",
        "15-17 years",
        "18-19 years",
        "20-24 years",
        "25-29 years",
        "30-34 years",
        "35-39 years",
        "40-44 years",
        "45-49 years",
        "50 plus years",
        "Unknown",
      ],
      showLoader: false,
      slots: ["tx_curr", "due_for_vl", "drawn_routine","drawn_targeted", "high_routine", "low_routine", "high_targeted", "low_targeted"],
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
          label: "Tx Curr",
          name: "tx_curr",
          slot: "tx_curr"
          // sort: true,
        },
        {
          label: "Due for VL",
          name: "due_for_vl",
          slot_name: "due_for_vl",
          // sort: true,
        },
         {
          label: "Routine",
          name: "drawn_routine",
          slot_name: "drawn_routine",
          // sort: true,
        },        
          {
          label: "Targeted",
          name: "drawn_targeted",
          slot_name: "drawn_targeted",
          // sort: true,
        },              
        {
          label: "Routine",
          name: "high_routine",
          slot_name: "high_routine",
          // sort: true,
        },        
          {
          label: "Targeted",
          name: "high_targeted",
          slot_name: "high_targeted",
          // sort: true,
        },{
          label: "Routine",
          name: "low_routine",
          slot_name: "low_routine",
          // sort: true,
        },        
          {
          label: "Targeted",
          name: "low_targeted",
          slot_name: "low_targeted",
          // sort: true,
        },
      ],
      config: {
        card_title: `Viral load coverage report`,
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