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
          <div class="col-sm12">
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
                    <th class="disaggregated-numbers">0A</th>
                    <th class="disaggregated-numbers">2A</th>
                    <th class="disaggregated-numbers">4A</th>
                    <th class="disaggregated-numbers">5A</th>
                    <th class="disaggregated-numbers">6A</th>
                    <th class="disaggregated-numbers">7A</th>
                    <th class="disaggregated-numbers">8A</th>
                    <th class="disaggregated-numbers">9A</th>
                    <th class="disaggregated-numbers">10A</th>
                    <th class="disaggregated-numbers">11A</th>
                    <th class="disaggregated-numbers">12A</th>
                    <th class="disaggregated-numbers">13A</th>
                    <th class="disaggregated-numbers">14A</th>
                    <th class="disaggregated-numbers">15A</th>
                    <th class="disaggregated-numbers">16A</th>
                    <th class="disaggregated-numbers">17A</th>
                    <th class="disaggregated-numbers">0P</th>
                    <th class="disaggregated-numbers">2P</th>
                    <th class="disaggregated-numbers">4P</th>
                    <th class="disaggregated-numbers">9P</th>
                    <th class="disaggregated-numbers">11P</th>
                    <th class="disaggregated-numbers">14P</th>
                    <th class="disaggregated-numbers">15P</th>
                    <th class="disaggregated-numbers">16P</th>
                    <th class="disaggregated-numbers">17P</th>
                    <th class="disaggregated-numbers">Unknown</th>
                    <th class="disaggregated-numbers">Total (regimen)</th>
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
                      <td @click="fetchDrillDown(s, i, 'tx_new')" class="drillable">
                        {{ patientData[i][s]["tx_new"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, 'tx_curr')" class="drillable">
                        {{ patientData[i][s]["tx_curr"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, 'tx_curr_ipt')" class="drillable">
                        {{ patientData[i][s]["tx_curr_ipt"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, 'tx_curr_screened_tb')" class="drillable">
                        {{ patientData[i][s]["tx_curr_screened_tb"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '0A')" class="drillable">
                        {{ patientData[i][s]["0A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '2A')" class="drillable">
                        {{ patientData[i][s]["2A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '4A')" class="drillable">
                        {{ patientData[i][s]["4A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '5A')" class="drillable">
                        {{ patientData[i][s]["5A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '6A')" class="drillable">
                        {{ patientData[i][s]["6A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '7A')" class="drillable">
                        {{ patientData[i][s]["7A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '8A')" class="drillable">
                        {{ patientData[i][s]["8A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '9A')" class="drillable">
                        {{ patientData[i][s]["9A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '10A')" class="drillable">
                        {{ patientData[i][s]["10A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '11A')" class="drillable">
                        {{ patientData[i][s]["11A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '12A')" class="drillable">
                        {{ patientData[i][s]["12A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '13A')" class="drillable">
                        {{ patientData[i][s]["13A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '14A')" class="drillable">
                        {{ patientData[i][s]["14A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '15A')" class="drillable">
                        {{ patientData[i][s]["15A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '16A')" class="drillable">
                        {{ patientData[i][s]["16A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '17A')" class="drillable">
                        {{ patientData[i][s]["17A"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '0P')" class="drillable">
                        {{ patientData[i][s]["0P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '2P')" class="drillable">
                        {{ patientData[i][s]["2P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '4P')" class="drillable">
                        {{ patientData[i][s]["4P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '9P')" class="drillable">
                        {{ patientData[i][s]["9P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '11P')" class="drillable">
                        {{ patientData[i][s]["11P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '14P')" class="drillable">
                        {{ patientData[i][s]["14P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '15P')" class="drillable">
                        {{ patientData[i][s]["15P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '16P')" class="drillable">
                        {{ patientData[i][s]["16P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, '17P')" class="drillable">
                        {{ patientData[i][s]["17P"].length }}
                      </td>
                      <td @click="fetchDrillDown(s, i, 'Unknown')" class="drillable">
                        {{ patientData[i][s]["Unknown"].length }}
                      </td>
                      <td>
                        {{ getTotal(i, s) }}
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
                    <td>{{ allClients[i]["tx_new"].length }}</td>
                    <td>{{ allClients[i]["tx_curr"].length }}</td>
                    <td>{{ allClients[i]["tx_curr_ipt"].length }}</td>
                    <td>{{ allClients[i]["tx_curr_screened_tb"].length }}</td>
                    <td>{{ allClients[i]["0A"].length }}</td>
                    <td>{{ allClients[i]["2A"].length }}</td>
                    <td>{{ allClients[i]["4A"].length }}</td>
                    <td>{{ allClients[i]["5A"].length }}</td>
                    <td>{{ allClients[i]["6A"].length }}</td>
                    <td>{{ allClients[i]["7A"].length }}</td>
                    <td>{{ allClients[i]["8A"].length }}</td>
                    <td>{{ allClients[i]["9A"].length }}</td>
                    <td>{{ allClients[i]["10A"].length }}</td>
                    <td>{{ allClients[i]["11A"].length }}</td>
                    <td>{{ allClients[i]["12A"].length }}</td>
                    <td>{{ allClients[i]["13A"].length }}</td>
                    <td>{{ allClients[i]["14A"].length }}</td>
                    <td>{{ allClients[i]["15A"].length }}</td>
                    <td>{{ allClients[i]["16A"].length }}</td>
                    <td>{{ allClients[i]["17A"].length }}</td>
                    <td>{{ allClients[i]["0P"].length }}</td>
                    <td>{{ allClients[i]["2P"].length }}</td>
                    <td>{{ allClients[i]["4P"].length }}</td>
                    <td>{{ allClients[i]["9P"].length }}</td>
                    <td>{{ allClients[i]["11P"].length }}</td>
                    <td>{{ allClients[i]["14P"].length }}</td>
                    <td>{{ allClients[i]["15P"].length }}</td>
                    <td>{{ allClients[i]["16P"].length }}</td>
                    <td>{{ allClients[i]["17P"].length }}</td>
                    <td>{{ allClients[i]["Unknown"].length }}</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </ReportOverlay>
          </div>
        </div>
      </div>

      <img src="../assets/load.gif" id="spinner" />
      <div id="report-cover"></div>
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
        <!-- <p class="my-4">Hello from modal!</p> -->
      </b-modal>
    </div>
  </div>
</template>

<script>
require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

//require("@/assets/datatable/jquery-ui.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css");
require("@/assets/datatable/css/fixedColumns.dataTables.min.css");

import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import ReportOverlay from "../components/reports/ReportOverlay";
import jQuery from "jquery";
import datatable from "datatables";
// import { filter } from 'vue/types/umd';

const keyList = {
  tx_new: [],
  tx_curr: [],
  tx_curr_ipt: [],
  tx_curr_screened_tb: [],
  "0A": [],
  "2A": [],
  "4A": [],
  "5A": [],
  "6A": [],
  "7A": [],
  "8A": [],
  "9A": [],
  "10A": [],
  "11A": [],
  "12A": [],
  "13A": [],
  "14A": [],
  "15A": [],
  "16A": [],
  "17A": [],
  "0P": [],
  "2P": [],
  "4P": [],
  "9P": [],
  "11P": [],
  "14P": [],
  "15P": [],
  "16P": [],
  "17P": [],
  Unknown: [],
};

require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js");
require("@/assets/datatable/js/dataTables.fixedHeader.min.js");

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
    initDataTable() {
      let start_date = moment(this.startDate).format("DD/MMM/YYYY");
      let end_date = moment(this.endDate).format("DD/MMM/YYYY");
      this.report_title =
        "MoH " + sessionStorage.location_name + " cohort disaggregated report ";
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
      //this.dTable.api().destroy();
      //this.initDataTable();
    },
    fetchDrillDown(gender, age_group, key) {
      this.$bvModal.show("modal-1");
      let clients = this.patientData[age_group][gender][key];
      this.drillClients = [];
      clients.forEach((element) => {
        this.getClient(element);
      });
    },
    initializeReport: async function () {
      this.report_title =
        sessionStorage.location_name + " MoH Disaggregated report";
      this.report_title +=
        moment().format("YYYY_MM_DD_h_m_s") +
        " EMC(" +
        sessionStorage.EMCVersion +
        ") " +
        "API(" +
        sessionStorage.APIVersion +
        ")";
      let url = "cohort_disaggregated";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&quarter=Custom";
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
        //response.json().then((data) => this.checkResult(data) );
        this.rebuildOutcome = false;
        response
          .json()
          .then((data) => setTimeout(() => this.addData(data), 5000));
      } else {
        setTimeout(() => this.fetchData(), 5000);
      }
    },
    addData(data) {
      // console.log(data);
      // let rows = this.$refs.tableBody.children;
      let female_row;
      let male_row;

      // for(let i = 0 ; i < rows.length; i++){
      //   let tds = rows[i].children;
      //   for(let j = 0; j < tds.length; j++){
      //      if(tds[j].innerHTML == this.ageGroups[0]){
      //        tds[2].innerHTML == 'Female' ? female_row = rows[i] : male_row = rows[i];
      //      }
      //   }
      // }

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
      url += "&outcome_table=temp_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );

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
      url += "&outcome_table=temp_patient_outcomes";
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
          ["female", "male"].forEach((element) => {
            Object.keys(this.patientData).forEach((innerElement) => {
              this.getRegimenInfo(element, innerElement);
            });
          });

          // document.getElementById("spinner").style =  "display:none;";
          // document.getElementById("report-cover").style =  "display:none;";
          this.reportLoading = false;
          // this.initDataTable();
          //Go to All males();
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
      // this.dTable.fnAddData([ "31", "All", "Male", this.totalMales[0],
      //   this.totalMales[1], this.totalMales[2], this.totalMales[3], 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0 ]);

          this.getAllFemale("Pregnant");
    },
    getAllFemale: async function (age_group) {
      let url = "cohort_disaggregated";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&outcome_table=temp_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&program_id=1";
      url += "&quarter=Custom";
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
      // var results = JSON.parse(this.responseText);
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
      // toPush.arv_number = identifier;
      // renderDrillDownData(toPush);
      return toPush;

      // console.log(patient_name, gender, age, addressl1, addressl2, phone_number, identifier, arv_number);
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
            this.allClients['FBf']['tx_new'] = tx_new;
            this.allClients['FBf']['tx_curr'] = tx_curr;
            this.allClients['FBf']['tx_curr_ipt'] = tx_given_ipt;
            this.allClients['FBf']['tx_curr_screened_tb'] = tx_screened_for_tb;
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
      url += "&outcome_table=temp_patient_outcomes";
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
          .then((data) => this.allClients['FBf']['tx_curr_screened_tb'] = data);
          // .then((data) => this.assignValueTD(this.fbfRow, data.length, 2));
        this.loadFPdata("pregnant", "clients_given_ipt");
      } else if (response.status === 200 && age_group == "pregnant") {
        response
          .json()
          .then((data) => this.allClients['FP']['tx_curr_ipt'] = data);
          // .then((data) => this.assignValueTD(this.fpRow, data.length, 1));
        this.loadFPdata("breastfeeding", urlPath);
      } else if (response.status === 200 && age_group == "breastfeeding") {
        response
          .json()
          .then((data) => this.allClients['FBf']['tx_curr_ipt'] = data);
          // .then((data) => this.assignValueTD(this.fbfRow, data.length, 1));
          //Go to All males();

        setTimeout(() => {

          this.addAllFemaleRow()
          }, 5000);
          // this.initDataTable();
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
      // this.allClients
      
      Object.keys(keyList).forEach(ele => {
        let allPregnantFemales = this.allClients['FP'][ele];
        let allBfFemales = this.allClients['FBf'][ele];
        let allFemales = this.getTotalByKey('female', ele);
          let jj =allFemales.filter( function( el ) {
          return !allPregnantFemales.includes( el );
        } );
          jj =jj.filter( function( el ) {
          return !allBfFemales.includes( el );
        } );
        this.allClients['FNP'][ele] = jj;
      })
      
      

      // Object.keys(this.allClients).forEach((element) => {
      //   total.push(...this.patientData[element][gender][key]);
      // });

      // Object.keys(this.allClients["female"]).forEach((element) => {
      //   // console.log(this.allClients["male"][element]);
      //   this.allClients["female"][element] = this.getTotalByKey("male", element);
      // });
      // let rows = this.$refs.tableBody.children;

      // for (let i = 0; i < rows.length; i++) {
      //   let td = rows[i].children[0];
      //   let tds = rows[i].children;
      //   if (td.innerHTML == "32" || td.innerHTML == "33") {
      //     this.totalFemales[0] -= parseInt(tds[3].innerHTML);
      //     this.totalFemales[1] -= parseInt(tds[4].innerHTML);
      //     this.totalFemales[2] -= parseInt(tds[5].innerHTML);
      //     this.totalFemales[3] -= parseInt(tds[6].innerHTML);
      //   }
      // }
      // this.dTable.fnAddData([
      //   "34",
      //   "All",
      //   "FNP",
      //   this.totalFemales[0],
      //   this.totalFemales[1],
      //   this.totalFemales[2],
      //   this.totalFemales[3],
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      // ]);

      // this.dTable.fnDestroy();
      // this.initDataTable();

      // /*............ Here ......................... */
      // rows = this.$refs.tableBody.children;
      // for (var i = 0; i < rows.length; i++) {
      //   let tds = rows[i].children;
      //   let innerHTML = tds[2].innerHTML;
      //   if (
      //     innerHTML == "Female" ||
      //     innerHTML == "Male" ||
      //     innerHTML == "FP" ||
      //     innerHTML == "FNP" ||
      //     innerHTML == "Fbf"
      //   )
      //     this.allRows.push(rows[i]);
      // }

      // this.getRegimenInfo(this.allRows[0]);
      /*............ Here ......................... */
    },
    getRegimenInfo: async function (gender, age_group) {
      // let tds = row.children;
      // let  age_group = tds[1].innerHTML;
      // let gender  = tds[2].innerHTML;

      let url = "disaggregated_regimen_distribution";
      url += "?date=" + moment().format("YYYY-MM-DD");
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&gender=" + gender;
      url += "&age_group=" + age_group;
      url += "&outcome_table=temp_patient_outcomes";
      url += "&program_id=1";

      // let btns = document.getElementsByClassName("dt-button");
      // for(let i = 0; i < btns.length; i++){
      //   btns[i].setAttribute("disabled", true);
      //   btns[i].style = "display: none;";
      // }

      const response = await ApiClient.get(url, {}, {});
      if (response.status === 200) {
        response
          .json()
          .then((data) => this.addRegimen(data, gender, age_group));
      }
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
    },
    addRegimen(data, gender, age_group) {
      for (let regimen in data) {
        this.patientData[age_group][gender][regimen] = data[regimen];
      }

      // this.dTable.api().destroy();
      // this.initDataTable();
    },
  },
  computed: {
    rows() {
      return this.drillClients.length;
    },
  },
  mounted() {
    // setTimeout(() => this.addTableBody(), 300);
  },
  data: function () {
    return {
      reportData: null,
      report_title: "MoH Disaggregated ",
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
      // columns: ['ARV Number', 'DOB', 'Gender', 'Village'],
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
      fbfRow: null,
      allRows: [],
      initialize: false,
      genders: ["female", "male"],
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
      ].reverse(),
      drillClients: [],
      perPage: 10,
      currentPage: 1,
      allClients: {
        male: { ...keyList },
        FP: { ...keyList },
        FNP: { ...keyList },
        FBf: { ...keyList },
      },
      patientData1: 
        {"0-5 months":{"male":{"tx_new":[],"tx_curr":[238],"tx_curr_ipt":[],"tx_curr_screened_tb":[238],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[238],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[],"tx_curr_ipt":[],"tx_curr_screened_tb":[],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"6-11 months":{"male":{"tx_new":[],"tx_curr":[19410],"tx_curr_ipt":[19410],"tx_curr_screened_tb":[19410],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[19410],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[111,1229,18663],"tx_curr_ipt":[],"tx_curr_screened_tb":[111,1229,18663],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[111,1229,18663],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"12-23 months":{"male":{"tx_new":[],"tx_curr":[],"tx_curr_ipt":[],"tx_curr_screened_tb":[],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[651,3049],"tx_curr_ipt":[3049],"tx_curr_screened_tb":[651,3049],"0A":[],"2A":[],"4A":[],"5A":[3049],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[651],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"2-4 years":{"male":{"tx_new":[],"tx_curr":[49,189,206,582,1040,1071,13741],"tx_curr_ipt":[1071],"tx_curr_screened_tb":[49,189,206,582,1040,1071,13741],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[49,206,582,1040,1071,13741],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[189],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[151,280,283,327,365,396,424,564,691,703,729,833,924,976,1033,1120,1204,7439],"tx_curr_ipt":[424],"tx_curr_screened_tb":[151,280,283,327,365,396,424,564,691,703,729,833,924,976,1033,1120,1204,7439],"0A":[],"2A":[],"4A":[],"5A":[365,729,1033],"6A":[],"7A":[396],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[151,280,283,327,424,564,691,703,833,924,976,1120,1204],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[7439],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"5-9 years":{"male":{"tx_new":[],"tx_curr":[353,569,1055,1194],"tx_curr_ipt":[353,569,1055],"tx_curr_screened_tb":[353,569,1055,1194],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[353,569,1055,1194],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[126,158,270,470,495,587,673,731,746,765,895,940,967,1021,1029,1060,1163,1249,3738,11922,15561,16821],"tx_curr_ipt":[11922],"tx_curr_screened_tb":[126,158,270,470,495,587,673,731,746,765,895,940,967,1021,1029,1060,1163,1249,3738,11922,15561,16821],"0A":[],"2A":[],"4A":[],"5A":[126,470,495,587,1249,3738,11922],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[158,270,673,731,746,765,895,940,967,1021,1029,1060,1163,15561,16821],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"10-14 years":{"male":{"tx_new":[],"tx_curr":[180,214,235,686,941,1027,1168,1209,1225,2351],"tx_curr_ipt":[235],"tx_curr_screened_tb":[180,214,235,686,941,1027,1168,1209,1225,2351],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[180,214,235,686,941,1027,1209,1225,2351],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[1168],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[90,97,269,296,426,504,611,646,655,674,758,890,959,1184,1199,1216,1272,5865,11166,16667],"tx_curr_ipt":[97,426,655,674,5865],"tx_curr_screened_tb":[90,97,269,296,426,504,611,646,655,674,758,890,959,1184,1199,1216,1272,5865,11166,16667],"0A":[],"2A":[97],"4A":[],"5A":[674,758,959,1184,1199],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[90,269,296,426,504,611,646,655,890,1216,1272,5865,11166],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[16667],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"15-17 years":{"male":{"tx_new":[],"tx_curr":[36,132,141,963],"tx_curr_ipt":[963],"tx_curr_screened_tb":[36,132,141,963],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[36,132,141,963],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[245,393,701,787,982,1035,1050,1078,1147],"tx_curr_ipt":[1078,1147],"tx_curr_screened_tb":[245,393,701,787,982,1035,1050,1078,1147],"0A":[],"2A":[],"4A":[],"5A":[245,393,1050],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[701,787,982,1035,1078,1147],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"18-19 years":{"male":{"tx_new":[],"tx_curr":[227,625,778,1004,1049,1206],"tx_curr_ipt":[1206],"tx_curr_screened_tb":[227,625,778,1004,1049,1206],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[227,625,778,1004,1049,1206],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[19777],"tx_curr":[644,662,727,834,844,971,1053,1062,1200,9293],"tx_curr_ipt":[644,662],"tx_curr_screened_tb":[644,662,727,834,844,971,1053,1062,1200,9293],"0A":[],"2A":[],"4A":[],"5A":[971,1053,1200,9293],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[644,662,727,834,844,1062],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"20-24 years":{"male":{"tx_new":[],"tx_curr":[363,409,658,678,829,1256,15679,16351,18224,18730,19258],"tx_curr_ipt":[678,829,15679,16351,18224,19258],"tx_curr_screened_tb":[363,409,658,678,829,1256,15679,16351,18224,18730,19258],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[363,409,658,678,829,15679,16351,18224,19258],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[1256,18730],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[48,85,124,154,163,241,265,498,583,851,898,919,974,1031,1086,1092,1226,1239,2596],"tx_curr_ipt":[48,1086],"tx_curr_screened_tb":[48,85,124,154,163,241,265,498,583,851,898,919,974,1031,1086,1092,1226,1239,2596],"0A":[],"2A":[],"4A":[],"5A":[85,498,851,1031,1086,1239],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[48,124,154,163,241,265,583,898,919,974,1092,1226,2596],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"25-29 years":{"male":{"tx_new":[],"tx_curr":[54,67,68,84,416,706,817,934,1059,19052],"tx_curr_ipt":[54,934,19052],"tx_curr_screened_tb":[54,67,68,84,416,706,817,934,1059,19052],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[54,67,68,84,416,706,817,934,1059,19052],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[47,302,308,342,679,700,757,870,883,930,957,961,978,1041,1047,1084,1162,1198,1253,1257],"tx_curr_ipt":[47,1198],"tx_curr_screened_tb":[47,302,308,342,679,700,757,870,883,930,957,961,978,1041,1047,1084,1162,1198,1253,1257],"0A":[],"2A":[],"4A":[],"5A":[679,930,957,961,1162],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[47,302,308,342,700,757,870,883,978,1041,1047,1084,1253,1257],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[1198],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"30-34 years":{"male":{"tx_new":[],"tx_curr":[185,538,590,666,742,983,4382,7985,16054,19261],"tx_curr_ipt":[983,7985,19261],"tx_curr_screened_tb":[185,538,590,666,742,983,4382,7985,16054,19261],"0A":[],"2A":[],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[666],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[185,538,590,742,983,4382,7985],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[16054],"4P":[],"9P":[19261],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[138,175,263,698,810,840,861,874,893,1087,1097,1098,1172,1185,1286,2491],"tx_curr_ipt":[1098,1172,1185],"tx_curr_screened_tb":[138,175,263,698,810,840,861,874,893,1087,1097,1098,1172,1185,1286,2491],"0A":[],"2A":[],"4A":[],"5A":[263,1087,1172,1286],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[138,175,698,810,861,874,893,1097,1098,1185,2491],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[840],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"35-39 years":{"male":{"tx_new":[],"tx_curr":[264,667,800,815,1067,1267],"tx_curr_ipt":[264,1067],"tx_curr_screened_tb":[264,667,800,815,1067,1267],"0A":[],"2A":[],"4A":[],"5A":[800],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[264,667,815,1067,1267],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[64,109,313,543,652,795,852,954,980,1014,1070,1268,16007,17200],"tx_curr_ipt":[64,109,543,652,980,16007],"tx_curr_screened_tb":[64,109,313,543,652,795,852,954,980,1014,1070,1268,16007,17200],"0A":[],"2A":[],"4A":[],"5A":[64,313,652,954,1070,1268,16007],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[109,543,795,852,980,1014,17200],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"40-44 years":{"male":{"tx_new":[],"tx_curr":[60,199,209,388,676,759,816,912,1015,1074,1103,1142,1210],"tx_curr_ipt":[1015],"tx_curr_screened_tb":[60,199,209,388,676,759,816,912,1015,1074,1103,1142,1210],"0A":[],"2A":[199,1103],"4A":[],"5A":[],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[60,209,388,676,759,816,912,1074,1142,1210],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[1015],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[],"tx_curr":[119,171,633,754,922,1005,1006,1076,1242,11927,12970],"tx_curr_ipt":[171,1076,12970],"tx_curr_screened_tb":[119,171,633,754,922,1005,1006,1076,1242,11927,12970],"0A":[],"2A":[],"4A":[],"5A":[171,11927,12970],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[119,633,754,922,1005,1006,1076,1242],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"45-49 years":{"male":{"tx_new":[21051],"tx_curr":[69,272,533,777,868,902,1207,11924,12037,13735,21051],"tx_curr_ipt":[777,12037],"tx_curr_screened_tb":[69,272,533,777,868,902,1207,11924,12037,13735,21051],"0A":[],"2A":[],"4A":[],"5A":[21051],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[69,272,533,777,868,902,1207,11924,12037,13735],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[21063],"tx_curr":[190,573,693,726,751,916,989,1119,1126,1176,5034,15161,21063],"tx_curr_ipt":[190,726,751,989],"tx_curr_screened_tb":[190,573,693,726,751,916,989,1119,1126,1176,5034,15161,21063],"0A":[],"2A":[],"4A":[],"5A":[693,751,1119,5034],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[190,573,726,916,989,1126,1176,15161,21063],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}},"50 plus years":{"male":{"tx_new":[1534],"tx_curr":[35,37,55,66,70,76,82,86,88,98,101,120,123,134,139,146,147,166,168,176,182,193,203,204,212,213,293,299,301,309,331,340,364,367,485,507,510,520,547,565,594,601,612,624,656,657,663,684,694,697,708,730,760,762,770,773,784,786,789,813,818,831,855,886,901,904,932,937,960,964,992,1034,1039,1044,1054,1064,1066,1079,1085,1114,1130,1131,1145,1152,1161,1167,1191,1203,1270,3755,5419,7930,13103,13104,14059,17095,17248],"tx_curr_ipt":[37,55,66,70,86,146,166,168,331,547,656,708,760,773,813,886,960,992,1066,1079,1145,14059,17095],"tx_curr_screened_tb":[35,37,55,66,70,76,82,86,88,98,101,120,123,134,139,146,147,166,168,176,182,193,203,204,212,213,293,299,301,309,331,340,364,367,485,507,510,520,547,565,594,601,612,624,656,657,663,684,694,697,708,730,760,762,770,773,784,786,789,813,818,831,855,886,901,904,932,937,960,964,992,1034,1039,1044,1054,1064,1066,1079,1085,1114,1130,1131,1145,1152,1161,1167,1191,1203,1270,3755,5419,7930,13103,13104,14059,17095,17248],"0A":[],"2A":[66],"4A":[],"5A":[],"6A":[],"7A":[134,964],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[35,37,55,70,76,82,86,88,98,101,120,123,139,146,147,166,168,176,182,193,203,204,212,213,293,299,301,309,331,340,364,367,485,507,510,520,547,565,594,601,612,657,684,694,697,708,730,760,762,770,773,784,786,789,818,831,855,886,901,904,932,937,960,992,1034,1039,1044,1054,1066,1079,1085,1114,1130,1131,1145,1152,1161,1167,1191,1203,1270,3755,5419,7930,13103,13104,14059,17095],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[624,656,663,813,1064,17248],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]},"female":{"tx_new":[19448,20721],"tx_curr":[34,46,56,57,58,65,74,75,77,81,93,94,108,116,118,128,133,142,153,159,161,164,174,187,192,196,197,201,210,215,220,231,244,247,253,261,279,288,323,325,328,337,346,360,382,395,410,430,458,464,480,486,491,511,516,519,546,576,585,596,604,610,613,614,617,618,622,635,637,643,654,660,661,664,665,670,672,683,688,689,690,705,710,711,717,719,720,721,723,734,735,739,743,749,750,755,763,768,776,781,796,799,803,806,821,823,824,843,849,854,867,875,879,897,900,905,907,908,910,926,929,938,946,947,949,951,969,973,996,999,1017,1022,1023,1046,1069,1073,1077,1082,1093,1095,1096,1121,1134,1138,1151,1153,1157,1170,1188,1195,1201,1205,1211,1214,1215,1218,1238,1254,1255,1258,1259,1262,1263,1264,1269,1285,2529,6727,11231,11545,12704,12971,16390,17392,17668,18535,18818,18970,19260,19448,20721],"tx_curr_ipt":[77,192,196,201,458,486,491,511,604,610,661,717,723,735,755,763,781,824,849,867,879,947,951,973,1046,1138,1195,1238,12971,17392,18818,18970,19260,19448],"tx_curr_screened_tb":[34,46,56,57,58,65,74,75,77,81,93,94,108,116,118,128,133,142,153,159,161,164,174,187,192,196,197,201,210,215,220,231,244,247,253,261,279,288,323,325,328,337,346,360,382,395,410,430,458,464,480,486,491,511,516,519,546,576,585,596,604,610,613,614,617,618,622,635,637,643,654,660,661,664,665,670,672,683,688,689,690,705,710,711,717,719,720,721,723,734,735,739,743,749,750,755,763,768,776,781,796,799,803,806,821,823,824,843,849,854,867,875,879,897,900,905,907,908,910,926,929,938,946,947,949,951,969,973,996,999,1017,1022,1023,1046,1069,1073,1077,1082,1093,1095,1096,1121,1134,1138,1151,1153,1157,1170,1188,1195,1201,1205,1211,1214,1215,1218,1238,1254,1255,1258,1259,1262,1263,1264,1269,1285,2529,6727,11231,11545,12704,12971,16390,17392,17668,18535,18818,18970,19260,19448,20721],"0A":[],"2A":[75,153,253,661],"4A":[],"5A":[34,46,57,65,81,93,118,133,142,161,174,197,215,231,244,279,323,325,458,480,511,519,576,585,613,614,643,654,665,683,688,689,690,705,734,735,750,799,803,806,821,854,910,1017,1093,1096,1151,1153,1157,1170,1188,1211,1218,1238,1254,1263,1285,11231,17668,18818,18970,19448],"6A":[],"7A":[],"8A":[],"9A":[],"10A":[],"11A":[],"12A":[],"13A":[56,58,74,77,94,108,116,128,159,164,187,192,196,210,220,247,261,288,328,337,346,360,382,395,410,430,464,486,491,516,546,596,604,610,617,618,622,635,637,660,664,670,672,710,711,717,719,720,723,739,743,749,755,763,768,776,781,796,823,824,843,849,867,875,879,897,900,905,907,908,926,929,938,946,947,949,951,969,973,996,999,1022,1023,1046,1069,1073,1077,1082,1095,1121,1134,1138,1195,1201,1205,1214,1215,1255,1258,1259,1262,1269,2529,6727,11545,12704,12971,16390,17392,18535,19260,20721],"14A":[],"15A":[],"16A":[],"17A":[],"0P":[],"2P":[201,721,1264],"4P":[],"9P":[],"11P":[],"14P":[],"15P":[],"16P":[],"17P":[],"Unknown":[]}}}
      ,
      patientData: {
        "0-5 months": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "6-11 months": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "12-23 months": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "2-4 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "5-9 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "10-14 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "15-17 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "18-19 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "20-24 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "25-29 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "30-34 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "35-39 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "40-44 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "45-49 years": {
          male: { ...keyList },
          female: { ...keyList },
        },
        "50 plus years": {
          male: { ...keyList },
          female: { ...keyList },
        },
      },
    };
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
