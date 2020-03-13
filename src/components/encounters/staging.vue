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
              <state-four-list multiple v-model="stateFourValue" :options="Object.keys(stageFourConditions)"></state-four-list>
            </div>
          </div>
        </div>
      </div>
       <div class="tab-pane fade" id="stage_3" role="tabpanel" aria-labelledby="stage_3">
         <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 3</label>
              <state-four-list multiple v-model="stateThreeValue" :options="Object.keys(stageThreeConditions)"></state-four-list>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="stage_2" role="tabpanel" aria-labelledby="stage_2">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 2</label>
              <state-four-list multiple v-model="stateTwoValue" :options="Object.keys(stageTwoConditions)"></state-four-list>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="stage_1" role="tabpanel" aria-labelledby="stage_1">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label style="font-weight: bold">Stage 1</label>
              <state-four-list multiple v-model="stateOneValue" :options="Object.keys(stageOneConditions)"></state-four-list>
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

import Multiselect from 'vue-multiselect'

var who_stage_concept_map = {
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
  "Unspecified stage 3 condition": 7039,
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
  "Unspecified stage 2 condition": 7038,
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
};
// reasons["PRESUMED SEVERE HIV"] = 8263;
//             reasons["HIV DNA POLYMERASE CHAIN REACTION"] = 844;
//             reasons["HIV infected"] = 1169 ;
//             reasons["CD4 COUNT LESS THAN OR EQUAL TO 750"] = 8208;
//             reasons["CD4 COUNT LESS THAN OR EQUAL TO 500"] = 9389;
//             reasons["CD4 COUNT LESS THAN OR EQUAL TO 350"] = 8207;
//             reasons["CD4 count less than or equal to 250"] = 8262;
//             reasons["LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 2"] = 7559;
//             reasons["PATIENT PREGNANT"] = 1755;
//             reasons["BREASTFEEDING"] = 5632;
//             reasons["Asymptomatic"] = 5006;
//             reasons["LYMPHOCYTE COUNT BELOW THRESHOLD WITH WHO STAGE 1"] = 8376;
//             reasons["WHO STAGE IV ADULT"] = 1207;
//             reasons["WHO STAGE IV PEDS"] = 1223;
//             reasons["WHO STAGE III ADULT"] = 1206;
//             reasons["WHO STAGE III PEDS"] = 1222;
//             reasons["WHO STAGE II ADULT"] = 1205;
//             reasons["WHO STAGE II PEDS"] = 1221;
//             reasons["WHO STAGE I ADULT"] = 1204;
//             reasons["WHO STAGE I PEDS"] = 1220;
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
    'state-four-list': Multiselect
  },

  data: function() {
    return {
      stateFourValue: null,
      stateThreeValue: null,
      stateTwoValue: null,
      stateOneValue: null,

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
      let encounterObject = {
        hiv_staging: {
          encounter_id: 52,
          obs: {
            //   weight: this.weight,
            //   height: this.height
          }
        }
      };
      this.$emit("addEncounter", encounterObject);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>