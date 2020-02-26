
<template>
  <div class="row" style="float: right; margin-top:20px">
    <div class="dates col-md-12">
      <div class="date-selectors" style="margin: auto">
        <label
          v-if="(!submit || (startDate != null && endDate != null)) && validateDate"
          style="margin: auto; font-size: 15px; margin-bottom: 5px; font-weight: bold;"
          class="info-message"
        >Select report start and end date</label>
        <label
          v-if="!validateDate"
          style="margin: auto; font-size: 15px; margin-bottom: 5px; font-weight: bold"
          class="error-message"
        >{{dateError}}</label>
        <p
          v-if="submit && (startDate == null || endDate == null)"
          style="margin: auto; font-size: 15px; margin-bottom: 5px; font-weight: bold"
          class="error-message"
        >ERROR: both dates MUST be selected</p>
      </div>
      <div class="clearfix"></div>
      <div class="date-inputs">
        <input
          v-model="startDate"
          type="date"
          class="btn btn-default"
          style="background: rgba(181, 182, 186, 0.3);"
        />
        <input
          v-model="endDate"
          type="date"
          class="btn btn-default"
          style="margin-left:10px; background: rgba(181, 182, 186, 0.3)"
        />
        <button
          v-on:click="buildReport()"
          style="margin-left: 10px; "
          class="btn btn-primary"
        >Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "DateItem",
  data() {
    return {
      startDate: null,
      endDate: null,
      submit: false,
      validateDate: true,
      dateError: "ERROR: end date CANNOT be smaller than start date",
      reportBuildComplete: false,
      LoadingPercentage: 0,
      InitializeReport: true,
      BuildReport: false,
			RebuildReport: false,
			DateItem: {}
    };
  },
  components: {},
  methods: {
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
					
					this.DateItem = {
						start_date: this.startDate,
						end_date: this.endDate,
						rebuild_report: true,
						reportbuild_complete: false,
						build_report: true,
						loading_percentage: 0

					}

					this.$emit('date-item', this.DateItem)

					this.submit = false;


        }
      }
		},
    beginDateSelected() {
      console.log("Selected");
    }
  },
  created() {}
};
</script>

<style>

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
</style>