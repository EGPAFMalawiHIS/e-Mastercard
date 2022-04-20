
<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container">
          <div class="row">
            <div class="col-sm-12" style="z-index: 20"> <!-- elevate date picker above overlay below -->
              <span>{{reportTitle}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>  
              <sdPicker :onSubmit="fetchDates"></sdPicker>
            </div>
          </div>

           <div class="row">
             <div class="col-sm-12">
               <b-overlay :show="hideReport" spinner-type="grow" spinner-variant="primary">
                  <template v-if="!reportSelected" v-slot:overlay>
                    <h1>No Report Selected</h1>
                  </template>
            <table class="table table-striped report" id="cohort-clients">
            <thead>
              <tr>
                <th>Weight Band</th>
                <th>Gender</th>
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
                <th class="disaggregated-numbers">4PP</th>
                <th class="disaggregated-numbers">4PA</th>
                <th class="disaggregated-numbers">9PP</th>
                <th class="disaggregated-numbers">9PA</th>
                <th class="disaggregated-numbers">11PP</th>
                <th class="disaggregated-numbers">11PA</th>
                <th class="disaggregated-numbers">12PA</th>
                <th class="disaggregated-numbers">12PA</th>
                <th class="disaggregated-numbers">14PA</th>
                <th class="disaggregated-numbers">14PP</th>
                <th class="disaggregated-numbers">15PA</th>
                <th class="disaggregated-numbers">15PP</th>
                <th class="disaggregated-numbers">16P</th>
                <th class="disaggregated-numbers">17PA</th>
                <th class="disaggregated-numbers">17PP</th>
                <th class="disaggregated-numbers">Unknown</th>
                <th class="disaggregated-numbers">Total (regimen)</th>
              </tr>
            </thead>
            <tbody ref="tableBody">
              <tr v-for="(reg, index) in reportData" :key="index">
                <td>{{reg.weight}}</td>
                <td>Male</td>

                <td v-for="(r, innerIndex) in reg.males" :key="innerIndex">
                  {{r[Object.keys(r)[0]]}}
                </td>
              </tr>
              <tr v-for="(reg, index) in reportData" :key="index+'fem'">
                <td>{{reg.weight}}</td>

                <td>Female</td>
                <td v-for="(r, innerIndex) in reg.females" :key="innerIndex">
                  {{r[Object.keys(r)[0]]}}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  Date Created:  {{moment().format('YYYY-MM-DD:h:m:s')}} 
                  Quarter: {{startDate}} to {{endDate}}
                  e-Mastercard Version : {{EMCVersion}} 
                  Site UUID: {{siteUUID}}
                  API Version {{APIVersion}}
                </td>
              </tr>
            </tfoot>
          </table>
               </b-overlay>
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
    initializeReport: async function() {
      this.reportLoading = true;
      this.reportSelected = true;
      let url = '/programs/1/reports/regimens_by_weight_and_gender?';
      url += "start_date=" + this.startDate;
      url += "&end_date=" + this.endDate;

      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => {
          this.mergeRegimens(data);
        }
        );
      }else{
      }

    },
    initDataTable(){
      this.report_title ="MoH "+ sessionStorage.location_name + " disaggregated regimen distribution by weight report ";
      this.report_title += moment(this.startDate).format('DDMMMYYYY');
      this.report_title += " - " + moment(this.endDate).format('DDMMMYYYY'); 
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
    mergeRegimens(regimens) {
      regimens.forEach((element, index )=> {
        regimens[index].males = this.getReg(element.males);
        regimens[index].females = this.getReg(element.females);
      });
      this.reportData = regimens; 
      this.reportLoading = false;
      setTimeout(() => this.initDataTable(), 400);
    },
    getReg(regimens) {
      let regimenProto = [
            {"0A": 0},
            {"2A": 0},
            {"4A": 0},
            {"5A": 0},
            {"6A": 0},
            {"7A": 0},
            {"8A": 0},
            {"9A": 0},
            {"10A": 0},
            {"11A": 0},
            {"12A": 0},
            {"13A": 0},
            {"14A": 0},
            {"15A": 0},
            {"16A": 0},
            {"17A": 0},
            {"0P": 0},
            {"2P": 0},
            {"4PP": 0},
            {"4PA": 0},
            {"9PP": 0},
            {"9PA": 0},
            {"11PP": 0},
            {"11PA": 0},
            {"12PP": 0},
            {"12PA": 0},
            {"14PA": 0},
            {"14PP": 0},
            {"15PP": 0},
            {"15PA": 0},
            {"16P": 0},
            {"17PA": 0},
            {"17PP": 0},
            {"N/A": 0},
      ];
      let total = {"total": 0};
      regimens.forEach((el, innerIndex) => {
        regimenProto.forEach((element, index) => {
            if(element.hasOwnProperty(Object.keys(el))) {
              regimenProto[index] = el;
            }
          });
          total.total += el[Object.keys(el)[0]];
        });
      regimenProto.push(total);
      return(regimenProto);
    }
  },
  mounted() {
  }, data: function() {
   
    return {
        siteUUID: sessionStorage.siteUUID,
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
        reportSelected: false,
        reportLoading: false,
        APIVersion: sessionStorage.APIVersion,
        EMCVersion: sessionStorage.EMCVersion,
        reportData: [
            
        ]
      }
    },
     computed: {
    getRegimens() {
      return this.regimens;
    },
    hideReport() {
      return this.reportLoading || !this.reportSelected;
    },
    reportTitle() {
      return `${this.$store.state.location.name} Regimen Distribution by weight `;
    }
  },
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
</style>
