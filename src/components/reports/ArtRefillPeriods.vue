
<template>
  <div class="content">
    <h4 style="font-weight:bold; float:left;">Patient ART refill periods report</h4>

    <!-- DateItem Component -->
    <DateItem v-on:date-item="dateItem" />

    <div class="clearfix"></div>
    <div
      v-if="!BuildReport"
      class="no-content"
      style="margin: auto; margin-top: 50px; font-size: 30px;"
    >Select reporting period</div>
    <div class="clearfix"></div>

    <!-- Loading Item Component -->
    <LoadingItem v-if="reportBuildComplete == false && BuildReport" />

    <div
      v-if="reportBuildComplete == false && BuildReport"
      style="margin-top:10px; font-size: 20px;"
    >Generating report {{LoadingPercentage + "%"}} ...</div>

    <div v-if="reportBuildComplete" class="row">
      <div class="col-md-12">
        <h5
          style="margin: auto"
        >Report period between: {{moment(this.endDate ).format("LL")}} - {{moment(this.endDate).format("LL")}}</h5>
        <div class="col-12 table-col">
          <table class="table table-striped report">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Age group</th>
                <th scope="col">Gender</th>
                <th scope="col"># of clients receiving &lt; 3 months of ARVs</th>
                <th scope="col"># of clients receiving 3-5 months of ARVs</th>
                <th scope="col"># of clients receiving 6 months of ARVs</th>
                <th scope="col"># of clients receiving &gt; 6 months of ARVs</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in refillReport" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>{{item.age_group}}</td>
                <td>{{item.gender}}</td>
                <td>{{item.three_less}}</td>
                <td>{{item.three_five}}</td>
                <td>{{item.six}}</td>
                <td>{{item.six_greater}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "../../../public/config.json";
import ApiClient from "../../services/api_client";
import moment from "moment";
import DateItem from "./DateItem.vue";
import LoadingItem from "./LoadingItem";

export default {
  name: "PepfarReport",
  components: {
    DateItem,
    LoadingItem
  },
  data() {
    return {
      isActive: true,
      startDate: null,
      endDate: null,
      submit: false,
      reportStartMessage: "Select report start date",
      reportEndMessage: "Select report end date",
      validateDate: true,
      dateError: "ERROR: end date CANNOT be smaller than start date",
      reportObject: {},
      reportObjects: [],
      reportBuildComplete: false,
      Date: new Date(),
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      },

      AGE_GROUPS: [
        {
          group: "<1 year",
          min: 0,
          max: 0
        },
        {
          group: "1-4 years",
          min: 1,
          max: 4
        },
        {
          group: "5-9 years",
          min: 5,
          max: 9
        },
        {
          group: "10-14 years",
          min: 10,
          max: 14
        },
        {
          group: "15-19 years",
          min: 15,
          max: 19
        },
        {
          group: "20-24 years",
          min: 20,
          max: 24
        },
        {
          group: "25-29 years",
          min: 25,
          max: 29
        },
        {
          group: "30-34 years",
          min: 30,
          max: 34
        },
        {
          group: "35-39 years",
          min: 35,
          max: 39
        },
        {
          group: "40-44 years",
          min: 40,
          max: 44
        },
        {
          group: "45-49 years",
          min: 45,
          max: 49
        },
        {
          group: "50 plus years",
          min: 50,
          max: 1000
        },
        {
          group: "Unknown",
          min: "Unknown",
          max: "Unknown"
        }
      ],
      Index: 0,
      LoadingPercentage: 0,
      BuildReport: false,
      RebuildReport: false,
      refillReport: []
    };
  },
  methods: {
    dateItem(item) {
      this.startDate = item.start_date;
      this.endDate = item.end_date;
      this.RebuildReport = item.rebuild_report;
      this.reportBuildComplete = item.reportbuild_complete;
      this.BuildReport = item.build_report;
      this.LoadingPercentage = item.loading_percentage;
      this.buildReport();
    },

    calucateAge(dob) {
      let ageDifMs = Date.now() - dob.getTime();
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },

    getThreeMonthsLess(filters = {}) {
      return this.reportObjects.filter(data => {
        let dob = new Date(data.birthdate);
        return (
          data.gender == filters.initial &&
          ((this.calucateAge(dob) >= filters.age_group.min &&
          this.calucateAge(dob) <= filters.age_group.max) || data.birthdate == filters.age_group.min) &&
          data.prescribed_months < 3
        );
      }).length;
    },

    getThreeFiveMonths(filters = {}) {
      return this.reportObjects.filter(data => {
        let dob = new Date(data.birthdate);
        return (
          data.gender == filters.initial &&
          ((this.calucateAge(dob) >= filters.age_group.min &&
          this.calucateAge(dob) <= filters.age_group.max) || data.birthdate == filters.age_group.min) &&
          data.prescribed_months >= 3 &&
          data.prescribed_months <= 5
        );
      }).length;
    },

    getSixMonths(filters = {}) {
      return this.reportObjects.filter(data => {
        let dob = new Date(data.birthdate);
        return (
          data.gender == filters.initial &&
          ((this.calucateAge(dob) >= filters.age_group.min &&
          this.calucateAge(dob) <= filters.age_group.max) || data.birthdate == filters.age_group.min) &&
          data.prescribed_months == 6
        );
      }).length;
    },

    getSixMonthsAbove(filters = {}) {
      return this.reportObjects.filter(data => {
        let dob = new Date(data.birthdate);
        return (
          data.gender == filters.initial &&
          ((this.calucateAge(dob) >= filters.age_group.min &&
          this.calucateAge(dob) <= filters.age_group.max) || data.birthdate == filters.age_group.min) &&
          data.prescribed_months > 6
        );
      }).length;
    },

    getTreatmentPeriods(filters = {}) {
      return {
        age_group: filters.age_group.group,
        three_less: this.getThreeMonthsLess(filters),
        three_five: this.getThreeFiveMonths(filters),
        six: this.getSixMonths(filters),
        six_greater: this.getSixMonthsAbove(filters),
        gender: filters.gender
      };
    },

    buildReportData(data) {
      this.LoadingPercentage = Math.floor(
        (this.Index / this.AGE_GROUPS.length) * 100
      );

      console.log(data);

      Object.values(data).map(data => {
        this.reportObjects.push(data);
      });

      this.Index = this.Index + 1;
      if (this.Index < this.AGE_GROUPS.length) {
        this.fetchReportData(this.AGE_GROUPS[this.Index]);
      } else {

        const females = this.AGE_GROUPS.map(data => {
          let filter = {
            age_group: data,
            gender: "Female",
            initial: "F"
          };

          return this.getTreatmentPeriods(filter);
        });

        const males = this.AGE_GROUPS.map(data => {
          let filter = {
            age_group: data,
            gender: "Male",
            initial: "M"
          };

          return this.getTreatmentPeriods(filter);
        });

        this.refillReport = [ ...females, ...males ]

        this.reportBuildComplete = true

      }
    },

    fetchReportData(ageGroup) {
      const START_DATE = moment(this.startDate).format("YYYY-MM-DD");
      const END_DATE = moment(this.endDate).format("YYYY-MM-DD");
      const DATE = moment(this.Date).format("YYYY-MM-DD");

      const PARAMS = `?date=${DATE}&start_date=${END_DATE}&end_date=${END_DATE}&min_age=${ageGroup.min}&max_age=${ageGroup.max}&program_id=1`;

      fetch(`${this.config.api_base_url}/arv_refill_periods${PARAMS}`, {
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              this.buildReportData(data);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    buildReport() {
      this.submit = true;
      this.validateDate = true;
      if (this.startDate != null && this.endDate != null) {
        this.startDate = moment(this.startDate).format("YYYY-MM-DD");
        this.endDate = moment(this.endDate).format("YYYY-MM-DD");
        this.startDate > this.endDate
          ? (this.validateDate = false)
          : this.dateError;

        if (this.validateDate) {
          this.RebuildReport = true;
          this.reportBuildComplete = false;
          this.BuildReport = true;
          this.LoadingPercentage = 0;
          this.submit = false;
          this.fetchReportData(this.AGE_GROUPS[0]);
        }
      }
    }
  },
  updated() {
    if (this.LoadingPercentage == 100) {
      this.reportBuildComplete = true;
    }
  }
};
</script>

<style>
.report {
  color: black;
  height: 700px;
  overflow-y: scroll;
}

.table-col table tbody tr:nth-child(31),
.table-col table tbody tr:nth-child(32),
.table-col table tbody tr:nth-child(33),
.table-col table tbody tr:nth-child(34) {
  background-color: rgba(255, 222, 140, 0.5);
}

.error-message {
  display: block;
  float: left;
  color: rgba(186, 0, 0, 1);
  font-size: 20px;
  margin-top: 15px;
  font-weight: bold;
}

.info-message {
  display: block;
  float: left;
  color: rgba(0, 114, 255, 1);
  font-size: 20px;
  margin-top: 15px;
  font-weight: bold;
}

.start {
  color: red;
}

.start-end-date {
  margin-top: 80px;
  background: rgba(214, 208, 208, 0.5);
  font-weight: bold;
}
</style>