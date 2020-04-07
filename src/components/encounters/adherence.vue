<template>
  <div>
    <div class="form-row" >
      <div class="form-group col-md-6">
        <label for="inputState">Pill Count: Last dispensation({{ previousDispensation }})</label>
      </div>
      <div class="form-group col-md-6" >
        <input type="number" class="form-control" id="pill-count" v-model="pillCount" v-if="previousDispensation > 0"/>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
import EventBus from "../../services/event-bus.js";
import moment from "moment";

export default {
props: ["date"],
data: function() {
    return {
      pillCount: null,
      lastDrugs: [],
      adherence: 0,
    } 
},
methods: {
  saveEncounter: function() {
    let observations = {};
      var drug_order_adherence_concept_id = 6987;
      var amount_of_drug_brought_to_clinic_concept_id = 2540;
      this.lastDrugs.forEach(element => {
        
      
            let expected = this.calculateExpected(element.quantity, element.equivalent_daily_dose, element.order.start_date);
            let adh = this.calculateAdherence(element.quantity, this.pillCount, expected);
            observations['adherence'+element.order_id] = {
                concept_id: drug_order_adherence_concept_id,
                value_drug: element.drug_inventory_id,
                order_id: element.order_id,
                value_numeric: adh,
                value_modifier: '%',
                person_id: this.$route.params.id,
            };

            observations['amount'+element.order_id] = {
                concept_id: amount_of_drug_brought_to_clinic_concept_id,
                order_id: element.order_id,
                value_numeric: this.pillCount,
                person_id: this.$route.params.id
            };
      });
    let encounterObject = {
      adherence: {
        encounter_id: 68,
        obs: {
          ...observations
        }
      }
    }
    this.$emit('addEncounter', encounterObject);
  },
  calculateExpected: function(given, equivalent_daily_dose, start_date) {
    let date1 = new Date(this.date);
    let date2 = new Date(start_date);
    let days_gone = this.dateDiffInDays(date2, date1);

    return (given - (days_gone * parseFloat(equivalent_daily_dose)));
  },
  calculateAdherence: function(given, pill_count, expected) {
        return Math.round(100 * (given - pill_count) / (given - expected));
  },
  getLastOrder: async function(encounterDate) {
    this.lastDrugs = [];
    let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/patients/${patientID}/last_drugs_received?date=`+encounterDate).then(
        res => {
          res.json().then(ret => {
            if(ret.length > 0) {

              this.lastDrugs = ret;            
            }
          });
        }
      );
  },
  dateDiffInDays: function(date1, date2) {
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
  }

}, mounted() {
  this.getLastOrder(this.date);
  EventBus.$on('change-date', payload => {
    // his.getLastOrder();
  });
},
watch: { 
      	date: function(newVal, oldVal) { // watch it
          this.getLastOrder(newVal);
        }
      },
  computed: {
   previousDispensation() {
     return this.lastDrugs.length > 0 ? this.lastDrugs[0].quantity : 0;
   } 
  }
}
</script>

<style>

</style>