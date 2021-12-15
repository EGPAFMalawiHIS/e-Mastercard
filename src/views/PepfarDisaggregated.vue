<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <!-- Page Content -->
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-sm-12" style="z-index: 30">
            <span
              >{{ report_title
              }}<button @click="$router.go(-1)" class="btn btn-primary">
                Back
              </button></span
            >

            <sdPicker :onSubmit="fetchDates"></sdPicker>
          </div>
        </div>

        <div class="row">
         
          <button class="btn btn-secondary" id="csv" @click="printCSV" :disabled="!reportSelected" style="margin: 0 0 10px 50px;"> CSV</button>
          <div class="col-12">
            <ReportOverlay
              :reportLoading="reportLoading"
              :reportSelected="reportSelected"
            >
              <table class="table table-striped report" id="cohort-clients">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Age group</th>
                    <th>Gender</th>
                    <th class="disaggregated-numbers">Tx new (new on ART)</th>
                    <th class="disaggregated-numbers">
                      TX curr (receiving ART)
                    </th>
                    <th class="disaggregated-numbers">
                      TX curr (received IPT)
                    </th>
                    <th class="disaggregated-numbers">
                      TX curr (screened for TB)
                    </th>
                  </tr>
                </thead>
                <tbody ref="tableBody">
                  <template v-for="(s, ind) in genders">
                    <tr
                      v-for="(i, index) in Object.keys(patientData)"
                      :key="s + index"
                    >
                      <td>{{ ind + 1 === 2 ? 15 + index + 1 : index + 1 }}</td>
                      <td>{{ i }}</td>
                      <td>{{ s }}</td>
                      <td v-for="(j, k) in Object.keys(patientData[i][s])" 
                        :key="k" @click="fetchDrillDown(s, i, j)"
                        :class="patientData[i][s][j].length > 0 ? 'drillable': ''">
                        {{patientData[i][s][j].length}}
                      </td>
                      
                    </tr>
                  </template>
                  <tr
                    v-for="(i, index) in Object.keys(allClients)"
                    :key="'all' + index"
                  >
                    <td>{{ index + 1 + 30 }}</td>
                    <td>All</td>
                    <td>{{ i }}</td>
                    <td v-for="(j, k) in Object.keys(allClients[i])" :key="k"> {{ allClients[i][j].length }}</td>
                    
                  </tr>
                </tbody>
              </table>
            </ReportOverlay>
          </div>
        </div>
      </div>

      <!-- Page Content end -->
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
          :total-rows="rows"
          aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>

import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import ReportOverlay from "../components/reports/ReportOverlay";

const keyList = {
  tx_new: [],
  tx_curr: [],
  tx_curr_ipt: [],
  tx_curr_screened_tb: [],
};


export default {
  name: "reports",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
  },
  methods: {
    fetchDates: function (dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.reportLoading = true;
      this.reportSelected = true;
      this.initializeReport();
      // this.allMales();

      // this.getAllFemale("Pregnant");
    },
    printCSV() {
      let y = null;
      let f = document.getElementsByTagName('thead')[0].getElementsByTagName('th');
    f.forEach(element => {
        if(y == null) {
            y = `"${element.innerText}",`; 
        }else {

        
        y += `"${element.innerText}",`;
        }
      });
      let jj = f[0].getElementsByTagName("tr");
      jj = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      jj.forEach(element => {
          y += "\n"; 
          element.getElementsByTagName('td').forEach(innerElement => {
              y += `"${innerElement.innerHTML}",`;
          });
      });

      y += "\n"; 
      y += `Date Created:  ${moment().format('YYYY-MM-DD:h:m:s')} 
                          e-Mastercard Version : ${sessionStorage.EMCVersion} 
                          API Version ${sessionStorage.APIVersion}`;
      for (let index = 0; index < 34; index++) {
        
      y += ","; 
      }
      this.report_title =
        "PEPFAR " + sessionStorage.location_name + " cohort disaggregated report ";
      this.report_title += moment(this.startDate).format("DDMMMYYYY");
      this.report_title += " - " + moment(this.endDate).format("DDMMMYYYY");
    var csvData = new Blob([y], {type: 'text/csv;charset=utf-8;'});
    //IE11 & Edge
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
    } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute('download', `${this.report_title}.csv`);
        document.body.appendChild(link);    
        link.click();
        document.body.removeChild(link);    
    }

    },
    initDataTable() {
      let start_date = moment(this.startDate).format("DD/MMM/YYYY");
      let end_date = moment(this.endDate).format("DD/MMM/YYYY");
      this.report_title =
        "PEPFAR " + sessionStorage.location_name + " cohort disaggregated report ";
      this.report_title += moment(this.startDate).format("DDMMMYYYY");
      this.report_title += " - " + moment(this.endDate).format("DDMMMYYYY");

      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[0, "asc"]],
        fixedHeader: false,
        searching: false,
        paging: false,
        Processing: false,
        ServerSide: false,
        scrollY: "50vh",
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
          leftColumns: 2,
          rightColumns: 1,
        },
        scroller: {
          loadingIndicator: true,
        },
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copy",
            title: this.report_title,
          },
          {
            extend: "csv",
            title: this.report_title,
            footer: true,
          },
          {
            extend: "pdf",
            title: this.report_title,
          },
          {
            extend: "print",
            title: this.report_title,
          },
        ],
      });
    },
    checkResult(data) {},
    datatableEnable(info) {
      this.formatedData = [];
      for (let patient_id in info) {
      }
    },
    fetchDrillDown(gender, age_group, key) {
      let clients = this.patientData[age_group][gender][key];
      if(clients.length > 0) {
        this.$bvModal.show("modal-1");
        this.drillClients = [];
        clients.forEach((element) => {
          this.getClient(element);
        });
      }
      
    },
    initializeReport: async function () {
      this.report_title =
        "PEPFAR " + sessionStorage.location_name + " cohort disaggregated report ";
      this.report_title += moment(this.startDate).format("DDMMMYYYY");
      this.report_title += " - " + moment(this.endDate).format("DDMMMYYYY");
      let url = "cohort_disaggregated";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&quarter=pepfar";
      url += "&age_group=" + this.ageGroups[0];
      url += "&rebuild_outcome=" + this.rebuildOutcome;
      url += "&initialize=" + this.initialize;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";


      let btns = document.getElementsByClassName("dt-button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("disabled", true);
        btns[i].style = "display: none;";
      }

      this.initialize = false;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        this.rebuildOutcome = false;
        response
          .json()
          .then((data) => setTimeout(() => this.addData(data), 5000));
      } else {
        setTimeout(() => this.fetchData(), 5000);
      }
    },
    addData(data) {
      let female_row;
      let male_row;
      for (let age_group in data) {
        let gender = data[age_group];
        for (let sex in gender) {
          let e = sex === "F" ? "female" : "male";
          let row_data = data[age_group][sex];
          this.screenedTB.push([row_data.tx_screened_for_tb, sex, age_group]);
          this.givenIPT.push([row_data.tx_given_ipt, sex, age_group]);
          if (sex == "M") {
            this.patientData[age_group]["male"]["tx_curr"] = row_data.tx_curr;
            this.patientData[age_group]["male"]["tx_new"] = row_data.tx_new;
            this.totalMales[0] += row_data.tx_new.length;
            this.totalMales[1] += row_data.tx_curr.length;
          } else if (sex == "F") {
            this.patientData[age_group]["female"]["tx_curr"] = row_data.tx_curr;
            this.patientData[age_group]["female"]["tx_new"] = row_data.tx_new;
            this.totalFemales[0] += row_data.tx_new.length;
            this.totalFemales[1] += row_data.tx_curr.length;
          }
        }
      }

      if (this.ageGroups.length > 0) this.ageGroups.shift();

      if (this.ageGroups.length > 0) this.initializeReport();

      if (this.ageGroups.length < 1) this.addTBscreenedData();
    },
    addTBscreenedData: async function () {
      let age_group = this.screenedTB[0][2];
      let gender = this.screenedTB[0][1];
      let el = this.screenedTB[0][0];

      let url = "screened_for_tb";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {

        this.screenedTB.shift();
        response.json().then((data) => {
          let g = gender === "F" ? "female" : "male";
          // console.log(age_group, g)
          this.patientData[age_group][g]["tx_curr_screened_tb"] = data;
          this.TBscreened(el, gender, data);
        });

        if (this.screenedTB.length < 1) {
          this.addGivenIPTdata();
        } else {
          setTimeout(() => this.addTBscreenedData(), 500);
        }
      } else {
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    addGivenIPTdata: async function () {
      let age_group = this.givenIPT[0][2];
      let gender = this.givenIPT[0][1];
      let el = this.givenIPT[0][0];
      let url = "clients_given_ipt";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        this.givenIPT.shift();
        response.json().then((data) => {
          let g = gender === "F" ? "female" : "male";
          this.patientData[age_group][g]["tx_curr_ipt"] = data;
          this.iptGiven(el, gender, data);
        });

        if (this.givenIPT.length < 1) {
          this.reportLoading = false;
          this.allMales();
        } else {
          setTimeout(() => this.addGivenIPTdata(), 500);
        }
      } else {
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    iptGiven(el, gender, data) {
      if (gender == "M") {
        this.totalMales[2] += data.length;
      } else {
        this.totalFemales[2] += data.length;
      }
    },
    TBscreened(el, gender, data) {
      el.innerHTML = data.length;

      if (gender == "M") {
        this.totalMales[3] += data.length;
      } else {
        this.totalFemales[3] += data.length;
      }
    },
    allMales() {
      Object.keys(this.allClients["male"]).forEach((element) => {
        const j = this.getTotalByKey("male", element);
        this.allClients["male"][element] = j;
      });
      this.getAllFemale("Pregnant");
    },
    getAllFemale: async function (age_group) {
      let url = "cohort_disaggregated";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";
      url += "&quarter=pepfar";
      url += "&initialize=false";
      url += "&rebuild_outcome=" + this.rebuildOutcome;

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.addNewFemaleRow(age_group, data));
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
    addNewFemaleRow(age_group, data) {
      for (let age in data) {
        let gender = data[age];
        for (let sex in gender) {
          let tx_new = data[age][sex].tx_new;
          let tx_curr = data[age][sex].tx_curr;
          let tx_screened_for_tb = data[age][sex].tx_screened_for_tb;
          let tx_given_ipt = data[age][sex].tx_given_ipt;

          if (age_group == "Pregnant") {
           
            this.allClients['FP']['tx_new'] = tx_new;
            this.allClients['FP']['tx_curr'] = tx_curr;
            this.allClients['FP']['tx_curr_ipt'] = tx_given_ipt;
            this.allClients['FP']['tx_curr_screened_tb'] = tx_screened_for_tb;
            this.getAllFemale("Breastfeeding");
          } else {
            this.allClients['Fbf']['tx_new'] = tx_new;
            this.allClients['Fbf']['tx_curr'] = tx_curr;
            this.allClients['Fbf']['tx_curr_ipt'] = tx_given_ipt;
            this.allClients['Fbf']['tx_curr_screened_tb'] = tx_screened_for_tb;
            this.loadFPdata("pregnant", "screened_for_tb");
          }
        }
      }
    },
    loadFPdata: async function (age_group, urlPath) {
      let url = urlPath;
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&gender=" + age_group;
      url += "&age_group=" + age_group;
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&program_id=1";

      const response = await ApiClient.get(url, {}, {});

      if (
        response.status === 200 &&
        age_group == "pregnant" &&
        urlPath == "screened_for_tb"
      ) {
        response
          .json()
          .then((data) => this.allClients['FP']['tx_curr_screened_tb'] = data);
        this.loadFPdata("breastfeeding", urlPath);
      } else if (
        response.status === 200 &&
        age_group == "breastfeeding" &&
        urlPath == "screened_for_tb"
      ) {
        response
          .json()
          .then((data) => this.allClients['Fbf']['tx_curr_screened_tb'] = data);
        this.loadFPdata("pregnant", "clients_given_ipt");
      } else if (response.status === 200 && age_group == "pregnant") {
        response
          .json()
          .then((data) => this.allClients['FP']['tx_curr_ipt'] = data);
        this.loadFPdata("breastfeeding", urlPath);
      } else if (response.status === 200 && age_group == "breastfeeding") {
        response
          .json()
          .then((data) => this.allClients['Fbf']['tx_curr_ipt'] = data);

        setTimeout(() => {

          this.addAllFemaleRow()
          }, 2000);
      }
    },
    assignValueTD(el, count, rowNum) {
      if (rowNum == 1) {
        jQuery("td", el)[5].innerHTML = count;
      } else {
        jQuery("td", el)[6].innerHTML = count;
      }
    },
    addAllFemaleRow() {
     
      Object.keys(this.allClients["male"]).forEach((element) => {
        const j = this.getTotalByKey("male", element);
        this.allClients["male"][element] = j;
      });
      Object.keys(keyList).forEach(ele => {
        let allPregnantFemales = this.allClients['FP'][ele];
        let allBfFemales = this.allClients['Fbf'][ele];
        let allFemales = this.getTotalByKey('female', ele);
          let jj =allFemales.filter( function( el ) {
          return !allPregnantFemales.includes( el );
        } );
          jj =jj.filter( function( el ) {
          return !allBfFemales.includes( el );
        } );
        this.allClients['FNP'][ele] = jj;
      })
      
    },
    getTotal(age_group, gender) {
      let total = 0;
      Object.keys(this.patientData[age_group][gender]).forEach((element) => {
        if (
          element === "tx_curr" ||
          element === "tx_new" ||
          element === "tx_curr_ipt" ||
          element === "tx_curr_screened_tb"
        ) {
        } else {
          total += this.patientData[age_group][gender][element].length;
        }
      });
      return total;
    },
    getTotalByKey(gender, key) {
      let total = [];
      Object.keys(this.patientData).forEach((element) => {
        total.push(...this.patientData[element][gender][key]);
      });
      return total;
    },getTotalClientsByKey(gender) {
       let total = 0;
      Object.keys(this.allClients[gender]).forEach((element) => {
        if (
          element === "tx_curr" ||
          element === "tx_new" ||
          element === "tx_curr_ipt" ||
          element === "tx_curr_screened_tb"
        ) {
        } else {
          total += this.allClients[gender][element].length;
        }
      });
      return total;
    },
    
  },
  computed: {
    rows() {
      return this.drillClients.length;
    },
  },
  mounted() {
  },
  data: function () {
    return {
      allKeys: {...keyList},
      reportData: null,
      report_title: "PEPFAR Disaggregated ",
      reportData: null,
      dTable: null,
      formatedData: [],
      rebuildOutcome: true,
      startDate: null,
      endDate: null,
      screenedTB: [],
      givenIPT: [],
      totalMales: [0, 0, 0, 0],
      totalRows: 0,
      totalFemales: [0, 0, 0, 0],
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
      reportLoading: false,
      reportSelected: false,
      fpRow: null,
      FbfRow: null,
      allRows: [],
      initialize: false,
      genders: ["female", "male"],
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
      ].reverse(),
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      allClients: {
        male: { ...keyList },
        FP: { ...keyList },
        FNP: { ...keyList },
        Fbf: { ...keyList },
      },
      patientData: {
        '<1 year': { male: {...keyList }, female: {...keyList } },
        '1-4 years': { male: {...keyList }, female: {...keyList } },
        '5-9 years': { male: {...keyList }, female: {...keyList } },
        '10-14 years': { male: {...keyList }, female: {...keyList } },
        '15-19 years': { male: {...keyList }, female: {...keyList } },
        '20-24 years': { male: {...keyList }, female: {...keyList } },
        '25-29 years': { male: {...keyList }, female: {...keyList } },
        '30-34 years': { male: {...keyList }, female: {...keyList } },
        '35-39 years': { male: {...keyList }, female: {...keyList } },
        '40-44 years': { male: {...keyList }, female: {...keyList } },
        '45-49 years': { male: {...keyList }, female: {...keyList } },
        '50-54 years': { male: {...keyList }, female: {...keyList } },
        '55-59 years': { male: {...keyList }, female: {...keyList } },
        '60-64 years': { male: {...keyList }, female: {...keyList } },
        '65-69 years': { male: {...keyList }, female: {...keyList } },
        '70-74 years': { male: {...keyList }, female: {...keyList } },
        '75-79 years': { male: {...keyList }, female: {...keyList } },
        '80-84 years': { male: {...keyList }, female: {...keyList } },
        '85-89 years': { male: {...keyList }, female: {...keyList } },
        '90 plus years': { male: {...keyList }, female: {...keyList } }
      }
    }
  },
};
</script>

<style scoped>
.drillable{
  color: blue;
  text-decoration: underline;
}
#main-container {
  padding-top: 10px !important;
}

span {
  text-align: left;
  float: left;
  padding-bottom: 30px;
  width: 100%;
}

button {
  float: right;
  right: 10px;
}

table {
  text-align: left;
  margin-left: 5px;
  padding-top: 10px;
}
</style>


<style>
.center-text {
  text-align: center;
}

.show-btn {
  font-size: 14px;
}

/* Ensure that the demo table scrolls */
th,
td {
  white-space: nowrap;
}
div.dataTables_wrapper {
  /* width: 800px;*/
  margin: 0 auto;
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
  display: none;
}

#spinner {
  position: absolute;
  top: 35%;
  left: auto;
  z-index: 991;
  width: 100px;
  height: 100px;
  display: none;
}
</style>