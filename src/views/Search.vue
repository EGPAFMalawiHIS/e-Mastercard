<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <div
          class="container-fluid"
          style="width: 40%; margin: auto; margin-top: 12px"
        >
          <div class="input-group mb-3 rounded">
            <input
              class="form-control mb-2 mr-sm-2"
              :class="$v.searchText.$error && 'form-input-error'"
              id="myInput"
              type="text"
              placeholder="Search by Name or ARV Number"
              v-model.trim="$v.searchText.$model"
              v-on:keyup.enter="searchPatients"
            />
            <div class="">
              <select
                name="gender"
                id="gender"
                class="form-control form-control"
                v-model="gender"
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <button
              class="btn btn-primary"
              type="button"
              @click="searchPatients"
              style="margin-left: 10px"
            >
              search
            </button>
          </div>

          <span v-if="$v.searchText.$dirty">
            <p class="text-danger form-error" v-if="!$v.searchText.required">
              A name or an ARV number is required
            </p>
          </span>
        </div>

        <div class="container-fluid">
          <vue-bootstrap4-table
            :rows="rows"
            :columns="columns"
            :config="config"
            :show-loader="showLoader"
            :actions="actions"
            @redirect="onRedirect"
          >
            <template slot="arv_number" slot-scope="props">
              <b>{{ formatARVNumber(props.cell_value) }}</b>
            </template>
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
                @click="redirect('/patient/mastercard/' + props.cell_value)"
              >
                select
              </button>
            </template>
            <template slot="rm_patient_id" slot-scope="props">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-danger"
                data-toggle="modal"
                @click="showWarningWindow(props.cell_value)"
              >
                Void
              </button>
            </template>
          </vue-bootstrap4-table>
        </div>

        <b-modal
          id="void-reason-modal"
          ref="void-reason-modal"
          hide-footer
          title="Warning"
        >
          <div class="d-block">
            <p>
              Are you sure you want to void this client? <br />
              Voding will remove the client into the program and void all visits
            </p>
          </div>

          <div class="text-center">
            <b-list-group>
              <b-list-group-item
                button
                v-bind:class="{ active: reasonAnswer == 'duplicate' }"
                @click="reasonAnswer = 'duplicate'"
                >Duplicate entry</b-list-group-item
              >
              <b-list-group-item
                button
                v-bind:class="{ active: reasonAnswer == 'ghost' }"
                @click="reasonAnswer = 'ghost'"
                >Ghost Client</b-list-group-item
              >
              <b-list-group-item
                button
                v-bind:class="{ active: reasonAnswer == 'test' }"
                @click="reasonAnswer = 'test'"
                >Test client</b-list-group-item
              >
            </b-list-group>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-button
                class="mt-3"
                variant="outline-secondary"
                block
                @click="hideReasonPopUp"
                >Cancel</b-button
              >
            </div>
            <div class="col-md-6">
              <b-button
                class="mt-3"
                variant="danger"
                block
                v-bind:class="{ disabled: reasonAnswer == '' }"
                @click="voidClient(reasonAnswer)"
                >Void</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import PatientCard from "@/components/PatientCard.vue";
import ApiClient from "../services/api_client";
import PatientService from "../services/patient_service";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import VueBootstrap4Table from "vue-bootstrap4-table";

export default {
  name: "home",
  mixins: [validationMixin],
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-card": PatientCard,
    VueBootstrap4Table,
  },
  data: function () {
    return {
      searchText: null,
      showAdvanced: false,
      results: [],
      gender: null,
      loading: false,
      showLoader: false,
      rows: [],
      reasonAnswer: "",
      patientId: null,
      columns: [
        {
          label: "ARV Number",
          name: "patient_identifiers",
          slot_name: "arv_number",
          sort: true,
        },
        {
          label: "First Name",
          name: "person.names[0].given_name",

          sort: true,
        },
        {
          label: "Last Name",
          name: "person.names[0].family_name",
          sort: true,
        },
        {
          label: "Gender",
          name: "person.gender",
          sort: true,
        },
        {
          label: "date of Birth",
          name: "person.birthdate",
          slot_name: "birthdate",
          sort: true,
        },
        {
          label: "Action",
          name: "patient_id",
          slot_name: "patient_id",
        },
        {
          label: "Void",
          name: "patient_id",
          slot_name: "rm_patient_id",
        },
      ],
      config: {
        show_refresh_button: false,
        show_reset_button: false,
        global_search: {
          visibility: false,
        },
      },
      actions: [
        {
          btn_text: "Add New Patient",
          event_name: "redirect",
          class: "btn btn-success",
          event_payload: {
            url: "/patient_registration",
          },
        },
      ],
    };
  },
  validations() {
    return {
      searchText: { required },
    };
  },
  methods: {
    async searchPatients() {
      if (!this.validateForm()) return;

      this.showLoader = true;

      this.rows = await PatientService.searchPatients({
        searchText: this.searchText,
        gender: this.gender,
      });

      this.showLoader = false;
    },
    toggleAdvanced: function () {
      this.showAdvanced = this.showAdvanced == false ? true : false;
    },
    redirect: function (url) {
      this.$router.push(url);
    },
    onRedirect: function (url) {
      this.$router.push(url.event_payload.url);
    },
    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
    formatARVNumber: function (patient_identifiers) {
      let identifier = patient_identifiers.filter(function (entry) {
        return entry.type.name === "ARV Number";
      });
      return identifier.length > 0 ? identifier[0].identifier : "N/A";
    },
    showWarningWindow(patient) {
      this.patientId = patient;
      this.$bvModal.show("void-reason-modal");
    },
    hideReasonPopUp() {
      this.$refs["void-reason-modal"].hide();
    },
    setAnswer(answer = "") {
      return answer;
    },
    voidClient(reason) {
      PatientService.voidPatient({
        patient_id: this.patientId,
        reason,
      }).then((data) => {
        const index = this.rows.findIndex(row => row.patient_id === this.patientId)
        if (~index)
        this.rows.splice(index, 1)
        this.$refs["void-reason-modal"].hide();
      });
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>