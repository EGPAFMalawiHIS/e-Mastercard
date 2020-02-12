
<template>
  <div class="chart-content">
    <div class="user"></div>
    <div class="row bar-charts">
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <TotalPatientsChart v-bind:stats="encountersStats" />
      </div>
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <MalePatientsChart v-bind:stats="encountersStats" />
      </div>
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <FemalePatientsChart v-bind:stats="encountersStats" />
      </div>
    </div>
    <div class="overview-chart shadow-lg p-3 mb-5 bg-white rounded">
      <MonthlyPatientRegistrationChart />
    </div>
  </div>
</template>

<script>
let end_date = moment()
  .subtract(1, "days")
  .format("YYYY-MM-DD");
let start_date = moment()
  .subtract(5, "days")
  .format("YYYY-MM-DD");

import TotalPatientsChart from "./TotalPatientsChart.vue";
import FemalePatientsChart from "./FemalePatientsChart.vue";
import MalePatientsChart from "./MalePatientsChart.vue";
import MonthlyPatientRegistrationChart from "./MonthlyPatientRegistrationChart.vue";
import moment from "moment";

export default {
  name: "PatientDashboard",
  data() {
    return {
      encounterDate: moment(new Date()).format("YYYY-MM-DD"),
      encountersStats: {
        Vitals: "",
        Appointment: "",
        Registration: "",
        Treatment: "",
        Reception: "",
        Staging: "",
        Consultation: "",
        Dispensing: "",
        Adherence: ""
      },
      ENCOUNTER_TYPES: {
        6: "Vitals",
        7: "Appointment",
        9: "Registration",
        25: "Treatment",
        51: "Reception",
        52: "Staging",
        53: "Consultation",
        54: "Dispensing",
        68: "Adherence"
      }
    };
  },
  components: {
    TotalPatientsChart,
    FemalePatientsChart,
    MalePatientsChart,
    MonthlyPatientRegistrationChart
  },
  methods: {
    fetchEncounterStats() {
      fetch(
        `http://localhost:3001/api/v1/reports/encounters?date=${this.encounterDate}`,
        {
          method: "POST",
          headers: {
            Authorization: "KR2QaTNVgaa5",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            encounter_types: Object.keys(this.ENCOUNTER_TYPES)
          })
        }
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          Object.keys(data).map((key, index) => {
            this.encountersStats[this.ENCOUNTER_TYPES[key]] = data[key];
          });
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    }
  },
  created() {
    this.fetchEncounterStats();
  }
};
</script>

<style>
.charts {
  width: 33.3%;
  margin: auto;
}
.chart-content {
  width: 98%;
  margin: auto;
}

.overview-chart {
  width: 90%;
  margin: auto;
}
</style>