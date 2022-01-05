<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
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
          <template slot="birthdate" slot-scope="props">
            <b
              >{{ moment(props.cell_value).format("DD/MMM/YYYY") }} ({{
                moment().diff(props.cell_value, "years", false)
              }})</b
            >
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
import ApiClient from "@/services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from "moment";
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

export default {
  name: "App",
  data: function () {
    return {
      reportData: null,
      dTable: null,
      formatedData: [],
      showLoader: false,
      report_title: null,
      report: {},
      rows: [],
      columns: [
        {
          label: "ARV Number",
          name: "arv_number",
          // sort: true
        },
        {
          label: "First Name",
          name: "given_name",

          sort: true,
        },
        {
          label: "Last Name",
          name: "family_name",
          sort: true,
        },
        {
          label: "Gender",
          name: "gender",
          // sort: true
        },
        {
          label: "date of Birth",
          name: "birthdate",
          slot_name: "birthdate",
          // sort: true
        },
        {
          label: "Age (at reporting)",
          name: "current_age",
          slot_name: "current_age",
          // sort: true
        },
        {
          label: "Defaulter date",
          name: "defaulter_date",
          slot_name: "defaulter_date",
          // sort: true
        },
        {
          label: "Action",
          name: "person_id",
          slot_name: "patient_id",
        },
      ],
      config: {
        card_title: "MoH defaulter list",
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
    fetchDates: async function (dates) {
      this.rows = [];
      this.report_title = this.report.name;
      const even = (element) => element === "Invalid date";
      if (dates.some(even)) {
        console.log("Check your dates");
      } else {
        this.report_title =
          "MOH " + sessionStorage.location_name + " Defaulter list report";
        this.report_title += moment(dates[0]).format("DDMMMYYYY");
        this.report_title += " - " + moment(dates[1]).format("DDMMMYYYY");
        this.showLoader = true;
        let url =
          "/defaulter_list?start_date=" + dates[0] + "&date=" + dates[1];
        url += "&end_date=" + dates[1] + "&program_id=1&pepfar=false";
        const response = await ApiClient.get(url, {}, {});
        if (response.status === 200) {
          response.json().then((data) => {
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
    },
    onDownload() {
      let y = null;
      let cols = [...this.columns];
      cols.pop();
      // let cols = this.columns.pop();
      cols.forEach((element) => {
        y += `"${element.label}",`;
      });
      y = y.replace("null", "");
      this.rows.forEach((element) => {
        y += "\n";
        cols.forEach((el) => {
          y += `"${element[el["name"]]}",`;
        });
      });

      y += "\n";
      y += `Date Created:  ${moment().format("YYYY-MM-DD:h:m:s")} 
                          e-Mastercard Version : ${sessionStorage.EMCVersion}
                          Vbox ID: ${sessionStorage.vboxID} 
                          API Version ${sessionStorage.APIVersion}`;
      for (let index = 0; index < 34; index++) {
        y += ",";
      }
      var csvData = new Blob([y], { type: "text/csv;charset=utf-8;" });
      //IE11 & Edge
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
      } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute("download", `${this.report_title}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  },
  components: {
    VueBootstrap4Table,
    "top-nav": TopNav,
    "side-bar": Sidebar,
    sdPicker: StartAndEndDatePicker,
  },
  computed: {},
};
</script>
