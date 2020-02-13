
<template>
  <div class="chart-content">
    <div class="user"></div>
    <div class="row bar-charts">
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <EncounterStatsChart v-bind:stats="totalEncounterStats" />
      </div>
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <EncounterStatsChart v-bind:stats="maleEncounterStats" />
      </div>
      <div class="charts col-sm shadow p-3 mb-5 bg-white rounded">
        <EncounterStatsChart v-bind:stats="femaleEncounterStats" />
      </div>
    </div>
    <div class="overview-chart shadow-lg p-3 mb-5 bg-white rounded">
      <VisitsStartChart v-bind:stats="completeIncompleteStats" />
    </div>
  </div>
</template>

<script>
import EncounterStatsChart from "./EncounterStatsChart.vue";
import VisitsStartChart from "./VisitsStartChart.vue";
import moment from "moment";
import Config from "../../../public/config.json";
import ApiClient from "../../services/api_client";

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
      },
      totalEncounterStats: {
        total: "",
        name: "",
        backgroundColor: "",
        label: "",
        labels: [],
        data: []
      },
      maleEncounterStats: {
        total: "",
        name: "",
        backgroundColor: "",
        label: "",
        labels: [],
        data: []
      },
      femaleEncounterStats: {
        total: "",
        name: "",
        backgroundColor: "",
        label: "",
        labels: [],
        data: []
      },
      completeIncompleteStats: {
        complete: [],
        incomplete: [],
        days: []
      },
      endDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      startDate: moment()
        .subtract(5, "days")
        .format("YYYY-MM-DD"),

      // API configurations
      config: {
        protocol: Config.apiProtocol,
        host: Config.apiURL,
        port: Config.apiPort,
        version: ApiClient.config.apiVersion,
        token: sessionStorage.apiKey
      }
    };
  },
  components: {
    EncounterStatsChart,
    VisitsStartChart
  },
  methods: {
    fetchEncounterStats() {
      fetch(
        `${this.config.protocol}://${this.config.host}:${this.config.port}/api/${this.config.version}/reports/encounters?date=${this.encounterDate}`,
        {
          method: "POST",
          headers: {
            Authorization: this.config.token,
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
          this.totalEncounters();
          this.maleEncounters();
          this.femaleEncounters();
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    totalEncounters() {
      this.totalEncounterStats = {
        total: this.encountersStats.Reception.M,
        name: "Total",
        label: "Number of Patients",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        labels: Object.keys(this.encountersStats),
        data: Object.values(this.encountersStats).map(male => male.M + male.F)
      };
    },

    maleEncounters() {
      this.maleEncounterStats = {
        total: this.encountersStats.Reception.M,
        name: "Male",
        label: "Number of Male",
        backgroundColor: "rgba(143, 143, 201, 0.3)",
        labels: Object.keys(this.encountersStats),
        data: Object.values(this.encountersStats).map(male => male.M)
      };
    },

    femaleEncounters() {
      this.femaleEncounterStats = {
        total: this.encountersStats.Reception.M,
        name: "Female",
        label: "Number of Females",
        backgroundColor: "rgba(137, 232, 200, 0.3)",
        labels: Object.keys(this.encountersStats),
        data: Object.values(this.encountersStats).map(male => male.F)
      };
    },
    fetchVisits() {
      const url = `${this.config.protocol}://${this.config.host}:${this.config.port}/api/${this.config.version}/programs/1/reports/visits?name=visits&start_date=${this.startDate}&end_date=${this.endDate}`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: this.config.token
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.completeIncompleteStats = {
            name: "Complete/Incomplete visits: last five days",
            complete: Object.values(data).map(d => d.complete + d.incomplete),
            incomplete: Object.values(data).map(d => d.incomplete),
            days: Object.keys(data).map(d => moment(d).format("ddd"))
          };
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    }
  },
  created() {
    this.fetchVisits();
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