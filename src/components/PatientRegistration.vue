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
                  v-model="$v.form.first_name.$model"
                  type="text"
                  class="form-control"
                  id="patient-firstname"
                  name="patient-firstname"
                  placeholder="First Name"
                  v-bind:style="!$v.form.first_name.minLength || !$v.form.first_name.charsOnly && !form.first_name == '' ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="form-group col-md-4 input-column">
                <label class="input-label" for="middleNameInput">Middle Name</label>
                <input
                  v-model="$v.form.middle_name.$model"
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
                  v-model="$v.form.last_name.$model"
                  type="text"
                  class="form-control"
                  id="patient-lastname"
                  name="patient-lastname"
                  placeholder="Last Name"
                  v-bind:style="!$v.form.last_name.minLength || !$v.form.last_name.charsOnly && !form.last_name == '' ? 'border: 1.5px solid red;' : ''"
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
                <div class="row">
                  <div class="col-md-12">
                    <label class="input-label" for="dobInput">Date Of Birth (*)</label>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <input
                      v-model="$v.form.date_of_birth_day.$model"
                      type="number"
                      class="form-control"
                      id="patient-date-of-birth-day"
                      name="patient-date-of-birth-day"
                      placeholder="DD"
                      v-bind:style="!$v.form.date_of_birth_day.maxLength || !$v.form.date_of_birth_day.minLength || !$v.form.date_of_birth_day.dayRange ? 'border: 1.5px solid red;' : ''"
                    />
                  </div>
                  <div class="col-md-4">
                    <input
                      v-model="$v.form.date_of_birth_month.$model"
                      type="number"
                      class="form-control"
                      id="patient-date-of-birth-month"
                      name="patient-date-of-birth-month"
                      placeholder="MM"
                      v-bind:style="!$v.form.date_of_birth_month.maxLength || !$v.form.date_of_birth_month.minLength || !$v.form.date_of_birth_month.monthRange ? 'border: 1.5px solid red;' : ''"
                    />
                  </div>
                  <div class="col-md-4">
                    <input
                      v-model="$v.form.date_of_birth_year.$model"
                      type="number"
                      class="form-control"
                      id="patient-date-of-birth-year"
                      name="patient-date-of-birth-year"
                      placeholder="YYYY"
                      v-bind:style="!$v.form.date_of_birth_year.maxLength || !$v.form.date_of_birth_year.minLength || !$v.form.date_of_birth_year.between ? 'border: 1.5px solid red;' : ''"
                    />
                  </div>
                </div>
              </div>
              <div v-if="estimageAge" class="form-group col-md-6 input-column">
                <label class="input-label" for="dobInput">Estimage Age (*)</label>
                <input
                  v-model="$v.form.estimated_age.$model"
                  type="number"
                  class="form-control"
                  id="patient-age-estimate"
                  name="patient-age-estimate"
                  placeholder="Estimate Age"
                  v-bind:style="!$v.form.estimated_age.maxLength || !$v.form.estimated_age.minLength || !$v.form.estimated_age.between || !$v.form.estimated_age.numberAge && !form.estimated_age.toString() == ''  ? 'border: 1.5px solid red;' : ''"
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
                  v-model="$v.form.phone_number.$model"
                  type="number"
                  class="form-control"
                  id="patient-phonenumber"
                  name="patient-phonenumber"
                  placeholder="Cellphone Number"
                  :disabled="disabledPhoneNumber"
                  v-bind:style="!$v.form.phone_number.phoneNumberValidations && !form.phone_number == ''  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <label style="font-weight: bold">Physical Address</label>
              </div>
              <div class="form-group col-md-6 input-column" style="height: 70px">
                <label style="font-weight: bold;">Home Village (*)</label>
                <span
                  style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
                >Village not listed?</span>
                <input
                  @click="locationOtherUncheck($event)"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  style="margin-left:6px; margin-top:7px"
                />
                <v-select
                  v-model="homeVillage"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildPatientAddress"
                  name="patient-home-village"
                  id="patient-home-village"
                  v-if="!locationOther"
                ></v-select>
                <input
                  v-model="otherLocationName"
                  type="text"
                  class="form-control"
                  id="free-text-location"
                  name="free-text-location"
                  placeholder="Enter location"
                  v-if="locationOther"
                />
              </div>
              <div class="form-group col-md-6 input-column" style="height: 70px">
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
              <div class="col-md-12">
                <label style="font-weight: bold">
                  Guardian Details
                  <span
                    style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
                  >Guardian Details Unknown?</span>
                  <input
                    @click="guardianDetailsUnkownCheck($event)"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    style="margin-left:6px; margin-top:7px"
                  />
                </label>
              </div>
              <div class="col md-6">
                <div class="row">
                  <div class="col-md-6">
                    <label class="input-label" for="firstNameInput">First Name (*)</label>
                    <input
                      v-model="$v.form.guardian_first_name.$model"
                      type="text"
                      class="form-control"
                      id="guardian-firstname"
                      name="guardian-firstname"
                      placeholder="First Name"
                      :disabled="disableGuardianDetails"
                      v-bind:style="!$v.form.guardian_first_name.minLength || !$v.form.guardian_first_name.charsOnly && !form.guardian_first_name == ''  ? 'border: 1.5px solid red;' : ''"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="input-label" for="firstNameInput">Last Name (*)</label>
                    <input
                      v-model="$v.form.guardian_last_name.$model"
                      type="text"
                      class="form-control"
                      id="guardian-lastname"
                      name="guardian-lastname"
                      placeholder="Last Name"
                      :disabled="disableGuardianDetails"
                      v-bind:style="!$v.form.guardian_last_name.minLength || !$v.form.guardian_last_name.charsOnly && !form.guardian_last_name == ''  ? 'border: 1.5px solid red;' : ''"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
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
                  v-if="!disableGuardianDetails && !guardianPhoneNumber"
                  v-model="$v.form.guardian_phone_number.$model"
                  type="number"
                  class="form-control"
                  id="guardian-phonenumber"
                  name="guardian-phonenumber"
                  placeholder="Phone Number"
                  :disabled="disableGuardianDetails || disabledGuardianPhoneNumber"
                  v-bind:style="!$v.form.guardian_phone_number.phoneNumberValidations && !form.guardian_phone_number == ''  ? 'border: 1.5px solid red;' : ''"
                />
                <input
                  v-if="disableGuardianDetails || guardianPhoneNumber"
                  v-model="guardianPhoneNumber"
                  type="text"
                  class="form-control"
                  id="guardian-phonenumber"
                  name="guardian-phonenumber"
                  placeholder="Phone Number"
                  :disabled="disableGuardianDetails || disabledGuardianPhoneNumber"
                />
              </div>
            </div>

            <input
              type="button"
              name="next"
              class="btn btn-primary personal action-button"
              value="Next Step"
              style="margin-top: 95px"
            />
            <div class="errorTxt" style="margin-top: 10px; text-align: center; font-weight: bold"></div>
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
                    <th scope="col">Value</th>
                  </tr>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{{firstname}} {{middlename == null || middlename == "" ? middlename : ''}} {{lastname}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Birthdate</th>
                      <td>{{`${dateOfBirthDay}-${dateOfBirthMonth}-${dateOfBirthYear}` || estimateBirthdate(estimatedAge)}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{{gender}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Cellphone</th>
                      <td>{{phoneNumber}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Physical Address</th>
                      <td>{{`${homeVillage.code || otherLocationName} near ${landmark.code}`}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Guardian Name</th>
                      <td>{{`${guardianFirstname} ${guardianLastname}`}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Guardian Phonenumber</th>
                      <td>{{guardianPhoneNumber}}</td>
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
import { validationMixin } from "vuelidate";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  sameAs,
  between
} from "vuelidate/lib/validators";

export default {
  name: "app",
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        first_name: {
          required,
          minLength: minLength(2),
          charsOnly(first_name) {
            return /^[A-Za-z]+$/.test(first_name); //only allow characters
          }
        },
        middle_name: {
          charsOnly(last_name) {
            return /^[A-Za-z]+$/.test(last_name); //only allow characters
          }
        },
        last_name: {
          required,
          minLength: minLength(2),
          charsOnly(last_name) {
            return /^[A-Za-z]+$/.test(last_name); //only allow characters
          }
        },
        date_of_birth_day: {
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(date_of_birth_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(date_of_birth_day);
          }
        },
        date_of_birth_month: {
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(date_of_birth_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(date_of_birth_month);
          }
        },
        date_of_birth_year: {
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY")) // date range could adjusted
        },

        estimated_age: {
          // required estimate age is checked
          //required: requiredIf(() => !this.editMode),
          maxLength: maxLength(3),
          minLength: minLength(1),
          between: between(0, 150), // this can be adjusted if needed
          numberAge(age) {
            return /^(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*)))$/.test(age);
          }
        },

        guardian_first_name: {
          required,
          minLength: minLength(2),
          charsOnly(guardian_first_name) {
            return /^[A-Za-z]+$/.test(guardian_first_name); //only allow characters
          }
        },

        phone_number: {
          required, // required by optional
          phoneNumberValidations(phone_number) {
            return /^(\+?265|0)(((88|99)\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/.test(
              phone_number
            );
          }
        },

        guardian_first_name: {
          // required if something
          minLength: minLength(2),
          charsOnly(guardian_first_name) {
            return /^[A-Za-z]+$/.test(guardian_first_name); //only allow characters
          }
        },

        guardian_last_name: {
          minLength: minLength(2),
          charsOnly(guardian_last_name) {
            return /^[A-Za-z]+$/.test(guardian_last_name); //only allow characters
          }
        },
        guardian_phone_number: {
          required,
          phoneNumberValidations(guardian_phone_number) {
            return /^(\+?265|0)(((88|99)\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/.test(
              guardian_phone_number
            );
          }
        },
      }
    };
  },
  data() {
    return {
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        date_of_birth_day: "",
        date_of_birth_month: "",
        date_of_birth_year: "",
        estimated_age: "",
        gender: "",
        other_location_name: "",
        guardian_first_name: "",
        guardian_last_name: "",
        guardian_phone_number: ""
      },
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
      dateOfBirthDay: null,
      dateOfBirthMonth: null,
      dateOfBirthYear: null,
      estimatedAge: null,
      estimageAge: false,
      guardianFirstname: null,
      guardianMiddlename: null,
      guardianLastname: null,
      guardianGender: "Select Gender",
      guardianDateOfBirth: null,
      dateOfBirthDayGuardian: null,
      dateOfBirthMonthGuardian: null,
      dateOfBirthYearGuardian: null,
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
      locationOther: false,
      otherLocationName: null,
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
      disableGuardianDetails: false,
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
    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid;
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
              this.createPatientTypeObs(
                this.buildPatientTypeObs(ob),
                patientId
              );
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

    createPatientTypeObs(params = {}, patientId) {
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
              this.redirect(`/registration/${patientId}/true`);
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
      const dobInput = `${this.dateOfBirthYear}-${this.dateOfBirthMonth}-${this.dateOfBirthDay}`;

      const dob = moment(new Date(dobInput)).format("YYYY-MM-DD");

      if (this.locationOther) {
        this.homeVillage = this.otherLocationName;
      }

      this.person = {
        given_name: this.firstname,
        middle_name: this.middlename || "",
        family_name: this.lastname,
        gender: this.gender,
        birthdate: this.estimageAge
          ? this.estimateBirthdate(this.estimatedAge)
          : dob,
        birthdate_estimated: this.estimageAge ? "Yes" : "No",
        home_district: this.homeDistrict,
        home_traditional_authority: this.homeTA,
        home_village: this.homeVillage,
        current_district: this.homeDistrict,
        current_traditional_authority: this.homeTA,
        current_village: this.homeVillage, //CONFIRM IF THIS IS WORKING
        landmark: `${this.homeVillage} near ${this.landmark.code}`,
        cell_phone_number: this.phoneNumber,
        occupation: null,
        relationship: this.registerGuardian ? "Yes" : "No",
        patient_type: this.patientType,
        facility_name: null
      };

      console.log(this.person);

      this.guardian = this.person;

      this.person["isPatient"] = true;

      this.createPerson(this.person);
    },

    submitGuardianCreate(patientId = "") {
      this.person = {
        given_name: this.guardianFirstname,
        middle_name: "",
        family_name: this.guardianLastname,
        gender: "N/A",
        birthdate: moment(new Date("1970-01-01")).format("YYYY-MM-DD"),
        birthdate_estimated: "N/A",
        home_district: "N/A",
        home_traditional_authority: "N/A",
        home_village: "N/A",
        current_district: "N/A",
        current_traditional_authority: "N/A",
        current_village: "N/A",
        landmark: "N/A",
        cell_phone_number: this.guardianPhoneNumber,
        occupation: null,
        relationship: "N/A",
        patient_type: "",
        facility_name: null
      };

      this.guardian = this.person;

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
      const relationship = {
        relationship_type_id: 13,
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
              this.redirect(`/registration/${params.patient_id}/true`);
              console.log(data);
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    guardianDetailsUnkownCheck() {
      if (this.disableGuardianDetails == false) {
        this.guardianFirstname = "Unknown";
        this.guardianLastname = "Unknown";
        this.guardianPhoneNumber = "Unknown";
        this.disableGuardianDetails = true;
        this.registerGuardian = false;
      } else if (this.disableGuardianDetails == true) {
        this.guardianFirstname = "";
        this.guardianLastname = "";
        this.guardianPhoneNumber = "";
        this.disableGuardianDetails = false;
        this.registerGuardian = true;
      }
    },

    locationOtherUncheck() {
      if (this.locationOther == false) {
        this.locationOther = true;
      } else if (this.locationOther == true) {
        this.locationOther = false;
      }
    },

    landmarkSelected(landmark) {
      console.log("Landmark selected: " + landmark);
    },
    initileWizard() {
      const patientRegistration = this;

      $(document).ready(function() {
        let current_fs, next_fs, previous_fs; //fieldsets
        let opacity;

        let pDetails = $("#pDetails");
        const message =
          "<label style='color:red'> All required fields (*) must be completed before proceeding. </label>";

        $(".personal").click(function() {
          console.log(patientRegistration.form.phone_number);

          const detailsValid = () => {
            let firstname = $("#patient-firstname")
              .val()
              .trim().length;
            let lastname = $("#patient-lastname")
              .val()
              .trim().length;
            let dobDay = $("#patient-date-of-birth-day").val()
              ? $("#patient-date-of-birth-day").val().length
              : 0;
            let dobMonth = $("#patient-date-of-birth-month").val()
              ? $("#patient-date-of-birth-month").val().length
              : 0;
            let dobYear = $("#patient-date-of-birth-year").val()
              ? $("#patient-date-of-birth-year").val().length
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
            let otherLocation = 0;
            try {
              otherLocation = $("#free-text-location")
                .val()
                .trim().length;
            } catch (error) {
              otherLocation = 0;
            }
            let patientLandmark = $("#patient-landmark")
              .text()
              .trim()
              .replace("Loading...", "").length;
            let guardianFirstname = $("#guardian-firstname")
              .val()
              .trim().length;
            let guardianLastname = $("#guardian-lastname")
              .val()
              .trim().length;
            let guardianPhoneNumber = $("#guardian-phonenumber")
              .val()
              .trim().length;

            console.log(guardianPhoneNumber);

            return (
              firstname > 0 &&
              lastname > 0 &&
              ((dobDay > 0 && dobMonth > 0 && dobYear > 0) || age > 0) &&
              phone > 0 &&
              gender > 0 &&
              gender != "Select Gender" &&
              (homeVillage > 0 || otherLocation > 0) &&
              homeVillage != "Select Home Village" &&
              patientLandmark > 0 &&
              patientLandmark != "Select Landmark" &&
              guardianFirstname > 0 &&
              guardianLastname > 0 &&
              guardianPhoneNumber > 0
            );
          };

          if (!patientRegistration.validateForm()) {
            console.log("Validate Form has been called!!!");
            return;
          }

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
    },
    redirect: function(url) {
      this.$router.push(url);
      //if (this.$router.path !== url) this.$router.push(url)
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
  overflow: hidden;
  color: lightgrey;
}

#progressbar .active {
  color: #000000;
}

#progressbar li {
  list-style-type: none;
  font-size: 12px;
  width: 31%;
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
  content: "2";
}

#progressbar #success:before {
  font-family: FontAwesome;
  content: "3";
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
  height: 690px;
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