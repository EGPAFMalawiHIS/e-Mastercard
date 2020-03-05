<template>
  <div class="container" style="width: 100%; margin: auto;">
    <div class="row">
      <div class="col-md-12">
        <form id="msform">
          <!-- PATIENT DETAILS -->
          <form
            id="pDetails"
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template tab"
          >
            <h5 style="font-weight: bold">Personal Details</h5>
            <div class="form-row">
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="firstNameInput">First Name (*)</label>
                <input
                  v-model="firstname"
                  type="text"
                  class="form-control"
                  id="patient-firstname"
                  name="patient-firstname"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="middleNameInput">Middle Name</label>
                <input
                  v-model="middlename"
                  type="text"
                  class="form-control"
                  id="patient-middlename"
                  name="patient-middlename"
                  placeholder="Middle Name"
                />
              </div>
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="lastNameInput">Last Name (*)</label>
                <input
                  v-model="lastname"
                  type="text"
                  class="form-control"
                  id="patient-lastname"
                  name="patient-lastname"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="row">
              <span
                style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
              >Estimate Date of Birth?</span>
              <input
                @click="greyOut($event)"
                v-model="estimageAge"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                style="margin-left:175px; margin-top:14px"
              />
            </div>
            <div class="form-row">
              <div v-if="!estimageAge" class="form-group col-md-6 input-column">
                <label class="input-label" for="dobInput">Date Of Birth (*)</label>
                <input
                  v-model="dateOfBirth"
                  type="text"
                  class="form-control"
                  id="patient-date-of-birth"
                  name="patient-date-of-birth"
                  placeholder="Date of Birth"
                />
              </div>
              <div v-if="estimageAge" class="form-group col-md-6 input-column">
                <label class="input-label" for="dobInput">Estimage Age (*)</label>
                <input
                  v-model="estimatedAge"
                  type="text"
                  class="form-control"
                  id="patient-age-estimate"
                  name="patient-age-estimate"
                  placeholder="Estimate Age"
                />
              </div>
              <div class="form-group col-md-6 input-column">
                <label class="input-label" for="gender">Gender (*)</label>
                <select
                  v-model="gender"
                  id="patient-gender"
                  name="patient-gender"
                  class="form-control"
                >
                  <option disabled>Select Gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 input-column">
                <label class="input-label" for="firstNameInput">
                  Cellphone Number (*)
                  <span
                    style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
                  >Cellphone Number Unknown?</span>
                  <input
                    @click="cellphonNumberUnkownCheck($event)"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    style="margin-left:6px; margin-top:7px"
                  />
                </label>
                <input
                  v-model="phoneNumber"
                  type="text"
                  class="form-control"
                  id="patient-phonenumber"
                  name="patient-phonenumber"
                  placeholder="Cellphone Number"
                  :disabled="disabledPhoneNumber"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Home Village (*)</label>
                <v-select
                  v-model="homeVillage"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildPatientAddress"
                  name="patient-home-village"
                  id="patient-home-village"
                ></v-select>
              </div>
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Closest Land Mark or Plot Number (*)</label>
                <v-select
                  id="patient-landmark"
                  name="patient-landmark"
                  :options="LANDMARKS"
                  v-model="landmark"
                ></v-select>
              </div>
            </div>
            <div class="row">
              <label
                class="form-check-label"
                for="exampleCheck1"
                style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
              >Current address same as Home address?</label>

              <input
                @click="homeCurrentAddressCheck($event)"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                style="margin-left:295px; margin-top:14px"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Current Village (*)</label>
                <v-select
                  v-model="autoCompletedVillage"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildPatientCurrentAddress"
                  :disabled="homeCurrentAddress"
                  id="patient-current-village"
                  name="patient-current-village"
                ></v-select>
              </div>
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Closest Land Mark or Plot Number (*)</label>
                <v-select
                  v-model="autoCompletedLandMark"
                  :options="LANDMARKS"
                  :disabled="homeCurrentAddress"
                  id="current-landmark"
                  name="current-landmark"
                ></v-select>
              </div>
            </div>
            <input
              type="button"
              name="next"
              class="btn btn-primary personal action-button"
              value="Next Step"
              @click="sampleClicked"
              style="margin: 95px"
            />
            <div
              class="errorTxt"
              style="margin-top: 40px; height: 50px; text-align: center; font-weight: bold"
            ></div>
          </form>

          <!-- GUARDIAN -->

          <form
            id="gDetails"
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template tab"
          >
            <h5 style="font-weight: bold">
              Guardian Details
              <span
                style="font-size: 14px; margin-left: 15px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
              >Register a guardian?</span>
              <input
                @click="registerGuardianCheck($event)"
                v-model="registerGuardian"
                type="checkbox"
                class="form-check-input"
                id="register-guardian"
                name="register-guardian"
                style="margin-left:10px; margin-top:7px; text-size: 30px"
              />
            </h5>
            <div class="row">
              <div class="col-md-4">
                <label style="font-weight: bold; float:left">Patient to Guardian relationship (*)</label>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12 input-column">
                <v-select
                  v-model="patientGuardianRelationship"
                  :options="relationships"
                  @search="fetchRelationships"
                  id="relationship"
                  name="relationship"
                ></v-select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="firstNameInput">First Name (*)</label>
                <input
                  v-model="guardianFirstname"
                  type="text"
                  class="form-control"
                  id="guardian-firstname"
                  name="guardian-firstname"
                  placeholder="First Name"
                  :disabled="!registerGuardian"
                />
              </div>
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="middleNameInput">Middle Name (*)</label>
                <input
                  v-model="guardianMiddlename"
                  type="text"
                  class="form-control"
                  id="guardian-middlename"
                  name="guardian-middlename"
                  placeholder="Middle Name"
                  :disabled="!registerGuardian"
                />
              </div>
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="lastNameInput">Last Name (*)</label>
                <input
                  v-model="guardianLastname"
                  type="text"
                  class="form-control"
                  id="guardian-lastname"
                  name="guardian-lastname"
                  placeholder="Last Name"
                  :disabled="!registerGuardian"
                />
              </div>
            </div>
            <div class="row">
              <span
                style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
              >Estimate Date of Birth?</span>
              <input
                @click="estimateGuarianAge($event)"
                v-model="guardianEstimageAge"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                style="margin-left:175px; margin-top:14px"
                :disabled="!registerGuardian"
              />
            </div>
            <div class="form-row">
              <div v-if="!guardianEstimageAge" class="form-group col-md-6 input-column">
                <label class="input-label" for="dobInput">Date Of Birth (*)</label>
                <input
                  v-model="guardianDateOfBirth"
                  type="text"
                  class="form-control"
                  id="guardian-date-of-birth"
                  placeholder="Date of Birth"
                  :disabled="!registerGuardian"
                />
              </div>
              <div v-if="guardianEstimageAge" class="form-group col-md-6 input-column">
                <label class="input-label" for="dobInput">Estimate Age (*)</label>
                <input
                  v-model="guardianEstimatedAge"
                  type="text"
                  class="form-control"
                  id="guardian-estimated-age"
                  placeholder="Estimage Age"
                  :disabled="!registerGuardian"
                />
              </div>
              <div class="form-group col-md-6 input-column">
                <label class="input-label" for="gender">Gender (*)</label>
                <select
                  v-model="guardianGender"
                  id="guardian-gender"
                  name="guardian-gender"
                  class="form-control"
                  :disabled="!registerGuardian"
                >
                  <option disabled>Select Gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 input-column">
                <label class="input-label" for="firstNameInput">
                  Cellphone Number (*)
                  <span
                    style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
                  >Cellphone Number Unknown?</span>
                  <input
                    @click="guardianCellphoneNumberUnknown($event)"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    style="margin-left:6px; margin-top:7px"
                  />
                </label>
                <input
                  v-model="guardianPhoneNumber"
                  type="text"
                  class="form-control"
                  id="guardian-phonenumber"
                  name="guardian-phonenumber"
                  placeholder="Cellphone Number"
                  :disabled="!registerGuardian || disabledGuardianPhoneNumber"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Home Village (*)</label>
                <v-select
                  v-model="guardianHomeVillage"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildGuardianAddress"
                  :disabled="!registerGuardian"
                  id="guardian-home-village"
                  name="guardian-home-village"
                ></v-select>
              </div>
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Closest Land Mark or Plot Number (*)</label>
                <v-select
                  :options="LANDMARKS"
                  v-model="guardianLandMark"
                  :disabled="!registerGuardian"
                  id="guardian-landmark"
                  name="guardian-landmark"
                ></v-select>
              </div>
            </div>
            <div class="row">
              <label
                class="form-check-label"
                for="exampleCheck1"
                style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
              >Current address same as Home address?</label>

              <input
                @click="guardianHomeCurrentAddressCheck($event)"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                style="margin-left:295px; margin-top:14px"
                :disabled="!registerGuardian"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Current Village (*)</label>
                <v-select
                  v-model="guardianCurrentVillage"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildGuardianCurrentAddress"
                  :disabled="guardianHomeCurrentAddress || !registerGuardian"
                  id="guardian-current-village"
                  name="guardian-current-village"
                ></v-select>
              </div>
              <div class="form-group col-md-6 input-column">
                <label style="font-weight: bold">Closest Land Mark or Plot Number (*)</label>
                <v-select
                  v-model="guardianAutoCompletedLandMark"
                  :options="LANDMARKS"
                  :disabled="guardianHomeCurrentAddress || !registerGuardian"
                  id="guardian-landmark"
                  name="guardian-landmark"
                ></v-select>
              </div>
            </div>
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="margin-right: 5px; margin-top: 20px"
            />
            <input
              type="button"
              name="next"
              class="btn btn-primary guardian action-button"
              value="Next Step"
              @click="sampleClicked"
              style=" margin-top: 20px"
            />
            <div
              class="guardianError"
              style="margin-top: 10px; height: 1px; text-align: center; font-weight: bold"
            ></div>
          </form>

          <!-- SUMMARY -->

          <form
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
          >
            <div class="row">
              <h5 style="font-weight: bold; margin: auto; margin-bottom: 10px">Registration Summary</h5>
              <div class="col-md-12">
                <table class="table table-striped" style="text-align: left">
                  <col />
                  <colgroup span="2"></colgroup>
                  <colgroup span="2"></colgroup>
                  <colgroup span="2"></colgroup>
                  <tr>
                    <td rowspan="2"></td>
                  </tr>
                  <tr>
                    <th scope="col">Patient</th>
                    <th scope="col">Guardian</th>
                  </tr>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{{firstname}} {{middlename}} {{lastname}}</td>
                      <td>{{guardianFirstname}} {{guardianMiddlename}} {{guardianLastname}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Birthdate</th>
                      <td>{{estimateBirthdate(estimatedAge)}}</td>
                      <td>{{guardianDateOfBirth}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{{gender}}</td>
                      <td>{{guardianGender}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Cellphone</th>
                      <td>{{phoneNumber}}</td>
                      <td>{{guardianPhoneNumber}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Home Village</th>
                      <td>{{homeVillage.code}}</td>
                      <td>{{guardianHomeVillage.code}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Closest Landmaark</th>
                      <td>{{landmark.code}}</td>
                      <td>{{guardianLandMark.code}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Current Village</th>
                      <td>{{autoCompletedVillage.code}}</td>
                      <td>{{guardianCurrentVillage.code}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Current Closest Landmark</th>
                      <td>{{autoCompletedLandMark.code}}</td>
                      <td>{{guardianAutoCompletedLandMark.code}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Patient to Guardian Relationship</th>
                      <td>{{patientGuardianRelationship.code}}</td>
                      <td>{{patientGuardianRelationship.code}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="margin-right: 5px; margin-top: 45px"
            />
            <input
              type="button"
              name="make_payment"
              class="btn btn-primary confirm action-button"
              value="Confirm"
              style="margin-top: 45px"
              @click="submitPersonCreate"
            />
          </form>

          <!-- SUCCESS PAGE -->

          <form
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
          >
            <div class="form-card">
              <h2 class="fs-title text-center">Success !</h2>
              <br />
              <br />
              <div class="row justify-content-center">
                <div class="col-3">
                  <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image" />
                </div>
              </div>
              <br />
              <br />
              <div class="row justify-content-center">
                <div class="col-7 text-center">
                  <h5>Patient added</h5>
                </div>
              </div>
            </div>
          </form>
          <!-- progressbar -->
          <ul id="progressbar">
            <li class="active" id="account">
              <strong>Personal Details</strong>
            </li>
            <li id="payment">
              <strong>Guardian Details</strong>
            </li>
            <li id="confirm">
              <strong>Summary</strong>
            </li>
            <li id="success">
              <strong>Success</strong>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template> 
<script>
import $ from "jquery";
import Config from "../../public/config.json";
import ApiClient from "../services/api_client";
import moment from "moment";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import jqueryValidation from "jquery-validation";

export default {
  name: "app",
  data() {
    return {
      Date: new Date(),
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      },
      firstname: null,
      middlename: null,
      lastname: null,
      gender: "Select Gender",
      dateOfBirth: null,
      estimatedAge: null,
      estimageAge: false,
      guardianFirstname: null,
      guardianMiddlename: null,
      guardianLastname: null,
      guardianGender: "Select Gender",
      guardianDateOfBirth: null,
      guardianEstimatedAge: null,
      guardianEstimageAge: false,
      homeDistrict: null,
      homeTA: null,
      homeVillage: "Select Home Village",
      currentDistrict: null,
      currentTA: null,
      currentVillage: "Select Current Village",
      guardianHomeDistrict: null,
      guardianHomeTA: null,
      guardianHomeVillage: "Select Home Village",
      guardianCurrentDistrict: null,
      guardianCurrentTA: null,
      guardianCurrentVillage: "Select Current Village",
      guardianPhoneNumber: null,
      guardianLandMark: "Select Landmark",
      guardianOccupation: null,
      autoCompletedVillage: "Select Current Village",
      autoCompletedLandMark: "Select Current Landmark",
      guardianAutoCompletedVillage: "Select Current Village",
      guardianAutoCompletedLandMark: "Select Current Landmark",
      landmark: "Select Landmark",
      currentLandmark: null,
      phoneNumber: null,
      disabledPhoneNumber: false,
      disabledGuardianPhoneNumber: false,
      occupation: "Select Occupation",
      relationship: null,
      patientGuardianRelationship: "Select Relationship",
      patientType: "Select Patient Type",
      PATIENT_TYPES: {
        "New patient": 7572,
        "External consultation": 9684
      },
      facilityName: null,
      homeCurrentAddress: false,
      guardianHomeCurrentAddress: false,
      villages: [],
      taId: null,
      taName: null,
      village: null,
      registerGuardian: true,
      relationships: [],
      personalDetailsValid: false,
      guardianDetailsValid: false,
      person: {},
      patient: {},
      guardian: {},
      LANDMARKS: [
        {
          id: "Catholic Church",
          label: "Catholic Church",
          code: "Catholic Church"
        },
        {
          id: "CCAP",
          label: "CCAP",
          code: "CCAP"
        },
        {
          id: "Seventh Day",
          label: "Seventh Day",
          code: "Seventh Day"
        },
        {
          id: "Mosque",
          label: "Mosque",
          code: "Mosque"
        },
        {
          id: "Primary School",
          label: "Primary School",
          code: "Primary School"
        },
        {
          id: "Borehole",
          label: "Borehole",
          code: "Borehole"
        },
        {
          id: "Secondary School",
          label: "Secondary School",
          code: "Secondary School"
        },
        {
          id: "College",
          label: "College",
          code: "College"
        },
        {
          id: "Market",
          label: "Market",
          code: "Market"
        },
        {
          id: "Football Ground",
          label: "Football Ground",
          code: "Football Ground"
        },
        {
          id: "Other",
          label: "Other",
          code: "Other"
        }
      ]
    };
  },
  components: {
    "v-select": VueSelect,
    jqueryValidation
  },
  methods: {
    sampleClicked() {
      console.log("Click for click");
    },

    createPerson(params = {}) {
      fetch(`${this.config.api_base_url}/people`, {
        method: "POST",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              const person = {
                person_id: data.person_id,
                program_id: 1
              };

              if (params["isPatient"]) {
                this.createPatient(person);
              } else {
                // Guardian registered
                if (this.registerGuardian) {
                  const relationship = {
                    type: params.type,
                    guardian_id: data.person_id,
                    patient_id: params.patient_id
                  };

                  this.createRelationship(relationship);
                }
              }
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    createPatient(params = {}) {
      fetch(`${this.config.api_base_url}/patients`, {
        method: "POST",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              this.enrollIntoART(data.patient_id);
              console.log(data);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    enrollIntoART(patientId = "") {
      const PARAMS = `/${patientId}/programs/`;
      fetch(`${this.config.api_base_url}/patients${PARAMS}`, {
        method: "POST",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          program_id: 1,
          date_enrolled: this.Date
        })
      })
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              this.createRegistrationEncounter(patientId);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    fetchVillages(name = "") {
      const PARAMS = `?name=${name}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/villages${PARAMS}`, {
        // filter by name
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              this.villages = data.map(village => {
                return {
                  village_id: village.village_id,
                  label: village.name,
                  code: village.name,
                  ta_id: village.traditional_authority_id
                };
              });

              // set village name here
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    // PATIENT ADDRESS
    buildPatientAddress(village) {
      //const homeAddress = "Home"
      const params = {
        address: "Home",
        ta_id: village.ta_id,
        person: "Patient"
      };
      this.fetchTA(params);
    },

    buildPatientCurrentAddress(village) {
      const params = {
        address: "Current",
        ta_id: village.ta_id,
        person: "Patient"
      };
      this.fetchTA(params);
    },

    // GUARDIAN ADDRESS
    buildGuardianAddress(village) {
      //const homeAddress = "Home"
      const params = {
        address: "Home",
        ta_id: village.ta_id,
        person: "Guardian"
      };
      this.fetchTA(params);
    },

    buildGuardianCurrentAddress(village) {
      const params = {
        address: "Current",
        ta_id: village.ta_id,
        person: "Guardian"
      };
      this.fetchTA(params);
    },

    fetchTA(params = {}) {
      const PARAMS = `?traditional_authority_id=${params.ta_id}`;
      fetch(`${this.config.api_base_url}/traditional_authorities${PARAMS}`, {
        // filter by name
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              if (params.address === "Home" && params.person === "Patient") {
                this.homeTA = data[0].name;
              } else if (
                params.address === "Current" &&
                params.person === "Patient"
              ) {
                this.currentTA = data[0].name;
              }

              if (params.address === "Home" && params.person === "Guardian") {
                this.guardianHomeTA = data[0].name;
              } else if (
                params.address === "Current" &&
                params.person === "Guardian"
              ) {
                this.guardianCurrentTA = data[0].name;
              }

              const districtParams = {
                id: data[0].district_id,
                address: params.address,
                person: params.person
              };

              this.fetchDistrict(districtParams);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    fetchDistrict(params = {}) {
      const PARAMS = `?district_id=${params.id}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/districts${PARAMS}`, {
        // filter by name
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              if (params.address === "Home" && params.person === "Patient") {
                this.homeDistrict = data[0].name;
              } else if (
                params.address === "Current" &&
                params.person === "Patient"
              ) {
                this.currentDistrict = data[0].name;
              }

              if (params.address === "Home" && params.person === "Guardian") {
                this.guardianHomeDistrict = data[0].name;
              } else if (
                params.address === "Current" &&
                params.person === "Guardian"
              ) {
                this.guardianCurrentDistrict = data[0].name;
              }
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    buildRegistrationEncounter(patientId = "") {
      return {
        encounter_type_id: 5,
        patient_id: patientId,
        program_id: 1,
        encounter_datetime: this.Date
      };
    },

    createRegistrationEncounter(patientId = "") {
      fetch(`${this.config.api_base_url}/encounters`, {
        method: "POST",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(this.buildRegistrationEncounter(patientId))
      })
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              console.log(data);
              const ob = {
                encounter_id: data.encounter_id,
                answer: this.PATIENT_TYPES["New patient"]
              };
              console.log(this.buildPatientTypeObs(ob));
              if (this.registerGuardian) {
                this.submitGuardianCreate(patientId);
              }
              this.createPatientTypeObs(this.buildPatientTypeObs(ob));
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    buildPatientTypeObs(params = {}) {
      return {
        encounter_id: params.encounter_id,
        observations: [
          {
            concept_id: 3289,
            value_coded: params.answer
          }
        ]
      };
    },

    createPatientTypeObs(params = {}) {
      fetch(`${this.config.api_base_url}/observations`, {
        method: "POST",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              console.log(data);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    greyOut() {
      if (this.estimageAge == false) {
        this.estimageAge = true;
      } else if (this.estimageAge == true) {
        this.estimageAge = false;
      }
    },

    cellphonNumberUnkownCheck() {
      if (this.disabledPhoneNumber == false) {
        this.phoneNumber = "Unknown";
        this.disabledPhoneNumber = true;
      } else if (this.disabledPhoneNumber == true) {
        this.phoneNumber = "";
        this.disabledPhoneNumber = false;
      }
    },

    guardianCellphoneNumberUnknown() {
      if (this.disabledGuardianPhoneNumber == false) {
        this.guardianPhoneNumber = "Unknown";
        this.disabledGuardianPhoneNumber = true;
      } else if (this.disabledGuardianPhoneNumber == true) {
        this.guardianPhoneNumber = "";
        this.disabledGuardianPhoneNumber = false;
      }
    },

    estimateGuarianAge() {
      if (this.guardianEstimageAge == false) {
        this.guardianEstimageAge = true;
      } else if (this.guardianEstimageAge == true) {
        this.guardianEstimageAge = false;
      }
    },

    registerGuardianCheck() {
      if (this.registerGuardian == false) {
        this.registerGuardian = true;
      } else if (this.registerGuardian == true) {
        this.registerGuardian = false;
      }
    },

    estimateBirthdate(age) {
      const currYear = this.Date.getFullYear();
      const estYear = currYear - parseInt(age);
      return estYear + "-07-01";
    },

    homeCurrentAddressCheck() {
      if (this.homeCurrentAddress == false) {
        this.autoCompletedVillage = this.homeVillage;
        this.autoCompletedLandMark = this.landmark;
        this.homeCurrentAddress = true;
      } else if (this.homeCurrentAddress == true) {
        this.autoCompletedVillage = "";
        this.autoCompletedLandMark = "";
        this.homeCurrentAddress = false;
      }
      console.log(this.homeCurrentAddress);
    },

    guardianHomeCurrentAddressCheck() {
      if (this.guardianHomeCurrentAddress == false) {
        this.guardianCurrentVillage = this.guardianHomeVillage;
        this.guardianAutoCompletedLandMark = this.guardianLandMark;
        this.guardianHomeCurrentAddress = true;
      } else if (this.guardianHomeCurrentAddress == true) {
        this.guardianCurrentVillage = "";
        this.guardianAutoCompletedLandMark = "";
        this.guardianHomeCurrentAddress = false;
      }
      console.log(this.guardianHomeCurrentAddress);
    },

    submitPersonCreate() {
      this.person = {
        given_name: this.firstname,
        middle_name: this.middlename || "",
        family_name: this.lastname,
        gender: this.gender,
        birthdate: this.estimageAge
          ? this.estimateBirthdate(this.estimatedAge)
          : this.dateOfBirth,
        birthdate_estimated: this.estimageAge ? "Yes" : "No",
        home_district: this.homeDistrict,
        home_traditional_authority: this.homeTA,
        home_village: this.homeVillage,
        current_district: this.homeCurrentAddress
          ? this.homeDistrict
          : this.currentDistrict,
        current_traditional_authority: this.homeCurrentAddress
          ? this.homeTA
          : this.currentTA,
        current_village: this.homeCurrentAddress
          ? this.homeVillage
          : this.autoCompletedVillage, //CONFIRM IF THIS IS WORKING
        landmark: this.landmark.code,
        cell_phone_number: this.phoneNumber,
        occupation: null,
        relationship: this.registerGuardian ? "Yes" : "No",
        patient_type: this.patientType,
        facility_name: null
      };

      console.log(this.person);

      this.guardian = this.person

      this.person["isPatient"] = true;

      this.createPerson(this.person);
    },

    submitGuardianCreate(patientId = "") {
      this.person = {
        given_name: this.guardianFirstname,
        middle_name: this.guardianMiddlename || "",
        family_name: this.guardianLastname,
        gender: this.guardianGender,
        birthdate: this.guardianEstimageAge
          ? this.estimateBirthdate(this.guardianEstimatedAge)
          : this.guardianDateOfBirth,
        birthdate_estimated: this.guardianEstimageAge ? "Yes" : "No",
        home_district: this.guardianHomeDistrict,
        home_traditional_authority: this.guardianHomeTA,
        home_village: this.guardianHomeVillage,
        current_district: this.guardianHomeCurrentAddress
          ? this.guardianHomeDistrict
          : this.guardianCurrentDistrict,
        current_traditional_authority: this.guardianHomeCurrentAddress
          ? this.guardianHomeTA
          : this.guardianCurrentTA,
        current_village: this.guardianHomeCurrentAddress
          ? this.guardianHomeVillage
          : this.guardianHomeCurrentAddress,
        landmark: this.landmark.code,
        cell_phone_number: this.guardianPhoneNumber,
        occupation: null,
        relationship: this.registerGuardian ? "Yes" : "No",
        patient_type: "",
        facility_name: null
      };

      this.guardian = this.person

      this.person["isPatient"] = false;
      this.person["patient_id"] = patientId;

      this.createPerson(this.person);
    },

    fetchRelationships(name = "") {
      const PARAMS = `?name=${name}`;
      fetch(`${this.config.api_base_url}/types/relationships${PARAMS}`, {
        // filter by name
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              this.relationships = data.map(relationship => {
                return {
                  id: relationship.relationship_type_id,
                  label:
                    relationship.a_is_to_b + " to " + relationship.b_is_to_a,
                  code: relationship.a_is_to_b + " to " + relationship.b_is_to_a
                };
              });
              console.log(this.relationships);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    createRelationship(params = {}) {
      console.log(this.patientGuardianRelationship.id);
      const relationship = {
        relationship_type_id: this.patientGuardianRelationship.id,
        relation_id: params.guardian_id
      };

      fetch(
        `${this.config.api_base_url}/people/${params.patient_id}/relationships`,
        {
          method: "POST",
          headers: {
            Authorization: this.config.token,
            "Content-type": "application/json"
          },
          body: JSON.stringify(relationship)
        }
      )
        .then(response => {
          if (response.status === 201) {
            return response.json().then(data => {
              console.log(data);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    landmarkSelected(landmark) {
      console.log("Landmark selected: " + landmark);
    },
    initileWizard() {
      $(document).ready(function() {
        let current_fs, next_fs, previous_fs; //fieldsets
        let opacity;

        let pDetails = $("#pDetails");
        const message =
          "<label style='color:red'> All required fields (*) must be completed before proceeding. </label>";

        $(".personal").click(function() {
          const detailsValid = () => {
            let firstname = $("#patient-firstname")
              .val()
              .trim().length;
            let lastname = $("#patient-lastname")
              .val()
              .trim().length;
            let dob = $("#patient-date-of-birth").val()
              ? $("#patient-date-of-birth").val().length
              : 0;
            let age = $("#patient-age-estimate").val()
              ? $("#patient-age-estimate").val().length
              : 0;
            let phone = $("#patient-phonenumber")
              .val()
              .trim().length;
            let gender = $("#patient-gender :selected").text().length;
            let homeVillage = $("#patient-home-village")
              .text()
              .trim()
              .replace("Loading...", "").length;
            let patientLandmark = $("#patient-landmark")
              .text()
              .trim()
              .replace("Loading...", "").length;
            let currentVillage = $("#patient-current-village")
              .text()
              .trim()
              .replace("Loading...", "").length;
            let guardianLandmark = $("#current-landmark")
              .text()
              .trim()
              .replace("Loading...", "").length;

            return (
              firstname > 0 &&
              lastname > 0 &&
              (dob > 0 || age > 0) &&
              phone > 0 &&
              gender > 0 &&
              gender != "Select Gender" &&
              homeVillage > 0 &&
              homeVillage != "Select Home Village" &&
              currentVillage > 0 &&
              currentVillage != "Select Current Village" &&
              patientLandmark > 0 &&
              patientLandmark != "Select Landmark" &&
              guardianLandmark > 0 &&
              guardianLandmark != "Select Current Landmark"
            );
          };

          if (detailsValid()) {
            $(".errorTxt").html("");
            current_fs = $(this).parent();
            next_fs = $(this)
              .parent()
              .next();
            //Add Class Active
            $("#progressbar li")
              .eq($(".content-tab").index(next_fs))
              .addClass("active");

            //show the next fieldset
            next_fs.show();

            current_fs.animate(
              { opacity: 0 },
              {
                step: function(now) {
                  // for making fielset appear animation
                  opacity = 1 - now;

                  current_fs.css({
                    display: "none",
                    position: "relative"
                  });
                  next_fs.css({ opacity: opacity });
                },
                duration: 600
              }
            );
          } else {
            $(".errorTxt").html(message);
            return;
          }
        });

        // GUARDIAN

        $(".guardian").click(function() {
          const detilsValid = () => {
            let register = $("#register-guardian").is(":checked");
            console.log(register);
            let relationship = $("#relationship")
              .text()
              .trim()
              .replace("Loading...", "").length;
            console.log(relationship);
            let firstname = $("#guardian-firstname")
              .val()
              .trim().length;
            console.log(firstname);
            let lastname = $("#guardian-lastname")
              .val()
              .trim().length;
            console.log(lastname);
            let dob = $("#guardian-date-of-birth").val()
              ? $("#guardian-date-of-birth").val().length
              : 0;
            console.log(dob);
            let age = $("#guardian-estimated-age").val()
              ? $("#guardian-estimated-age").val().length
              : 0;
            console.log(age);
            let phone = $("#guardian-phonenumber")
              .val()
              .trim().length;
            console.log(phone);
            let gender = $("#guardian-gender :selected").text().length;
            console.log(gender);
            let homeVillage = $("#guardian-home-village")
              .text()
              .trim()
              .replace("Loading...", "").length;
            console.log(homeVillage);
            let patientLandmark = $("#guardian-landmark")
              .text()
              .trim()
              .replace("Loading...", "").length;
            console.log(patientLandmark);
            let currentVillage = $("#guardian-current-village")
              .text()
              .trim()
              .replace("Loading...", "").length;
            console.log(currentVillage);
            let guardianLandmark = $("#guardian-landmark")
              .text()
              .trim()
              .replace("Loading...", "").length;
            console.log(guardianLandmark);

            return (
              register &&
              relationship > 0 &&
              relationship != "Select Relationship" &&
              firstname > 0 &&
              lastname > 0 &&
              (dob > 0 || age > 0) &&
              phone > 0 &&
              gender > 0 &&
              gender != "Select Gender" &&
              homeVillage > 0 &&
              homeVillage != "Select Home Village" &&
              currentVillage > 0 &&
              currentVillage != "Select Current Village" &&
              patientLandmark > 0 &&
              patientLandmark != "Select Landmark" &&
              guardianLandmark > 0 &&
              guardianLandmark != "Select Current Landmark"
            );
          };

          // validate if checkbox checked to register
          if (detilsValid()) {
            $(".guardianError").html("");
            current_fs = $(this).parent();
            next_fs = $(this)
              .parent()
              .next();
            //Add Class Active
            $("#progressbar li")
              .eq($(".content-tab").index(next_fs))
              .addClass("active");

            //show the next fieldset
            next_fs.show();

            current_fs.animate(
              { opacity: 0 },
              {
                step: function(now) {
                  // for making fielset appear animation
                  opacity = 1 - now;

                  current_fs.css({
                    display: "none",
                    position: "relative"
                  });
                  next_fs.css({ opacity: opacity });
                },
                duration: 600
              }
            );
          } else {
            $(".guardianError").html(message);
            return;
          }
        });

        $(".previous").click(function() {
          current_fs = $(this).parent();
          previous_fs = $(this)
            .parent()
            .prev();

          //Remove class active
          $("#progressbar li")
            .eq($(".content-tab").index(current_fs))
            .removeClass("active");

          //show the previous fieldset
          previous_fs.show();

          //hide the current fieldset with style
          current_fs.animate(
            { opacity: 0 },
            {
              step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                  display: "none",
                  position: "relative"
                });
                previous_fs.css({ opacity: opacity });
              },
              duration: 600
            }
          );
        });

        $(".confirm").click(function() {
          console.log("confirm clicked");
          current_fs = $(this).parent();
          next_fs = $(this)
            .parent()
            .next();
          //Add Class Active
          $("#progressbar li")
            .eq($(".content-tab").index(next_fs))
            .addClass("active");

          //show the next fieldset
          next_fs.show();

          current_fs.animate(
            { opacity: 0 },
            {
              step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                  display: "none",
                  position: "relative"
                });
                next_fs.css({ opacity: opacity });
              },
              duration: 600
            }
          );
        });

        $(".radio-group .radio").click(function() {
          $(this)
            .parent()
            .find(".radio")
            .removeClass("selected");
          $(this).addClass("selected");
        });

        $(".submit").click(function() {
          console.log("Patient Details submitted!!!");
          return false;
        });
      });
    }
  },
  created() {
    this.fetchRelationships();
    this.fetchVillages();
  },
  mounted() {
    this.initileWizard();
  }
};
</script> 
<style scoped>
#msform {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  margin-top: 20px;
}

#msform .content-tab {
  background: white;
  border: 0 none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding-bottom: 20px;
  position: relative;
}

#msform .content-tab:not(:first-of-type) {
  display: none;
}

#msform .content-tab .form-card {
  text-align: left;
  color: #9e9e9e;
}

select.list-dt {
  border: none;
  outline: 0;
  border-bottom: 1px solid #ccc;
  padding: 2px 5px 3px 5px;
  margin: 2px;
}

select.list-dt:focus {
  border-bottom: 2px solid skyblue;
}

.card {
  z-index: 0;
  border: none;
  border-radius: 0.5rem;
  position: relative;
}

.fs-title {
  font-size: 25px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  color: lightgrey;
}

#progressbar .active {
  color: #000000;
}

#progressbar li {
  list-style-type: none;
  font-size: 12px;
  width: 24%;
  float: left;
  position: relative;
}

#progressbar #account:before {
  font-family: FontAwesome;
  content: "1";
}

#progressbar #personal:before {
  font-family: FontAwesome;
  content: "2";
}

#progressbar #payment:before {
  font-family: FontAwesome;
  content: "2";
}

#progressbar #confirm:before {
  font-family: FontAwesome;
  content: "3";
}

#progressbar #success:before {
  font-family: FontAwesome;
  content: "4";
}

#progressbar li:before {
  width: 50px;
  height: 50px;
  line-height: 45px;
  display: block;
  font-size: 18px;
  color: #ffffff;
  background: lightgray;
  border-radius: 50%;
  margin: 0 auto 10px auto;
  padding: 2px;
}

#progressbar li:after {
  content: "";
  width: 100%;
  height: 2px;
  background: lightgray;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: -1;
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: skyblue;
}

.fit-image {
  width: 100%;
  object-fit: cover;
}

.form-template {
  height: 670px;
}

.input-label {
  float: left;
  font-weight: bold;
}

.summary {
  border-radius: 5px;
  border-style: ridge;
  height: 150px;
  margin-bottom: 30px;
}

.input-column {
  margin: auto;
  margin-bottom: 10px;
}
</style>