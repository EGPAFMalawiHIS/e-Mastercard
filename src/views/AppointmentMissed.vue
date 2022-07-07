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
              ({{moment().diff(props.cell_value, "years", false)}})
            </template>
            <template slot="appointment_date" slot-scope="props">
              {{ moment(props.cell_value).format("DD/MMM/YYYY") }}
            </template>
            <template slot="contact_details" slot-scope="props">
              <i v-html="props.cell_value"></i>
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
          label: "Date Missed",
          name: "appointment_date",
          slot_name: "appointment_date",
          sort: true
        },
        {
          label: "Outcome",
          name: "current_outcome",
          sort: true
        },
        {
          label: "Contact Details",
          name: "contact_details",
          slot_name: "contact_details",
        },
        {
          label: "Actions",
          name: "person_id",
          slot_name: "patient_id",
          exportable: false,
        },
      ],
      config: {
        card_title: "Clinic Appointment missed report",
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
    fetchDates: async function(dates) {
      this.showLoader = true;
      this.startDate = dates[0]
      this.endDate = dates[1]
      this.config.card_title += " " + moment(dates[0]).format('DD/MMM/YYYY');
      this.config.card_title += " - " + moment(dates[1]).format('DD/MMM/YYYY');
      let url_path = "/missed_appointments?start_date=" + dates[0] + "&end_date=" + dates[1]
      url_path += "&program_id=1&date=" +  moment().format('YYYY-MM-DD');
      const response = await ApiClient.get(url_path, {}, {});

      if (response.status === 200) {
        response.json().then((data) => {
          this.rows = data.map(p => ({
            ...p,
            contact_details: `Cell: ${p.cell_number}<br>
                              District: ${p.district}<br>
                              TA: ${p.ta}<br>
                              Village: ${p.village}`,
          }))
        });
      }
      this.showLoader = false
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

.center-left {
    text-align: left;
    padding-left: 5px;
}

.center-arv {
    text-align: center;
    width: 150px;
}

</style>
