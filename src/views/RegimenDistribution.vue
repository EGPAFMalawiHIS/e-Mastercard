<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container" class="col-12 table-col">
          <div class="row">
            <div class="col-md-12">
              <sdPicker :onSubmit="fetchDates"></sdPicker>
            </div>
          </div>
          <vue-bootstrap4-table
            :rows="rows"
            :columns="columns"
            :config="config"
            :show-loader="showLoader"
            :actions="actions"
            @on-download="onDownload"
          >
            <template slot="sort-asc-icon">&#8593;</template>
            <template slot="sort-desc-icon">&#8595;</template>
            <template slot="no-sort-icon">&#8593;&#8595;</template>
            <template slot="birthdate" slot-scope="props">
              {{ moment(props.cell_value).format("DD/MMM/YYYY") }}
            </template>
            <template slot="start_date" slot-scope="props">
              {{ moment(props.cell_value).format("DD/MMM/YYYY") }}
            </template>
            <template slot="dispensed_date" slot-scope="props">
              {{ moment(props.cell_value).format("DD/MMM/YYYY") }}
            </template>
            <template slot="vl_result_date" slot-scope="props">
              {{ moment(props.cell_value).format("DD/MMM/YYYY") }}
            </template>
            <template slot="medication" slot-scope="props">
              {{ props.cell_value.map(m => `${m.medication} (${m.quantity})`).join(",") }}
            </template>
          </vue-bootstrap4-table>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { exportToCSV } from "../utils/exports";

export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker,
    VueBootstrap4Table,
  },
  data: function() {
    return {
      startDate: '',
      endDate: '',
      showLoader: false,
      rows: [],
      columns: [
        {
          label: "ARV Number",
          name: "arv_number",
          sort: true,
          initial_sort: true,
          initial_sort_order: "asc",
        },
        {
          label: "Gender",
          name: "gender",
        },
        {
          label: "DOB",
          name: "birthdate",
          slot_name: "birthdate",
        },
        {
          label: "Start Date",
          name: "art_start_date",
          slot_name: "start_date",
        },
        {
          label: "Weight (Kg)",
          name: "current_weight",
        },
        {
          label: "Regimen",
          name: "current_regimen",
        },
        {
          label: "ARVS",
          name: "medication",
          slot_name: "medication",
        },
        {
          label: "Dispensed Date",
          name: "dispensed_date",
          slot_name: "dispensed_date",
        },
        {
          label: "VL Result",
          name: "vl_result",
        },
        {
          label: "Date of VL Result",
          name: "vl_result_date",
          slot_name: "vl_result_date",
        }
      ],
      config: {
        card_title: "Regimen Dispensation Clinic Report",
        show_refresh_button: false,
        show_reset_button: false,
      },
      actions: [
        {
          btn_text: "CSV",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg",
          },
        },
      ],
    }
  },
  methods: {
    async fetchDates(dates) {
      this.showLoader = true;
      this.startDate = dates[0]
      this.endDate = dates[1]
      this.config.card_title += " " + moment(dates[0]).format('DD/MMM/YYYY');
      this.config.card_title += " - " + moment(dates[1]).format('DD/MMM/YYYY');
      let url_path = '/regimen_report?start_date=' + dates[0] + "&date=" + dates[1];
      url_path += "&end_date=" + dates[1] + "&program_id=1&type=moh"; 
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => 
          this.rows = Object.values(data).map(d => ({
            ...d,
            dispensed_date: d.medication.length > 0 ? d.medication[0].start_date : '',
          }))
        );
      }else{
        setTimeout(() => this.fetchDates(dates), 5000);
      }
      this.showLoader = false;
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, this.config.card_title, {
        startDate: this.startDate,
        endDate: this.endDate,
      });
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
</style>
