
<template>
  <div class="content">
    <h4 style="font-weight:bold"> PEPFAR Disagreggated Report </h4>
    <div v-if="!BuildReport" class="calender">
      <div class="row" style="margin-top:10px">
        <div class="col-sm-6 shadow p-5 mb-3 bg-grey rounded">
          <h4 class="shadow p-5 mb-3 bg-grey rounded start-end-date" style="float:right;"> Start Date </h4>
          <datepicker v-model="startDate" :inline="true"></datepicker> 
          <p v-if="!submit || (startDate != null && validateDate)" class="info-message">{{reportStartMessage}}</p> 
          <p v-if="submit && startDate == null" class="error-message">ERROR: report start data CANNOT be empty</p>
          <p v-if="!validateDate" class="error-message">{{dateError}}</p>
        </div>
        <div class="col-sm-6 shadow p-5 mb-3 bg-white rounded">
          <h4 class="shadow p-5 mb-3 bg-grey rounded start-end-date" style="float:right;"> Start End </h4>
          <datepicker v-model="endDate" :inline="true"></datepicker>
          <p v-if="!submit || (endDate != null && validateDate)" class="info-message">{{reportEndMessage}}</p>
          <p v-if="submit && endDate == null" class="error-message">ERROR: report end data CANNOT be empty</p>
          <p v-if="!validateDate" class="error-message">{{dateError}}</p>
        </div>
      </div>
      <div class="row">
        <button v-on:click="buildReport()" style="margin:auto; height: 60px; font-size: 30px" class="btn btn-info">Generate</button>
      </div>
    </div>
    <div
      v-if="reportBuildComplete == false && BuildReport"
      class="loading"
      style="margin-top: 300px;"
    >
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="2"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
      <div
        style="margin-top:10px; font-size: 20px;"
      >Generating report {{LoadingPercentage + "%"}} ...</div>
    </div>

    <div v-if="reportBuildComplete" class="row">
      <h5 style="margin: auto"> Report period between: {{moment(this.startDate).format("LL")}} - {{moment(this.endDate).format("LL")}} </h5>
      <div class="col-12 table-col">
        <table class="table table-striped report">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Age group</th>
              <th scope="col">Gender</th>
              <th scope="col">Tx new (new on ART)</th>
              <th scope="col">Tx curr (receiving ART)</th>
              <th scope="col">Tx curr (recieved IPT)</th>
              <th scope="col">Tx curr (screened for TB)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in reportObjects" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td v-if="item != undefined">{{item.age_group}}</td>
              <td v-if="item != undefined">{{item.sex}}</td>
              <td v-if="item != undefined">{{item.tx_new}}</td>
              <td v-if="item != undefined">{{item.tx_curr}}</td>
              <td v-if="item != undefined">{{item.tx_screened_for_tb}}</td>
              <td v-if="item != undefined">{{item.tx_given_ipt}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "../../../../public/config.json";
import ApiClient from "../../../services/api_client";
import moment from "moment";
import Datepicker from "vuejs-datepicker";

export default {
  name: "PepfarReport",
  data() {
    return {
      startDate: null,
      endDate: null,
      submit: false,
      reportStartMessage: 'Select report start date',
      reportEndMessage: 'Select report end date',
      validateDate: true,
      dateError: 'ERROR: end date CANNOT be smaller than start date',
      reportObject: {},
      reportObjects: [],
      reportBuildComplete: false,
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      },
      AGE_GROUPS: [
        "0-5 months",
        "6-11 months",
        "12-23 months",
        "2-4 years",
        "5-9 years",
        "10-14 years",
        "15-17 years",
        "18-19 years",
        "20-24 years",
        "25-29 years",
        "30-34 years",
        "35-39 years",
        "40-44 years",
        "45-49 years",
        "50 plus years",
        "Breastfeeding",
        "Pregnant"
      ],
      Index: 0,
      LoadingPercentage: 0,
      InitializeReport: true,
      BuildReport: false,
      RebuildReport: false,
      allFemales: {}
    };
  },
  components: {
    Datepicker
  },
  methods: {
    getPatients(report = []) {
      return report.filter(data => {
        return (
          data.age_group != "Pregnant" && data.age_group != "Breastfeeding"
        );
      });
    },

    getReport(report = {}) {
      return report.reportObjects.map((value, index) => {
        const objectKeys = Object.keys(value)[0];
        const initial = report.initial;
        if (objectKeys == undefined) {
          return (this.reportObject = {
            age_group: this.AGE_GROUPS[index],
            sex: report.gender,
            tx_new: 0,
            tx_curr: 0,
            tx_screened_for_tb: 0,
            tx_given_ipt: 0
          });
        } else {
          return (this.reportObject = {
            age_group: objectKeys || this.AGE_GROUPS[index],
            sex: report.gender,
            tx_new:
              value[objectKeys][initial] != undefined
                ? value[objectKeys][initial].tx_new
                : 0,
            tx_curr:
              value[objectKeys][initial] != undefined
                ? value[objectKeys][initial].tx_curr
                : 0,
            tx_screened_for_tb:
              value[objectKeys][initial] != undefined
                ? value[objectKeys][initial].tx_screened_for_tb
                : 0,
            tx_given_ipt:
              value[objectKeys][initial] != undefined
                ? value[objectKeys][initial].tx_given_ipt
                : 0
          });
        }
      });
    },

    getNumberOfPatients(patients = [], gender = "") {
      const txNew = patients.reduce((acc, curr) => {
        return (acc = acc + curr.tx_new);
      }, 0);

      const txCurrent = patients.reduce((acc, curr) => {
        return (acc = acc + curr.tx_curr);
      }, 0);

      const txScreenTb = patients.reduce((acc, curr) => {
        return (acc = acc + curr.tx_screened_for_tb);
      }, 0);

      const rxGivenIpt = patients.reduce((acc, curr) => {
        return (acc = acc + curr.tx_given_ipt);
      }, 0);

      return [
        {
          age_group: "All",
          sex: gender,
          tx_new: txNew,
          tx_curr: txCurrent,
          tx_screened_for_tb: txScreenTb,
          tx_given_ipt: rxGivenIpt
        }
      ];
    },

    getPregrantPatients(patients = []) {
      let pregnant = patients.filter(data => {
        return data.age_group == "Pregnant";
      });

      pregnant[0].age_group = "All";
      pregnant[0].sex = "FP";

      return pregnant;
    },

    getBreastFeedingPatients(patients = []) {
      let breastFeeding = patients.filter(data => {
        return data.age_group == "Breastfeeding";
      });

      breastFeeding[0].age_group = "All";
      breastFeeding[0].sex = "FBf";

      return breastFeeding;
    },

    getFemaleNonePregnant(filter = []) {
      return [
        {
          age_group: "All",
          sex: "FNP",
          tx_new:
            filter.totalNumberOfFemales[0].tx_new -
            (filter.pregnant[0].tx_new + filter.breastFeeding[0].tx_new),
          tx_curr:
            filter.totalNumberOfFemales[0].tx_curr -
            (filter.pregnant[0].tx_curr + filter.breastFeeding[0].tx_curr),
          tx_screened_for_tb:
            filter.totalNumberOfFemales[0].tx_screened_for_tb -
            (filter.pregnant[0].tx_screened_for_tb +
              filter.breastFeeding[0].tx_screened_for_tb),
          tx_given_ipt:
            filter.totalNumberOfFemales[0].tx_given_ipt -
            (filter.pregnant[0].tx_given_ipt +
              filter.breastFeeding[0].tx_given_ipt)
        }
      ];
    },

    buildReportData(data) {
      !this.InitializeReport ? this.reportObjects.push(data) : null;

      this.LoadingPercentage = Math.floor(
        (this.Index / this.AGE_GROUPS.length) * 100
      );

      if (this.Index < this.AGE_GROUPS.length) {
        this.InitializeReport = false;
        this.fetchReport(this.AGE_GROUPS[this.Index]);
      } else {
        // males
        const malesFilters = {
          gender: "Male",
          initial: "M",
          reportObjects: this.reportObjects
        };

        const femaleFilters = {
          gender: "Female",
          initial: "F",
          reportObjects: this.reportObjects
        };

        const males = this.getPatients(this.getReport(malesFilters));
        const females = this.getPatients(this.getReport(femaleFilters));

        const totalNumberOfMales = this.getNumberOfPatients(
          males,
          malesFilters.gender
        );
        const totalNumberOfFemales = this.getNumberOfPatients(
          females,
          femaleFilters.gender
        );

        const pregnant = this.getPregrantPatients(
          this.getReport(femaleFilters)
        );
        const breastFeeding = this.getBreastFeedingPatients(
          this.getReport(femaleFilters)
        );

        const fnpFilters = {
          totalNumberOfFemales,
          pregnant,
          breastFeeding
        };

        const femaleNonePregnant = this.getFemaleNonePregnant(fnpFilters);

        this.reportObjects = [];
        this.reportObjects = [
          ...females,
          ...males,
          ...totalNumberOfMales,
          ...pregnant,
          ...femaleNonePregnant,
          ...breastFeeding
        ];
      }
      this.Index = this.Index + 1;
    },

    initializeReportData() {
      const START_DATE = moment(this.startDate).format("YYYY-MM-DD");
      const END_DATE = moment(this.endDate).format("YYYY-MM-DD");

      this.InitializeReport = true;

      const PARAMS = `?date=${END_DATE}&quarter=pepfar&start_date=${START_DATE}&end_date=${END_DATE}&age_group=${this.AGE_GROUPS[0]}&rebuild_outcome=false&initialize=true&program_id=1`;

      fetch(`${this.config.api_base_url}/cohort_disaggregated${PARAMS}`, {
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              this.fetchReport(this.AGE_GROUPS[0]);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    fetchReport(ageGroup) {
      const START_DATE = moment(this.startDate).format("YYYY-MM-DD");
      const END_DATE = moment(this.endDate).format("YYYY-MM-DD");

      const PARAMS = `?date=${END_DATE}&quarter=pepfar&start_date=${START_DATE}&end_date=${END_DATE}&age_group=${ageGroup}&rebuild_outcome=${this.RebuildReport}&initialize=false&program_id=1`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/cohort_disaggregated${PARAMS}`, {
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
      this.submit = true
      this.validateDate = true
      if (this.startDate != null && this.endDate != null) {
        this.startDate = moment(this.startDate).format("YYYY-MM-DD");
        this.endDate = moment(this.endDate).format("YYYY-MM-DD");
        this.startDate > this.endDate ? this.validateDate = false : this.dateError

        if(this.validateDate){
          this.initializeReportData();
          this.RebuildReport = true;
          this.reportBuildComplete = false;
          this.BuildReport = true;
          this.LoadingPercentage = 0;
          this.submit = false
        }
      }
    },
    beginDateSelected() {
      console.log("Selected");
    }
  },
  created() {},
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
  float:left; 
  color: rgba(186, 0, 0, 1); 
  font-size:20px; 
  margin-top:15px; 
  font-weight:bold
}

.info-message {
  display: block; 
  float:left; 
  color: rgba(73, 161, 179, 1); 
  font-size:20px; 
  margin-top:15px; 
  font-weight:bold
}

.start-end-date {
  margin-top: 80px; 
  background: rgba(214, 208, 208, 0.5); 
  font-weight:bold
}

.loader {
  position: relative;
  margin: 0px auto;
  width: 100px;
}

.loader:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

@-webkit-keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
</style>