<template>
  <div style="margin: auto; width: 95%">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <label style="float: left; font-weight: bold;">ARV Number (*)</label>
          </div>
        </div>
        <div class="form-group" style="font-weight: bold; color: rgba(300, 149, 100, 1);">
          <div style="float: left; margin-top: 7px">
            <label style=" display: inline-block">{{`${sitePrefix}-ARV-`}}</label>
          </div>
          <div style="float: right; width: 80%; margin: auto">
            <input
              type="number"
              class="form-control"
              name
              placeholder="Enter ARV Number"
              v-model="$v.form.arv_number.$model"
              :disabled="arvNumberUnkown"
              v-on:input="setRegistration"
              style="display: inline"
              v-bind:style="!$v.form.arv_number.required && $v.form.arv_number.$dirty  ? 'border: 1.5px solid red;' : ''"
            />
          </div>
        </div>
      </div>
 
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial Visit Date (*)</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="$v.form.visit_date_day.$model"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.visit_date_day.required || !$v.form.visit_date_day.minLength || !$v.form.visit_date_day.maxLength || !$v.form.visit_date_day.dayRange) && $v.form.visit_date_day.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.visit_date_month.$model"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.visit_date_month.required || !$v.form.visit_date_month.minLength || !$v.form.visit_date_month.maxLength || !$v.form.visit_date_month.monthRange) && $v.form.visit_date_month.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.visit_date_year.$model"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.visit_date_year.required || !$v.form.visit_date_year.minLength || !$v.form.visit_date_year.maxLength || !$v.form.visit_date_year.between) && $v.form.visit_date_year.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" style="float: left">
        <div style="float: left">
          <span style="font-weight: bold;">Agrees to follow up? (*)</span>
        </div>
        <div class="form-group">
          <select name="stage" class="form-control" 
            v-model="$v.form.should_follow_up.$model"
            @change="followUp"
            v-bind:style="(!$v.form.should_follow_up.required || !$v.form.should_follow_up.filterOption) && $v.form.should_follow_up.$dirty  ? 'border: 1.5px solid red;' : ''"
            >
            <option disabled selected>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <span
          style="font-weight: bold; float: left"
        >Ever received ARVs for treatment or prophylaxis? (*)</span>
        <div class="form-group">
          <select
            name="stage"
            class="form-control"
            v-model="$v.form.received_arv_treatment_before.$model"
            @change="everRecieved"
            v-bind:style="(!$v.form.received_arv_treatment_before.required || !$v.form.received_arv_treatment_before.filterOption) && $v.form.received_arv_treatment_before.$dirty  ? 'border: 1.5px solid red;' : ''"
          >
            <option disabled selected>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Date last taken ARVs (*)</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <input
              v-model="$v.form.date_last_taken_arv_day.$model"
              type="number"
              class="form-control"
              placeholder="DD"
              maxlength="2"
              minlength="2"
              v-on:input="setRegistration"
              v-bind:style="(!$v.form.date_last_taken_arv_day.required || !$v.form.date_last_taken_arv_day.minLength || !$v.form.date_last_taken_arv_day.maxLength || !$v.form.date_last_taken_arv_day.dayRange) && $v.form.date_last_taken_arv_day.$dirty  ? 'border: 1.5px solid red;' : ''"
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="$v.form.date_last_taken_arv_month.$model"
              type="number"
              class="form-control"
              placeholder="MM"
              maxlength="2"
              minlength="2"
              v-on:input="setRegistration"
              v-bind:style="(!$v.form.date_last_taken_arv_month.required || !$v.form.date_last_taken_arv_month.minLength || !$v.form.date_last_taken_arv_month.maxLength || !$v.form.date_last_taken_arv_month.monthRange) && $v.form.date_last_taken_arv_month.$dirty  ? 'border: 1.5px solid red;' : ''"
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="$v.form.date_last_taken_arv_year.$model"
              type="number"
              class="form-control"
              placeholder="YYYY"
              maxlength="4"
              minlength="4"
              v-on:input="setRegistration"
              v-bind:style="(!$v.form.date_last_taken_arv_year.required || !$v.form.date_last_taken_arv_year.minLength || !$v.form.date_last_taken_arv_year.maxLength || !$v.form.date_last_taken_arv_year.between) && $v.form.date_last_taken_arv_year.$dirty  ? 'border: 1.5px solid red;' : ''"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Ever registered at an ART clinic? (*)</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <select
                name="stage"
                class="form-control"
                v-model="$v.form.ever_registered_at_clinic_value.$model"
                @change="everRegistered"
                v-bind:style="(!$v.form.ever_registered_at_clinic_value.required || !$v.form.ever_registered_at_clinic_value.filterOption ) && $v.form.ever_registered_at_clinic_value.$dirty  ? 'border: 1.5px solid red;' : ''"
              >
                <option disabled selected>Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6" style="padding-right: 0">
                <label style="float: left; font-weight: bold">Location of ART Initiation (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Location Unknown?</span>
                <input
                  type="checkbox"
                  @click="locationOfInitiationCheck()"
                  style="margin-left: 10px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <v-select
                :options="locations"
                @search="getlocations"
                @input="getLoc"
                v-model="$v.form.location_of_initiation.$model"
                :disabled="locationOfInitiationUnknown"
                v-bind:style="(!$v.form.location_of_initiation.required || !$v.form.location_of_initiation.filterOption ) && $v.form.location_of_initiation.$dirty  ? 'border: 1.5px solid red;' : ''"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Date started ART (*)</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="$v.form.art_start_date_day.$model"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.art_start_date_day.required || !$v.form.art_start_date_day.minLength || !$v.form.art_start_date_day.maxLength || !$v.form.art_start_date_day.dayRange ) && $v.form.art_start_date_day.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.art_start_date_month.$model"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.art_start_date_month.required || !$v.form.art_start_date_month.minLength || !$v.form.art_start_date_month.maxLength || !$v.form.art_start_date_month.monthRange ) && $v.form.art_start_date_month.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.art_start_date_year.$model"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.art_start_date_year.required || !$v.form.art_start_date_year.minLength || !$v.form.art_start_date_year.maxLength || !$v.form.art_start_date_year.between ) && $v.form.art_start_date_year.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="recievedTreatment && registered" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial Vitals (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="float: left; font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic; margin-left: 38px"
                >Vitals Unknown?</span>
                <input
                  type="checkbox"
                  @click="initialVitalsCheck()"
                  style="margin-left: 10px; float:left; margin-top: 6px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                name
                v-model="$v.form.initial_weight.$model"
                :placeholder="initialVitalsUnknown ? 'Unknown Weight' : 'Enter Weight'"
                v-on:input="setRegistration"
                :disabled="initialVitalsUnknown"
                v-bind:style="(!$v.form.initial_weight.required) && $v.form.initial_weight.$dirty  ? 'border: 1.5px solid red;' : ''"
              />
            </div>
          </div>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              name
              v-model="$v.form.initial_height.$model"
              :placeholder="initialVitalsUnknown ?  'Unknown Height' : 'Enter Height'"
              v-on:input="setRegistration"
              :disabled="initialVitalsUnknown"
              v-bind:style="(!$v.form.initial_height.required) && $v.form.initial_height.$dirty  ? 'border: 1.5px solid red;' : ''"
            />
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label style="float: left; font-weight: bold">Initial TB Status (*)</label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <select
                class="form-control"
                name
                id
                v-model="$v.form.initial_tb_status.$model"
                @change="setRegistration"
                v-bind:style="(!$v.form.initial_tb_status.required || !$v.form.initial_tb_status.filterOption) && $v.form.initial_tb_status.$dirty  ? 'border: 1.5px solid red;' : ''"
              >
                <option disabled selected>Select Option</option>
                <option
                  v-for="(status, index) in Object.keys(TB_STATUS)"
                  :key="index"
                  :value="TB_STATUS[status]"
                >{{status}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <label style="float: left; font-weight: bold">Confirmatory Test (*)</label>
          </div>
        </div>
        <div class="form-group">
          <v-select
            :options="options"
            v-model="$v.form.confirmatory.$model"
            :reduce="option => option.value"
            v-on:input="setRegistration"
            v-bind:style="(!$v.form.confirmatory.required || !$v.form.confirmatory.filterOption) && $v.form.confirmatory.$dirty  ? 'border: 1.5px solid red;' : ''"
          ></v-select>
        </div>
      </div>
    </div>
    <div v-if="form.confirmatory == 1040 || form.confirmatory == 844" class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6" style="padding-right: 0">
                <label style="float: left; font-weight: bold">Location of confirmatory (*)</label>
              </div>
              <div class="col-md-6">
                <span
                  style="font-weight: bold; color: rgba(67, 149, 204, 1); font-style: italic"
                >Location unknown?</span>
                <input
                  type="checkbox"
                  @click="locationOfConfirmatoryCheck()"
                  style="margin-left: 10px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <v-select
                :options="locations"
                @search="getlocations"
                @input="getVal"
                v-model="$v.form.location_of_confirmatory.$model"
                :disabled="locationOfConfirmatoryUnknown"
                v-bind:style="(!$v.form.location_of_confirmatory.required || !$v.form.location_of_confirmatory.filterOption) && $v.form.location_of_confirmatory.$dirty  ? 'border: 1.5px solid red;' : ''"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="form.confirmatory == 1040 || form.confirmatory == 844" class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <label style="float: left; font-weight: bold">Confirmatory HIV test date (*)</label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">
                <input
                  v-model="$v.form.hiv_test_date_day.$model"
                  type="number"
                  class="form-control"
                  placeholder="DD"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.hiv_test_date_day.required || !$v.form.hiv_test_date_day.minLength || !$v.form.hiv_test_date_day.maxLength || !$v.form.hiv_test_date_day.dayRange) && $v.form.hiv_test_date_day.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.hiv_test_date_month.$model"
                  type="number"
                  class="form-control"
                  placeholder="MM"
                  maxlength="2"
                  minlength="2"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.hiv_test_date_month.required || !$v.form.hiv_test_date_month.minLength || !$v.form.hiv_test_date_month.maxLength || !$v.form.hiv_test_date_month.monthRange) && $v.form.hiv_test_date_month.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
              <div class="col-md-4">
                <input
                  v-model="$v.form.hiv_test_date_year.$model"
                  type="number"
                  class="form-control"
                  placeholder="YYYY"
                  maxlength="4"
                  minlength="4"
                  v-on:input="setRegistration"
                  v-bind:style="(!$v.form.hiv_test_date_year.required || !$v.form.hiv_test_date_year.minLength || !$v.form.hiv_test_date_year.maxLength || !$v.form.hiv_test_date_year.between) && $v.form.hiv_test_date_year.$dirty  ? 'border: 1.5px solid red;' : ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

<script>
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import vitals from "@/components/encounters/vitals.vue";
import moment from "moment";
import GlobalProperties from "@/services/global_properties";
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
  validations() {
    return {
      form: {
        arv_number: {
          required
        },
        visit_date_day: {
          required,
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(visit_date_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(visit_date_day);
          }
        },
        visit_date_month: {
          required,
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(visit_date_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(visit_date_month);
          }
        },
        visit_date_year: {
          required,
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY")) // date range could adjusted
        },
        should_follow_up: {
          required,
          filterOption(should_follow_up) {
            return !/Select Option/.test(should_follow_up);
          }
        },
        agrees_to_follow_up: {},
        received_arv_treatment_before: {
          required,
          filterOption(received_arv_treatment_before) {
            return !/Select Option/.test(received_arv_treatment_before);
          }
        },
        date_last_taken_arv_day: {
          required: requiredIf(() => this.recievedTreatment), 
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(date_last_taken_arv_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(date_last_taken_arv_day);
          }
        },
        date_last_taken_arv_month: {
          required: requiredIf(() => this.recievedTreatment), 
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(date_last_taken_arv_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(date_last_taken_arv_month);
          }
        },
        date_last_taken_arv_year: {
          required: requiredIf(() => this.recievedTreatment), 
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY"))
        },
        ever_registered_at_clinic_value: {
          required: requiredIf(() => this.recievedTreatment),
          filterOption(ever_registered_at_clinic_value) {
            return !/Select Option/.test(ever_registered_at_clinic_value);
          }
        },
        location_of_initiation: {
          required: requiredIf(() => this.recievedTreatment && this.registered),
          filterOption(location_of_initiation) {
            return !/Select Option/.test(location_of_initiation);
          }
        },
        art_start_date_day: {
          required: requiredIf(() => this.recievedTreatment && this.registered), 
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(art_start_date_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(art_start_date_day);
          }
        },
        art_start_date_month: {
          required: requiredIf(() => this.recievedTreatment && this.registered), 
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(art_start_date_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(art_start_date_month);
          }
        },
        art_start_date_year: {
          required: requiredIf(() => this.recievedTreatment && this.registered), 
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY"))
        },
        initial_weight: {
          required: requiredIf(() => this.recievedTreatment && this.registered), 
        },
        initial_height: {
          required: requiredIf(() => this.recievedTreatment && this.registered), 
        },
        initial_tb_status: {
          required: requiredIf(() => this.recievedTreatment && this.registered),
          filterOption(confirmatory) {
            return !/Select Option/.test(confirmatory);
          } 
        },
        confirmatory: {
          required,
          filterOption(confirmatory) {
            return !/Select Option/.test(confirmatory);
          }
        },
        location_of_confirmatory: {
          required: requiredIf(() => (this.form.confirmatory == 1040 || this.form.confirmatory == 844)),
          filterOption(location_of_confirmatory) {
            return !/Select Option/.test(location_of_confirmatory);
          }
        },
        hiv_test_date_day: {
          required: requiredIf(() => (this.form.confirmatory == 1040 || this.form.confirmatory == 844)),
          maxLength: maxLength(2),
          minLength: minLength(2),
          dayRange(hiv_test_date_day) {
            return /^(3[01]|[0-12][1-9]|10|20||[0-9])$/.test(hiv_test_date_day);
          }
        },
        hiv_test_date_month: {
          required: requiredIf(() => (this.form.confirmatory == 1040 || this.form.confirmatory == 844)),
          maxLength: maxLength(2),
          minLength: minLength(2),
          monthRange(hiv_test_date_month) {
            return /^(1[1-2]|0[1-9]|10||[0-9])$/.test(hiv_test_date_month);
          }
        },
        hiv_test_date_year: {
          required: requiredIf(() => (this.form.confirmatory == 1040 || this.form.confirmatory == 844)),
          maxLength: maxLength(4),
          minLength: minLength(4),
          between: between(1850, moment(this.DATE).format("YYYY"))
        }
      }
    };
  },
  data: function() {
    return {
      form: {
        arv_number: "",
        visit_date_day: "",
        visit_date_month: "",
        visit_date_year: "",
        should_follow_up: "Select Option",
        agrees_to_follow_up: "",
        received_arv_treatment_before: "Select Option",
        date_last_taken_arv_day: "",
        date_last_taken_arv_month: "",
        date_last_taken_arv_year: "",
        ever_registered_at_clinic_value: "Select Option",
        location_of_initiation: "Select Option",
        art_start_date_day: "",
        art_start_date_month: "",
        art_start_date_year: "",
        initial_weight: "",
        initial_height: "",
        initial_tb_status: "Select Option",
        confirmatory: "Select Option",
        location_of_confirmatory: "Select Option",
        hiv_test_date_day: "",
        hiv_test_date_month: "",
        hiv_test_date_year: ""

      },
      recievedTreatment: false,
      agreesToFollowUp: false,
      registered: false,
      arvNumberUnkown: false,
      locationOfInitiationUnknown: false,
      locationOfConfirmatoryUnknown: false,
      arvsTakenTwoMonthsPrior: "Select Option",
      arvsTakenTwoWeeksPrior: "Select Option",
      initialVitalsUnknown: false,
      sitePrefix: null,
      TB_STATUS: {
        "TB NOT suspected": 7454,
        "TB suspected": 7455,
        "Confirmed TB NOT on treatment": 7456,
        "Confirmed TB on treatment": 7458
      },
      options: [
        {
          label: "Rapid Antibody Test",
          value: 1040
        },
        {
          label: "DNA PCR",
          value: 844
        },
        {
          label: "Not Done",
          value: 1118
        }
      ],
      clinicRegistration: {
        encounter_id: 9,
        encounter_datetime: null,
        obs: {
          phoneFollowUp: {
            // DONE
            concept_id: 2552,
            value_coded: 9685,
            child: {
              concept_id: 9685,
              value_coded: null
            }
          },
          homeFollowUp: {
            // DONE
            concept_id: 2552,
            value_coded: 9686,
            child: {
              concept_id: 9686,
              value_coded: null
            }
          },
          yearLastTakenARVs: {
            // OPTIONAL FIELD
            //DONE
            concept_id: 7751,
            value_datetime: null
          },
          everReceivedART: {
            // OPTIONAL FIELD
            // DONE
            value_coded: null,
            concept_id: 7754
          },
          everRegisteredAtClinic: {
            // MA
            // DONE
            concept_id: 7937,
            value_coded: null
          },
          artNumberAtPreviousLocation: {
            // DONE
            concept_id: 6981,
            value_text: null
          },
          confirmatoryTest: {
            value_coded: null,
            concept_id: 7880
          },
          ARTStartLocation: {
            // Location of ART Initiation
            value_text: null,
            concept_id: 7750,
            location_id: null
          },
          dateARTStarted: {
            concept_id: 2516,
            value_datetime: null
          },
          testLocation: {
            // Location of ART Confirmatory
            value_text: null,
            concept_id: 7881,
            location_id: null
          },
          testDate: {
            concept_id: 7882,
            value_datetime: null
          },
          initialTbStatus: {
            concept_id: 7459,
            value_coded: null
          }
        }
      },

      // make vitals optional
      vitalsEncounter: {
        encounter_id: 6,
        encounter_datetime: null,
        obs: {
          weight: {
            concept_id: 5089,
            value_numeric: null
          },
          height: {
            concept_id: 5090,
            value_numeric: null
          }
        }
      },
      locations: []
    };
  },
  computed: {
    visitDate() {
      return this.makeISODateString(this.form.visit_date_year, this.form.visit_date_month, this.form.visit_date_day);
    }
  },
  methods: {

    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid; //send this as a global state to the Registration component
    },

    initial() {
      this.setRegistration();
      this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everReceivedART.value_coded = 1066; // No answer
      this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066; // No answer
    },

    followUp() {
      this.setRegistration();
      if (this.form.should_follow_up == "No") {
        console.log("No");
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1066; // No answer
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1066; // No answer
        this.agreesToFollowUp = false;
      } else if (this.form.should_follow_up == "Yes") {
        console.log("Yes");
        this.clinicRegistration.obs.phoneFollowUp.child.value_coded = 1065; // No answer
        this.clinicRegistration.obs.homeFollowUp.child.value_coded = 1065; // No answer
        this.agreesToFollowUp = true;
      }
    },

    // Ever recieved ARVs for treatment
    everRecieved() {
      this.setRegistration();
      if (this.form.received_arv_treatment_before == "No") {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1066;
        this.registered = false;
        this.recievedTreatment = false;
      } else if (this.form.received_arv_treatment_before == "Yes") {
        this.clinicRegistration.obs.everReceivedART.value_coded = 1065;
        this.recievedTreatment = true;
      }
    },

    // Ever registered at an ART Clinic
    everRegistered() {
      this.setRegistration();
      if (this.form.ever_registered_at_clinic_value == "No") {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1066;
        this.registered = false;
      } else if (this.form.ever_registered_at_clinic_value == "Yes") {
        this.clinicRegistration.obs.everRegisteredAtClinic.value_coded = 1065;
        this.registered = true;
      }
    },

    //Location of ART initiation
    locationOfInitiationCheck() {
      this.setRegistration();
      if (this.locationOfInitiationUnknown == true) {
        this.form.location_of_initiation = "Select Location";
        this.locationOfInitiationUnknown = false;
      } else if (this.locationOfInitiationUnknown == false) {
        this.form.location_of_initiation = "Unknown";
        this.clinicRegistration.obs.ARTStartLocation.value_text = "Unknown";
        this.locationOfInitiationUnknown = true;
      }
    },

    arvNumberUnkownCheckbox() {
      this.setRegistration();
      if (this.arvNumberUnkown == true) {
        this.form.arv_number = "";
        this.arvNumberUnkown = false;
      } else if (this.arvNumberUnkown == false) {
        this.form.arv_number = "Unknown";
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text =
          "Unknown";
        this.arvNumberUnkown = true;
      }
    },

    locationOfConfirmatoryCheck() {
      this.setRegistration();
      if (this.locationOfConfirmatoryUnknown == true) {
        this.form.location_of_confirmatory = "Select Location";
        this.locationOfConfirmatoryUnknown = false;
      } else if (this.locationOfConfirmatoryUnknown == false) {
        this.form.location_of_confirmatory = "Unknown";
        this.clinicRegistration.obs.testLocation.value_text = "Unknown";
        this.locationOfConfirmatoryUnknown = true;
      }
    },

    initialVitalsCheck() {
      this.setRegistration();
      if (this.initialVitalsUnknown == true) {
        this.initialVitalsUnknown = false;
      } else if (this.initialVitalsUnknown == false) {
        this.initialVitalsUnknown = true;
      }
    },

    estimateYearLastTaken() {
      this.setRegistration();
      if (this.yearLastTakenUknown) {
        if (this.arvsTakenTwoMonthsPrior == "Yes") {
          if (this.arvsTakenTwoWeeksPrior == "Yes") {
            let date = new Date();
            date.setDate(date.getDate() - 14); //two weeks
            date = date.toDateString();
            const weekEstimate = moment(date).format("YYYY-MM-DD");
            console.log(weekEstimate);
          }
          if (this.arvsTakenTwoWeeksPrior == "No") {
            let date = new Date();
            date.setDate(date.getDate() - 60); // 2 months
            date = date.toDateString();
            const monthEstimated = moment(date).format("YYYY-MM-DD");
            console.log(monthEstimated);
          }
        }
        if (this.arvsTakenTwoMonthsPrior == "No") {
          let date = new Date();
          date.setDate(date.getDate() - 90); //3 months
          date = date.toDateString();
          const monthEstimated = moment(date).format("YYYY-MM-DD");
          this.arvsTakenTwoWeeksPrior = "Select";
          console.log(monthEstimated);
        }
      }
    },

    getlocations: async function(val = "") {
      this.setRegistration();
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
    },
    buildForRegistrationGlobalState() {

      if (!this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      if (
        this.form.date_last_taken_arv_year != null &&
        this.form.date_last_taken_arv_month != null &&
        this.form.date_last_taken_arv_day != null
      ) {
        const dateInput = `${this.form.date_last_taken_arv_year}-${this.form.date_last_taken_arv_month}-${this.form.date_last_taken_arv_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = date;
      }

      if (
        this.form.art_start_date_year != null &&
        this.form.art_start_date_month != null &&
        this.form.art_start_date_day != null
      ) {
        const dateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.dateARTStarted.value_datetime = date;
      }

      if (this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      if (this.form.arv_number != null) {
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = `${this.sitePrefix}-ARV-${this.form.arv_number}`;
      }

      if (this.form.confirmatory != null) {
        this.clinicRegistration.obs.confirmatoryTest.value_coded = this.form.confirmatory;
      }

      if (this.form.hiv_test_date_year != null && this.form.hiv_test_date_month !=  null && this.form.hiv_test_date_day) {
        const dateInput = `${this.form.hiv_test_date_year}-${this.form.hiv_test_date_month}-${this.form.hiv_test_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");

        this.clinicRegistration.obs.testDate.value_datetime = date;
      }

      if (this.form.initial_tb_status) {
        const dateInput = `${this.form.hiv_test_date_year}-${this.form.hiv_test_date_month}-${this.form.hiv_test_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.testDate.value_datetime = date;
      }

      if (this.form.initial_weight != null) {
        this.vitalsEncounter.obs.height.value_numeric = this.form.initial_weight;
      }

      if (this.form.initial_height != null) {
        this.vitalsEncounter.obs.weight.value_numeric = this.form.initial_height;
      }

      if (this.form.initial_tb_status != null) {
        this.clinicRegistration.obs.initialTbStatus.value_coded = this.form.initial_tb_status;
      }

      if (
        this.form.art_start_date_year != null &&
        this.form.art_start_date_month != null &&
        this.form.art_start_date_day != null
      ) {
        const dateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      }

      if (this.registered) {
        const dateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      } else {
        this.vitalsEncounter.encounter_datetime = this.visitDate;
      }
    },

    buildObservations() {
      // YEAR LAST TAKEN

      if (!this.registered) {
        this.clinicRegistration.encounter_datetime = this.visitDate;
      }

      // optional
      if (this.recievedTreatment) {
        const dateInput = `${this.form.date_last_taken_arv_year}-${this.form.date_last_taken_arv_month}-${this.form.date_last_taken_arv_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.yearLastTakenARVs.value_datetime = date;
      } else {
        delete this.clinicRegistration.obs.yearLastTakenARVs;
      }

      // also location of ART initiation
      //optional
      if (this.registered) {
        // ART Number
        const dateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.dateARTStarted.value_datetime = date; // this looks ok
        this.clinicRegistration.obs.artNumberAtPreviousLocation.value_text = `${this.sitePrefix}-ARV-${this.form.arv_number}`;
        this.clinicRegistration.obs.initialTbStatus.value_coded = this.form.initial_tb_status;
      } else {
        //ART start date
        delete this.clinicRegistration.obs.dateARTStarted;
        // ART Number
        delete this.clinicRegistration.obs.artNumberAtPreviousLocation;

        delete this.clinicRegistration.obs.ARTStartLocation;
        delete this.clinicRegistration.obs.ARTStartLocation;
        delete this.clinicRegistration.obs.initialTbStatus;
      }

      //optional
      if (this.form.confirmatory == 1040 || this.form.confirmatory == 844) {
        this.clinicRegistration.obs.confirmatoryTest.value_coded = this.form.confirmatory;
        const dateInput = `${this.form.hiv_test_date_year}-${this.form.hiv_test_date_month}-${this.form.hiv_test_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.clinicRegistration.obs.testDate.value_datetime = date;
      } else {
        delete this.clinicRegistration.obs.confirmatoryTest;
        delete this.clinicRegistration.obs.testDate;

        delete this.clinicRegistration.obs.testLocation;
        delete this.clinicRegistration.obs.testLocation;
      }

      this.saveARVNumber();

    },

    buildVitalsObservations() {
      if (this.form.initial_height != null && this.form.initial_weight != null) {
        this.vitalsEncounter.obs.height.value_numeric = this.form.initial_height;
        this.vitalsEncounter.obs.weight.value_numeric = this.form.initial_weight;
      } else {
        delete this.vitalsEncounter.obs;
      }

      if (this.registered) {
        const dateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
        const date = moment(new Date(dateInput)).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = date;
      } else {
        const todaysDate = moment(new Date()).format("YYYY-MM-DD");
        this.vitalsEncounter.encounter_datetime = todaysDate;
      }
    },

    setRegistration() {
      const dateInput = `${this.form.date_last_taken_arv_year}-${this.form.date_last_taken_arv_month}-${this.form.date_last_taken_arv_day}`;
      const date = moment(new Date(dateInput)).format("YYYY-MM-DD");

      const startDateInput = `${this.form.art_start_date_year}-${this.form.art_start_date_month}-${this.form.art_start_date_day}`;
      const startDate = moment(new Date(startDateInput)).format("YYYY-MM-DD");

      const testDateInput = `${this.form.hiv_test_date_year}-${this.form.hiv_test_date_month}-${this.form.hiv_test_date_day}`;
      const testDate = moment(new Date(testDateInput)).format("YYYY-MM-DD");

      this.buildForRegistrationGlobalState();
      console.log("Set Registration");
      let registration = {};
      registration = {
        encounter: this.clinicRegistration,
        agrees_to_follow: this.form.should_follow_up,
        initial_visit_date: this.visitDate,
        receieved_treatment: {
          ever_received: this.form.received_arv_treatment_before,
          last_date_received: date,
          ever_registered: this.form.ever_registered_at_clinic_value
        },
        art_registration: {
          ever_registered: this.form.ever_registered_at_clinic_value,
          location: this.form.location_of_initiation,
          start_date: startDate,
          arv_number: this.form.arv_number
        },
        confirmatory_test: {
          test: this.form.confirmatory,
          location: this.form.location_of_confirmatory,
          test_date: testDate
        },
        vitals: this.vitalsEncounter
      };


      if(this.form.confirmatory == 1118){
        this.form.location_of_confirmatory = "Select Location";
      }

      this.$store.commit("setRegistration", registration);
    },
    getVal(val) {
      //location of confirmatory
      this.setRegistration();
      this.clinicRegistration.obs.testLocation.value_text = val.label;
      this.clinicRegistration.obs.testLocation.location_id = val.location_id;
    },
    getLoc(val) {
      //location of initiation
      this.setRegistration();
      this.clinicRegistration.obs.ARTStartLocation.value_text = val.label;
      this.clinicRegistration.obs.ARTStartLocation.location_id =
        val.location_id;
    },
    getStuff(val) {
      this.setRegistration();
      this.encounters.push(val);
    },
    saveEncounter() {
      this.ifPatientIsNotInHIVProgram(this.enrollPatientIntoHIVProgram);

      this.buildObservations();
      this.$emit("addEncounter", {
        clinicRegistration: this.clinicRegistration
      });

      if (!this.initialVitalsUnknown && this.form.ever_registered_at_clinic_value == 'Yes' && this.form.received_arv_treatment_before == 'Yes') {
        this.buildVitalsObservations();
        console.log(this.vitalsEncounter);
        this.$emit("addEncounter", {
          initialVitals: this.vitalsEncounter
        });
      }
    },
    makeISODateString(year, month, day) {
      year = String(year).padStart(4, '0');
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    },
    async ifPatientIsNotInHIVProgram(success, fail = () => null) {
      const response = await ApiClient.get(`patients/${this.patientId}/programs`);
      const programs = await response.json();

      if (programs.findIndex(program => program.program_id === 1) < 0) {
        success();
      } else {
        fail();
      }
    },
    async enrollPatientIntoHIVProgram() {
      const response = await ApiClient.post(`patients/${this.patientId}/programs`, {
        program_id: 1,
        date_enrolled: this.visitDate
      });

      if (!response.ok) {
        const {errors} = await response.json();
        this.$bvToast.toast(`Failed to enroll patient in HIV Program: ${errors.join('; ')}`, {
          variant: 'warning'
        });

        return null;
      }

      return await response.json();
    },
    getPrefix: async function() {
      this.sitePrefix = await GlobalProperties.getSitePrefix();

      console.log("Site Prefix: " + this.sitePrefix);
    },
    //find site prefix
    saveARVNumber: async function() {
      let finalNum = `${this.sitePrefix}-ARV-${this.form.arv_number}`;
      let identifier_data = {
        identifier: finalNum,
        identifier_type: 4,
        patient_id: this.patientId
      };
      const response = await ApiClient.post(
        `/patient_identifiers/`,
        identifier_data
      );
      if (response.status === 201 || response.status === 200) {
        console.log("ARV number OK");
      } else if (response.status === 400) {
        console.log("ARV number already taken");
      }
    }
  },
  created() {
    this.getPrefix();
    this.getlocations(sessionStorage.location_name);
    EventBus.$on('validate-clinic-registration', data => {
      //Set State of validity here as global state
      console.log("Form Valide:  "+ this.validateForm())
    });
  },
  mounted() {
    this.initial();
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
</style>