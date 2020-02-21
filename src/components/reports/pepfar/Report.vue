
<template>
  <div class="content">
    <div v-if="reportBuildComplete == false" class="loading" style="width: 100%; margin: auto; margin-top: 300px;">
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
      <div style="margin-top:10px; font-size: 20px;">Generating report {{LoadingPercentage + "%"}} ...</div>
    </div>

    <div v-if="reportBuildComplete" class="row">
      <div class="col-12">
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
import Config from "../../../../public/config.json"
import ApiClient from "../../../services/api_client"
import moment from "moment"
import loadme from "loadme"

export default {
  name: "PepfarReport",
  data() {
    return {
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
        "50 plus years"
      ],
      Index: 0,
      LoadingPercentage: 0,
      InitializeReport: true
    }
  },
  components: {},
  methods: {
    buildReportData(data, ageGroup) {

      !this.InitializeReport ? this.reportObjects.push(data) : null
      this.LoadingPercentage = Math.floor((this.Index/this.AGE_GROUPS.length) * 100)

      if (this.Index < this.AGE_GROUPS.length ) {
        this.InitializeReport = false
        this.fetchReport(this.AGE_GROUPS[this.Index])
      } else {
        const males = this.reportObjects.map((value, index) => {

          const objectKeys = Object.keys(value)[0]

          if (value[objectKeys] == undefined) {
            return (this.reportObject = {
              age_group: this.AGE_GROUPS[index],
              sex: "Male",
              tx_new: 0,
              tx_curr: 0,
              tx_screened_for_tb: 0,
              tx_given_ipt: 0
            })
          } else {
            return (this.reportObject = {
              age_group: objectKeys,
              sex: "Male",
              tx_new:
                value[objectKeys].M != undefined
                  ? value[objectKeys].M.tx_new
                  : 0,
              tx_curr:
                value[objectKeys].M != undefined
                  ? value[objectKeys].M.tx_curr
                  : 0,
              tx_screened_for_tb:
                value[objectKeys].M != undefined
                  ? value[objectKeys].M.tx_screened_for_tb
                  : 0,
              tx_given_ipt:
                value[objectKeys].M != undefined
                  ? value[objectKeys].M.tx_given_ipt
                  : 0
            })
          }
        })

        const females = this.reportObjects.map((value, index) => {
          const objectKeys = Object.keys(value)[0];

          if (value[objectKeys] == undefined) {
            return (this.reportObject = {
              age_group: this.AGE_GROUPS[index],
              sex: "Female",
              tx_new: 0,
              tx_curr: 0,
              tx_screened_for_tb: 0,
              tx_given_ipt: 0
            });
          } else {
            return (this.reportObject = {
              age_group: objectKeys,
              sex: "Female",
              tx_new:
                value[objectKeys].F != undefined
                  ? value[objectKeys].F.tx_new
                  : 0,
              tx_curr:
                value[objectKeys].F != undefined
                  ? value[objectKeys].F.tx_curr
                  : 0,
              tx_screened_for_tb:
                value[objectKeys].F != undefined
                  ? value[objectKeys].F.tx_screened_for_tb
                  : 0,
              tx_given_ipt:
                value[objectKeys].F != undefined
                  ? value[objectKeys].F.tx_given_ipt
                  : 0
            })
          }
        })

        this.reportObjects = []
        this.reportObjects = [ ...females, ...males]
      }
      this.Index = this.Index + 1
      
    },

    initializeReportData() {
      const START_DATE = moment("2015-04-04").format("YYYY-MM-DD")
      const END_DATE = moment(new Date()).format("YYYY-MM-DD")
      this.InitializeReport = true

      const PARAMS = `?date=${END_DATE}&quarter=pepfar&start_date=${START_DATE}&end_date=${END_DATE}&age_group=${this.AGE_GROUPS[0]}&rebuild_outcome=false&initialize=true&program_id=1`

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
              this.fetchReport(this.AGE_GROUPS[0])
            })
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err)
        })
    },

    fetchReport(ageGroup) {
      const START_DATE = moment("2015-04-04").format("YYYY-MM-DD")
      const END_DATE = moment(new Date()).format("YYYY-MM-DD")

      const PARAMS = `?date=${END_DATE}&quarter=pepfar&start_date=${START_DATE}&end_date=${END_DATE}&age_group=${ageGroup}&rebuild_outcome=true&initialize=false&program_id=1`

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
              this.buildReportData(data, ageGroup)
            })
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err)
        })
    }
  },
  created() {
    this.initializeReportData()
  },
  updated(){
    if (this.LoadingPercentage == 100 || this.LoadingPercentage == 0){
      this.reportBuildComplete = true
    }
  }
}
</script>

<style>
.report {
  color: black;
  height: 700px;
  overflow-y: scroll;
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