<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <!-- Page Content -->
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <!-- <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>   -->
          <sdPicker :onSubmit="fetchDates"></sdPicker>
          <!-- <p style="color:red;"> check dates </p> -->
        </div>
        <vue-bootstrap4-table
          :rows="rows"
          :columns="columns"
          :config="config"
          :show-loader="showLoader"
          :actions="actions"
        >
          <template slot="birthdate" slot-scope="props">
            <b>{{moment(props.cell_value).format("DD/MMM/YYYY") }} ({{moment().diff(props.cell_value, 'years',false)}})</b>
          </template>
          <template slot="patient_id" slot-scope="props">
            <button type="button" class="btn btn-primary" @click="redirect(props.cell_value)">show</button>
          </template>
        </vue-bootstrap4-table>
      </div>
      <!-- Page Content end -->
    </div>
  </div>
</template>
<style>
.my-custom-class {
  margin: 3px;
}
</style>
<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import ApiClient from "../../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

export default {
  name: "App",
  data: function() {
    let report_title = "Appointment missed";
    return {
      report_title: report_title,
      reportData: null,
      dTable: null,
      formatedData: [],
      showLoader: false,
      rows: [],
      columns: [
        {
          label: "ARV Number",
          name: "arv_number",
          sort: true
        },
        {
          label: "First Name",
          name: "given_name",

          sort: true
        },
        {
          label: "Last Name",
          name: "family_name",
          sort: true
        },
        {
          label: "Gender",
          name: "gender",
          sort: true
        },
        {
          label: "date of Birth",
          name: "birthdate",
          slot_name: "birthdate",
          sort: true
        },
        {
          label: "Action",
          name: "patient_id",
          slot_name: "patient_id"
        }
      ],
      config: {
        card_title: report_title,
        show_refresh_button: false,
        show_reset_button: false
      },
      actions: [
        {
          btn_text: "PDF",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        },
        {
          btn_text: "CSV",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        },
        {
          btn_text: "Print",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        }
      ]
    };
  },
  methods: {
    fetchDates: async function(dates) {
      const even = element => element === "Invalid date";
      if (dates.some(even)) {
        console.log("Check your dates");
      } else {
        this.showLoader = true;
        let url =
          "/incomplete_visits"
        const response = await ApiClient.get(url, {}, {});
        if (response.status === 200) {
          response.json().then(data => {
            if (Object.keys(data).length > 0) {
              this.rows = data;
            }
          });
          this.showLoader = false;
        } else {
          this.showLoader = false;
        }
      }
    },
    redirect(id) {
      this.$router.push(`/patient/mastercard/${id}`);
    }
  },
  components: {
    VueBootstrap4Table,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker
  }
};
</script>