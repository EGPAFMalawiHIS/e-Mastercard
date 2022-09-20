<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <!-- Page Content -->
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-md-12">
            <datePicker :onSubmit="fetchDate"></datePicker>
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
          <template slot="gender" slot-scope="{ cell_value }">
            {{ formatGender(cell_value) }}
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

<script>
import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import DatePicker from "@/components/DatePicker.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { exportToCSV } from "../utils/exports";
import { formatGender } from "../utils/str";

export default {
  name: "ClinicAppointments",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    datePicker: DatePicker,
    VueBootstrap4Table,
  },
  data: function () {
    return {
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
          slot_name: "gender",
          sort: true,
        },
        {
          label: "DOB",
          name: "birthdate",
          slot_name: "birthdate",
          sort: true,
        },
        {
          label: "Actions",
          name: "person_id",
          slot_name: "patient_id",
          exportable: false,
        },
      ],
      config: {
        card_title: "Clinic Appointments report",
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
    };
  },
  methods: {
    formatGender(g) {
      return formatGender(g);
    },
    fetchDate: async function (date) {
      this.config.card_title += moment(date).format("DD/MMM/YYYY");
      let url_path = "/programs/1/scheduled_appointments?date=" + date;
      url_path += "&paginate=false";
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => (this.rows = data));
      } else {
        setTimeout(() => this.fetchDate(date), 3000);
      }
    },
    redirect(id) {
      this.$router.push(`/patient/mastercard/${id}`);
    },
    onDownload() {
      exportToCSV(this.columns, this.rows, this.config.card_title);
    },
  },
};
</script>

<style scoped>
#main-container {
  padding-top: 10px !important;
}

span {
  text-align: left;
  float: left;
  padding-bottom: 30px;
  width: 100%;
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
