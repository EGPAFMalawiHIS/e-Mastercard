<template>
  <div class="container" style="width: 100%; margin: auto;">
    <div class="row">
      <div class="col-md-12">
        <form id="msform">
          <!-- TABS -->
          <div
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template tab"
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
              <div class="form-group col-md-12">
                <label class="input-label" for="dobInput">Date Of Birth</label>
                <input type="text" class="form-control" id="dob" placeholder="Date of Birth" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="dobInput">Estimate Age</label>
                <input type="text" class="form-control" id="dob" placeholder="Estimate Age" />
              </div>
              <div
                class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
                style="float:left; font-weight: bold"
              >
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Estimate Date of Birth?</label>
              </div>
            </div>
            <input
              type="button"
              name="next"
              class="btn btn-primary next action-button"
              value="Next Step"
            />
          </div>

          <div
            class="content-tab tab-pane fade show shadow-lg p-3 mb-5 bg-white rounded form-template"
          >
            <div class="form-row">
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Region</label>
                <select class="form-control">
                  <option disabled selected>Select Region</option>
                  <option value="1">Central Region</option>
                  <option value="2">Northern Region</option>
                  <option value="3">Southern Region</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Home District</label>
                <select class="form-control">
                  <v-select :options="['Canada', 'United States']"></v-select>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label class="input-label" for="gender">Traditional Authority (TA)</label>
                <select class="form-control">
                  <option disabled selected>Select Traditional Authority</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label class="input-label" for="village">Home Village</label>
                <select class="form-control">
                  <option disabled selected>Select Home Village</option>
                </select>
              </div>
            </div>
            <div
              class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
              style="float:left; font-weight:bold"
            >
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label
                class="form-check-label"
                for="exampleCheck1"
              >Current address same as Home address?</label>
            </div>
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="margin-right: 5px"
            />
            <input
              type="button"
              name="next"
              class="btn btn-primary next action-button"
              value="Next Step"
            />
          </div>

          <div
            class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template"
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
              <div class="form-group col-md-12">
                <label class="input-label" for="dobInput">Date Of Birth</label>
                <input type="text" class="form-control" id="dob" placeholder="Date of Birth" />
              </div>
              <div class="form-group col-md-12">
                <label class="input-label" for="dobInput">Estimate Age</label>
                <input type="text" class="form-control" id="dob" placeholder="Estimate Age" />
              </div>
              <div
                class="form-check form-group col-md-12 shadow-sm p-3 mb-3 bg-white rounded"
                style="float:left; font-weight: bold"
              >
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Estimate Date of Birth?</label>
              </div>
            </div>
            <input
              type="button"
              name="next"
              class="btn btn-primary next action-button"
              value="Next Step"
            />
          </div>

          <div class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template">
            <div
              class="sample"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, soluta.</div>
            <input
              type="button"
              name="previous"
              class="btn btn-primary previous action-button-previous"
              value="Previous"
              style="margin-right: 5px"
            />
            <input
              type="button"
              name="make_payment"
              class="btn btn-primary next action-button"
              value="Confirm"
            />
          </div>

          <div class="content-tab tab-pane fade show active shadow-lg p-3 mb-5 bg-white rounded form-template">
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
          </div>
          <!-- progressbar -->
          <ul id="progressbar">
            <li class="active" id="account">
              <strong>Personal Details</strong>
            </li>
            <li id="personal">
              <strong>Contant Details</strong>
            </li>
            <li id="payment">
              <strong>Guardian</strong>
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

export default {
  name: "app",
  data(){
    return {
      Date: new Date(),
      config: {
        api_base_url: `${Config.apiProtocol}://${Config.apiURL}:${Config.apiPort}/api/${ApiClient.config.apiVersion}`,
        token: sessionStorage.apiKey
      }
    }
  },
  components: {},
  methods: {
    fetchVillages(name = ''){
      //const PARAMS = `?paginate=false&traditional_authority_id=${event.target.value}`;
      this.RebuildReport = false;
      fetch(`${this.config.api_base_url}/villages?name=${name}`, { // filter by name
        method: "GET",
        headers: {
          Authorization: this.config.token,
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json().then(data => {
              // Show page initilization until all Villages have finished loading
              console.log(data);
              //this.villages = data;
            });
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    },
    initileWizard() {
      $(document).ready(function() {
        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;

        $(".next").click(function() {
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
                next_fs.css({ opacity: opacity });
              },
              duration: 600
            }
          );
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

        $(".radio-group .radio").click(function() {
          $(this)
            .parent()
            .find(".radio")
            .removeClass("selected");
          $(this).addClass("selected");
        });

        $(".submit").click(function() {
          return false;
        });
      });
    }
  },
  created(){
    this.fetchVillages()
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
  width: 18%;
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
  content: "3";
}

#progressbar #confirm:before {
  font-family: FontAwesome;
  content: "4";
}

#progressbar #success:before {
  font-family: FontAwesome;
  content: "5";
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
</style>