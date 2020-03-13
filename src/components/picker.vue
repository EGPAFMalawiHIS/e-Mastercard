<template>
  <div class="container-fluid">
    <div class="justify-content-center">
      <label>Dates</label>
    </div>
    <div class="form-inline">
      <div class="form-group mb-2">
        <date-pick
          class="date-inputs"
          v-model="startDate"
          :format="format"
          :parseDate="parseDate"
          :formatDate="formatDate"
          :inputAttributes="{placeholder: 'Start Date', readonly: true}"
        ></date-pick>
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <date-pick
          class="date-inputs"
          v-model="endDate"
          :format="format"
          :parseDate="parseDate"
          :formatDate="formatDate"
          :inputAttributes="{placeholder: 'End Date', readonly: true}"
        ></date-pick>
      </div>
      <button @click="submitDates" class="btn btn-success mb-2">Submit</button>
    </div>
  </div>
</template>


<style scoped>
.ctrs {
  width: 100%;
  padding: 10px;
}

.ctr-table {
  width: 590px;
  text-align: right;
  display: table;
  float: right;
  margin: 10px -5px 20px 0px;
  padding-bottom: 15px;
}

.date-inputs {
  text-align: right;
}

.ctr-row {
  display: table-row;
}
.ctr-cell {
  display: table-cell;
}

.vdpComponent {
  font-size: 18px;
}
</style>

<script>
import DatePick from "vue-date-pick";
import moment from "moment";
import "vue-date-pick/dist/vueDatePick.css";
import fecha from "fecha";

export default {
  components: { DatePick },
  props: ["onSubmit"],
  data: function() {
    return {
      startDate: null,
      endDate: null,
      format: "DD/MMM/YYYY",
      date: fecha.format(new Date(), "DD/MMM/YYYY")
    };
  },
  methods: {
    initDates: function() {},
    submitDates: function() {
      this.startDate = moment(this.startDate).format("YYYY-MM-DD");
      this.endDate = moment(this.endDate).format("YYYY-MM-DD");
      this.onSubmit([this.startDate, this.endDate]);
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    }
  },
  mounted() {
    setTimeout(() => this.initDates(), 300);
  }
};
</script>