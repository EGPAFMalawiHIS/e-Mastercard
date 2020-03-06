<template>
  <div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="" id="" value="true" v-model="prescribeCPT"> CPT
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="" id="" value="true" v-model="prescribeIPT"> IPT
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="" id="" value="true" v-model="prescribeARVs"> ARVs
    </label>
  </div>
    <div class="form-row" v-if="prescribeARVs">
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
        <input type="number" class="form-control" id="inputZip" v-model="ARVquantity" />
      </div>
    </div>
    <div class="form-row" v-if="prescribeCPT">
      <div class="form-group col-md-8">
        <label for="inputState">CPT</label>
      </div>
      <div class="form-group col-md-4">
        <label for="inputZip">Quantity</label>
        <input type="number" class="form-control" id="inputZip" v-model="CPTquantity" />
      </div>
    </div>
     <div class="form-row" v-if="prescribeIPT">
      <div class="form-group col-md-8">
        <label for="inputState">IPT</label>
      </div>
      <div class="form-group col-md-4">
        <label for="inputZip">Quantity</label>
        <input type="number" class="form-control" id="inputZip" v-model="IPTquantity" />
      </div>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="height">Appointment Date</span>
      </div>
      <input type="date" class="form-control" name id v-model="nextAppointment" />
    </div>

    <!-- <button type="button" class="btn btn-primary" @click="getSelectedRegimen">dispense</button> -->
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
      ARVquantity: null,
      CPTquantity: null,
      IPTquantity: null,
      prescribeARVs: false,
      prescribeCPT: false,
      prescribeIPT: false,

    };
  },
  methods: {
    getRegimens: async function(val) {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimens?weight=50&tb_dosage=true`).then(
        res => {
          res.json().then(ret => {
            this.regimens = ret;
          });
        }
      );
    },
    saveEncounter: function() {
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
      if(this.prescribeIPT) {

        this.selectedDrugs.push({
          drug_name: element.drug_name,
          drug_id: element.drug_id,
          units: element.units,
          am: element.am,
          pm: element.pm
        });
      }
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
          quantity: this.ARVquantity
        };

        selectedRegimens.push(drug_order);
      }
      // let drug_orders_params = { 
      //   prescription: {
      //     encounter_type_id: 25, 
      //   }
      // };
    let enc = {
      prescription: {
        encounter_id: 25,
        drug_orders: selectedRegimens 
      }
    }
    // console.log(drug_orders_params);
    this.$emit('addEncounter',  enc);
    },
    
  },
  mounted() {
    this.getRegimens();
  }
};
</script>

<style>
</style>