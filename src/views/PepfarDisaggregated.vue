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
    fetchDates: async function(dates) {
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
