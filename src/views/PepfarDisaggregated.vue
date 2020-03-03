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
              </tr>
            </thead>
            <tbody ref="tableBody">
            </tbody>
          </table>
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
            title:  this.report_title
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
      setTimeout(() => this.initDataTable(), 300);
    },
    initializeReport: async function() {
      this.report_title = "Appointment missed";
      let url = 'cohort_disaggregated';
      url += "?date=" + moment().format('YYYY-MM-DD');
      url += "&quarter=pepfar";
      url += "&age_group=" + this.ageGroups[0];
      url += "&rebuild_outcome=" + this.rebuildOutcome;
      url += "&initialize=false";
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
      
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
           e.children[3].innerHTML = row_data.tx_new;
           e.children[4].innerHTML = row_data.tx_curr;
           this.screenedTB.push( [e.children[6], sex, age_group] );
           this.givenIPT.push( [e.children[5], sex, age_group] );
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
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.screenedTB.shift();
        response.json().then((data) =>  el.innerHTML = data.length );
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
      url += "&outcome_table=temp_pepfar_patient_outcomes";
      url += "&age_group=" + age_group;
      url += "&gender=" + gender;
      url += "&start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;
      url += '&program_id=1';
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        //response.json().then((data) => this.checkResult(data) );
        this.givenIPT.shift();
        response.json().then((data) =>  el.innerHTML = data.length );
        if(this.givenIPT.length < 1) {
           //got to IPT 
        }else{
          setTimeout(() => this.addGivenIPTdata(), 500);
        }
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }
    }
  },
  mounted() {
    setTimeout(() => this.addTableBody(), 300);
  }, data: function() {
      return {
        report_title: 'PEPFAR Disaggregated ',
        reportData: null,
        dTable: null,
        formatedData: [],
        rebuildOutcome: true,
        startDate: null,
        endDate: null,
        screenedTB: [],
        givenIPT: [],
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
</style>
