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
                <th scope="col">ARV number</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th class="center-text" scope="col">Gender</th>
                <th class="center-text" scope="col">DOB</th>
                <th class="center-text" scope="col">Date missed</th>
                <th class="center-text" scope="col">Outcome</th>
                <th class="center-text" scope="col">Contact <br />Deatils</th>
                <th class="center-text" scope="col">&nbsp;</th>
              </tr>
            </thead>
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
      this.report_title ="Clinic" + sessionStorage.location_name + " Appointment missed report";
      this.report_title += moment(dates[0]).format('DDMMMYYYY');
      this.report_title += " - " + moment(dates[1]).format('DDMMMYYYY');
      let url_path = "/missed_appointments?start_date=" + dates[0] + "&end_date=" + dates[1]
      url_path += "&program_id=1&date=" +  moment().format('YYYY-MM-DD');
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.datatableEnable(data) );
      }
    },
    initDataTable(){
      this.dTable = jQuery("#cohort-clients").dataTable({
        order: [[ 0, "asc" ]],
        fixedHeader: true,
        data: this.formatedData,
        dom: 'Bfrtip',
        retrieve: true,
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
        ],
        columnDefs: [
          {"className": "center-arv", "targets": 0},
          {"className": "center-text", "targets": 3},
          {"className": "center-text", "targets": 4},
          {"className": "center-text", "targets": 5},
          {"className": "center-text", "targets": 6},
          {"className": "center-text", "targets": 7},
          {"className": "center-left", "targets": 8}
        ]
      });
    },
    datatableEnable(data){
      this.formatedData = []; 
      for(let i = 0; i < data.length; i++){
        /*this.dTable.fnAddData( [data[i].arv_number,
          data[i].given_name, data[i].family_name,
          data[i].gender, data[i].birthdate] );*/
        let birthdate;
        try {
          birthdate = moment(data[i].birthdate).format('DD/MMM/YYYY');
        }catch(e) {
          birthdate = 'N/A';
        }

        let contact = [];
        if(data[i].cell_number)
          contact.push("CELL: " + data[i].cell_number);

        if(data[i].district)
          contact.push("District: " + data[i].district);

        if(data[i].ta)
          contact.push("TA: " + data[i].ta);

        if(data[i].village)
          contact.push("Village: " + data[i].village);

        let contact_details = '';
        for(let j = 0; j < contact.length; j++) {
          if(j > 0)
            contact_details += '<br />';

          contact_details += contact[j];   
        }


        this.formatedData.push( [data[i].arv_number,
          data[i].given_name, data[i].family_name,
          data[i].gender, birthdate, data[i].appointment_date, 
          data[i].current_outcome, contact_details, this.createdShowBTN(data[i].person_id)] );
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
        report_title: 'Appointment missed ',
        reportData: null,
        dTable: null,
        formatedData: [],
        APIVersion: sessionStorage.APIVersion,
        EMCVersion: sessionStorage.EMCVersion,
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

.center-left {
    text-align: left;
    padding-left: 5px;
}

.center-arv {
    text-align: center;
    width: 150px;
}

</style>
