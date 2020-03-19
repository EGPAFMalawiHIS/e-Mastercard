<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div class="alert alert-info">
          <strong>TX CURR MMD</strong> Clients that are alive and on treatment in the reporting period and
the difference in days between their clinical dispensation visit and next appointment / drug-runout date is:
          <ul>
            <li><3 months (1 – 89 days)</li>
            <li>3-5 months (90-179 days)</li>
            <li>6+ months (180 or more days)</li>
          </ul>
        </div>

        <div id="main-container" class="col-12 table-col">
          <!--span><button @click="$router.go(-1)" class="btn btn-primary">Back</button></span-->  
           <sdPicker :onSubmit="fetchDates"></sdPicker>
          
          
          <table class="table table-striped report" id="cohort-clients">
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col" style="width: 20%;">&nbsp;</th>
                <th class="center-text" scope="col"># of clients on <3 months of ARVs</th>
                <th class="center-text" scope="col"># of clients on 3 - 5 months of ARVs</th>
                <th class="center-text" scope="col"># of clients on >= 6 months of ARVs</th>
              </tr>
            </thead>
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
import moment, { max } from 'moment';
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
    fetchDates(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.fetchData();
    },
    fetchData: async function() {
      let group;
      let min_age;
      let max_age;
      if(this.reportingGroups.length > 0){
        let ages = this.setMinMaxAges(this.reportingGroups[0]);
        min_age = ages[0];
        max_age = ages[1];
      }else{
        return;
      }
      
      this.report_title = 'TX CURR MMD ';
      this.report_title += " between " + moment(this.startDate).format('dddd, Do of MMM YYYY');
      this.report_title += " and " + moment(this.endDate).format('dddd, Do of MMM YYYY');
      let url_path = 'arv_refill_periods?start_date=' + this.startDate + "&date=" + moment().format('YYYY-MM-DD');
      url_path += "&end_date=" + this.endDate + "&program_id=1&org=pepfar";
      url_path += "&min_age=" + min_age;
      url_path += "&max_age=" + max_age;

      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.addRow(data) );
        setTimeout(() => this.fetchData(), 500);
      }else{
        //setTimeout(() => this.fetchData(), 5000);
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        paging: false,
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
        ],
        columnDefs: [
          {"className": "center-text", "targets": 2},
          {"className": "center-text", "targets": 3},
          {"className": "center-text", "targets": 4}
        ]
      });
    },
    addRow(data){
      let column_3 = 0;
      let column_4 = 0;
      let column_5 = 0;

      for(let person_id in data){
        let info =  data[person_id];
        let prescribed_days = info.prescribed_days;

        if(prescribed_days < 90)
          column_3 += 1

        if(prescribed_days >= 90 && prescribed_days <= 179)
          column_4 += 1

        if(prescribed_days >= 180)
          column_5 += 1

      }
      this.dTable.fnAddData([ (this.rowCounter++), this.reportingGroups[0], column_3,
        column_4, column_5 ]);
      this.reportingGroups.shift();
    },
    setMinMaxAges(group){
      if(group == '<1 year')
        return [0, 0];

      if(group == '1-4 years')
        return [1, 4];

      if(group == '5-9 years')
        return [5, 9];

      if(group == '10-14 years')
        return [10, 14];

      if(group == '15-19 years')
        return [15, 19];

      if(group == '20-24 years')
        return [20, 24];

      if(group == '25-29 years')
        return [25, 29];

      if(group == '30-34 years')
        return [30, 34];

      if(group == '35-39 years')
        return [35, 39];

      if(group == '40-44 years')
        return [40, 44];

      if(group == '45-49 years')
        return [45, 49];

      if(group == '50 plus years')
        return [50, 10000];

      if(group == 'Unknown')
        return ['Unknown', 'Unknown'];

    }
  },
  mounted() {
    setTimeout(() => this.initDataTable(), 300);
  }, data: function() {
      return {
        report_title: 'TX CURR MMD ',
        reportData: null,
        dTable: null,
        startDate: null,
        endDate: null,
        rowCounter: 1,
        reportingGroups: [
          '<1 year', '1-4 years','5-9 years',
          '10-14 years', '15-19 years', '20-24 years',
          '25-29 years', '30-34 years', '35-39 years',
          '40-44 years', '45-49 years', '50 plus years',
          'Unknown'
        ]
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

.alert-info {
  width: 98%;
  margin: 10px;
  text-align: left;
}
</style>


<style>
.center-text {
    text-align: right;
    margin-right: 5px;
}

.show-btn {
  font-size: 14px;
}
</style>
