
<template>
  <div class="content">
    <h4 style="float: left">Patient Registration</h4>
    <div class="clearfix" style="margin-bottom:10px"></div>
    <div class="row">
      <div class="col-md-3">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            class="nav-link active"
            id="personal-details-tab"
            data-toggle="pill"
            href="#v-personal-details"
            role="tab"
            aria-controls="v-personal-details"
            aria-selected="true"
          >Personal Details</a>
          <a
            class="nav-link"
            id="address-tab"
            data-toggle="pill"
            href="#v-address"
            role="tab"
            aria-controls="v-address"
            aria-selected="false"
          >Contant Details</a>
          <a
            class="nav-link"
            id="guardian-tab"
            data-toggle="pill"
            href="#v-guardian"
            role="tab"
            aria-controls="v-guardian"
            aria-selected="false"
          >Guardian</a>
          <a
            class="nav-link"
            id="summary-tab"
            data-toggle="pill"
            href="#v-summary"
            role="tab"
            aria-controls="v-summary"
            aria-selected="false"
          >Summary</a>
        </div>
      </div>
      <div class="col-md-8" style="margin: auto">
        <div class="tab-content" id="v-pills-tabContent">
          <!-- PERSONAL DETAILS -->
          <div
            class="tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
            id="v-personal-details"
            role="tabpanel"
            aria-labelledby="v-personal-details-tab"
          >
            <div class="form-row">
              <div class="form-group col-md-12">
                <label class="input-label" for="firstNameInput">First Name</label>
                <input type="text" class="form-control" id="firstname" placeholder="First Name" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="middleNameInput">Middle Name</label>
                <input type="text" class="form-control" id="middlename" placeholder="Middle Name" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="lastNameInput">Last Name</label>
                <input type="text" class="form-control" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label class="input-label" for="gender">Gender</label>
                <select id="gender" class="form-control">
                  <option>Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div
                v-bind:style="{ display: (greyOutDob ? 'none' : '' )}"
                class="form-group col-md-12"
              >
                <label class="input-label" for="dobInput">Date Of Birth</label>
                <input type="text" class="form-control" id="dob" placeholder="Date of Birth" />
              </div>
              <div
                v-bind:style="{ display: (!greyOutDob ? 'none' : '' )}"
                class="form-group col-md-12"
              >
                <label class="input-label" for="dobInput">Estimate Age</label>
                <input type="text" class="form-control" id="dob" placeholder="Estimate Age" />
              </div>
              <div
                class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
                style="float:left; font-weight: bold"
              >
                <input
                  @click="greyOut($event)"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">Estimate Date of Birth?</label>
              </div>
            </div>
            <button v-on:click="proceed()" class="btn btn-primary">Proceed</button>
          </div>
          <!-- CONTACTS DETAILA -->
          <div
            class="tab-pane fade show shadow-lg p-3 mb-5 bg-white rounded form-template"
            id="v-address"
            role="tabpanel"
            aria-labelledby="v-address-tab"
          >
            <div class="form-row">
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Region</label>
                <select
                  v-model="regionId"
                  @change="fetchDistrictsByRegionId($event)"
                  class="form-control"
                >
                  <option disabled selected>Select Region</option>
                  <option value="1">Central Region</option>
                  <option value="2">Northern Region</option>
                  <option value="3">Southern Region</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Home District</label>
                <select
                  v-model="districtId"
                  @change="fetchTAsByDistrictId($event)"
                  class="form-control"
                >
                  <option disabled selected>Select Home District</option>
                  <option
                    v-for="district in districts"
                    v-bind:key="district.district_id"
                    v-bind:value="district.district_id"
                  >{{ district.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Traditional Authority (TA)</label>
                <select v-model="taId" @change="fetchVillagesByTAId($event)" class="form-control">
                  <option disabled selected>Select TA</option>
                  <option
                    v-for="ta in traditionalAuthorities"
                    v-bind:key="ta.traditional_authority_id"
                    v-bind:value="ta.traditional_authority_id"
                  >{{ ta.name }}</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="village">Home Village</label>
                <select v-model="villageId" class="form-control">
                  <option disabled selected>Select Home Village</option>
                  <option
                    v-for="village in villages"
                    v-bind:key="village.village_id"
                    v-bind:value="village.village_id"
                  >{{ village.name }}</option>
                </select>
              </div>
            </div>
            <div
              class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
              style="float:left; font-weight:bold"
            >
              <input
                @click="disableCurrentAddress($event)"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label
                class="form-check-label"
                for="exampleCheck1"
              >Current address same as Home address?</label>
            </div>
            <div class="current-address">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="input-label" for="gender">Current Region</label>
                  <select id="gender" class="form-control" :disabled="homeAddressSame">
                    <option disabled selected>Select Current Region</option>
                    <option value="female">Southern</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label class="input-label" for="gender">Current District</label>
                  <select id="gender" class="form-control" :disabled="homeAddressSame">
                    <option disabled selected>Select Current District</option>
                    <option value="female">Northen</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="input-label" for="gender">Current TA</label>
                  <select id="gender" class="form-control" :disabled="homeAddressSame">
                    <option disabled selected>Select Current TA</option>
                    <option value="female">Area 3</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label class="input-label" for="gender">Current Village</label>
                  <select id="gender" class="form-control" :disabled="homeAddressSame">
                    <option disabled selected>Select Current Village</option>
                    <option value="female">Kachere</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Closest Land Mark or Plot Number</label>
                <select id="gender" class="form-control">
                  <option disabled selected>Select Closest Land Mark or Plot Numbe</option>
                  <option value="Catholic Church">Catholic Church</option>
                  <option value="CCAP">CCAP</option>
                  <option value="Seventh Day">Seventh Day</option>
                  <option value="Mosque">Mosque</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Borehole">Borehole</option>
                  <option value="Secondary School">Secondary School</option>
                  <option value="College">College</option>
                  <option value="Market">Market</option>
                  <option value="Football Ground">Football Ground</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Type of Patient</label>
                <select id="gender" class="form-control">
                  <option disabled selected>Select Type of Patient</option>
                  <option value="New patient">New patient</option>
                  <option value="External consultation">External consultation</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                  <label class="input-label" for="firstNameInput">Cellphone Number</label>
                  <input type="text" class="form-control" id="firstname" placeholder="Cellphone Number" />
                </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Register Guardian</label>
                <select id="gender" class="form-control">
                  <option disabled selected>Register Guardian</option>
                  <option value="yes">Yes</option>
                  <option value="yes">No</option>
                </select>
              </div>
            </div>
            <button
              v-on:click="previous()"
              class="btn btn-primary"
              style="margin-right: 10px"
            >Previous</button>
            <button v-on:click="proceed()" class="btn btn-primary">Proceed</button>
          </div>
          <!-- GUARDIAN -->
          <div
            class="tab-pane fade shadow-lg p-3 mb-5 bg-white rounded form-template"
            id="v-guardian"
            role="tabpanel"
            aria-labelledby="v-guardian-tab"
          >
            <div class="form-row">
              <div class="form-group col-md-12">
                <label class="input-label" for="firstNameInput">First Name</label>
                <input type="text" class="form-control" id="firstname" placeholder="First Name" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="middleNameInput">Middle Name</label>
                <input type="text" class="form-control" id="middlename" placeholder="Middle Name" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="lastNameInput">Last Name</label>
                <input type="text" class="form-control" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label class="input-label" for="gender">Gender</label>
                <select id="gender" class="form-control">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="dobInput">Date Of Birth</label>
                <input type="text" class="form-control" id="dob" placeholder="Date of Birth" />
              </div>
              <div
                class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
                style="float:left"
              >
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Estimate Date of Birth?</label>
              </div>
            </div>
            <button
              v-on:click="previous()"
              class="btn btn-primary"
              style="margin-right: 10px"
            >Previous</button>
            <button v-on:click="proceed()" class="btn btn-primary">Proceed</button>
          </div>
          <!-- SUMMARY -->
          <div
            class="tab-pane fade shadow-lg p-3 mb-5 bg-white rounded form-template"
            id="v-summary"
            role="tabpanel"
            aria-labelledby="v-summary-tab"
          >
            <p style="float:left; font-weight:bold">Personal Details Summary</p>
            <div style="display:block; margin-top:30px;" class="form-row summary"></div>
            <p style="float:left; font-weight:bold">Personal Details Summary</p>
            <div style="display:block; margin-top:60px;" class="form-row summary"></div>
            <p style="float:left; font-weight:bold">Guardian Details Summary</p>
            <div style="display:block; margin-top:60px;" class="form-row summary"></div>
            <button
              v-on:click="previous()"
              class="btn btn-primary"
              style="margin-right: 10px"
            >Previous</button>
            <button v-on:click="submitRegistration()" class="btn btn-primary">Finish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "../../public/config.json";
import ApiClient from "../services/api_client";
import moment from "moment";

export default {
  name: "PatientRegistration",
  data() {
    return {
      greyOutDob: false,
      districts: null,
      traditionalAuthorities: null,
      villages: [],
      regionId: "Select Region",
      districtId: "Select District",
      taId: "Select TA",
      villageId: "Select Village",
      currentRegionId: "Select Current Region",
      currentDistrictId: "Select Current District",
      currentTaId: "Select Current TA",
      currentVillageId: "Select Current Village",
      homeAddressSame: false,
      Date: new Date(),
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      }
    };
  },
  methods: {
    proceed() {
      const tablinks = document.querySelectorAll(".nav-link");

      let active_tab;

      tablinks.forEach(tab => {
        tab.classList.contains("active")
          ? (active_tab = tab.innerHTML.trim())
          : null;
      });

      if (active_tab === "Personal Details") {
        this.active_component = "address-tab";
        document.getElementById("address-tab").click();
      }

      if (active_tab === "Contant Details") {
        this.active_component = "guardian-tab";
        document.getElementById("guardian-tab").click();
        console.log(this.active_component);
      }

      if (active_tab === "Guardian") {
        this.active_component = "summary-tab";
        document.getElementById("summary-tab").click();
        console.log(this.active_component);
      }
    },
    previous() {
      const tablinks = document.querySelectorAll(".nav-link");

      let active_tab;

      tablinks.forEach(tab => {
        tab.classList.contains("active")
          ? (active_tab = tab.innerHTML.trim())
          : null;
      });

      if (active_tab === "Summary") {
        this.active_component = "guardian-tab";
        document.getElementById("guardian-tab").click();
      }

      if (active_tab === "Guardian") {
        this.active_component = "address-tab";
        document.getElementById("address-tab").click();
        console.log(this.active_component);
      }

      if (active_tab === "Contant Details") {
        this.active_component = "personal-details-tab";
        document.getElementById("personal-details-tab").click();
        console.log(this.active_component);
      }
    },

    greyOut(event) {
      if (this.greyOutDob == false) {
        this.greyOutDob = true;
        this.display = "none";
      } else if (this.greyOutDob == true) {
        this.greyOutDob = false;
        this.display = "";
      }
    },

    disableCurrentAddress() {
      if (this.homeAddressSame == false) {
        this.homeAddressSame = true;
      } else if (this.homeAddressSame == true) {
        this.homeAddressSame = false;
      }
    },

    fetchDistrictsByRegionId(event) {
      const PARAMS = `?paginate=false&region_id=${event.target.value}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/districts${PARAMS}`, {
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              console.log(data);
              this.districts = data;
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    fetchTAsByDistrictId(id = "") {
      console.log("clicked");
      const PARAMS = `?paginate=false&district_id=${event.target.value}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/traditional_authorities${PARAMS}`, {
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              this.traditionalAuthorities = data;
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },

    fetchVillagesByTAId(id = "") {
      const PARAMS = `?paginate=false&traditional_authority_id=${event.target.value}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/villages${PARAMS}`, {
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              console.log(data);
              this.villages = data;
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },
    submitRegistration() {
      console.log(this.regionId);
    }
  },
  created() {}
};
</script>

<style>
.form-template {
  height: 750px;
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
</style>
