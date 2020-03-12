<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->

        <table id="clinical-registration" ref="clinical-registration">
        
        <tr>
          <th colspan="3">ARV#</th>
          <th colspan="3">National Health ID#</th>
        </tr>
        <tr>
          <td colspan="3">{{this.arv_number}}</td>
          <td colspan="3">{{this.national_id}}</td>
        </tr>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Birthdate</th>
          <th>Int Height(cm)</th>
          <th>Int Weight(Kg)</th>
          <th>TI</th>
        </tr>
        <tr>
          <td>{{given_name}}&nbsp;{{family_name}}</td>
          <td>{{gender}}</td>
          <td>{{birthdate}}</td>
          <td>{{this.initHeight}}</td>
          <td>{{this.initWeight}}</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th colspan="2">Location</th>
          <th colspan="3">Land-mark / Physical address</th>
          <th>Occupation</th>
        </tr>
        <tr>
          <td colspan="2">{{this.current_residence}}</td>
          <td colspan="3">{{this.closest_landmark}}</td>
          <td>{{this.occupation}}</td>
        </tr>
        <tr>
          <th colspan="3">Test Date</th>
          <th colspan="2">Place of HIV test</th>
          <th>Agrees to followup</th>
        </tr>
        <tr>
          <td colspan="3">{{this.testDate}}</td>
          <td colspan="2">{{this.testLocation}}</td>
          <td>{{this.AgreesToFollowup}}</td>
        </tr>
        <tr>
          <th colspan="3">Date of starting 1st Line ARV regimen</th>
          <th colspan="3">Reason for starting ART</th>
        </tr>
        <tr>
          <td colspan="3">{{this.earliestSatrtDate}}</td>
          <td colspan="3">{{this.reasonForART}}</td>
        </tr>
        <tr>
          <th colspan="3">Pulmonary tuberculosis within the last 2 years</th>
          <th>Extra pulmonary tuberculosis (EPTB)</th>
          <th>pulmonary tuberculosis (current)</th>
          <th>Kaposi's sarcoma</th>
        </tr>
        <tr>
          <td colspan="3">-</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th colspan="2">Latest VL Date</th>
          <th colspan="2">VL result</th>
          <th colspan="3">Guardian</th>
        </tr>
        <tr>
          <td colspan="2">&nbsp;</td>
          <td colspan="2">&nbsp;</td>
          <td colspan="2"><a href="#">{{this.Guardian}}</a></td>
        </tr>

        </table>

        <div style="width: 99%; margin: 10px 0px 10px 0px; text-align: right;">
          <button class="btn btn-primary">Add visit</button>&nbsp;
          <button class="btn btn-primary">Add outcome</button>&nbsp;
          <button class="btn btn-primary">Add VL</button>
        </div>

        <table id="visits">
          <thead>
            <tr>
              <th>Visit date</th>
              <th>Visit type</th>
              <th>Ht</th>
              <th>Wt</th>
              <th>BMI</th>
              <th>Regimen</th>
              <th>Gave</th>
              <th>Adherence</th>
              <th>Side effects</th>
              <th>Pill count</th>
              <th>Outcome</th>
              <th>Next appointment</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
        </table>
        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>




<script>
// @ is an alias to /src
import ApiClient from "../services/api_client"
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";


import moment from 'moment';

import jQuery from 'jquery';
import datatable from 'datatables'

require("@/assets/datatable/css/bootstrap.css");
require("@/assets/datatable/css/dataTables.bootstrap4.min.css");

require("@/assets/datatable/css/buttons.dataTables.min.css");
require("@/assets/datatable/css/dataTables.jqueryui.min.css")




export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar
  }, methods: {
    redirect: function(url) {
      this.$router.push(url);
    },
    initDataTable(){
      this.dTable = jQuery("#visits").dataTable({
        order: [[ 0, "desc" ]],
        fixedHeader: true,
        searching: false,
        paging: true,
        Processing: true,
        ServerSide: true,

        bPaginate: false,
        bFilter: false,
        bInfo: false,
        bLengthChange: false,

        scroller: {
          loadingIndicator: true
        }
      });
      this.fetchVisitDates();
    },
    fetchVisitDates: async function(){
      let patient_id = this.$route.params.id;
      let url = "patients/" + patient_id + "/visits";
     
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) =>  this.loadVisitDates(data) );
      }
    },
    loadVisitDates(visits){
      for (let i = 0; i <= visits.length; i++) {
        this.visitDates.push(visits[i]);
      }
      this.fetchVisit(this.visitDates[0]);
    },
    fetchVisit: async function(visit_date) {
      if(!visit_date)
      return;

      let patient_id = this.$route.params.id;
      let url = "patients/" + patient_id + "/visit?date=" + visit_date;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) =>  this.loadVisit(data, visit_date) );
      }
    },
    loadVisit(data, visit_date){
      this.dTable.fnAddData([ 
        moment(visit_date).format('YYYY-MM-DD'),
        data.visit_type,
        data.height,
        data.weight,
        "",
        data.regimen,
        "",
        "",
        "",
        "",
        (data.outcome == 'On antiretrovirals' ? 'On ART' : data.outcome),
        (data.appointment ? moment(data.appointment).format('DD/MMM/YY') : null),
        this.addVoidBtn(visit_date)
      ]);

      this.visitDates.shift();
      if(this.visitDates.length > 0)
        this.fetchVisit(this.visitDates[0]);


    },
    addVoidBtn(visit_date){
      let span = document.createElement('span');
      let btn = document.createElement('button');
      btn.setAttribute("class", "btn btn-danger");
      btn.setAttribute("onclick", "voidVisit('" + visit_date + "')");
      btn.innerHTML = "X";
      span.appendChild(btn);
      return span.innerHTML;
    },
    fetchDemographics: async function() {
      let patient_id = this.$route.params.id;
      let url = "patients/" + patient_id;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.loadDemographics(data) );
      }
    },
    fetchInitHeightWeight: async function(concept_id) {
      let patient_id = this.$route.params.id;
      let url = "observations?person_id=" + patient_id;
      url += "&concept_id=" + concept_id;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => (this.loadInitHeightWeight(data, concept_id)) );
      }
    },
    loadInitHeightWeight(data, concept_id){
      if (data.length > 0) {
        let keys = Object.keys(data);
        let old_key = keys[keys.length - 1];

        let observation = data[old_key];
        let value = observation.value_numeric;
        if (!value) {
          value = observation.value_text;
        }

        concept_id == 5089 ? (this.initWeight = value) : (this.initHeight = value);

      }
    },
    loadDemographics(personObj){
      let person = personObj["person"];
      let person_names = person["names"][0];
      let person_address = person["addresses"][0];
      let patient_identifiers = personObj["patient_identifiers"];
      let person_attributes = person["person_attributes"];
      this.given_name   = person_names["given_name"];
      this.family_name  = person_names["family_name"];

      this.current_residence = person_address["city_village"];
      this.closest_landmark = this.getAttribute(person_attributes, "19");

      try{
        this.birthdate = moment(person["birthdate"]).format('DD/MMM/YYYY');
      }catch(e){
        this.birthdate = 'N/A';
      }
      this.gender = person["gender"];
      let current_residence = person_address["city_village"];

      for (let key in patient_identifiers) {
        let type = patient_identifiers[key]["type"];
        if (type.name.match(/National id/i)) {
          this.national_id = patient_identifiers[key]["identifier"];
        }
        if (type.name.match(/ARV Number/i)) {
            this.arv_number = patient_identifiers[key]["identifier"];
        }
      }

      for (let person_attribute in person_attributes) {
        let person_attribute_type = person_attributes[person_attribute]["type"];
        if (person_attribute_type.name.match(/occupation/i)) {
            this.occupation = person_attributes[person_attribute]["value"];
        }
      }


    },getAttribute(attributes, attribute_type_id) {
     let attribute = "";
     for (let index = 0; index < attributes.length; index++) {
        if(attributes[index]["person_attribute_type_id"] == attribute_type_id) {
          return  attribute =  attributes[index]["value"];
        }else {
          return attribute = "";
        }
      }
      return attribute;
    },
    fetchConfirmatoryHIVTestLocationAndDate: async function(concept_id){
      let patient_id = this.$route.params.id;
      let url = "observations?person_id=" + patient_id;
      url += "&concept_id=" + concept_id;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => (this.loadConfirmatoryHIVTestLocationAndDate(data, concept_id)) );
      }
    },
    loadConfirmatoryHIVTestLocationAndDate(data, concept_id){
      if(data.length < 1)
        return;
      
      concept_id == 7881 ? (this.testLocation = data[0].value_text) : (this.testDate = data[0].value_datetime);
    },
    fetchObs: async  function(concept_id, element_name){
      let patient_id = this.$route.params.id;
      let url = "observations?person_id=" + patient_id;
      url += "&concept_id=" + concept_id;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => (this.fetchConceptName(data, element_name)) );
      }
    },
    fetchConceptName: async function(obs, element_name){
      if(obs.length < 1)
        return;

      if(element_name == 'Earliest satrt date'){
        let earliestSatrtDate = obs[0].value_datetime;
        if(!earliestSatrtDate){
          let estimated_period = obs[0].value_text;
          let obs_datetime = moment(obs[0].obs_datetime);
          if(estimated_period.match(/months/)){
            let months = estimated_period.split("")[0];
            let startdate = obs_datetime.subtract(months, "months");
            startdate = startdate.format("DD/MMM/YYYY");
            this.earliestSatrtDate = startdate + " (Estimated)";
          }
        }else{
          this.earliestSatrtDate = moment(obs[0].value_datetime).format('DD/MMM/YYYY');
        }
        return;
      }

      if(element_name == 'TB states'){
        return;
      }
      let value_coded = obs[0].value_coded;
      let url = "concepts/" + value_coded;
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.loadFetchedConceptName(data, element_name) );
      }
    },
    loadFetchedConceptName(concept, e){
      let concept_names = concept.concept_names
      for (let key in concept_names) {
        if (concept_names[key]["concept_name_type"].match(/FULLY_SPECIFIED/i)) {
          let value = concept_names[key]["name"];
          if(e == 'Reason for ART')
            this.reasonForART = value;

          if(e == 'Agrees to followup')
            this.AgreesToFollowup = value;

          break;
        }
      }
    },
    getRelationships: async function(){
      let url = "people/" + this.$route.params.id + "/relationships"
      const response = await ApiClient.get(url, {}, {});

      if (response.status === 200) {
        response.json().then((data) => this.loadGuardian(data[0]) );
      }
    },
    loadGuardian(data){
      if(!data)
      return;

      let person_name = data["relation"]["names"][0];
      let relationship_type = (data["type"]["b_is_to_a"]);
      this.Guardian = person_name["given_name"] + " " + person_name["family_name"] + " (" + relationship_type + ")";
    }
  }, data: function() {
      return {
        visitDates: [],
        arv_number: null,
        national_id: null,
        given_name: null,
        family_name: null,
        birthdate: null,
        gender: null,
        occupation: null,
        current_residence: null,
        closest_landmark: null,
        initWeight: null,
        initHeight: null,
        testLocation: null,
        testDate: null,
        reasonForART: null,
        AgreesToFollowup: null,
        earliestSatrtDate: null,
        Guardian: 'Add'
      }
  },
  mounted(){
    setTimeout(() => this.initDataTable(), 300);
    setTimeout(() => this.fetchDemographics(), 300);
    setTimeout(() => this.fetchInitHeightWeight(5089), 300);
    setTimeout(() => this.fetchInitHeightWeight(5090), 300);
    setTimeout(() => this.fetchConfirmatoryHIVTestLocationAndDate(7881), 300);
    setTimeout(() => this.fetchObs(7563, 'Reason for ART'), 300);
    setTimeout(() => this.fetchObs(2552, 'Agrees to followup'), 300);
    setTimeout(() => this.fetchObs(2516, 'Earliest satrt date'), 300);
    setTimeout(() => this.fetchObs(2743, 'TB states'), 300);
    setTimeout(() => this.getRelationships(), 300);
  }
  
}



</script>

<style scope>
#clinical-registration {
  text-align: left;
  padding-left: 15px;
  margin-right: 10px;
  width: 99%;
  margin: 15px  10px 5px 10px;
}

#clinical-registration td {
  border-style: solid;
  border-width: 1px;
  padding-left: 5px;
}

#clinical-registration th {
  background-color: steelblue;
  border-style: solid;
  border-width: 1px;
  padding-left: 5px;
  color: whitesmoke;
  border-color: black;
}

#visits {
  padding-left: 15px;
  padding-top: 15px;
  margin-right: 10px;
  width: 97.7%;
  margin: 15px  10px 5px 10px;
  border-style: solid;
  border-width: 1px 0px 1px 0px;
}
</style>
