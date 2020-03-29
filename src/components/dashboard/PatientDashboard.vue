
<template>
  <div class>
    <div class="user"></div>
    <div class="row">
      <div class="col">
        <label style="font-weight: bold; font-size: 25px; float: left">Dashboard</label>
      </div>
    </div>
    <div class="row bar-charts" style="margin-top: 10px">
      <div class="col-md-3">
        <EncounterStatsChart v-bind:stats="patientDueForViralLoad" style="height: 100px;" />
      </div>
      <div class="col-md-3">
        <EncounterStatsChart v-bind:stats="patientsWithAppointmentsTomorrow" style="height: 100px" />
      </div>
      <div class="col-md-3">
        <EncounterStatsChart v-bind:stats="patientsWithMissedAppointments" style="height: 100px" />
      </div>
      <div class="col-md-3">
        <EncounterStatsChart v-bind:stats="patientsWithMissedAppointments" style="height: 100px" />
      </div>
    </div>
    <div class="row" style="margin: auto;">
      <div class="col-md-4">
        <div style="height: 450px">
          <div style="background: rgba(164, 150, 242, 0.7); height: 105px; margin-top: 10px">
            <div class="row">
              <div class="col-md-12" style="margin-top: 10px">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; float: left;">Patients On DTG </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="margin: auto">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; color: white; font-size: 30px; float: left;">77 </label>
                </div>
              </div>
            </div>
          </div>
          <div style="background: rgba(164, 150, 242, 0.7); height: 105px; margin-top: 10px">
            <div class="row">
              <div class="col-md-12" style="margin-top: 10px">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; float: left;">Patients Defaulted (30 Days) </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="margin: auto">
               <div style="margin-left: 10px">
                  <label style="font-weight: bold; color: white; font-size: 30px; float: left;">77 </label>
               </div>
              </div>
            </div>
          </div>
          <div style="background: rgba(164, 150, 242, 0.7); height: 105px; margin-top: 10px">
            <div class="row">
              <div class="col-md-12" style="margin-top: 10px">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; float: left;">TX Current (60 Days) </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="margin: auto">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; color: white; font-size: 30px; float: left;">77 </label>
                </div>
              </div>
            </div>
          </div>
          <div style="background: rgba(164, 150, 242, 0.7); height: 105px; margin-top: 10px">
            <div class="row">
              <div class="col-md-12" style="margin-top: 10px">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; float: left;">Lipo </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div style="margin-left: 10px">
                  <label style="font-weight: bold; color: white; font-size: 30px; float: left;">77 </label>
                </div>
              </div>
            </div>
          </div>
          <!-- <PatientChart />
          <PatientChart /> -->
        </div>
      </div>
      <div class="col-md-8">
        <div class="shadow p-3 mb-5 bg-white rounded" style="height: 458px">
          <VisitsStartChart/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EncounterStatsChart from "./EncounterStatsChart.vue";
import VisitsStartChart from "./VisitsStartChart.vue";
import PatientChart from "./PatientChart.vue";
import moment from "moment";
import Config from "../../../public/config.json";
import ApiClient from "../../services/api_client";

export default {
  name: "PatientDashboard",
  data() {
    return {
      encounterDate: moment(new Date()).format("YYYY-MM-DD"),
      patientDueForViralLoad: {
        name: "Due for Viral Load",
        label: "Number of Patients",
        count: 123
      },
      patientsWithAppointmentsTomorrow: {
        name: "Appointments Due",
        label: "Number of Patients",
        count: 123
      },
      patientsWithMissedAppointments: {
        name: "Missed appointments",
        label: "Number of Patients",
        count: 123
      },
      patientsOnDtg: {
        name: "On DTG",
        label: "Number of Patients",
        count: 123
      },
      defaulters: {
        name: "Defaulters(30 Days)",
        label: "Number of Patients",
        count: 123
      },
      txCurrent: {
        name: "TX Current(60 Days)",
        label: "Number of Patients",
        count: 123
      }
    };
  },
  components: {
    EncounterStatsChart,
    VisitsStartChart,
    PatientChart
  },
  created() {}
};
</script>

<style>
</style>