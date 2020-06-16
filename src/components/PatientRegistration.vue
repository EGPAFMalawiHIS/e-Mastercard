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
                  v-bind:style="(!$v.form.first_name.minLength || !$v.form.first_name.charsOnly) && $v.form.first_name.$dirty ? 'border: 1.5px solid red;' : ''"
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
                  v-bind:style="!$v.form.middle_name.charsOnly && $v.form.middle_name.$dirty ? 'border: 1.5px solid red;' : ''"
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
                  v-bind:style="(!$v.form.last_name.minLength || !$v.form.last_name.charsOnly) && $v.form.last_name.$dirty ? 'border: 1.5px solid red;' : ''"
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
                      v-bind:style="(!$v.form.date_of_birth_day.required || !$v.form.date_of_birth_day.maxLength || !$v.form.date_of_birth_day.minLength || !$v.form.date_of_birth_day.dayRange || !$v.form.date_of_birth_day.checkDayMonth) && $v.form.date_of_birth_day.$dirty ? 'border: 1.5px solid red;' : ''"
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
                      v-bind:style="(!$v.form.date_of_birth_month.required || !$v.form.date_of_birth_month.maxLength || !$v.form.date_of_birth_month.minLength || !$v.form.date_of_birth_month.monthRange || !$v.form.date_of_birth_month.checkMonthYear) && $v.form.date_of_birth_month.$dirty ? 'border: 1.5px solid red;' : ''"
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
                      v-bind:style="(!$v.form.date_of_birth_year.required || !$v.form.date_of_birth_year.maxLength || !$v.form.date_of_birth_year.minLength || !$v.form.date_of_birth_year.between) && $v.form.date_of_birth_year.$dirty ? 'border: 1.5px solid red;' : ''"
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
                  v-bind:style="(!$v.form.estimated_age.required || !$v.form.estimated_age.maxLength || !$v.form.estimated_age.minLength || !$v.form.estimated_age.between || !$v.form.estimated_age.numberAge) && $v.form.estimated_age.$dirty ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="form-group col-md-6 input-column">
                <label class="input-label" for="gender">Gender (*)</label>
                <select
                  v-model="$v.form.gender.$model"
                  id="patient-gender"
                  name="patient-gender"
                  class="form-control"
                  v-bind:style="(!$v.form.gender.required || !$v.form.gender.filterOption) && $v.form.gender.$dirty ? 'border: 1.5px solid red;' : ''"
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
                  v-bind:style="$v.form.phone_number.$dirty && !$v.form.phone_number.phoneNumberValidations ? 'border: 1.5px solid red;' : ''"
                  v-if="!disabledPhoneNumber"
                />
                <input
                  v-model="$v.form.phone_number.$model"
                  type="text"
                  class="form-control"
                  id="patient-phonenumber"
                  name="patient-phonenumber"
                  placeholder="Cellphone Number"
                  :disabled="disabledPhoneNumber"
                  v-if="disabledPhoneNumber"
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
                  v-model="$v.form.home_village.$model"
                  :options="villages"
                  @search="fetchVillages"
                  @input="buildPatientAddress"
                  name="patient-home-village"
                  id="patient-home-village"
                  v-if="!locationOther"
                  v-bind:style="(!$v.form.home_village.required || !$v.form.home_village.filterOption ) && $v.form.home_village.$dirty ? 'border: 1.5px solid red;' : ''"
                ></v-select>

                <input
                  v-model="$v.form.other_location_name.$model"
                  type="text"
                  class="form-control"
                  id="free-text-location"
                  name="free-text-location"
                  placeholder="Enter location"
                  v-if="locationOther"
                  v-bind:style="(!$v.form.other_location_name.required || !$v.form.other_location_name.charsOnly ) && $v.form.other_location_name.$dirty ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="form-group col-md-6 input-column" style="height: 70px">
                <label style="font-weight: bold">Closest Land Mark or Plot Number (*)</label>
                <span
                  style="font-size: 14px; margin-left: 15px; margin-top: 10px; font-style: italic; font-weight: bold; color: rgba(67, 149, 204, 1)"
                >Landmark not listed?</span>
                <input
                  @click="landmarkOtherUncheck($event)"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  style="margin-left:6px; margin-top:7px"
                />
                <v-select
                  v-if="!landmarkUnknown"
                  id="patient-landmark"
                  name="patient-landmark"
                  :options="LANDMARKS"
                  v-model="$v.form.land_mark.$model"
                  v-bind:style="(!$v.form.land_mark.required || !$v.form.land_mark.filterOption ) && $v.form.land_mark.$dirty ? 'border: 1.5px solid red;' : ''"
                ></v-select>
                <input
                  v-if="landmarkUnknown"
                  type="text"
                  class="form-control"
                  id="exampleCheck1"
                  placeholder="Enter Landmark"
                  v-model="$v.form.land_mark.$model"
                  v-bind:style="(!$v.form.land_mark.required || !$v.form.land_mark.filterOption ) && $v.form.land_mark.$dirty ? 'border: 1.5px solid red;' : ''"
                />
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
                      v-bind:style="(!$v.form.guardian_first_name.minLength || !$v.form.guardian_first_name.charsOnly) && $v.form.guardian_first_name.$dirty  ? 'border: 1.5px solid red;' : ''"
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
                      v-bind:style="(!$v.form.guardian_last_name.minLength || !$v.form.guardian_last_name.charsOnly) && $v.form.guardian_last_name.$dirty  ? 'border: 1.5px solid red;' : ''"
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
                  v-bind:style="!$v.form.guardian_phone_number.phoneNumberValidations && $v.form.guardian_phone_number.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
                <input
                  v-if="disableGuardianDetails || guardianPhoneNumber"
                  v-model="$v.form.guardian_phone_number.$model"
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
              style="margin-top: 80px"
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
                      <td>{{form.first_name}} {{form.middel_name == null || form.middle_name == "" ? form.middle_name : ''}} {{form.last_name}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Birthdate</th>
                      <td>{{!estimageAge ? `${form.date_of_birth_day}-${form.date_of_birth_month}-${form.date_of_birth_year}` : estimateBirthdate(form.estimated_age)}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{{form.gender}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Cellphone</th>
                      <td>{{form.phone_number}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Physical Address</th>
                      <td>{{`${!locationOther ? form.home_village.code : form.other_location_name} near ${ landmarkUnknown ? form.land_mark : form.land_mark.code }`}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Guardian Name</th>
                      <td>{{`${form.guardian_first_name} ${form.guardian_last_name}`}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Guardian Phonenumber</th>
                      <td>{{form.guardian_phone_number}}</td>
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

        //optional causing validation problem
        middle_name: {
          charsOnly(middle_name) {
            return /^s*|[A-Za-z]+$/.test(middle_name); //only allow characters
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
          required: requiredIf(() => this.requireDateOfBirth), // if false do not require
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(date_of_birth_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(date_of_birth_day);
          },
          checkDayMonth(date_of_birth_day){
            return !(this.form.date_of_birth_year == moment(this.DATE).format("YYYY") && this.form.date_of_birth_month == moment(this.DATE).format("MM") && date_of_birth_day > moment(this.DATE).format("DD"))
          }
        },
        date_of_birth_month: {
          required: requiredIf(() => this.requireDateOfBirth), // if false do not require
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(date_of_birth_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(date_of_birth_month);
          },
          checkMonthYear(date_of_birth_month){
            return !(this.form.date_of_birth_year == moment(this.DATE).format("YYYY") && date_of_birth_month > moment(this.DATE).format("MM"))
          }
        },
        date_of_birth_year: {
          required: requiredIf(() => this.requireDateOfBirth), // if false do not require
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY")) // date range could adjusted
        },

        estimated_age: {
          // required estimate age is checked
          required: requiredIf(() => this.estimageAge),
          maxLength: maxLength(3),
          minLength: minLength(1),
          between: between(0, 150), // this can be adjusted if needed
          numberAge(age) {
            return /^(\s*|\d+)$/.test(age);
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
            return (
              /^(\+?265|0)(((88|99)\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/.test(
                phone_number
              ) || /Unknown/.test(phone_number)
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
            ) || /Unknown/.test(guardian_phone_number)
          }
        },

        gender: {
          required,
          filterOption(gender) {
            return !/Select Gender/.test(gender);
          }
        },

        home_village: {
          required: requiredIf(() => this.homeVillageSelection),
          filterOption(home_village) {
            return !/Select Home Village/.test(home_village);
          }
        },

        other_location_name: {
          required: requiredIf(() => this.locationOther),
          minLength: minLength(2),
          charsOnly(other_location_name) {
            return /^s*|[A-Za-z]+$/.test(other_location_name); //only allow characters
          }
        },

        land_mark: {
          required,
          filterOption(land_mark) {
            return !/Select Landmark/.test(land_mark);
          }
        }
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
        gender: "Select Gender",
        other_location_name: "",
        guardian_first_name: "",
        guardian_last_name: "",
        guardian_phone_number: "",
        home_village: "Select Home Village",
        land_mark: "Select Landmark"
      },
      Date: new Date(),
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      },
      estimageAge: false,
      requireDateOfBirth: true,
      homeDistrict: null,
      homeTA: null,
      currentDistrict: null,
      currentTA: null,
      guardianHomeDistrict: null,
      guardianHomeTA: null,
      guardianCurrentDistrict: null,
      guardianCurrentTA: null,
      guardianPhoneNumber: null,
      locationOther: false,
      homeVillageSelection: true,
      disabledPhoneNumber: false,
      disabledGuardianPhoneNumber: false,
      landmarkUnknown: false,
      PATIENT_TYPES: {
        "New patient": 7572,
        "External consultation": 9684
      },
      villages: [],
      taId: null,
      taName: null,
      village: null,
      registerGuardian: true,
      relationships: [],
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

              if (this.registerGuardian) {
                this.submitGuardianCreate(data.patient_id);
              }else{
                this.redirect(`/registration/${data.patient_id}/true`);
              }
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





    greyOut() {
      if (this.estimageAge == false) {
        this.requireDateOfBirth = false;
        this.estimageAge = true;
      } else if (this.estimageAge == true) {
        this.requireDateOfBirth = true;
        this.estimageAge = false;
      }
    },

    cellphonNumberUnkownCheck() {
      if (this.disabledPhoneNumber == false) {
        this.form.phone_number = "Unknown";
        this.disabledPhoneNumber = true;
      } else if (this.disabledPhoneNumber == true) {
        this.form.phone_number = "";
        this.disabledPhoneNumber = false;
      }
    },

    guardianCellphoneNumberUnknown() {
      if (this.disabledGuardianPhoneNumber == false) {
        this.form.guardian_phone_number = "Unknown";
        this.guardianPhoneNumber = "Unknown";
        this.disabledGuardianPhoneNumber = true;
      } else if (this.disabledGuardianPhoneNumber == true) {
        this.form.guardian_phone_number = "";
        this.guardianPhoneNumber = "";
        this.disabledGuardianPhoneNumber = false;
      }
    },

    estimateBirthdate(age) {
      const currYear = this.Date.getFullYear();
      const estYear = currYear - parseInt(age);
      return estYear + "-07-01";
    },

    submitPersonCreate() {
      const dobInput = `${this.form.date_of_birth_year}-${this.form.date_of_birth_month}-${this.form.date_of_birth_day}`;

      const dob = moment(new Date(dobInput)).format("YYYY-MM-DD");

      const LANDMARK = this.landmarkUnknown ? this.form.land_mark : this.form.land_mark.code

      this.person = {
        given_name: this.form.first_name,
        middle_name: this.form.middle_name || "",
        family_name: this.form.last_name,
        gender: this.form.gender,
        birthdate: this.estimageAge
          ? this.estimateBirthdate(this.form.estimated_age)
          : dob,
        birthdate_estimated: this.estimageAge ? "Yes" : "No",
        home_district: !this.locationOther ? this.homeDistrict : "N/A",
        home_traditional_authority: !this.locationOther ? this.homeTA : "N/A",
        home_village: !this.locationOther ? this.form.home_village.code : this.form.other_location_name,
        current_district: !this.locationOther ? this.homeDistrict : "N/A",
        current_traditional_authority: !this.locationOther ? this.homeTA : "N/A",
        current_village: !this.locationOther ? this.form.home_village.code : this.form.other_location_name, //CONFIRM IF THIS IS WORKING
        landmark: `${!this.locationOther ? this.form.home_village.code : this.form.other_location_name} near ${LANDMARK}`,
        cell_phone_number: this.form.phone_number,
        occupation: null,
        relationship: this.registerGuardian ? "Yes" : "No",
        patient_type: null,
        facility_name: null
      };

      console.log(this.person);

      this.guardian = this.person;

      this.person["isPatient"] = true;

      this.createPerson(this.person);
    },

    submitGuardianCreate(patientId = "") {
      this.person = {
        given_name: this.form.guardian_first_name,
        middle_name: "",
        family_name: this.form.guardian_last_name,
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
        cell_phone_number: this.form.guardian_phone_number,
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
        this.form.guardian_first_name = "Unknown";
        this.form.guardian_last_name = "Unknown";
        this.form.guardian_phone_number = "Unknown";
        this.disableGuardianDetails = true;
        this.registerGuardian = false;
      } else if (this.disableGuardianDetails == true) {
        this.form.guardian_first_name = "";
        this.form.guardian_last_name = "";
        this.form.guardian_phone_number = "";
        this.disableGuardianDetails = false;
        this.registerGuardian = true;
      }
    },

    locationOtherUncheck() {
      if (this.locationOther == false) {
        this.homeVillageSelection = false;
        this.form.home_village = "";
        this.locationOther = true;
      } else if (this.locationOther == true) {
        this.homeVillageSelection = true;
        this.locationOther = false;
      }
    },

    landmarkOtherUncheck() {
      if (this.landmarkUnknown == false) {
        this.form.land_mark = "";
        this.landmarkUnknown = true;
      } else if (this.landmarkUnknown == true) {
        this.form.land_mark = "Select Landmark";
        this.landmarkUnknown = false;
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
          if (patientRegistration.validateForm()) {
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
            return;
          } else {
            console.log("Validation failed!!!");
            console.log(patientRegistration.form);
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