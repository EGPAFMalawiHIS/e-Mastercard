<template>
  <div class="d-flex" id="wrapper">
    <side-bar />
    <div id="page-content-wrapper">
      <top-nav />
      <div id="main-container" class="col-12 table-col">
        <div class="row">
          <div class="col-md-4">
            <label for="">Select data cleaning tool</label>
            <select class="form-control" name="" id="" v-model="report">
              <option v-for="(tool, index) in tools" :key="index" :value="{name: tool.name, path: tool.path}">
                {{tool.name}}
              </option>
            </select>
          </div>
          <div class="col-md-8">
          <sdPicker :onSubmit="fetchDates"></sdPicker>
          </div>
          <div class="form-group">
            
          </div>
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
import StartAndEndDatePicker from "@/components/picker.vue";

export default {
  name: "App",
  data: function() {
    return {
      reportData: null,
      dTable: null,
      formatedData: [],
      showLoader: false,
      report: {},
      tools: [
        {
          path:"DATE ENROLLED LESS THAN EARLIEST START DATE",
          name: "Patients with earliest start date less than date enrolled"
        },
        {
          path: "CLIENTS WITH ENCOUNTERS AFTER DECLARED DEAD",
          name: "Encounters after death"
        },
        {
          path: "DOB MORE THAN DATE ENROLLED",
          name: "Patients enrolled on art before birth"
        },
        {
          path: "MALE CLIENTS WITH FEMALE OBS",
          name: "Male patients with female observations"
        },
        {
          path: "MISSING START REASONS",
          name: "Patient without ART start reason"
        },
        {
          path: "MULTIPLE START REASONS",
          name: "Patients with multiple start reasons"
        },
        {
          path: "PRE ART OR UNKNOWN OUTCOMES",
          name: "Patients with PRE-ART / unknown as outcome status"
        },
        {
          path: "PRESCRIPTION WITHOUT DISPENSATION",
          name: "Patient with prescriptions without dispensation"
        }
      ],
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
        card_title: 'data cleaning tools',
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
      this.rows = [];
      this.report_title = this.report.name;
      const even = element => element === "Invalid date";
      if (dates.some(even)) {
        console.log("Check your dates");
      } else {
        this.showLoader = true;
        let url =
          "/art_data_cleaning_tools?start_date=" +
          dates[0] +
          "&end_date=" +
          dates[1];
        url += "&program_id=1";
        url += `&report_name=${this.report.path}`;
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
  }, computed: {
  }
};
</script>