<template>
  <!-- <input type="date" class="form-control" name="" id="" v-model="date.value_datetime"> -->
  <b-row>
    <b-col>

  <label for="appointment-datepicker">Choose an appointment date</label>
  <b-form-datepicker  id="appointment-datepicker" class="mb-2" v-model="appointmentdate.value_datetime" :min="date" :max="earliestExpiry"></b-form-datepicker>
    </b-col>
  </b-row>
</template>

<script>
import EventBus from "@/services/event-bus.js";
import moment from "moment";
export default {
props: ["date"],
data: function() {
    return {

      appointmentdate: {
        value_datetime: null,
        concept_id: 5096
      },
      prescribed_drugs: 0,
      remaining_drugs: 0,
    }
},
methods: {
  saveEncounter: function() {
    let encounterObject = {
      hiv_staging: {
        encounter_id: 7,
        obs: {
          date: this.appointmentdate,
        }
      }
    }
    this.$emit('addEncounter', encounterObject);
  }
},
    mounted() {
    EventBus.$on('earliest-expiry-date', payload => {
      this.prescribed_drugs = payload;
    });
    EventBus.$on('drugs-remaining', payload => {
      this.remaining_drugs = payload;
    });
  },
  
  computed: {
    earliestExpiry() {
      let earliestExpiry = moment(this.date).add((this.prescribed_drugs + this.remaining_drugs), 'days').format("YYYY-MM-DD");
      return earliestExpiry;
    }
  }

}
</script>

<style>

</style>