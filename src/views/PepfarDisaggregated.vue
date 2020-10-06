<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container">
          <div class="row">
            <div class="col-sm-12" style="z-index: 30">
              <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
              <sdPicker :onSubmit="fetchDates"></sdPicker>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
             <ReportOverlay :reportLoading="reportLoading" :reportSelected="reportSelected">
              <table class="table table-striped report" id="cohort-clients">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Age group</th>
                    <th>Gender</th>
                    <th class="disaggregated-numbers">Tx new (new on ART)</th>
                    <th class="disaggregated-numbers">TX curr (receiving ART)</th>
                    <th class="disaggregated-numbers">TX curr (received IPT)</th>
                    <th class="disaggregated-numbers">TX curr (screened for TB)</th>
                  </tr>
                </thead>
                <tbody ref="tableBody">
                </tbody>
                  <tfoot>
              <tr>
                <td>
                  Date Created:  {{moment().format('YYYY-MM-DD:h:m:s')}} 
                  e-Mastercard Version : {{EMCVersion}} 
                  API Version {{APIVersion}}
                </td>
              </tr>
            </tfoot>
              </table>
             </ReportOverlay>
            </div>
          </div>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
</template>

<script>

require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

//require("@/assets/datatable/jquery-ui.css");
require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css");

import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import { mapState } from "vuex";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import ReportOverlay from "../components/reports/ReportOverlay";

import jQuery from 'jquery';
import datatable from 'datatables';



require("@/assets/datatable/js/buttons.flash.min.js");
require("@/assets/datatable/js/jszip.min.js");
require("@/assets/datatable/js/pdfmake.min.js");
require("@/assets/datatable/js/vfs_fonts.js");
require("@/assets/datatable/js/buttons.html5.min.js");
require("@/assets/datatable/js/buttons.print.min.js");


export default {
  name: "reports",
  components: {
    ReportOverlay,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },methods: {
    async fetchDates(dates) {
      
      try {
        [this.startDate, this.endDate] = dates;

        const isValidDate = date => date && date !== 'Invalid date';

        if (!(isValidDate(this.startDate) && isValidDate(this.endDate))) return;
        this.report_title ='PEPFAR ' + sessionStorage.location_name + ' cohort disaggregated report ';
        this.report_title += moment(dates[0]).format('DDMMMYYYY');
        this.report_title += " - " + moment(dates[1]).format('DDMMMYYYY');
        this.reportLoading = true;
        this.reportSelected = true;

      this.initDataTable();
        await this.initializeReport();
      } catch (e) {
        this.$router.push({name: 'error', params: {message: e.message}});
      } finally {
        this.reportLoading = false;
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        searching: false,
        paging: false,
        Processing: true,
        ServerSide: true,
        scroller: {
          loadingIndicator: true
        },
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy',
            title:  this.report_title
          },
          {
            extend: 'csv',
            title:  this.report_title,
            footer: true
          },
          {
            extend: 'pdf',
            title:  this.report_title
          },
          {
            extend: 'print',
            title:  this.report_title
          }
        ]
      });
    },
    checkResult(data){
    },
    datatableEnable(info){
      this.formatedData = []; 
      for(let patient_id in info){
      }
      //this.dTable.api().destroy();
      //this.initDataTable();
    },
    addTableBody() {
      let columns = [
        '0-5 months', '6-11 months','12-23 months',
        '2-4 years', '5-9 years',
        '10-14 years', '15-17 years',
        '18-19 years', '20-24 years',
        '25-29 years', '30-34 years',
        '35-39 years', '40-44 years',
        '45-49 years', '50 plus years'
      ];

      let table_body  = this.$refs.tableBody;
      let row_count = 1;
      let gender = ['Female', 'Male'];

      for(let s = 0 ; s < gender.length; s++){
        for(let i = 0 ; i < columns.length; i++){
          let tr = document.createElement('tr');
          tr.setAttribute('class', gender[s] + '_row');
          table_body.appendChild(tr);
          let td_count = 0;

          while (td_count < 7) {
            var td = document.createElement('td');
            tr.appendChild(td);
            if(td_count == 0)
              td.innerHTML = (row_count++);
            
            if(td_count == 1)
              td.innerHTML = columns[i];
               
            if(td_count == 2)
              td.innerHTML = gender[s];
               
            if(td_count > 2){
              td.innerHTML = 0;
              td.setAttribute('class','disaggregated-numbers');
            }   
            tr.appendChild(td);
            td_count++;
          }
        }
      }
      // setTimeout(() => this.initDataTable(), 300);
    },
    initializeReport: async function() {
      let url = 'cohort_disaggregated';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&quarter=pepfar";
      url += "&age_group=" + this.ageGroups[0];
      url += "&rebuild_outcome=" + this.rebuildOutcome;
      url += "&initialize=false";
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
      
      // setTimeout(() => this.initDataTable(), 300);
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.rebuildOutcome = false;
        await this.addData(await response.json());
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }

    },
    async addData(data) {
      let rows = this.$refs.tableBody.children;
      let female_row;
      let male_row;

      for(let i = 0 ; i < rows.length; i++){
        let tds = rows[i].children;
        for(let j = 0; j < tds.length; j++){
           if(tds[j].innerHTML == this.ageGroups[0]){
             tds[2].innerHTML == 'Female' ? female_row = rows[i] : male_row = rows[i];
           } 
        }
      }

      for(let age_group in data){
        let gender = data[age_group];
        for(let sex in gender){
           let e = (sex == 'F' ?  female_row : male_row);
           let row_data = data[age_group][sex];
           e.children[3].innerHTML = row_data.tx_new;
           e.children[4].innerHTML = row_data.tx_curr;
           this.screenedTB.push( [e.children[6], sex, age_group] );
           this.givenIPT.push( [e.children[5], sex, age_group] );

           if(sex == 'M') {
             this.totalMales[0] += row_data.tx_new;
             this.totalMales[1] += row_data.tx_curr;
           }else{
             this.totalFemales[0] += row_data.tx_new;
             this.totalFemales[1] += row_data.tx_curr;
           }

        }
      }  

      if(this.ageGroups.length > 0)
        this.ageGroups.shift();

      if(this.ageGroups.length > 0)
        await this.initializeReport(); 

      if(this.ageGroups.length < 1)
        await this.addTBscreenedData();

      // this.initDataTable();
    },
    addTBscreenedData: async function() {
      if (this.screenedTB.length === 0) return;

      let age_group = this.screenedTB[0][2];
      let gender  = this.screenedTB[0][1];
      let el = this.screenedTB[0][0];
      
      let url = 'screened_for_tb';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.screenedTB.shift();
        this.TBscreened(el, gender, await response.json());

        if(this.screenedTB.length < 1) {
          await this.addGivenIPTdata();
        }else{
          await this.addTBscreenedData();
        }
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    addGivenIPTdata: async function() {
      let age_group = this.givenIPT[0][2];
      let gender  = this.givenIPT[0][1];
      let el = this.givenIPT[0][0];
      
      let url = 'clients_given_ipt';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.givenIPT.shift();
        this.iptGiven(el, gender, await response.json());

        if(this.givenIPT.length < 1) {
           //Go to All males();
           await this.allMales();
        }else{
          await this.addGivenIPTdata();
        }
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    iptGiven(el, gender, data){
      el.innerHTML = data.length;
      if(gender == 'M') {
        this.totalMales[2] += data.length;
      }else{
        this.totalFemales[2] += data.length;
      }

    },
    TBscreened(el, gender, data){
      el.innerHTML = data.length;

      if(gender == 'M'){
        this.totalMales[3] += data.length;
      }else{
        this.totalFemales[3] += data.length;
      }
    
    },
    async allMales() {
      this.dTable.fnAddData([ "31", "All", "Male", this.totalMales[0],
        this.totalMales[1], this.totalMales[2], this.totalMales[3] ]);
      
      await this.getAllFemale("Pregnant");
    },
    getAllFemale: async function(age_group) {
      let url = 'cohort_disaggregated';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
      url += "&quarter=pepfar";
      url += "&initialize=false";
      url += "&rebuild_outcome=" + this.rebuildOutcome;
     
      const response = await ApiClient.get(url);

      if (response.status === 200) {
        await this.addNewFemaleRow(age_group, await response.json());
      }

    },
    async addNewFemaleRow(age_group, data){
      for(let age in data) {
        let gender = data[age];
        for(let sex in gender) {
          let tx_new = data[age][sex].tx_new;
          let tx_curr = data[age][sex].tx_curr;
          let tx_screened_for_tb = data[age][sex].tx_screened_for_tb;
          let tx_given_ipt = data[age][sex].tx_given_ipt;

          if(age_group == 'Pregnant'){
            let newRow = this.dTable.fnAddData([ "32", "All", "FP", tx_new,
              tx_curr, tx_given_ipt, tx_screened_for_tb ]);

            let oSettings = this.dTable.fnSettings();
            let nTr = oSettings.aoData[ newRow[0] ].nTr;
            this.fpRow = nTr;

            await this.getAllFemale('Breastfeeding');
          } else {
            let newRow = this.dTable.fnAddData([ "33", "All", "Fbf", tx_new,
              tx_curr, tx_given_ipt, tx_screened_for_tb ]);
            
            let oSettings = this.dTable.fnSettings();
            let nTr = oSettings.aoData[ newRow[0] ].nTr;

            this.fbfRow = nTr;
            await this.loadFPdata("pregnant", 'screened_for_tb');
          } 
        }
      }
    },
    loadFPdata: async function(age_group, urlPath){
      let url = urlPath;
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&gender=" + age_group;
      url += "&age_group=" + age_group;
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += '&program_id=1';
     
      const response = await ApiClient.get(url);

      if (response.status === 200 && age_group == 'pregnant' && urlPath == 'screened_for_tb') {
        this.assignValueTD(this.fpRow, (await response.json()).length, 2);
        await this.loadFPdata("breastfeeding", urlPath);
      }else if(response.status === 200 && age_group == 'breastfeeding' && urlPath == 'screened_for_tb'){
        this.assignValueTD(this.fbfRow, (await response.json()).length, 2);
        await this.loadFPdata("pregnant", 'clients_given_ipt');
      }else if(response.status === 200 && age_group == 'pregnant'){
        this.assignValueTD(this.fpRow, (await response.json()).length, 1);
        await this.loadFPdata("breastfeeding", urlPath);
      }else if(response.status === 200 && age_group == 'breastfeeding'){
        this.assignValueTD(this.fbfRow, (await response.json()).length, 1);
        this.addAllFemaleRow();
      }
    },
    assignValueTD(el, count, rowNum){
      if(rowNum == 1){
        console.log(jQuery('td', el)[5].innerHTML = count);
      }else{
        console.log(jQuery('td', el)[6].innerHTML = count);
      }
    },addAllFemaleRow(){
      let rows = this.$refs.tableBody.children;

      for(let i = 0 ; i < rows.length; i++){
        let td = rows[i].children[0];
        let tds = rows[i].children;
         if(td.innerHTML == "32" || td.innerHTML == "33"){
           this.totalFemales[0] -= parseInt(tds[3].innerHTML);
           this.totalFemales[1] -= parseInt(tds[4].innerHTML);
           this.totalFemales[2] -= parseInt(tds[5].innerHTML);
           this.totalFemales[3] -= parseInt(tds[6].innerHTML);
        }
      }
      this.dTable.fnAddData([ "34", "All", "FNP", this.totalFemales[0],
        this.totalFemales[1], this.totalFemales[2], this.totalFemales[3] ]);
      
      this.dTable.fnDestroy();
      this.initDataTable();
    }
  },
  mounted() {
    setTimeout(() => this.addTableBody(), 300);
  }, data: function() {
    return {
        reportData: null,
        dTable: null,
        formatedData: [],
        rebuildOutcome: true,
        startDate: null,
        endDate: null,
        screenedTB: [],
        givenIPT: [],
        totalMales: [0, 0, 0, 0],
        totalFemales: [0, 0, 0, 0],
        report_title: null,
        fpRow: null,
        fbfRow: null,
        ageGroups: [
          '0-5 months', '6-11 months','12-23 months',
          '2-4 years', '5-9 years',
          '10-14 years', '15-17 years',
          '18-19 years', '20-24 years',
          '25-29 years', '30-34 years',
          '35-39 years', '40-44 years',
          '45-49 years', '50 plus years'
        ].reverse(),
        reportLoading: false,
        reportSelected: false,
        APIVersion: sessionStorage.APIVersion,
        EMCVersion: sessionStorage.EMCVersion,
      }
    },
    computed: {
      ...mapState(['location']),
      
    }
}

</script>

<style scoped>
#main-container {
    padding-top: 10px !important;
}

span {
  text-align: left;
  float: left;
  padding-bottom: 30px;
  width:  100%;
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
</style>
