<template>
  <div>
    <div>
      <b-row>
        <b-col v-if="isFemale">
          <b-form-group label="Pregnant" >
            <b-form-radio
              v-model="pregnant.value_coded"
              name="pregnant-radios"
              value="1065"
              inline
            >Yes</b-form-radio>
            <b-form-radio
              v-model="pregnant.value_coded"
              name="pregnant-radios"
              value="1066"
              inline
            >No</b-form-radio>
          </b-form-group>
        </b-col>
        <b-col v-if="isFemale">
          <b-form-group label="Breastfeeding">
            <b-form-radio
              v-model="breastFeeding.value_coded"
              name="breastfeeding-radios"
              value="1065"
              inline
            >Yes</b-form-radio>
            <b-form-radio
              v-model="breastFeeding.value_coded"
              name="breastfeeding-radios"
              value="1066"
              inline
            >No</b-form-radio>
          </b-form-group>
        </b-col>
      
        <b-col>
          <b-form-select v-model="currentStatus" :options="tb_status"></b-form-select>
        </b-col>

        <b-col>
          <b-form-checkbox
            v-model="hasSE"
            name="check-button"
            switch
          >Has Side Effects / Contraindications?</b-form-checkbox>

          <b-collapse id="collapse-1" class="mt-2" v-model="hasSE">
            <b-card>
              <b-form-group label="Side Effects:">
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="sides"
                  :options="sideEffects"
                  name="flavour-1"
                ></b-form-checkbox-group>
              </b-form-group>
              <b-form-checkbox v-model="otherSE" name="check-button" switch>Other</b-form-checkbox>
              <b-collapse id="collapse-1-inner" class="mt-2" v-model="otherSE">
                <b-card>
                  <b-form-checkbox-group v-model="otherSides" :options="otherSideEffects"></b-form-checkbox-group>
                </b-card>
              </b-collapse>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
export default {
  data: function() {
    return {
      gender: null,
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
      tb_status: [
        { value: null, text: 'TB Status' },
        { value: 7454, text: 'TB Not Suspected' },
        { value: 7455, text: 'TB Suspected' },
        { value: 7456, text: 'Confirmed TB Not on treatment' },
        { value: 7458, text: 'Confirmed TB on treatment' },
      ],
      drugs: {
        ARVs: 1085,
        CPT: 916,
        IPT: 656
      },
      tbSymptoms: {
        "cough of any duration": 8261,
        fever: 5945,
        "night sweats": 6029,
        "Weight loss / Failure to thrive / malnutritionweight loss": 8260
      },
      sideEffects: [
        { text: "peripheral neuropaphy", value: 821 },
        { text: "jaundince", value: 215 },
        { text: "lipodostrophy", value: 2148 },
        { text: "kidney failure", value: 9242 },
        { text: "psychosis", value: 219 },
        { text: "gynaecomastia", value: 9440 },
        { text: "anemia", value: 3 },
        { text: "skin rash", value: 512 },
        { text: "insomnia", value: 867 }
      ],
      otherSideEffects: [
        { text: "fever", value: 5945 },
        { text: "vomiting", value: 5980 },
        { text: "dizziness", value: 877 },
        { text: "headache", value: 620 },
        { text: "nausea", value: 5978 },
        { text: "weight loss", value: 8260 },
        { text: "lactic acidosis", value: 1458 },
        { text: "cough", value: 107 }
      ],
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
      statusTB: null
    };
  },
  computed: {
    isFemale() {
      return this.$store.state.patient.sex === "F" ? true : false;
    }
  },
  methods: {
    saveEncounter: function() {
      let encounterObject = {
        consultation: {
          encounter_id: 53,
          obs: {
            tb: {
              value_coded: this.currentStatus,
              concept_id: 7459
            }
          }
        }
      };
      if (this.isFemale) {
        encounterObject.consultation.obs.pregnant = this.pregnant;
        encounterObject.consultation.obs.breastFeeding = this.breastFeeding;
        encounterObject.consultation.obs.onFP = {
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
        if (this.onFP) {
          encounterObject.consultation.obs.onFP.value_coded = 1065;
        }
      }
      this.sideEffects.forEach(el => {
        encounterObject.consultation.obs[el.text] = {
          concept_id: 7755,
          value_coded: el.value,
          child: {
            concept_id: el.value,
            value_coded: this.getCoded(this.sides, el.value)
          }
        };
      });
      if (this.otherSE) {
        this.otherSideEffects.forEach(el => {
          encounterObject.consultation.obs[el.text] = {
            concept_id: 7951,
            value_coded: el.value,
            child: {
              concept_id: el.value,
              value_coded: this.getCoded(this.otherSides, el.value)
            }
          };
        });
      }
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
          value_coded: el
        };
      });
      this.$emit("addEncounter", encounterObject);
    },
    getCoded: function(parentArray, val) {
      return parentArray.includes(val) ? 1065 : 1066;
    }
  },
  watch: {
    onTb: {
      handler(val) {
        EventBus.$emit("set-tb", this.onTb.value_coded);
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