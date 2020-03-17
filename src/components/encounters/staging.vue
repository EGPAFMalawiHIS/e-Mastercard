<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="contact-tab"
          data-toggle="tab"
          href="#stage_4"
          role="tab"
          aria-controls="stage 4"
          aria-selected="true"
        >Stage 4</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#stage_3"
          role="tab"
          aria-controls="stage 3"
          aria-selected="false"
        >Stage 3</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#stage_2"
          role="tab"
          aria-controls="stage 2"
          aria-selected="false"
        >Stage 2</a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          id="home-tab"
          data-toggle="tab"
          href="#stage_1"
          role="tab"
          aria-controls="stage 1"
          aria-selected="false"
        >Stage 1</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade" id="stage_4" role="tabpanel" aria-labelledby="stage_4">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 4</label>
              <v-select
                multiple
                v-model="stateFourValue"
                :options="Object.keys(stageFourConditions)"
                v-on:input="setStaging()"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="stage_3" role="tabpanel" aria-labelledby="stage_3">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 3</label>
              <v-select
                multiple
                v-model="stateThreeValue"
                :options="Object.keys(stageThreeConditions)"
                v-on:input="setStaging()"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="stage_2" role="tabpanel" aria-labelledby="stage_2">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 2</label>
              <v-select
                multiple
                v-model="stateTwoValue"
                :options="Object.keys(stageTwoConditions)"
                v-on:input="setStaging()"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="stage_1" role="tabpanel" aria-labelledby="stage_1">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 1</label>
              <v-select
                multiple
                v-model="stateOneValue"
                :options="Object.keys(stageOneConditions)"
                v-on:input="setStaging()"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import VueSelect from "vue-select";
import ApiClient from "../../services/api_client";
import moment from "moment";

var whoStageConceptMapHash = {
  "WHO STAGE 1": 9145,
  "WHO STAGE 2": 9146,
  "WHO STAGE 3": 2932,
  "WHO STAGE 4": 2933,
  "WHO STAGE I ADULT": 7561,
  "WHO STAGE I ADULT AND PEDS": 7041,
  "WHO STAGE I PEDS": 7049,
  "WHO STAGE II ADULT": 7046,
  "WHO STAGE II ADULT AND PEDS": 7042,
  "WHO STAGE II PEDS": 7050,
  "WHO STAGE III ADULT": 7047,
  "WHO STAGE III ADULT AND PEDS": 7043,
  "WHO STAGE III PEDS": 7051,
  "WHO STAGE IV ADULT": 7048,
  "WHO STAGE IV ADULT AND PEDS": 7044,
  "WHO STAGE IV PEDS": 7052
};

export default {
  components: {
    "v-select": VueSelect
  },
  props: ["patientId"],
  data: function() {
    return {
      encounterObject: {
        encounter_id: 52,
        obs: {}
      },
      stateFourValue: [],
      stateThreeValue: [],
      stateTwoValue: [],
      stateOneValue: [],
      confirmary: this.$store.state.registration.registration,
      patientAge: null,
      TODAYS_DATE: new Date(),
      whoStage: null,
      cd4Count250: null,
      cd4Count350: null,
      cd4Count500: null,
      cd4CountLocation: null,
      cd4CountDate: null,
      cd4Count: null,
      cd4CountModfier: null,
      conditions: [],
      // Age groups 0-15
      lymphocyteThresholds: {
        "0-2": 4000,
        "3-4": 3000,
        "5": 2500,
        "6-15": 2000
      },
      person: {},
      confirmatoryTypes: {
        1040: {
          name: "Rapid Antibody Test"
        },
        844: {
          name: "DNA PCR"
        },
        1118: {
          name: "Not Done"
        }
      },

      stages: ["Stage 4", "Stage 3", "Stage 2", "Stage 1"],
      stageFourConditions: {
        "Cryptococcal meningitis or other extrapulmonary cryptococcosis": 7548,
        "Candidiasis of oseophagus, trachea and bronchi or lungs": 5340,
        "Extrapulmonary tuberculosis (EPTB)": 1547,
        "Kaposis sarcoma": 507,
        "Bacterial pneumonia, severe recurrent": 1215,
        "Non-typhoidal Salmonella bacteraemia, recurrent": 7959,
        "Symptomatic HIV-associated nephropathy or cardiomyopathy": 7957,
        "Cerebral or B-cell non Hodgkin lymphoma": 2587,
        "Pneumocystis pneumonia": 882,
        "Chronic herpes simplex infection (orolabial, gential / anorectal >1 month or visceral at any site)": 5344,
        "Cytomegalovirus infection (retinitis or infection or other organs)": 7551,
        "Toxoplasmosis of the brain": 2583,
        "Invasive cancer of cervix": 2588,
        "Unspecified stage 4 condition": 7040,
        Other: 6408
      },
      stageThreeConditions: {
        Other: 6408,
        "Pneumocystis pneumonia": 882,
        "Candidiasis of oseophagus, trachea and bronchi or lungs": 5340,
        "Extrapulmonary tuberculosis (EPTB)": 1547,
        "Kaposis sarcoma": 507,
        "HIV encephalopathy": 1362,
        "Cryptococcal meningitis or other extrapulmonary cryptococcosis": 7548,
        "Disseminated non-tuberculosis mycobacterial infection": 2585,
        "Cryptosporidiosis, chronic with diarroea": 7549,
        "Isosporiasis >1 month": 7956,
        "Disseminated mycosis (coccidiomycosis or histoplasmosis)": 7550,
        "Symptomatic HIV-associated nephropathy or cardiomyopathy": 7957,
        "Progressive multifocal leukoencephalopathy": 5046,
        "Cerebral or B-cell non Hodgkin lymphoma": 2587,
        "Severe unexplained wasting or malnutrition not responding to treatment (weight-for-height/ -age <70% or MUAC less than 11cm or oedema)": 3068,
        "Bacterial infections, severe recurrent  (empyema, pyomyositis, meningitis, bone/joint infections but EXCLUDING pneumonia)": 2894,
        "Chronic herpes simplex infection (orolabial or cutaneous >1 month or visceral at any site)": 7960,
        "Cytomegalovirus infection: rentinitis or other organ (from age 1 month)": 7552,
        "Toxoplasmosis of the brain (from age 1 month)": 5048,
        "Recto-vaginal fistula, HIV-associated": 7961,
        "Severe weight loss >10% and/or BMI <18.5kg/m^2, unexplained": 7540,
        "Diarrhoea, chronic (>1 month) unexplained": 5018,
        "Fever, persistent unexplained, intermittent or constant, >1 month": 5027,
        "Pulmonary tuberculosis (current)": 8206,
        "Tuberculosis (PTB or EPTB) within the last 2 years": 7539,
        "Oral candidiasis": 5334,
        "Anaemia, unexplained < 8 g/dl": 2582,
        "Neutropaenia, unexplained < 500 /mm(cubed)": 7954,
        "Severe bacterial infections (pneumonia, empyema, pyomyositis, bone/joint, meningitis, bacteraemia)": 7541,
        "Thrombocytopaenia, chronic < 50,000 /mm(cubed)": 7955,
        "Hepatitis B or C infection": 8205,
        "Oral hairy leukoplakia": 5337,
        "Unspecified stage 3 condition": 7039
      },
      stageTwoConditions: {
        "Fever, persistent unexplained, intermittent or constant, >1 month": 5027,
        "Oral hairy leukoplakia": 5337,
        "Pulmonary tuberculosis (current)": 8206,
        "Tuberculosis (PTB or EPTB) within the last 2 years": 7539,
        "Anaemia, unexplained < 8 g/dl": 2582,
        "Neutropaenia, unexplained < 500 /mm(cubed)": 7954,
        "Thrombocytopaenia, chronic < 50,000 /mm(cubed)": 7955,
        "Moderate unexplained wasting/malnutrition not responding to treatment (weight-for-height/ -age 70-79% or muac 11-12 cm)": 7543,
        "Diarrhoea, persistent unexplained (14 days or more)": 7544,
        "Oral candidiasis (from age 2 months)": 7545,
        "Acute necrotizing ulcerative gingivitis or periodontitis": 7546,
        "Lymph node tuberculosis": 7547,
        "Bacterial pneumonia, severe recurrent": 1215,
        "Symptomatic lymphoid interstitial pneumonia": 5024,
        "Chronic HIV-associated lung disease, including bronchiectasis": 2889,
        "Moderate weight loss less than or equal to 10 percent, unexplained": 5332,
        "Respiratory tract infections, recurrent (sinusitis, tonsilitus, otitis media, pharyngitis)": 5012,
        "Seborrhoeic dermatitis": 2578,
        "Papular pruritic eruptions / Fungal nail infections": 7536,
        "Herpes zoster": 836,
        "Angular cheilitis": 2575,
        "Oral ulcerations, recurrent": 2576,
        "Unspecified stage 2 condition": 7038
      },
      stageOneConditions: {
        "Respiratory tract infections, recurrent (sinusitis, tonsilitus, otitis media, pharyngitis)": 5012,
        "Herpes zoster": 836,
        "Angular cheilitis": 2575,
        "Oral ulcerations, recurrent": 2576,
        "Papular pruritic eruptions / Fungal nail infections": 7536,
        "Hepatosplenomegaly, persistent unexplained": 7537,
        "Lineal gingival erythema": 2891,
        "Wart virus infection, extensive": 6775,
        "Molluscum contagiosum, extensive": 6776,
        "Parotid enlargement, persistent unexplained": 1210,
        "Asymptomatic HIV infection": 5327,
        "Persistent generalized lymphadenopathy": 5328
      }
    };
  },
  methods: {
    saveEncounter: function() {
      this.addConditions();
      console.log(this.encounterObject);
      this.$emit("addEncounter", { staging: this.encounterObject });
    },

    addConditions() {
      this.encounterObject.obs = {};

      const CONCEPT_MAP = {
        ...this.stageOneConditions,
        ...this.stageTwoConditions,
        ...this.stageThreeConditions,
        ...this.stageFourConditions
      };

      this.conditions = {
        stageOne: {
          id: 1,
          conditions: this.stateOneValue
        },
        stagTwo: {
          id: 2,
          conditions: this.stateTwoValue
        },
        stagThree: {
          id: 3,
          conditions: this.stateThreeValue
        },
        stagFour: {
          id: 4,
          conditions: this.stateFourValue
        }
      };

      console.log(this.conditions);
      console.log("staging....!!!");

      const stages = [
        ...this.stateOneValue,
        ...this.stateTwoValue,
        ...this.stateThreeValue,
        ...this.stateFourValue
      ];

      this.encounterObject.obs = stages.map(stage => {
        return this.buildCondition(CONCEPT_MAP[stage]);
      });
    },

    buildCondition(concept = "") {
      return {
        concept_id: 2743,
        value_coded: concept
      };
    },

    addCD4() {
      // if CD4 Count YES

      // CD4 less than 250
      this.encounterObject.obs.CD4Less250.concept_id = 8262;
      this.encounterObject.obs.CD4Less250.value_coded = this.cd4Count250;

      // CD4 less than 350
      this.encounterObject.obs.CD4Less350.concept_id = 8207;
      this.encounterObject.obs.CD4Less350.value_coded = this.cd4Count350;

      // CD4 less than 500
      this.encounterObject.obs.CD4Less500.concept_id = 9389;
      this.encounterObject.obs.CD4Less500.value_coded = this.cd4Count500;

      // CD4 Location
      this.encounterObject.obs.CD4Location.concept_id = 6830;
      this.encounterObject.obs.CD4Location.value_text = this.cd4CountLocation;

      // CD4 Date
      this.encounterObject.obs.CD4Date.concept_id = 6830;
      this.encounterObject.obs.CD4Date.value_datetime = this.cd4CountDate;

      // CD4 Count
      this.encounterObject.obs.CD4Count.concept_id = 5497;
      this.encounterObject.obs.CD4Count.value_numeric = this.cd4Count;
      this.encounterObject.obs.CD4Count.value_modifier = this.cd4CountModfier;
    },

    fetchDemographics: async function() {
      await ApiClient.get(`/people/${this.patientId}`).then(response => {
        response.json().then(data => {
          this.person = data;
          this.calculateAge(data);
        });
      });
    },

    calculateAge(data = {}) {
      const birthDate = new Date(data["birthdate"]);
      const age = Math.abs(
        new Date().getUTCFullYear() - birthDate.getUTCFullYear()
      );
      this.patientAge = age;
    },

    patientCanBePregnant() {
      return (
        this.patientAge > 12 &&
        this.patientAge < 55 &&
        this.person["gender"] == "F"
      );
    },
    setStaging() {
      this.addConditions();
      this.$store.commit("setStaging", this.conditions);
    }
  },
  created() {
    this.fetchDemographics();
  }
};
</script>

<style>
</style>