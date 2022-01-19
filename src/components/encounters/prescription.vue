<template>
  <b-row>
    <b-col cols="6">

    <div class="form-row" >
      <div class="form-group col-md-6">
        <label for="inputState">Regimen</label>
        <select
          id="inputState"
          class="form-control"
          v-model="selectedRegimen"
        >
          <option v-for="(regimen, index) in regimens" :key="index">{{index}}</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="ARV-quantity">Quantity</label>
        <input type="number" class="form-control" id="ARV-quantity" v-model="ARVquantity" />
      </div>
    </div>

    </b-col>
    
    <b-col>
        <label for="CPT-quantity">CPT Quantity</label>
        <input type="number" class="form-control" id="CPT-quantity" v-model="CPTquantity" />
    </b-col>
    <b-col> 
        <label for="IPT-quantity">IPT Quantity</label>
        <input type="number" class="form-control" id="IPT-quantity" v-model="IPTquantity" />
    </b-col>
    <b-col> 
        <label for="3HP-quantity">3HP Quantity</label>
        <input type="number" class="form-control" id="IPT-quantity" v-model="threeHPquantity" />
    </b-col>
  </b-row>
</template>

<script>
import ApiClient from "../../services/api_client";
import EventBus from "../../services/event-bus.js";
import moment from "moment";
export default {
  props: ["date"],
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
      threeHPquantity: null,
      prescribeARVs: false,
      prescribeCPT: false,
      prescribeIPT: false,
      prescribeThreeHP: false,
      weight: null,
      latestWeight: null,
      CPTRegimens: [], 
      IPTRegimens: [],
      rifapepentineRegimens: [],
      onTb: false, 
      "Unknown Regimen": [{
        "drug_id": 1046,
        "name": "Unknown ARV",
        "combination": 0,
        "am": 1,
        "pm": 0,
      }]
    };
  },
  methods: {
    getRegimens: async function(val) {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimens?weight=${this.weight}&tb_dosage=${this.onTb}`).then(
        res => {
          res.json().then(ret => {
            this.regimens = ret;
            this.regimens["Unknown"] = this["Unknown Regimen"];
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
    },getThreeHP: async function() {
      let patientID = this.$route.params.id;
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=Rifapentine`).then(
        res => {
          res.json().then(ret => {
            this.rifapepentineRegimens = ret;
          });
        }
      );
    },
    getAutoExpireDate: function() {
      if(this.ARVquantity && this.selectedRegimen) {
        let doses = [];
        this.regimens[this.selectedRegimen].forEach(element => {
          let equivalent_daily_dose = parseFloat(element.am) + parseFloat(element.pm);
          let auto_expire = (this.ARVquantity/equivalent_daily_dose) + 2;
          doses.push(auto_expire);
        });
        EventBus.$emit("earliest-expiry-date", Math.min(...doses));
      }
    },
    saveEncounter: function() {
      let selectedRegimens = [];
      this.selectedDrugs = [];
      let currentDrugs = this.regimens[this.selectedRegimen];
      let consultationObs= {
        
      }
      if(this.ARVquantity && this.selectedRegimen) {

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
          consultationObs.prescribeARV= {
          concept_id : 1282,
          value_coded : 1085
        }
      }

      if(this.CPTquantity) {
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

      if(this.IPTquantity) {
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
      if(this.threeHPquantity) {
        this.rifapepentineRegimens.forEach(element => {
          this.selectedDrugs.push({
            drug_name: element.drug_name,
            drug_id: element.drug_id,
            units: element.units,
            am: element.am,
            pm: element.pm,
            quantity: this.threeHPquantity
          });
        });
        consultationObs.prescribeThreeHP= {
          concept_id :1282,
          value_coded : 9974
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
          start_date: moment(this.date).format("YYYY-MM-DD"),
          auto_expire_date: moment(this.date).add((this.selectedDrugs[i].quantity/equivalent_daily_dose) + 2, 'days').format("YYYY-MM-DD"),
          instructions: instructions,
          units: this.selectedDrugs[i].units,
          qty: this.selectedDrugs[i].quantity
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
      consultation2: {
        encounter_id: 53,
        obs: consultationObs
      }
    }
    this.$emit('addEncounter',  enc);
    this.$emit('addEncounter',  enc2);
    },
    
  },
  mounted() {
    let currentWeight = null;
    this.latestWeight = this.$store.state.currentWeight;
    this.weight = this.latestWeight;
    this.getRegimens();
    this.getCPT();
    this.getIPT();
    this.getThreeHP();
    EventBus.$on('set-weight', payload => {
      this.selectedRegimen = null;
      this.ARVquantity = null;
      if(payload.trim() === "") {
        this.weight = this.latestWeight;
      }else {
        this.weight = payload;
      }
      this.getRegimens();
      this.getCPT();
      this.getIPT();
      this.getThreeHP();
    });
    EventBus.$on('set-initial-weight', payload => {
      this.latestWeight = payload;
      this.weight = payload;
      this.getRegimens();
      this.getCPT();
      this.getIPT();
      this.getThreeHP();
    });
 
    EventBus.$on('set-tb', payload => {
          this.onTb = payload;
    });
  },
  watch: {
     ARVquantity: {
     handler(val){
        this.getAutoExpireDate();
     },
     deep: true
  },   
  selectedRegimen: {
     handler(val){
        this.getAutoExpireDate();
     },
     deep: true
  }
}
};
</script>

<style>
</style>