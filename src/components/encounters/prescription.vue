<template>
  <div>
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
      <b-col v-if="selected3HPOption != '3HP (RFP + INH)'">
          <label for="IPT-quantity">IPT Quantity</label>
          <input type="number" class="form-control" id="IPT-quantity" v-model="IPTquantity" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-md-6"> 
        <label>3HP</label>
        <select id="inputState" class="form-control" v-model="selected3HPOption"> 
          <option></option>
          <option>3HP (RFP + INH)</option>
          <option>3HP (INH 300 / RFP 300)</option>
        </select>
      </b-col>
      <b-col v-if="selected3HPOption === '3HP (RFP + INH)'">
        <b-row> 
          <b-col> 
            <label for="3HP-quantity">INH Quantity</label>
              <input
                type="number"
                class="form-control"
                v-model="IPTquantity"
              />
          </b-col>
          <b-col> 
            <label>RFP Quantity</label>
            <input type="number" class="form-control" id="IPT-quantity" v-model="RFPquantity" />
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="selected3HPOption === '3HP (INH 300 / RFP 300)'">
        <label for="3HP-quantity">3HP Quantity</label>
        <input type="number" class="form-control" id="IPT-quantity" v-model="threeHPquantity" />
      </b-col>
    </b-row>
    <p/>
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
      regimens: [],
      selected3HPOption: '',
      selectedRegimen: null,
      selectedDrugs: [],
      drugOrder: [],
      nextAppointment: null,
      RFPquantity: null,
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
      RFPRegimens: [],
      CPTRegimens: [], 
      IPTRegimens: [],
      RFPplusINHRegimens: [],
      rifapepentineRegimens: [],
      rfpinhregimens:  [],
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
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=Cotrimoxazole`).then(
        res => {
          res.json().then(ret => {
            this.CPTRegimens = ret;
          });
        }
      );
    },
    getRFP: async function() {
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=Rifapentine`).then(
        res => {
          res.json().then(ret => {
            this.RFPRegimens = ret;
          })
        }
      )
    },
    getIPT: async function() {
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=INH`).then(
        res => {
          res.json().then(ret => {
            this.IPTRegimens = ret;
          });
        }
      );
    },
    getThreeHp: async function() {
      await ApiClient.get(`/programs/1/regimen_extras?weight=${this.weight}&name=INH / RFP`).then(
        res => {
          res.json().then(ret => {
            console.log(ret)
            this.RFPplusINHRegimens = ret;
          })
        }
      )
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
          quantity: this.ARVquantity,
            frequency: element.frequency
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
            quantity: this.CPTquantity,
            frequency: element.frequency
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
            quantity: this.IPTquantity,
            frequency: element.frequency
          })
        })
        consultationObs.prescribeIPT= {
          concept_id :1282,
          value_coded : 656
        }
      }

      if (this.RFPquantity && this.selected3HPOption === "3HP (RFP + INH)") {
        this.RFPRegimens.forEach(element => {
          this.selectedDrugs.push({
            drug_name: element.drug_name,
            drug_id: element.drug_id,
            units: element.units,
            am: element.am,
            pm: element.pm,
            quantity: this.RFPquantity,
            frequency: element.frequency
          });
        });
        consultationObs.prescribeRFP= {
          concept_id :1282,
          value_coded : 9974 //Rifapentine
        }
      }

      if(this.threeHPquantity && this.selected3HPOption === "3HP (INH 300 / RFP 300)") {
        this.RFPplusINHRegimens.forEach(element => {
          this.selectedDrugs.push({
            drug_name: element.drug_name,
            drug_id: element.drug_id,
            units: element.units,
            am: element.am,
            pm: element.pm,
            quantity: this.threeHPquantity,
            frequency: element.frequency
          });
        });
        consultationObs.prescribeThreeHP= {
          concept_id :1282,
          value_coded : 10565 //Isoniazid/Rifapentine
        }
      }

      for (let i = 0; i < this.selectedDrugs.length; i++) {
        let morning_tabs = parseFloat(this.selectedDrugs[i]["am"]);
        let evening_tabs = parseFloat(this.selectedDrugs[i]["pm"]);
        let frequency = this.selectedDrugs[i]["frequency"];
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
    this.latestWeight = this.$store.state.currentWeight;
    this.weight = this.latestWeight;
    this.getRegimens();
    this.getCPT();
    this.getIPT();
    this.getRFP();
    this.getThreeHp()
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
      this.getRFP();
      this.getThreeHp();
    });
    EventBus.$on('set-initial-weight', payload => {
      this.latestWeight = payload;
      this.weight = payload;
      this.getRegimens();
      this.getCPT();
      this.getIPT();
      this.getRFP();
      this.getThreeHp();
    });
 
    EventBus.$on('set-tb', payload => {
      this.onTb = payload;
    });
  },
  watch: {
     ARVquantity: {
     handler(){
        this.getAutoExpireDate();
     },
     deep: true
  },   
  selectedRegimen: {
     handler(){
        this.getAutoExpireDate();
     },
     deep: true
  }
}
};
</script>

<style>
</style>