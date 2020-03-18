<template>
  <div>
    <div v-if="isFemale">
    <!-- Pregnant / Breastfeeding Questions -->
    <div class="row" v-if="isFemale">
      <div class="col d-flex justify-content-start">
        <p>Pregnant</p>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              v-model="pregnant.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              v-model="pregnant.value_coded"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
      </div>
    </div>
    <form v-if="isFemale">
      <div class="row">
      <div class="col d-flex justify-content-start">
          <p>Breastfeeding</p>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              v-model="breastFeeding.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              v-model="breastFeeding.value_coded"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </div>
      </div>
    </form>
      <form >
      <div class="row">
      <div class="col d-flex justify-content-start">
          <p>TB Status</p>
        </div>
        <div class="col">
          <select class="form-control" name="" id="" v-model="currentStatus">
            <option v-for="(status, index) in Object.keys(tb_status)"
          :key="index"
          :value="tb_status[status]">
            {{status}}
          </option>
          </select>
          </div>
        </div>
    </form>
    <!-- /Pregnant / Breastfeeding Questions -->
<div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-start">
        <label class="form-check-label" for="inlineCheckbox1">Has Side Effects / Contraindications?</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="hasSE"/>
        
          </div>
          <div class="form-check form-check-inline">
          </div>
        </div>
      </div>
      <div class="row" v-show="hasSE">
        <div class="col-md-4" v-for="(sideEffect, index) in Object.keys(sideEffects)" :key="index">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                :value="sideEffects[sideEffect]"
                v-model="sides"
              />
              {{sideEffect}}
            </label>
          </div>
        </div>
        <div class="col-md-4" >
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="true"
                v-model="otherSE"
              />
              Other
            </label>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container-fluid" v-show="otherSE">

      <p>Other Side Effects / Contraindications</p>
      <div class="row" >
        <div
          class="col-md-4"
          v-for="(sideEffect, index) in Object.keys(otherSideEffects)"
          :key="index"
        >
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                :value="otherSideEffects[sideEffect]"
                v-model="otherSides"
              />
              {{sideEffect}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container-fluid">
      <div class="form-check form-check-inline d-flex justify-content-start">
      </div>
     <div class="row">
      <div class="col d-flex justify-content-start">
        <label class="form-check-label" for="inlineCheckbox1">Currently on family planning methods?</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="onFP"/>
        
          </div>
          <div class="form-check form-check-inline">
          </div>
        </div>
      </div>
      <div class="row" v-show="onFP">
        <div class="col-md-4" :value="fpm[fp]" v-for="(fp, index) in Object.keys(fpm)" :key="index">
          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" :value="fpm[fp]" v-model="currentFPM" />
              {{fp}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-start">
        <label class="form-check-label" for="inlineCheckbox1">Prescribe family planning methods?</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="prescribeFP"/>
        
          </div>
          <div class="form-check form-check-inline">
          </div>
        </div>
      </div>
      <div class="form-check form-check-inline d-flex justify-content-start">
      </div>
      <div class="row" v-show="prescribeFP">
        <div class="col-md-4" v-for="(fp, index) in Object.keys(fpm)" :key="index">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                name
                id
                :value="fpm[fp]"
                v-model="prescribedFPM"
              />
              {{fp}}
            </label>
          </div>
        </div>
      </div>
    </div>
    </div> -->
    <br />
    
  

  
    </div>
<!-- 
    <form>
      <div class="row">
      <div class="col d-flex justify-content-start">
          <p>On TB Treatment</p>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1065"
              v-model="onTb.value_coded"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="1066"
              v-model="onTb.value_coded"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </div>
      </div>
    </form>
      <div class="row">
      <div class="col d-flex justify-content-start">
        <label class="form-check-label" for="inlineCheckbox1">Has TB Associated Symptoms?</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="hasTBSymps"/>
        
          </div>
          <div class="form-check form-check-inline">
          </div>
        </div>
      </div>
    <div class="container-fluid">
      <div class="form-check form-check-inline">
      </div>
      <div class="row" v-show="hasTBSymps">
        <div class="col-md-4" v-for="(sideEffect, index) in Object.keys(tbSymptoms)" :key="index">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                :value="tbSymptoms[sideEffect]"
                v-model="tbSymps"
              />
              {{sideEffect}}
            </label>
          </div>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      
      <div class="row" v-show="hasTBSymps">
        <div class="col-md-4" v-for="(sideEffect, index) in Object.keys(tbStatus)" :key="index">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :value="tbStatus[sideEffect]"
                v-model="statusTB"
              />
              {{sideEffect}}
            </label>
          </div>
        </div>

      </div>
    </div> -->
  </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
export default {
  data: function() {
    return {
      pregnant: {
        value_coded: null,
        concept_id: 6131
      },
      breastFeeding: {
        value_coded: null,
        concept_id: 7965
      },
      onTb: {
        value_coded: null,
        concept_id: 2690
      },
      currentStatus: null,
      fpm: {
        "Oral contraceptive pills": 780,
        "Depo-Provera": 907,
        "Intrauterine device/loop": 5275,
        Implant: 7857,
        "Male condoms": 7858,
        "Female condoms": 7859,
        "Tubal ligation": 1719,
        "None of the above": 1107
      },
     tb_status : 
     {
        "TB NOT suspected": 7454,
        "TB suspected": 7455,
        "Confirmed TB NOT on treatment": 7456,
        "Confirmed TB on treatment": 7458
      }
      ,
      drugs: {
        "ARVs": 1085,
        "CPT": 916,
        "IPT": 656
      },
      tbSymptoms: {
        "cough of any duration": 8261,
        fever: 5945,
        "night sweats": 6029,
        "Weight loss / Failure to thrive / malnutritionweight loss": 8260
      },
      sideEffects: {
        "peripheral neuropathy": 821,
        jaundice: 215,
        lipodystrophy: 2148,
        "kidney failure": 9242,
        psychosis: 219,
        gynaecomastia: 9440,
        anemia: 3,
        "skin rash": 512,
        insomnia: 867
      },
      otherSideEffects: {
        fever: 5945,
        vomiting: 5980,
        dizziness: 877,
        headache: 620,
        nausea: 5978,
        "weight loss": 8260,
        "lactic acidosis": 1458,
        cough: 107
      },
      prescribedFPM: [],
      currentFPM: [],
      sides: [],
      otherSides: [],
      tbSymps: [],
      drugsToPrescribe: [],
      onFP: false,
      prescribeFP: false,
      hasSE: false,
      otherSE: false,
      hasTBSymps: false,
      statusTB: null, 
    };
  },
  computed: {
    isFemale() {
      let gender = this.$store.getters.getPatient;
      return gender.sex === "F" ? true: false;
    }
  },
  methods: {
    saveEncounter: function() {
      let encounterObject = {
        consultation: {
          encounter_id: 53,
          obs: {
            tb: this.onTb,
            
          }
        }
      };
      if(this.isFemale) {
      encounterObject.consultation.obs.pregnant=  this.pregnant;
      encounterObject.consultation.obs.breastFeeding=  this.breastFeeding;
      encounterObject.consultation.obs.onFP=   {
              concept_id: 1717,
              value_coded: 1066
            };
      Object.keys(this.fpm).forEach(el => {
        encounterObject.consultation.obs[`pres` + el] = {
          concept_id: this.fpm[el],
          value_coded: this.getCoded(this.prescribedFPM, this.fpm[el])
        };
      });
      Object.keys(this.fpm).forEach(el => {
        encounterObject.consultation.obs[`curr` + el] = {
          concept_id: this.fpm[el],
          value_coded: this.getCoded(this.currentFPM, this.fpm[el])
        };
      });
        if(this.onFP) {
          encounterObject.consultation.obs.onFP.value_coded = 1065;
        }
      }
      Object.keys(this.sideEffects).forEach(el => {
        encounterObject.consultation.obs[el] = {
          concept_id: 7755,
          value_coded: this.sideEffects[el],
          child: {
            concept_id: this.sideEffects[el],
            value_coded: this.getCoded(this.sides, this.sideEffects[el])
          }
        };
      });
      Object.keys(this.otherSideEffects).forEach(el => {
        encounterObject.consultation.obs[el] = {
          concept_id: 7951,
          value_coded: this.otherSideEffects[el],
          child: {
            concept_id: this.otherSideEffects[el],
            value_coded: this.getCoded(
              this.otherSides,
              this.otherSideEffects[el]
            )
          }
        };
      });
      
      Object.keys(this.tbSymptoms).forEach(el => {
        encounterObject.consultation.obs[el] = {
          concept_id: this.tbSymptoms[el],
          value_coded: this.tbSymptoms[el],
          child: {
            concept_id: this.tbSymptoms[el],
            value_coded: this.getCoded(this.tbSymps, this.tbSymptoms[el])
          }
        };
      });
     this.drugsToPrescribe.forEach(el => {
        encounterObject.consultation.obs[el] = {
          concept_id: 1282,
          value_coded: el,
        };
      });
      this.$emit("addEncounter", encounterObject);
    },
    getCoded: function(parentArray, val) {
      return parentArray.includes(val) ? 1065 : 1066;
    }
  },watch: {
     onTb: {
     handler(val){
        EventBus.$emit('set-tb', this.onTb.value_coded);
      //  this.setPresent();
     },
     deep: true
  }
  }
};
</script>

<style scoped>
.col-md-4 {
  text-align: left;
}
.container-fluid {
  
    padding-left: 0px;

}
</style>