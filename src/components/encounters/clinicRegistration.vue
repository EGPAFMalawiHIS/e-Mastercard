<template>
<div>

<form action="">

<div class="row">
  <label class="col-md-4 control-label" for="radios">Phone Follow Up</label>
 <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions"  value="1065" v-model="obs.phoneFollowUp.child.value_coded">
  <label class="form-check-label" for="inlineRadio1">Yes</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="1066" v-model="obs.phoneFollowUp.child.value_coded">
  <label class="form-check-label" for="inlineRadio2">No</label>
</div>
</div>
</form>
<form>
<div class="row">
  <label class="col-md-4 control-label" for="radios">Home Follow Up</label>
 <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions"  value="1065" v-model="obs.homeFollowUp.child.value_coded">
  <label class="form-check-label" for="inlineRadio1">Yes</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions"  value="1066" v-model="obs.homeFollowUp.child.value_coded">
  <label class="form-check-label" for="inlineRadio2">No</label>
</div>
</div>
</form>
<form>
<div class="row">
  <label class="col-md-4 control-label" for="radios">Ever Recieved ART</label>
 <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="1065" v-model="obs.everReceivedART.value_coded">
  <label class="form-check-label" for="inlineRadio1">Yes</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="1066" v-model="obs.everReceivedART.value_coded">
  <label class="form-check-label" for="inlineRadio2">No</label>
</div>
</div>
</form>

<div class="form-group">
    <label for="exampleFormControlSelect1">Confirmatory Test</label>
    <select class="form-control" v-model="obs.confirmatoryTest.value_coded">
      <option value="1040">Rapid Antibody Test</option>
      <option value="844">DNA PCR</option>
      <option value="1118">Not Done</option>
    </select>
</div>
 <div class="form-group">
    <label for="exampleFormControlSelect1">Test Location</label>
    <!-- <select class="form-control" v-model="obs.testLocation"> -->
        <v-select :options="locations" @search="getlocations" @input="getVal"></v-select>
    <!-- </select> -->
</div>
 <div class="form-group">
    <label for="exampleFormControlSelect1">Test Date</label>
    <input type="date" name=""  v-model="obs.testDate.value_datetime">
</div>
<div class="form-group">
    <label for="exampleFormControlSelect1">ARV Last Taken</label>
    <input type="date" name=""  v-model="obs.dateARTLastTaken.value_datetime">
</div>
<div class="form-group">
    <label for="exampleFormControlSelect1">ARV Start Date</label>
    <input type="date" name=""  v-model="obs.dateARTStarted.value_datetime">
</div>
<div class="form-group">
    <label for="exampleFormControlSelect1">ARV Start Location</label>
    <!-- <select class="form-control" v-model="obs.testLocation"> -->
        <v-select :options="locations" @search="getlocations" @input="getLoc"></v-select>
    <!-- </select> -->
</div>
<button type="button" class="btn btn-primary" @click="saveEncounter">save</button>
<vitals v-on:getStuff="$event"> </vitals>
</div>
</template>

<script>
import ApiClient from "../../services/api_client";
import EncounterService from '../../services/encounter_service'
import 'vue-select/dist/vue-select.css';
import VueSelect from 'vue-select';
import vitals from '@/components/encounters/vitals.vue'
export default {
    components: {
        "v-select": VueSelect,
        "vitals": vitals
    },
    data: function() {
        return {
            obs: {

                phoneFollowUp: {
                    concept_id: 2552,
                    value_coded: 9685,
                    child: {
                        concept_id: 9685, 
                        value_coded: null
                    }
                },
                homeFollowUp: {
                    concept_id: 2552,
                    value_coded: 9686,
                    child: {
                        concept_id: 9686, 
                        value_coded: null
                    }
                },
                everReceivedART: {
                    value_coded: null,
                    concept_id: 7754
                },
                confirmatoryTest: {
                    value_coded: null,
                    concept_id: 7880
                },
                testLocation: {
                    value_text: null,
                    concept_id: 7881,
                    location_id: null
                },
                ARTStartLocation: {
                    value_text: null,
                    concept_id: 7750,
                    location_id: null
                },
                testDate: {
                    concept_id: 7882,
                    value_datetime: null,

                },
                dateARTLastTaken: {
                    concept_id: 7751,
                    value_datetime: null,

                },
                dateARTStarted: {
                    concept_id: 2516,
                    value_datetime: null,

                },
            },
            locations: []
        }
    },methods: {
        getExpected: function(element) {
        let expected = ["value_group_id","value_boolean","value_coded","value_coded_name_id","value_drug","value_datetime","value_numeric","value_modifier","value_text"] ;
        let key = "";
        Object.keys(element).filter(function(elem) {
            if(expected.includes(elem)){
            key = elem;
            }
        } );
        return key;
        },

        getlocations: async function(val) {
            this.locations = [];
            await ApiClient.get(`/locations?name=`+val).then(
                res => {
                res.json().then(ret => {
                    
                    let loc = ret.forEach(element => {
                        this.locations.push( {
                            label: element.name,
                            code: element.name,
                            location_id: element.location_id
                        })    
                    });
                });
                }
            );
        }, saveEncounter: async function() {
            let observations = [];
            Object.keys(this.obs).forEach(element => {
                observations.push(this.obs[element]);
            });
            const personId = this.$route.params.id;
            // const visitID = window.sessionStorage.visit_id
            const encounter = await EncounterService.createEncounter(personId, 9);
            this.successfulOperation = true;
            if(encounter.status === 201 || encounter.status === 200){
                let encounterID = encounter.encounter_id;
                let f = {
                    encounter_id: encounterID,
                    observations: observations
                }; 
                const response = await ApiClient.post("observations", f);
                if(response.status === 201 || response.status === 200){
                this.success = true;
                this.fail = false;
                this.postResponse = "Appointment has been set."
                this.$router.go(0);
                }else{
                this.success = false;
                this.fail = true;
                this.postResponse = "Appointment could not be set."
                }
            }else{
                this.success = false;
                this.fail = true;
                this.postResponse = "Appointment could not be set."
            }


        }, getVal(val) {
            this.obs.testLocation.value_text = val.label;
            this.obs.testLocation.location_id = val.location_id;
            

        }, getLoc(val) {
            this.obs.ARTStartLocation.value_text = val.label;
            this.obs.ARTStartLocation.location_id = val.location_id;
            

        },
        getStuff(val) {
            console.log(val);
        }

    }, mounted() {
        this.getlocations();
    }
}
</script>

<style>

</style>