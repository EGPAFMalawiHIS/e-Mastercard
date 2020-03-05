<template>
  <div>
    <div class="form-row">
      <div class="form-group col-md-8">
        <label for="inputState">Regimen</label>
        <select
          id="inputState"
          class="form-control"
          v-model="selectedRegimen"
        >
          <option v-for="(regimen, index) in regimens" :key="index">{{index}}</option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label for="inputZip">Quantity</label>
        <input type="number" class="form-control" id="inputZip" v-model="quantity" />
      </div>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="height">Appointment Date</span>
      </div>
      <input type="date" class="form-control" name id v-model="nextAppointment" />
    </div>
    <button type="button" class="btn btn-primary" @click="getSelectedRegimen">dispense</button>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
import moment from "moment";
export default {
  data: function() {
    return {
      regimens: [],
      selectedRegimen: null,
      selectedDrugs: [],
      drugOrder: [],
      nextAppointment: null,
      quantity: null
    };
  },
  methods: {
    getRegimens: async function(val) {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimens?patient_id=` + patientID).then(
        res => {
          res.json().then(ret => {
            this.regimens = ret;
          });
        }
      );
    },
    getSelectedRegimen: function() {
      let selectedRegimens = [];
      this.selectedDrugs = [];
      let currentDrugs = this.regimens[this.selectedRegimen];
      currentDrugs.forEach(element => {
        this.selectedDrugs.push({
          drug_name: element.drug_name,
          drug_id: element.drug_id,
          units: element.units,
          am: element.am,
          pm: element.pm
        });
      });
      for (var i = 0; i < this.selectedDrugs.length; i++) {
        let morning_tabs = parseFloat(this.selectedDrugs[i]["am"]);
        let evening_tabs = parseFloat(this.selectedDrugs[i]["pm"]);
        let frequency = "ONCE A DAY (OD)";
        let equivalent_daily_dose = morning_tabs + evening_tabs;
        let instructions =
          this.selectedDrugs[i].drug_name +
          ":- Morning: " +
          morning_tabs +
          " tab(s), Evening: " +
          evening_tabs +
          " tabs";
        let dose = 0;

        if (evening_tabs == 0) {
          dose = morning_tabs;
        }

        if (morning_tabs == 0) {
          dose = evening_tabs;
        }

        if (morning_tabs > 0 && evening_tabs > 0) {
          frequency = "TWICE A DAY (BD)";
          dose = (morning_tabs + evening_tabs) / 2;
        }

        let drug_order = {
          drug_inventory_id: this.selectedDrugs[i].drug_id,
          dose: dose,
          equivalent_daily_dose: equivalent_daily_dose,
          frequency: frequency,
          start_date: moment().format("YYYY-MM-DD"),
          auto_expire_date: moment(this.nextAppointment).format("YYYY-MM-DD"),
          instructions: instructions,
          units: this.selectedDrugs[i].units,
          quantity: this.quantity
        };

        selectedRegimens.push(drug_order);
      }
      let drug_orders_params = { 
        encounter_type_id: 25, 
        drug_orders: selectedRegimens 
      };
    console.log(drug_orders_params);
    },
    postRegimenOrders: function() {
      var drug_orders_params = { encounter_id: 5878245, drug_orders: [] };
      var drug_orders = givenRegimens[selectedRegimens];

      for (var drugName in medication_orders) {
        var am_dose = medication_orders[drugName]["am"];
        var drug_id = medication_orders[drugName]["drug_id"];
        var drug_name = medication_orders[drugName]["drug_name"];
        var pm_dose = medication_orders[drugName]["pm"];
        var units = medication_orders[drugName]["units"];

        var drug_order = {
          drug_name: drug_name,
          drug_id: drug_id,
          units: units,
          am: am_dose,
          pm: pm_dose
        };
        drug_orders.push(drug_order);
      }

      for (var i = 0; i < drug_orders.length; i++) {
        morning_tabs = parseFloat(drug_orders[i]["am"]);
        evening_tabs = parseFloat(drug_orders[i]["pm"]);
        frequency = "ONCE A DAY (OD)";
        equivalent_daily_dose = morning_tabs + evening_tabs;
        instructions =
          drug_orders[i].drug_name +
          ":- Morning: " +
          morning_tabs +
          " tab(s), Evening: " +
          evening_tabs +
          " tabs";

        if (evening_tabs == 0) {
          dose = morning_tabs;
        }

        if (morning_tabs == 0) {
          dose = evening_tabs;
        }

        if (morning_tabs > 0 && evening_tabs > 0) {
          frequency = "TWICE A DAY (BD)";
          dose = (morning_tabs + evening_tabs) / 2;
        }

        drug_order = {
          drug_inventory_id: drug_orders[i].drug_id,
          dose: dose,
          equivalent_daily_dose: equivalent_daily_dose,
          frequency: frequency,
          // start_date: start_date_formated,
          // auto_expire_date: auto_expire_date_formated,
          instructions: instructions,
          units: drug_orders[i].units
        };

        drug_orders_params.drug_orders.push(drug_order);
      }

      console.log(drug_orders_params);
      submitParameters(drug_orders_params, "/drug_orders", "nextPage");
    }
  },
  mounted() {
    this.getRegimens();
  }
};
</script>

<style>
</style>