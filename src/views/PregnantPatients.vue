<template>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->
        <div id="main-container">
          <div class="row">
            <div class="col-sm-12" style="z-index: 20"> <!-- elevate date picker above overlay below -->
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
            <template slot="patient_id" slot-scope="props">
              <button
                type="button"
                class="btn btn-primary"
                @click="redirect(props.cell_value)"
              >
                show
              </button>
            </template>
          </vue-bootstrap4-table>
      </div>
      <!-- Page Content end -->
    </div>
  </div>
</template>

<script>import ApiClient from "../services/api_client";
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
    "vue-bootstrap4-table": VueBootstrap4Table
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
          label: "First Name",
          name: "given_name",
          exportable: false,
          sort: true,
        },
        {
          label: "Last Name",
          name: "family_name",
          exportable: false,
          sort: true,
        },
        {
          label: "Gender",
          name: "gender",
          sort: true
        },
        {
          label: "DOB",
          name: "birthdate",
          slot_name: "birthdate",
          sort: true
        },
        {
          label: "Actions",
          name: "patient_id",
          slot_name: "patient_id",
          exportable: false,
        },
      ],
      config: {
        card_title: "Pregnant Patients Clinic Report ",
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
      this.config.card_title += moment(dates[0]).format('DD/MMM/YYYY') + " - " + moment(dates[1]).format('DDMMMYYYY');
      let url_path = '/programs/1/reports/pregnant_patients?start_date=' + dates[0] + 'end_date='+dates[1];
      url_path += '&paginate=false';
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.rows = data);
      }
      this.showLoader = false;
    },
    redirect(id) {
      this.$router.push(`/patient/mastercard/${id}`);
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, this.config.card_title, {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
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
