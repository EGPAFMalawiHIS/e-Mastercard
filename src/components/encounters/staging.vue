<template>
  <div class="main-container">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float:left; font-weight: bold">Reason for Starting</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!-- this.person["gender"] == "F" -->
            <v-select
              :options="filterReasons(this.person)"
              v-model="$v.form.reason_for_eligibility.$model"
              v-on:input="setStaging"
              v-bind:style="(!$v.form.reason_for_eligibility.required || !$v.form.reason_for_eligibility.filterOption) && $v.form.reason_for_eligibility.$dirty  ? 'border: 1.5px solid red;' : ''"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Stages dropdown -->
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float:left; font-weight: bold">Select Stage</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <v-select
              :options="Object.keys(whoStageConceptMapHash)"
              v-model="$v.form.who_stage.$model"
              v-on:input="setStaging"
              v-bind:style="(!$v.form.who_stage.required || !$v.form.who_stage.filterOption) && $v.form.who_stage.$dirty  ? 'border: 1.5px solid red;' : ''"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 10px">
      <div class="col-md-12">
        <span
          style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic; float: left"
        >Recent CD4 Count results available?</span>
        <input
          @click="c4dCountAvailableCheck()"
          type="checkbox"
          style="margin-left: 10px; float: left; margin-top: 6px"
        />
      </div>
    </div>
    <div v-if="cdCountAvailable" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float:left; font-weight: bold">CD4 Count date</label>
            <input
              type="date"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Search condition"
              v-model="$v.form.cd4_count_date.$model"
              v-bind:style="!$v.form.cd4_count_date.required && $v.form.cd4_count_date.$dirty  ? 'border: 1.5px solid red;' : ''"
              @change="setStaging"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float:left; font-weight: bold">CD4 Count</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-inline">
              <select
                name="stage"
                class="form-control"
                v-model="$v.form.cd4_count_modifier.$model"
                @change="setStaging"
                v-bind:style="(!$v.form.cd4_count_modifier.required || !$v.form.cd4_count_modifier.filterOption) && $v.form.cd4_count_modifier.$dirty  ? 'border: 1.5px solid red;' : ''"
              >
                <option disabled selected>Select</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
              </select>
              <input
                type="number"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Count"
                v-model="$v.form.cd4_count.$model"
                v-bind:style="!$v.form.cd4_count.required && $v.form.cd4_count.$dirty  ? 'border: 1.5px solid red;' : ''"
                style="margin-left: 5px; width: 80%"
                v-on:input="setStaging"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cdCountAvailable" class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float:left; font-weight: bold">CD4 Count location</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <v-select
              :options="locations"
              @search="getlocations"
              v-model="$v.form.cd4_count_location.$model"
              v-bind:style="(!$v.form.cd4_count_location.required || !$v.form.cd4_count_location.filterOption) && $v.form.cd4_count_location.$dirty  ? 'border: 1.5px solid red;' : ''"
              v-on:input="setStaging"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <label style="float:left; font-weight: bold; margin-top: 10px">Select Condition(s)</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Search condition"
            v-model="search"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <ul
          class="list-group list-group-flush list-group-striped"
          style="height:150px; overflow:hidden; overflow-y:scroll; text-align:left"
          v-bind:style="!$v.form.stage_value.required && $v.form.stage_value.$dirty  ? 'border: 1.5px solid red;' : ''"
        >
          <li class="list-group-item" v-for="(stage, index) in filteredList" :key="index">
            <label class="checkbox-label">
              <input type="checkbox" v-bind:value="stage" 
              v-model="$v.form.stage_value.$model" 
              @change="setStaging" />
              <span class="checkbox-custom rectangular" style="margin-top: 12px; margin-left: 5px"></span>
            </label>
            <label style="margin-left: 16px">{{ stage }}</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from "vue-select";
import ApiClient from "../../services/api_client";
import moment from "moment";
import { validationMixin } from "vuelidate";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  sameAs,
  between
} from "vuelidate/lib/validators";
import EventBus from "../../services/event-bus.js";

export default {
  components: {
    "v-select": VueSelect
  },
  props: ["patientId"],
  mixins: [validationMixin],
  validations(){
    return{
      form:{
        reason_for_eligibility: {
          required,
          filterOption(reason_for_eligibility) {
            return !/Select Option/.test(reason_for_eligibility);
          }
        },
        who_stage: {
          required,
          filterOption(who_stage) {
            return !/Select Option/.test(who_stage);
          }
        },
        cd4_count_date: {
          required: requiredIf(() => this.cdCountAvailable)
        },
        cd4_count: {
          required: requiredIf(() => this.cdCountAvailable)
        },
        cd4_count_modifier: {
          required: requiredIf(() => this.cdCountAvailable),
          filterOption(cd4_count_modifier) {
            return !/Select/.test(cd4_count_modifier);
          }
        },
        cd4_count_location: {
          required: requiredIf(() => this.cdCountAvailable),
          filterOption(cd4_count_location) {
            return !/Select Option/.test(cd4_count_location);
          }
        },
        stage_value: {
          required
        }
      }
    }
  },
  data: function() {
    return {
      form: {
        reason_for_eligibility: "Select Option",
        who_stage: "Select Option",
        cd4_count_date: "",
        cd4_count: "",
        cd4_count_modifier: "Select",
        cd4_count_location: "Select Option",
        stage_value: []
      },
      languages: [],
      encounterObject: {
        encounter_id: 52,
        encounter_datetime: null,
        obs: {
          stage: {
            concept_id: 7562,
            value_coded: "",
            value_text: ""
          },
          cd4CountDate: {
            concept_id: 6831,
            value_datetime: ""
          },
          cd4Count: {
            concept_id: 5497,
            value_numeric: "",
            value_modifier: ""
          },
          cd4CountLocation: {
            concept_id: 6830,
            value_text: "",
            location_id: ""
          },
          cd4250: {
            concept_id: 8262,
            value_coded: "",
            value_text: ""
          },
          cd4350: {
            concept_id: 8207,
            value_coded: "",
            value_text: ""
          },
          cd4500: {
            concept_id: 9389,
            value_coded: "",
            value_text: ""
          },
          cd4750: {
            concept_id: 8208,
            value_coded: "",
            value_text: ""
          },
          reason: {
            concept_id: 7563,
            value_coded: "",
            value_text: ""
          }
        }
      },
      encounterDatetime: null,
      beforeCD4cuttoff: false,
      stageValue: [],
      stateFourValue: [],
      stateThreeValue: [],
      stateTwoValue: [],
      stateOneValue: [],
      registrationEncounter: this.$store.state.registration.registration,
      patientAge: null,
      TODAYS_DATE: new Date(),
      whoStage: "Select Option",
      reasonForArtEligibility: "Select Option",
      isPregnant: null,
      isBreastFeeding: null,
      presumedSevereHiv: false,
      cd4Count250: null,
      cd4Count350: null,
      cd4Count500: null,
      cd4CountLocation: {},
      cd4CountDate: null,
      cd4Count: null,
      cd4CountModifier: "Select Option",
      lymphocyteCount: null,
      cd4CountModfier: null,
      cdCountAvailable: false,
      conditions: [],
      selectedStage: "Select Stage",
      stageListing: [],
      search: null,
      locations: [],
      formIsValid: false,
      // Age groups 0-15
      lymphocyteThresholds: {
        "0-2": 4000,
        "3-4": 3000,
        "5": 2500,
        "6-15": 2000
      },
      person: {},
      CONCEPTS: {
        1065: "Yes",
        1066: "No",
        1040: "Rapid Antibody Test",
        844: "DNA PCR",
        1118: "Not Done"
      },
      whoStageConceptMapHash: {
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
      },
      stages: ["Stage 4", "Stage 3", "Stage 2", "Stage 1"],
      stageFourConditions: {
        id: 4,
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
        id: 3,
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
        id: 2,
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
        id: 1,
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
      },
      REASON_FOR_ART: {
        "PRESUMED SEVERE HIV": 8263,
        "HIV DNA POLYMERASE CHAIN REACTION": 844,
        "HIV infected": 1169,
        "CD4 COUNT LESS THAN OR EQUAL TO 750": 8208,
        "CD4 COUNT LESS THAN OR EQUAL TO 500": 9389,
        "CD4 COUNT LESS THAN OR EQUAL TO 350": 8207,
        "CD4 count less than or equal to 250": 8262,
        "LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 2": 7559,
        "PATIENT PREGNANT": 1755,
        BREASTFEEDING: 5632,
        Asymptomatic: 5006,
        "LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 1": 8376,
        "WHO STAGE IV ADULT": 1207,
        "WHO STAGE IV PEDS": 1223,
        "WHO STAGE III ADULT": 1206,
        "WHO STAGE III PEDS": 1222,
        "WHO STAGE II ADULT": 1205,
        "WHO STAGE II PEDS": 1221,
        "WHO STAGE I ADULT": 1204,
        "WHO STAGE I PEDS": 1220
      }
    };
  },
  computed: {
    filteredList() {
      if (this.search) {
        return Object.keys({
          ...this.stageOneConditions,
          ...this.stageTwoConditions,
          ...this.stageThreeConditions,
          ...this.stageFourConditions
        })
          .filter(stage => {
            return stage != "id"
              ? stage.toLowerCase().includes(this.search.toLowerCase())
              : "";
          })
          .sort();
      } else {
        return Object.keys({
          ...this.stageOneConditions,
          ...this.stageTwoConditions,
          ...this.stageThreeConditions,
          ...this.stageFourConditions
        })
          .filter(stage => {
            return stage != "id" ? stage : "";
          })
          .sort();
      }
    }
  },
  methods: {

    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid; //send this as a global state to the Registration component
    },

    saveEncounter: function() {
      console.log(this.encounterObject);
      this.buildObservations();
      this.$emit("addEncounter", { staging: this.encounterObject });
    },

    buildObservations() {
      // required
      if (this.form.reason_for_eligibility != null) {
        this.addReason();
      }

      //optional fields
      this.addCd4Count(); // need to fix this

      //required
      if (this.form.who_stage != null) {
        this.addWhoStages();
      }

      //optional fields
      if (this.form.stage_value != null) {
        this.addConditions();
      }

      const datetime = this.encounterDatetime.vitals.encounter_datetime

      if (datetime != null || datetime!= undefined || datetime!= "") {
        const dateStarted = moment(new Date(datetime)).format("YYYY-MM-DD");
        this.encounterObject.encounter_datetime = dateStarted;
      }else{
        const todaysDate = moment(new Date()).format("YYYY-MM-DD");
        this.encounterObject.encounter_datetime = todaysDate;
      }

    },

    buildForStagingGlobalState() {
      //Reason
      this.addReason();

      //CD4 Count
      if (this.form.cd4_count_date != null) {
        this.encounterObject.obs.cd4CountDate.value_datetime = this.form.cd4_count_date;
      }

      if (this.form.cd4_count != null) {
        this.encounterObject.obs.cd4Count.value_numeric = this.form.cd4_count;
        this.cd4CountRanges();
      }

      if (this.form.cd4_count_modifier != null) {
        this.encounterObject.obs.cd4Count.value_modifier = this.form.cd4_count_modifier;
      }

      if (Object.entries(this.form.cd4_count_location).length > 0) {
        this.encounterObject.obs.cd4CountLocation.location_id = this.form.cd4_count_location.location_id;
        this.encounterObject.obs.cd4CountLocation.value_text = this.form.cd4_count_location.label;
      }

      if (this.form.who_stage != null) {
        //Stage
        this.addWhoStages();
      }
      //Conditions
      if (this.form.stage_value != null) {
        this.addConditions();
      }

      const datetime = this.encounterDatetime.vitals.encounter_datetime

      if (datetime != null || datetime!= undefined || datetime!= "") {
        const dateStarted = moment(new Date(datetime)).format("YYYY-MM-DD");
        this.encounterObject.encounter_datetime = dateStarted;
      }else{
        const todaysDate = moment(new Date()).format("YYYY-MM-DD");
        this.encounterObject.encounter_datetime = todaysDate;
      }
    },

    selectedValues() {
      this.buildEncounter();
    },

    buildEncounter() {
      console.log(this.form.reason_for_eligibility);
      console.log(this.form.who_stage);
      console.log(this.form.stage_value);
    },

    filterReasons(params = {}) {
      let data = [];
      if (params.gender === "M") {
        data = Object.keys(this.REASON_FOR_ART)
          .filter(data => {
            return data != "PATIENT PREGNANT" && data != "BREASTFEEDING"
              ? data
              : "";
          })
          .sort();
      } else if (this.person.gender === "F") {
        data = Object.keys(this.REASON_FOR_ART).sort();
      }
      if(this.beforeCD4cuttoff) {
        data = data.filter(reason => {
          return !reason.toLowerCase().includes('cd4')
        })
      }
      return data;
    },

    buildCondition(concept = "") {
      const CONCEPT_MAP = {
        ...this.stageOneConditions,
        ...this.stageTwoConditions,
        ...this.stageThreeConditions,
        ...this.stageFourConditions
      };
      return {
        concept_id: 2743,
        value_coded: CONCEPT_MAP[concept],
        value_text: concept
      };
    },

    addConditions() {
      this.form.stage_value.map((stage, index) => {
        console.log(stage);
        return (this.encounterObject.obs[
          `condition${index}`
        ] = this.buildCondition(stage));
      });
    },

    builReasonForStarting(params = {}) {
      console.log(params.id);
      console.log(this.REASON_FOR_ART[params.reason]);
      return {
        concept_id: params.id,
        value_coded: this.REASON_FOR_ART[params.reason],
        value_text: params.reason
      };
    },

    addWhoStages() {
      this.encounterObject.obs.stage.value_coded = this.whoStageConceptMapHash[
        this.form.who_stage
      ];
      this.encounterObject.obs.stage.value_text = this.form.who_stage;
    },

    c4dCountAvailableCheck() {
      if (this.cdCountAvailable) {
        this.cdCountAvailable = false;
        this.form.cd4_count_modifier = "Modifier"
        this.form.cd4_count_location = "Location"
      } else if (this.cdCountAvailable == false) {
        this.cdCountAvailable = true;
        this.form.cd4_count_modifier = "Select"
      this.form.cd4_count_location = "Select Option"
      }

      this.setStaging();
    },

    cd4CountRanges() {
      if (this.form.cd4_count <= 250) {
        this.encounterObject.obs.cd4250 = this.buildC4DCountAnswer({
          id: 8262,
          coded: 1065,
          text: "Yes"
        });
      } else {
        this.encounterObject.obs.cd4250 = this.buildC4DCountAnswer({
          id: 8262,
          coded: 1066,
          text: "No"
        });
      }

      if (this.form.cd4_count <= 350) {
        this.encounterObject.obs.cd4350 = this.buildC4DCountAnswer({
          id: 8207,
          coded: 1065,
          text: "Yes"
        });
      } else {
        this.encounterObject.obs.cd4350 = this.buildC4DCountAnswer({
          id: 8207,
          coded: 1066,
          text: "No"
        });
      }

      if (this.form.cd4_count <= 500) {
        this.encounterObject.obs.cd4500 = this.buildC4DCountAnswer({
          id: 9389,
          coded: 1065,
          text: "Yes"
        });
      } else {
        this.encounterObject.obs.cd4500 = this.buildC4DCountAnswer({
          id: 9389,
          coded: 1066,
          text: "No"
        });
      }

      if (this.form.cd4_count <= 750) {
        this.encounterObject.obs.cd4750 = this.buildC4DCountAnswer({
          id: 8208,
          coded: 1065,
          text: "Yes"
        });
      } else {
        this.encounterObject.obs.cd4750 = this.buildC4DCountAnswer({
          id: 8208,
          coded: 1066,
          text: "No"
        });
      }
    },

    addCd4Count() {

      console.log("Adding CD4 Count....")

      console.log(this.cdCountAvailable)

      if (this.cdCountAvailable) {
        this.encounterObject.obs.cd4CountDate.value_datetime = this.form.cd4_count_date;
        this.encounterObject.obs.cd4Count.value_numeric = this.form.cd4_count;
        this.encounterObject.obs.cd4Count.value_modifier = this.form.cd4_count_modifier;
        this.encounterObject.obs.cd4CountLocation.location_id = this.form.cd4_count_location.location_id;
        this.encounterObject.obs.cd4CountLocation.value_text = this.form.cd4_count_location.label;
        this.cd4CountRanges();
      } else if (this.cdCountAvailable == false) {
        delete this.encounterObject.obs.cd4CountDate;
        delete this.encounterObject.obs.cd4Count;
        delete this.encounterObject.obs.cd4CountLocation;
        delete this.encounterObject.obs.cd4250;
        delete this.encounterObject.obs.cd4350;
        delete this.encounterObject.obs.cd4500;
        delete this.encounterObject.obs.cd4750;
        delete this.encounterObject.obs.cd4CountLocation;
      }

      console.log(this.encounterObject);
    },

    buildC4DCountAnswer(params = {}) {
      return {
        concept_id: params.id,
        value_coded: params.coded,
        value_text: params.text
      };
    },
    // encounterObject.consultation.obs[`curr` + el] = {
    addReason() {
      this.encounterObject.obs.reason.value_coded = this.REASON_FOR_ART[
        this.form.reason_for_eligibility
      ];
      this.encounterObject.obs.reason.value_text = this.form.reason_for_eligibility;
    },

    buildReasonForArt() {
      if (this.patientAge > 14) {
        console.log("Patient Age");
        if (this.form.who_stage >= 3) {
          console.log("Who stage...");
          this.form.reason_for_eligibility = "";
        } else if (this.cd4Count < 250) {
          this.form.reason_for_eligibility = "CD4 count less than or equal to 250";
        } else if (this.cd4Count < 350) {
          this.form.reason_for_eligibility = "CD4 COUNT LESS THAN OR EQUAL TO 350";
        } else if (this.cd4Count < 500) {
          this.form.reason_for_eligibility = "CD4 COUNT LESS THAN OR EQUAL TO 500";
        } else {
          if (this.form.who_stage == 1 && this.lymphocyteCount < 1200) {
            this.form.reason_for_eligibility =
              "LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 1";
          } else if (this.form.who_stage == 2 && this.lymphocyteCount < 1200) {
            this.form.reason_for_eligibility =
              "LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 2";
          } else if (this.isPregnant) {
            this.form.reason_for_eligibility = "PATIENT PREGNANT";
          } else if (this.isBreastFeeding) {
            this.form.reason_for_eligibility = "BREASTFEEDING";
          }
        }
      } else {
        console.log("I am here");
        // registrationEncounter
        const firstPositiveHivTestType = this.CONCEPTS[
          this.registrationEncounter["obs"]["confirmatoryTest"]["value_coded"]
        ];

        console.log(firstPositiveHivTestType);
        if (firstPositiveHivTestType == "Rapid Antibody Test") {
          // if the selected conditions contains either one of these

          console.log("Rapid antiboies test");

          const PRESUMED_SEVERE_HIV_CONDITIONS = [
            "Pneumocystis pneumonia",
            "Candidiasis of oseophagus, trachea and bronchi or lungs",
            "Cryptococcal meningitis",
            "Severe unexplained wasting or malnutrition not responding to treatment (weight-for-height/ -age <70% or MUAC less than 11cm or oedema)",
            "Toxoplasmosis of the brain (from age 1 month)"
          ];

          let isConditionFound = false;

          PRESUMED_SEVERE_HIV_CONDITIONS.forEach(value => {
            this.form.stage_value.includes(value)
              ? (isConditionFound = true)
              : isConditionFound;
          });

          let candidiasisSepsis =
            this.form.stage_value.includes("Oral candidiasis") &&
            this.stageVAlue.includes("Severe sepsis");
          let candidiasisPneumonia =
            this.form.stage_value.includes("Oral candidiasis") &&
            this.stageVAlue.includes("Severe pneumonia");
          let pneumoniaSepsis =
            this.form.stage_value.includes("Severe pneumonia") &&
            this.stageVAlue.includes("Severe sepsis");

          console.log(isConditionFound);

          if (isConditionFound) {
            this.presumedSevereHiv = true;
          } else if (
            candidiasisSepsis ||
            candidiasisPneumonia ||
            pneumoniaSepsis
          ) {
            this.presumedSevereHiv = true;
          } else {
            this.presumedSevereHiv = false;
          }
        }

        if (this.form.reason_for_eligibility == "NONE") {
          this.form.reason_for_eligibility = "Asymptomatic";
        }
        console.log(this.presumedSevereHiv);
      }
    },

    // need to specific if an adults or peds
    buildStage(params = {}) {
      let conditionsFound = 0;
      let severeWeightLoss = false;

      //a list of selected stage 3
      return (
        "WHO STAGE " +
        this.NUMERAL_STAGES[params.stage] +
        " " +
        params.adult_or_peds
      );
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
      this.encounterObject.obs.CD4Location.value_text = this.form.cd4_count_location;

      // CD4 Date
      this.encounterObject.obs.CD4Date.concept_id = 6830;
      this.encounterObject.obs.CD4Date.value_datetime = this.form.cd4_count_date;

      // CD4 Count
      this.encounterObject.obs.CD4Count.concept_id = 5497;
      this.encounterObject.obs.CD4Count.value_numeric = this.form.cd4_count;
      this.encounterObject.obs.CD4Count.value_modifier = this.form.cd4_count_modifier;
    },

    fetchDemographics: async function() {
      await ApiClient.get(`/people/${this.patientId}`).then(response => {
        response.json().then(data => {
          this.person = data;
          console.log(data);
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
      //this.addConditions();
      console.log("Set Staging...");
      this.encounterDatetime = this.$store.state.registration.registration
      this.buildForStagingGlobalState();

      console.log(this.cdCountAvailable)

      let staging = {}

      staging = {
        encounter: this.encounterObject,
        cd4_available: this.cdCountAvailable,
        form_is_valid: this.formIsValid
      }

      console.log(staging)

      this.$store.commit("setStaging", staging);
    },
    initialize() {

      const visitDate = this.$store.state.registration.registration.initial_visit_date;
      const beforeCutoff = moment(visitDate).isBefore("2014-04-01");
      this.beforeCD4cuttoff = beforeCutoff;
      // prevent false submission
      if (!this.cdCountAvailable) {
        this.form.cd4_count_modifier = "Modifier"
        this.form.cd4_count_location = "Location"
      }
      this.encounterObject;
      console.log(this.encounterObject);
    },
    stageSelect(stage) {
      console.log(stage);
      if (stage == 4) {
        this.stageListing = this.stageFourConditions;
      } else if (stage == 3) {
        this.stageListing = this.stageThreeConditions;
      } else if (stage == 2) {
        this.stageListing = this.stageTwoConditions;
      } else if (stage == 1) {
        this.stageListing = this.stageOneConditions;
      }
    },
    getlocations: async function(val = "") {
      await ApiClient.get(`/locations?name=` + val).then(res => {
        res.json().then(ret => {
          this.locations = ret.map(element => {
            return {
              label: element.name,
              code: element.name,
              location_id: element.location_id
            };
          });
        });
      });
    }
  },
  created() {
    this.initialize();
    this.fetchDemographics();
    this.getlocations(sessionStorage.location_name);
    EventBus.$on('validate-staging', data => {
      this.formIsValid = this.validateForm()
      console.log("Validating Staging!!!!" + this.formIsValid)
      this.setStaging()
    });
  },

  mounted() {
    this.initialize();
  }
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-label .checkbox-custom {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 24px;
  width: 24px;
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid black;
}

.checkbox-label input:checked ~ .checkbox-custom {
  background-color: #009bff;
  border-radius: 5px;
  -webkit-transform: rotate(0deg) scale(1);
  -ms-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  opacity: 1;
  border: 2px solid black;
}

.checkbox-label .checkbox-custom::after {
  position: absolute;
  content: "";
  left: 12px;
  top: 12px;
  height: 0px;
  width: 0px;
  border-radius: 5px;
  border: solid #009bff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(0deg) scale(0);
  -ms-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  opacity: 1;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

.checkbox-label input:checked ~ .checkbox-custom::after {
  -webkit-transform: rotate(45deg) scale(1);
  -ms-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  opacity: 1;
  left: 8px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  background-color: transparent;
  border-radius: 0;
}

/* For Ripple Effect */
.checkbox-label .checkbox-custom::before {
  position: absolute;
  content: "";
  left: 10px;
  top: 10px;
  width: 0px;
  height: 0px;
  border-radius: 5px;
  border: 2px solid black;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.checkbox-label input:checked ~ .checkbox-custom::before {
  left: -3px;
  top: -3px;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  -webkit-transform: scale(3);
  -ms-transform: scale(3);
  transform: scale(3);
  opacity: 0;
  z-index: 999;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

/* Style for Circular Checkbox */
.checkbox-label .checkbox-custom.circular {
  border-radius: 50%;
  border: 2px solid black;
}

.checkbox-label input:checked ~ .checkbox-custom.circular {
  background-color: #0067ff;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.checkbox-label input:checked ~ .checkbox-custom.circular::after {
  border: solid white;
  border-width: 0 2px 2px 0;
}
.checkbox-label .checkbox-custom.circular::after {
  border-radius: 50%;
}

.checkbox-label .checkbox-custom.circular::before {
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.checkbox-label input:checked ~ .checkbox-custom.circular::before {
  border-radius: 50%;
}

ul.list-group.list-group-striped li:nth-of-type(odd) {
  background: white;
}
ul.list-group.list-group-striped li:nth-of-type(even) {
  background: rgb(233, 233, 233);
}
</style>