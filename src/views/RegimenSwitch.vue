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
                <th scope="col">ARV#</th>
                <th class="center-text" scope="col">Gender</th>
                <th class="center-text" scope="col">DoB (Age in Years)</th>
                <th class="center-text" scope="col">Prev.Regimen</th>
                <th class="center-text" scope="col">Curr.Regimen</th>
                <th class="center-text" scope="col">ARVs</th>
                <th class="center-text" scope="col">Dispensed date</th>
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
import moment from 'moment';
import { mapState } from 'vuex';
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
      this.report_title = this.location.name + "  Regimen switch report: ";
      this.report_title += " between " + moment(dates[0]).format('dddd, Do of MMM YYYY');
      this.report_title += " and " + moment(dates[1]).format('dddd, Do of MMM YYYY');
      this.report_title +=  moment().format('YYYY_MM_DD_h_m_s')+" EMC("+sessionStorage.EMCVersion+") " + "API("+sessionStorage.APIVersion+")";
      let url_path = '/regimen_switch?start_date=' + dates[0] + "&date=" + dates[1];
      url_path += "&end_date=" + dates[1] + "&program_id=1&pepfar=false"; 
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.checkResult(data) );
      }else{
        setTimeout(() => this.fetchData(), 5000);
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        data: this.formatedData,
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
          {"className": "center-text", "targets": 1},
          {"className": "center-text", "targets": 3},
          {"className": "center-text", "targets": 4},
          {"className": "center-text", "targets": 6}
        ]
      });
    },
    checkResult(data){
      const url_string = window.location;
      const parsedURL = new URL(url_string);
      const resource_id = parsedURL.searchParams.get("resource_id");
      this.reportData = data;
      setTimeout(() => this.datatableEnable(data), 10);
    },
    datatableEnable(info){
      this.formatedData = []; 
      console.log(info);

      for(let patient_id in info){
        let data = info[patient_id];
        const birthdate = data.birthdate ? `${data.birthdate} (${moment(new Date()).diff(data.birthdate, 'years')})`
                                         : 'N/A';
        
        let current_reg = data.current_regimen;
        let medications = [];
        let meds = data.medication;
        let prescription_date;
        let previous_reg = data.previous_regimen;
        
        for(let i = 0; i < meds.length; i++){
            medications.push(meds[i].medication + " (" + meds[i].quantity + ")");
            prescription_date = moment(meds[i].start_date).format('DD/MMM/YYYY');
        }  

        this.formatedData.push( [data.arv_number,
          data.gender, birthdate, previous_reg, current_reg,
          medications.join('<br />'), prescription_date ] );
      }
      this.dTable.api().destroy();
      this.initDataTable();
    },
    createdShowBTN(person_id){
      var span = document.createElement('span');
      var button  = document.createElement('button');
      button.setAttribute("onclick", 'javascript:location="/patient/mastercard/' + person_id + '"');
      button.innerHTML = "Show";
      button.setAttribute('class','btn-warning show-btn');
      span.appendChild(button);
      return span.innerHTML;
    }
  },
  mounted() {
    setTimeout(() => this.initDataTable(), 300);
  }, data: function() {
      return {
        report_title: 'Regimen switch report',
        reportData: null,
        dTable: null,
        formatedData: []
      }
    },
    computed: {
      ...mapState(['location'])
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
