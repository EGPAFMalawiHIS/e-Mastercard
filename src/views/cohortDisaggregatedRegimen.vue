<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container" class="col-12 table-col">
          <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
           <sdPicker :onSubmit="fetchDates"></sdPicker>
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
            </tbody>
          </table>
        </div>

        <img src="../assets/load.gif" id="spinner" />
        <div id="report-cover"></div>
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
require("@/assets/datatable/css/fixedColumns.dataTables.min.css");

import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

import jQuery from 'jquery';
import datatable from 'datatables';



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
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
  },methods: {
    fetchDates: function(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.initializeReport();
    },
    initDataTable(){
      let start_date  = moment(this.startDate).format("DD/MMM/YYYY");
      let end_date = moment(this.endDate).format("DD/MMM/YYYY");
      this.report_title ="MoH" + sessionStorage.location_name + " Disaggregated regimen  distribution report. ";
      this.report_title += moment(this.startDate).format('DDMMMYYYY');
      this.report_title += " - " + moment(this.endDate).format('DDMMMYYYY');
      if(!start_date == 'Invalid date'){
        this.report_title += " Reporting  period: " + start_date;
        this.report_title += " " + end_date;
      }

      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: false,
        searching: false,
        paging: false,
        Processing: false,
        ServerSide: false,
        scrollY: "50vh",
        scrollX: true,
        scrollCollapse: true,
        fixedColumns:   {
          leftColumns: 2,
          rightColumns: 1
        },
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

          while (td_count < 34) {
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
      setTimeout(() => this.initDataTable(), 300);
    },
    initializeReport: async function() {
      this.report_title = sessionStorage.location_name + " MoH Disaggregated report";
      this.report_title +=  moment().format('YYYY_MM_DD_h_m_s')+" EMC("+sessionStorage.EMCVersion+") " + "API("+sessionStorage.APIVersion+")";
      let url = 'cohort_disaggregated';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&quarter=Custom";
      url += "&age_group=" + this.ageGroups[0];
      url += "&rebuild_outcome=" + this.rebuildOutcome;
      url += "&initialize=" + this.initialize;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';

      document.getElementById("spinner").style =  "display:inline;";
      document.getElementById("report-cover").style =  "display:inline;";

      let btns = document.getElementsByClassName("dt-button");
      for(let i = 0; i < btns.length; i++){
        btns[i].setAttribute("disabled", true); 
        btns[i].style = "display: none;";
      }

      this.initialize = false;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.rebuildOutcome = false;
        response.json().then((data) =>  setTimeout(() => this.addData(data), 5000) );
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }

    },
    addData(data) {
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
           let children  = e.children;

           children[3].innerHTML = row_data.tx_new;
           children[4].innerHTML = row_data.tx_curr;
           this.screenedTB.push( [children[6], sex, age_group] );
           this.givenIPT.push( [children[5], sex, age_group] );

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
        this.initializeReport(); 

      if(this.ageGroups.length < 1)
        this.addTBscreenedData();

    },
    addTBscreenedData: async function() {
      let age_group = this.screenedTB[0][2];
      let gender  = this.screenedTB[0][1];
      let el = this.screenedTB[0][0];
     
      let url = 'screened_for_tb';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&outcome_table=temp_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.screenedTB.shift();
        response.json().then((data) =>  this.TBscreened(el, gender, data) );

        if(this.screenedTB.length < 1) {
           this.addGivenIPTdata();
        }else{
          setTimeout(() => this.addTBscreenedData(), 500);
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
      url += "&outcome_table=temp_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.givenIPT.shift();
        response.json().then((data) =>  this.iptGiven(el, gender, data) );

        if(this.givenIPT.length < 1) {
           //Go to All males();
           this.allMales();
        }else{
          setTimeout(() => this.addGivenIPTdata(), 500);
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
    allMales() {
      this.dTable.fnAddData([ "31", "All", "Male", this.totalMales[0],
        this.totalMales[1], this.totalMales[2], this.totalMales[3], 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0 ]);
      
      this.getAllFemale("Pregnant");
    },
    getAllFemale: async function(age_group) {
      let url = 'cohort_disaggregated';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&outcome_table=temp_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
      url += "&quarter=Custom";
      url += "&initialize=false";
      url += "&rebuild_outcome=" + this.rebuildOutcome;
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) =>  this.addNewFemaleRow(age_group, data) );
      }

    },
    addNewFemaleRow(age_group, data){
      for(let age in data) {
        let gender = data[age];
        for(let sex in gender) {
          let tx_new = data[age][sex].tx_new;
          let tx_curr = data[age][sex].tx_curr;
          let tx_screened_for_tb = data[age][sex].tx_screened_for_tb;
          let tx_given_ipt = data[age][sex].tx_given_ipt;

          if(age_group == 'Pregnant'){
            let newRow = this.dTable.fnAddData([ "32", "All", "FP", tx_new,
              tx_curr, tx_given_ipt, tx_screened_for_tb, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0 ]);

            let oSettings = this.dTable.fnSettings();
            let nTr = oSettings.aoData[ newRow[0] ].nTr;
            this.fpRow = nTr;

            this.getAllFemale('Breastfeeding');
          } else {
            let newRow = this.dTable.fnAddData([ "33", "All", "Fbf", tx_new,
              tx_curr, tx_given_ipt, tx_screened_for_tb, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0 ]);
            
            let oSettings = this.dTable.fnSettings();
            let nTr = oSettings.aoData[ newRow[0] ].nTr;

            this.fbfRow = nTr;
            this.loadFPdata("pregnant", 'screened_for_tb');
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
      url += "&outcome_table=temp_patient_outcomes";
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200 && age_group == 'pregnant' && urlPath == 'screened_for_tb') {
        response.json().then((data) =>  this.assignValueTD(this.fpRow, data.length, 2) );
        this.loadFPdata("breastfeeding", urlPath);
      }else if(response.status === 200 && age_group == 'breastfeeding' && urlPath == 'screened_for_tb'){
        response.json().then((data) =>  this.assignValueTD(this.fbfRow, data.length, 2) );
        this.loadFPdata("pregnant", 'clients_given_ipt');
      }else if(response.status === 200 && age_group == 'pregnant'){
        response.json().then((data) =>  this.assignValueTD(this.fpRow, data.length, 1) );
        this.loadFPdata("breastfeeding", urlPath);
      }else if(response.status === 200 && age_group == 'breastfeeding'){
        response.json().then((data) =>  this.assignValueTD(this.fbfRow, data.length, 1) );
        setTimeout(() => this.addAllFemaleRow(), 5000);
      }
    },
    assignValueTD(el, count, rowNum){
      if(rowNum == 1){
        jQuery('td', el)[5].innerHTML = count;
      }else{
        jQuery('td', el)[6].innerHTML = count;
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
        this.totalFemales[1], this.totalFemales[2], this.totalFemales[3], 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0]);
      
      this.dTable.fnDestroy();
      this.initDataTable();

      /*............ Here ......................... */
      rows = this.$refs.tableBody.children;
      for(var i =  0; i < rows.length; i++){
        let tds = rows[i].children; 
        let innerHTML  = tds[2].innerHTML;
        if(innerHTML == 'Female' || innerHTML == 'Male' || innerHTML == 'FP' || innerHTML == 'FNP' || innerHTML == 'Fbf') 
          this.allRows.push(rows[i]);
      
      }

      this.getRegimenInfo(this.allRows[0]);
      /*............ Here ......................... */
    },
    getRegimenInfo: async function(row){
      let tds = row.children;
      let  age_group = tds[1].innerHTML;
      let gender  = tds[2].innerHTML;

      let url = "disaggregated_regimen_distribution";
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += "&gender=" + gender;
      url += "&age_group=" + age_group;
      url += "&outcome_table=temp_patient_outcomes";
      url += '&program_id=1';
    
      let btns = document.getElementsByClassName("dt-button");
      for(let i = 0; i < btns.length; i++){
        btns[i].setAttribute("disabled", true); 
        btns[i].style = "display: none;";
      }

      const response = await ApiClient.get(url, {}, {});
      if (response.status === 200) {
        response.json().then((data) =>  this.addRegimen(data, tds) );
      }

    },
    addRegimen(data, tds){
      this.allRows.shift();
      let total = 0;

      for(let regimen in  data){
        if(regimen == '0A')
          tds[7].innerHTML = data[regimen].length;

        if(regimen == '2A')
          tds[8].innerHTML = data[regimen].length;

        if(regimen == '4A')
          tds[9].innerHTML = data[regimen].length;

        if(regimen == '5A')
          tds[10].innerHTML = data[regimen].length;

        if(regimen == '6A')
          tds[11].innerHTML = data[regimen].length;

        if(regimen == '7A')
          tds[12].innerHTML = data[regimen].length;

        if(regimen == '8A')
          tds[13].innerHTML = data[regimen].length;

        if(regimen == '9A')
          tds[14].innerHTML = data[regimen].length;

        if(regimen == '10A')
          tds[15].innerHTML = data[regimen].length;

        if(regimen == '11A')
          tds[16].innerHTML = data[regimen].length;

        if(regimen == '12A')
          tds[17].innerHTML = data[regimen].length;

        if(regimen == '13A')
          tds[18].innerHTML = data[regimen].length;

        if(regimen == '14A')
          tds[19].innerHTML = data[regimen].length;

        if(regimen == '15A')
          tds[20].innerHTML = data[regimen].length;

        if(regimen == '16A')
          tds[21].innerHTML = data[regimen].length;

        if(regimen == '17A')
          tds[22].innerHTML = data[regimen].length;

        if(regimen == '0P')
          tds[23].innerHTML = data[regimen].length;

        if(regimen == '2P')
          tds[24].innerHTML = data[regimen].length;

        if(regimen == '4P')
          tds[25].innerHTML = data[regimen].length;

        if(regimen == '9P')
          tds[26].innerHTML = data[regimen].length;

        if(regimen == '11P')
          tds[27].innerHTML = data[regimen].length;

        if(regimen == '14P')
          tds[28].innerHTML = data[regimen].length;

        if(regimen == '15P')
          tds[29].innerHTML = data[regimen].length;

        if(regimen == '16P')
          tds[30].innerHTML = data[regimen].length;

        if(regimen == '17P')
          tds[31].innerHTML = data[regimen].length;

        if(regimen == 'N/A')
          tds[32].innerHTML = data[regimen].length;

      
        total += data[regimen].length;
      }
      tds[33].innerHTML = total;

      if(this.allRows.length > 0){
        this.getRegimenInfo(this.allRows[0]);
      }else{
        this.dTable.api().destroy();
        this.initDataTable();

        document.getElementById("spinner").style =  "display:none;";
        document.getElementById("report-cover").style =  "display:none;";

      }

    }
  },
  mounted() {
    setTimeout(() => this.addTableBody(), 300);
  }, data: function() {
    return {
        reportData: null,
        report_title: 'MoH Disaggregated ',
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
        fpRow: null,
        fbfRow: null,
        allRows: [],
        initialize: false,
        ageGroups: [
          '0-5 months', '6-11 months','12-23 months',
          '2-4 years', '5-9 years',
          '10-14 years', '15-17 years',
          '18-19 years', '20-24 years',
          '25-29 years', '30-34 years',
          '35-39 years', '40-44 years',
          '45-49 years', '50 plus years'
        ].reverse()
      }
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


/* Ensure that the demo table scrolls */
th, td { white-space: nowrap; }
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
