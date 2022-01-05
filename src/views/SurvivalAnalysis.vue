<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->
        <div class="cohort">
          <report-date-picker :onSubmit="fetchData"></report-date-picker>
        </div>

        <div style="width:100%; text-align: right; margin-top: 25px;">
            <select ref="subgroup" v-model="subgroup">
                <option>Select sub group</option>
                <option value="General">General</option>
                <option value="Children">Children</option>
                <option value="Women">Option B+</option>
            </select>
        </div>
        <report-overlay :reportLoading="reportLoading" :reportSelected="reportSelected">
         <vue-bootstrap4-table
            :rows="rows"
            :columns="columns"
            :config="config"
            :show-loader="reportLoading"
            :actions="actions"
            @on-download="onDownload"
          >
          </vue-bootstrap4-table>
        </report-overlay>

      </div>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src
import ReportOverlay from "../components/reports/ReportOverlay";
import reportDatePicker from '@/components/reportDatePicker.vue';
import Sidebar from "@/components/SideBar.vue";
import TopNav from "@/components/topNav.vue";
import { mapState } from "vuex";

import VueBootstrap4Table from "vue-bootstrap4-table";
import moment from 'moment'
import ApiClient from "../services/api_client";

export default {
  name: "reports",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    'report-date-picker': reportDatePicker,
    VueBootstrap4Table,
  }, methods: {
    redirect: function () {
      this.$router.push('/moh');
    },
    async fetchData (report_parameters) {
      this.rows = [];
      try {
        if(!report_parameters)
          return;

        this.reportQtr = report_parameters[0];
        this.regenerateReport = report_parameters[1];
        if(this.reportQtr == 'Select cohort quarter')
          return;

        if(this.$refs.subgroup.value == 'Select sub group')
          return;

        this.reportLoading = true;
        this.reportSelected = true;
        await this.fetchSurvivalAnalysisData();
      } finally {
        this.reportLoading = false;
      }

    },
    onDownload() {
      let y = null;
      this.columns.forEach((element) => {
        y += `"${element.label}",`;
      });
      y = y.replace("null", "");
      this.rows.reverse().forEach((element) => {
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
    fetchSurvivalAnalysisData: async function(){
      let url = 'cohort_survival_analysis?date=' + moment().format('YYYY-MM-DD');
      url += "&quarter=" + this.reportQtr;
      url += "&age_group=" + this.$refs.subgroup.value + '&program_id=1';

      if(this.regenerateReport == true){
        this.regenerateReport = false;
        url += '&regenerate=true';
      }else{ 
        url += '&regenerate=false';
      }

      console.log(url)
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        this.loadData(await response.json(), this.$refs.subgroup.value);
      }else{
      }
    },loadData(data, age_group) {
     ;
      for(let qtr in data) {
        let row_id = (qtr.split(' ')[1]);
        let outcome = data[qtr];
        let set_quarter = qtr;
        let qinterval = '';
        let alive = 0;
        let died = 0;
        let defaulted = 0;
        let stopped = 0;
        let to = 0;
        let unknown = 0;
        let total_reg = 0;

        for(let c in outcome) {
          let interval = outcome[c]
          for(let i in interval) {
            qinterval = i
            if(c == 'On antiretrovirals') {
              alive = outcome[c][i];
            }else if(c == 'Defaulted'){
              defaulted = outcome[c][i];
            }else if(c == 'Patient died'){
              died = outcome[c][i];
            }else if(c == 'Stopped'){
              stopped = outcome[c][i];
            }else if(c == 'Patient transferred out'){
              to = outcome[c][i];
            }else{
              unknown = outcome[c][i]
            }

            total_reg += outcome[c][i];
          }
        }

        if(total_reg > 0) {
          let row = this.rows.push({1: set_quarter, 2:qinterval, 3:age_group, 4:total_reg,
            5 : '', 6:alive, 7:died, 8:defaulted, 9:stopped, 10:to, 11:unknown});
        }
      }
    },
    addClass(id) {
      var tr = document.getElementById(id);
      var cells = tr.getElementsByTagName('td');
      cells[5].setAttribute('class','count-separator');
    },
  },
  data () {
    return {
      reportQtr: [],
      regenerateReport: false,
      reportData: null,
      reportID: null,
      reportLoading: false,
      reportSelected: false,
      APIVersion: sessionStorage.APIVersion,
      EMCVersion: sessionStorage.EMCVersion,
      subgroup: "Select sub group",
      config: {
        card_title:
          "Survival Analysis.",
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
      rows: [],
      columns: [
        {
          label: "Reg Cohort",
          name: '1',
          sort: true,
        },
        {
          label: "Interval (Months)",
          name: '2',
          sort: true,
        },
        {
          label: "Sub group",
          name: '3',
          sort: true,
        },
        {
          label: "Total Reg (database)",
          name: '4',
          sort: true,
        },
        {
          label: "Total Reg (confirmed)",
          name: '5',
          sort: true,
        },
        {
          label: "Alive",
          name: '6',
          sort: true,
        },
        {
          label: "Died",
          name: '7',
          sort: true,
        },
        {
          label: "Defaulted",
          name: '8',
          sort: true,
        },
        {
          label: "Stopped",
          name: '9',
          sort: true,
        },
        {
          label: "Transferred out",
          name: '10',
          sort: true,
        },
        {
          label: "Unknown",
          name: '11',
        },
      ],
    }
  },
  computed: {
    ...mapState(['location']),
    getSubGroup() {
    },
    reportTitle() {
      return `MOH ${this.location.name} cohort report (Survival analysis) ${this.subgroup}`;
    }
  },
  mounted(){
  }
}


</Script>

<style scoped>
#example {
  text-align: center;
  margin-top: 20px;  
  border-top-style: solid;
  border-top-width: 1px;;
}

.disaggregated-numbers {
  text-align: right;
  padding-right: 10px;
}

#spinner {
  position: absolute;
  top: 15%;
  left: 40%;
}

#report-cover {
  position: absolute;
  background-color: black;
  width: 100%;
  height: 102%;
  left: 0%;
  top: 0%;
  z-index: 990;
  opacity: 0.65;
}

.title-table {
  display: table;
  width: 100%;
}

.title-row {
  display: table-row;
}

.title-cell {
  display: table-cell;
  height: 30px;
  vertical-align: top;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
}


#title-cell-left {
  vertical-align: middle;
  width: 100px;
}

#title-cell-left img {
  height: 95px;
  width: 95px;
  margin: 5px;
}

#title-cell-right {
  margin-left: 5px;
}

#data-cell {
  display: table-cell;
  width: 100%;
}

#report {
  width: 100%;
}

th {
  text-align: left;
}
</style>

<style>
.dt-center {
  border-right-style: solid;
  border-right-width: 5px;
}
</style>