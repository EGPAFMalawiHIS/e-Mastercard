<template>
  <div class="control-container">
    <div class="row">

      <div class="col-sm-6 col-md-4 col-lg-3" v-if="showCustom">
        <date-pick
          class="date-inputs"
          v-model="startDate"
          :format="format"
          :parseDate="parseDate"
          :formatDate="formatDate" 
          :inputAttributes="{ placeholder: 'Start Date', readonly: true }"
        >
        </date-pick>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3" v-if="showCustom">
        <date-pick
          class="date-inputs"
          v-model="endDate"
          :format="format"                        
          :parseDate="parseDate"
          :formatDate="formatDate" 
          :inputAttributes="{ placeholder: 'End Date', readonly: true }"
        >
        </date-pick>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4">
        <select id="quarters">
          <option>Select cohort quarter</option>
          <option
            v-for="(quarter, index) in quarters"
            v-bind:key="index"
            :value="quarter"
          >
            {{ quarter }}
          </option>
        </select>
      </div>
      
      <div class="col-sm-12 col-md-8 col-lg-6">
        <div class="row">
          <div class="col-6">
            <button
              class="btn btn-primary"
              @click="selectQuarter(false)"
              id="submit-btn"
              ref="myid"
            >
              Archived report (if available)
            </button>
          </div>
          <div class="col-6">
            <button
              class="btn btn-danger"
              @click="selectQuarter(true)"
              id="generate-btn"
              ref="myid"
            >
              Fresh report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import fecha from 'fecha';
export default {
  data: function () {
    return {
      quarters: [],
      startDate: "",
      endDate: "",
      format: "YYYY-MM-DD",
    };
  },
  components: { DatePick },
  props: ["onSubmit", "showCustom"],
  methods: {
    parseDate(dateString, format) {
        return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
        return fecha.format(dateObj, format);
    },
    selectQuarter: function (e) {
      //this.$refs.myid.disabled=true;
      let qtr = quarters.value ? [quarters.value, e, this.startDate, this.endDate] : [];
      //let qtr = (quarters.value ? quarters.value : null);
        qtr[2] =  this.startDate;
        qtr[3] =  this.endDate;
      this.onSubmit(qtr);
    },
    enableBTN: function () {
      this.$refs.myid.disabled = false;
    },
    loadQuarters() {
      var qtrs = [];
      var current_qtr = "";
      var curr_date = new Date();
      curr_date = new Date(
        curr_date.getFullYear() +
          "-" +
          (curr_date.getMonth() + 1) +
          "-" +
          curr_date.getDate() +
          " 00:00"
      );
      var curr_year = curr_date.getFullYear();

      if (
        curr_date >= new Date(curr_year + "-01-01 00:00") &&
        curr_date <= new Date(curr_year + "-03-31 00:00")
      ) {
        current_qtr = "1 " + curr_year;
      } else if (
        curr_date >= new Date(curr_year + "-04-01 00:00") &&
        curr_date <= new Date(curr_year + "-06-30 00:00")
      ) {
        current_qtr = "2 " + curr_year;
      } else if (
        curr_date >= new Date(curr_year + "-07-01 00:00") &&
        curr_date <= new Date(curr_year + "-09-30 00:00")
      ) {
        current_qtr = "3 " + curr_year;
      } else if (
        curr_date >= new Date(curr_year + "-10-01 00:00") &&
        curr_date <= new Date(curr_year + "-12-31 00:00")
      ) {
        current_qtr = "4 " + curr_year;
      }

      var count = parseInt(current_qtr.substring(0, 1));
      var i = 0;

      while (i < 5) {
        if (i == 0) this.addFollowingQ(qtrs, count, curr_year);
        qtrs.push("Q" + count + " " + curr_year);
        count = count > 0 ? (count -= 1) : count;
        curr_year = count == 0 ? curr_year - 1 : curr_year;
        count = count == 0 ? (count += 4) : count;

        i++;
      }

      this.quarters = qtrs;
    },
    addFollowingQ(qtrs, count, curr_year) {
      if (count < 4) {
        qtrs.push("Q" + (count + 1) + " " + curr_year);
      } else {
        qtrs.push("Q1" + " " + (curr_year + 1));
      }
    },
  },
  mounted() {
    this.loadQuarters();
  },
};
// loadQuarters();
</script>

<style scoped>

.vdpComponent {
  font-size: 18px;
}
.control-container {
  text-align: right;
  margin: 10px 0px 10px 0px;
  width: 100%;
  padding-right: 5px;
}

select {
  margin-right: 10px;
  height: 40px;
  width: 250px;
  vertical-align: top;
}

.control-container button {
  height: 35px;
  vertical-align: top;
}

.btn-danger {
  margin-left: 15px;
}

</style>
<style>
.vdpOuterWrap.vdpFloating  {
  z-index: 100;
}

</style>