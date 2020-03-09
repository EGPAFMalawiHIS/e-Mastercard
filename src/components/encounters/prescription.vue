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
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
import EventBus from "../../services/event-bus.js";
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
      weight: null,
      CPTRegimens: [], 
      IPTRegimens: [], 

    };
  },
  methods: {
    getRegimens: async function(val) {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimens?weight=${this.weight}&tb_dosage=true`).then(
        res => {
          res.json().then(ret => {
            this.regimens = ret;
          });
        }
      );
    },
    getCPT: async function() {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=Cotrimoxazole`).then(
        res => {
          res.json().then(ret => {
            this.CPTRegimens = ret;
          });
        }
      );
    },getIPT: async function() {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=INH`).then(
        res => {
          res.json().then(ret => {
            this.IPTRegimens = ret;
          });
        }
      );
    },
    saveEncounter: function() {
      let selectedRegimens = [];
      this.selectedDrugs = [];
      let currentDrugs = this.regimens[this.selectedRegimen];
      let consultationObs= {
        
      }
      currentDrugs.forEach(element => {
        this.selectedDrugs.push({
          drug_name: element.drug_name,
          drug_id: element.drug_id,
          units: element.units,
          am: element.am,
          pm: element.pm,
          quantity: this.ARVquantity
        });
      });
      consultationObs.prescribeIPT= {
          concept_id : 1282,
          value_coded : 1085
        }
      if(this.prescribeCPT) {
        this.CPTRegimens.forEach(element => {
          this.selectedDrugs.push({
            drug_name: element.drug_name,
            drug_id: element.drug_id,
            units: element.units,
            am: element.am,
            pm: element.pm,
            quantity: this.CPTquantity
          });
        });
        consultationObs.prescribeCPT= {
          concept_id : 1282,
          value_coded : 916
        }
      }
      if(this.prescribeIPT) {
        this.IPTRegimens.forEach(element => {
          this.selectedDrugs.push({
            drug_name: element.drug_name,
            drug_id: element.drug_id,
            units: element.units,
            am: element.am,
            pm: element.pm,
            quantity: this.IPTquantity
          });
        });
        consultationObs.prescribeIPT= {
          concept_id :1282,
          value_coded : 656
        }
      }
      for (let i = 0; i < this.selectedDrugs.length; i++) {
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
          auto_expire_date: moment().add((this.quantity/equivalent_daily_dose) + 2, 'days').format("YYYY-MM-DD"),
          instructions: instructions,
          units: this.selectedDrugs[i].units,
          quantity: this.selectedDrugs[i].quantity
        };
        if(this.selectedDrugs[i].drug_name === "Cotrimoxazole (480mg tablet)") {

        }else {

          selectedRegimens.push(drug_order);
        }
      }
  
    let enc = {
      prescription: {
        encounter_id: 25,
        drug_orders: selectedRegimens 
      }
    }
    let enc2 = {
      consultation: {
        encounter_id: 53,
        obs: consultationObs
      }
    }
      console.log(enc2);
    this.$emit('addEncounter',  enc);
    this.$emit('addEncounter',  enc2);
    },
    
  },
  mounted() {
    this.getRegimens();
    let currentWeight = null;
    EventBus.$on('set-weight', payload => {
      this.weight = payload;
      this.getRegimens();
      this.getCPT();
      this.getIPT();
    });
  }
};
</script>

<style>
</style>