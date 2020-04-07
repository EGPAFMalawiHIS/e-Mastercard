
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
        <EncounterStatsChart :value="patientsDueForViralLoad.count"
                             style="height: 100px;">
          Due for Viral Load
        </EncounterStatsChart>
      </div>
      <div class="col-md-3">
        <EncounterStatsChart :value="patientsWithAppointmentsTomorrow.count"
                             style="height: 100px">
          Appointments Due
        </EncounterStatsChart>
      </div>
      <div class="col-md-3">
        <EncounterStatsChart :value="patientsWithMissedAppointments.count"
                             style="height: 100px">
          Missed Appointments
        </EncounterStatsChart>
      </div>
      <div class="col-md-3">
        <EncounterStatsChart :value="patientsWithMissedAppointments.count"
                             style="height: 100px">
          Missed Appointments
        </EncounterStatsChart>
      </div>
    </div>
    <div class="row" style="margin: auto;">
      <div class="col-md-4">
        <div style="height: 450px">
          <DashboardCard :value="patientsOnDtg.count">
            Patients on DTG
          </DashboardCard>
          <DashboardCard :value="defaulters.count">
            Patients Default (30 Days)
          </DashboardCard>
          <DashboardCard :value="txCurrent.count">
            TX Current (60 Days)
          </DashboardCard>
          <DashboardCard :value="lipo.count">
            Lipo
          </DashboardCard>
          <!-- <PatientChart />
          <PatientChart /> -->
        </div>
      </div>
      <div class="col-md-8">
        <div class="shadow p-3 mb-5 bg-white rounded" style="height: 458px">
          <VisitsStartChart :visits="completeAndIncompleteVisits" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import moment from "moment";

import DashboardCard from "./DashboardCard.vue";
import EncounterStatsChart from "./EncounterStatsChart.vue";
import PatientChart from "./PatientChart.vue";
import VisitsStartChart from "./VisitsStartChart.vue";

import ApiClient from "../../services/api_client";
import DateUtils from "../../services/date_utils";

const REPORT_POLL_INTERVAL = 1000; // In millis

export default {
  name: "PatientDashboard",
  created() {
    const [startDate, endDate] = DateUtils.dateQuarter(new Date());

    this.loadPatientsOnDtg(startDate, endDate);
    this.loadDefaulters(startDate, endDate);
    this.loadMissedAppointments(startDate, endDate);
    this.loadAppointmentsDue(startDate, endDate);
    this.loadCompleteAndIncompleteVisits(startDate, endDate);
  },
  computed: mapState({
    completeAndIncompleteVisits: state => state.dashboard.completeAndIncompleteVisits,
    defaulters: state => state.dashboard.defaulters,
    lipo: state => state.dashboard.lipo,
    patientsDueForViralLoad: state => state.dashboard.patientsDueForViralLoad,
    patientsOnDtg: state => state.dashboard.patientsOnDtg,
    patientsWithAppointmentsTomorrow: state => state.dashboard.patientsWithAppointmentsTomorrow,
    patientsWithMissedAppointments: state => state.dashboard.patientsWithMissedAppointments,
    txCurrent: state => state.dashboard.txCurrent
  }),
  components: {
    DashboardCard,
    EncounterStatsChart,
    PatientChart,
    VisitsStartChart
  },
  methods: {
    ...mapMutations(['setCompleteAndIncompleteVisits',
                     'setDefaulters',
                     'setPatientsOnDtg',
                     'setPatientsWithMissedAppointments',
                     'setPatientsWithAppointmentsTomorrow']),
    async getReport(reportUrl) {
      try {
        const response = await ApiClient.get(reportUrl);

        if (!response.ok) {
          const {status, error, exception} = await response.json();
          throw new Error(`Failed to pull (reportUrl): ${status} - ${error} (${exception})`);
        }

        if (response.status === 204) return ['ok', null];

        return ['ok', await response.json()];
      } catch (error) {
        this.$router.push({name: 'error', params: {message: error.message}});
        return ['error', null];
      }
    },
    async loadPatientsOnDtg(startDate, endDate) {
      const reportUrl = `programs/1/reports/patients_on_dtg?start_date=${startDate}&end_date=${endDate}`;
      const [status, patients] = await this.getReport(reportUrl);

      if (status !== 'ok') return;

      this.setPatientsOnDtg(patients);
    },
    async loadDefaulters(startDate, endDate) {
      const today = moment(new Date()).format(DateUtils.ISO_FORMAT);
      const reportUrl = `defaulter_list?date=${today}&start_date=${startDate}&end_date=${endDate}&pepfar=true&program_id=1`;
      const [status, patients] = await this.getReport(reportUrl);

      if (status !== 'ok') return;
      
      this.setDefaulters(patients);
    },
    async loadMissedAppointments(startDate, endDate) {
      const today = moment(new Date()).format(DateUtils.ISO_FORMAT);
      const reportUrl = `missed_appointments?date=${today}&start_date=${startDate}&end_date=${endDate}&program_id=1`;
      const [status, patients] = await this.getReport(reportUrl);

      if (status !== 'ok') return;
      
      this.setPatientsWithMissedAppointments(patients);
    },
    async loadAppointmentsDue(_startDate, _endDate) {
      const tomorrow = moment(new Date()).add(1, 'days').format(DateUtils.ISO_FORMAT);
      const [status, patients] = await this.getReport(`programs/1/booked_appointments?date=${tomorrow}`);

      if (status !== 'ok') return;

      this.setPatientsWithAppointmentsTomorrow(patients);
    },
    async loadCompleteAndIncompleteVisits(_startDate, _endDate) {
      const endDate = moment(new Date()).format(DateUtils.ISO_FORMAT);
      const startDate = moment(endDate).subtract(7, 'days').format(DateUtils.ISO_FORMAT);
      const reportUrl = `programs/1/reports/visits?start_date=${startDate}&end_date=${endDate}`;

      // This report runs in the background, have to keep probing
      // until it is available.
      const pollReport = async () => {
        const [status, visits] = await this.getReport(reportUrl);

        if (status === 'ok' && visits) {
          this.setCompleteAndIncompleteVisits(visits);
        } else {
          setInterval(pollReport, REPORT_POLL_INTERVAL);
        }
      }

      pollReport();
    }
  }
};
</script>
