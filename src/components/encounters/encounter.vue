<template>
  <div>
    <vitals v-on:addEncounter="addEncounter" ref="vitals" ></vitals>      
    <consultation ref="consultation" v-on:addEncounter="addEncounter"/>

    <prescription v-on:addEncounter="addEncounter" ref="prescription"/>
    <reception ref="reception" v-on:addEncounter="addEncounter"></reception>
    <appointment v-on:addEncounter="addEncounter" ref="appointment"></appointment>      
        <button class="btn btn-primary" @click="createEncounters" >
            <template v-if="posting === true">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="sr-only">Loading...</span>
            </template>
            <template v-else>
              <span>Save</span>
            </template>
          </button>
  </div>
</template>

<script>
import vitals from '@/components/encounters/vitals.vue'
import clinicRegistration from '@/components/encounters/clinicRegistration.vue'
import reception from '@/components/encounters/reception.vue';
import staging from '@/components/encounters/staging.vue';
import appointment from '@/components/encounters/appointment.vue';
import consultation from '@/components/encounters/consultation.vue';
import prescription from '@/components/encounters/prescription.vue';
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
import EventBus from "../../services/event-bus.js";
import { isMoment } from 'moment';
export default {
    props: ["date"],
    data: function() {
        return {
            encounters: {},
            numEnc: 0,
            patientPresent: false,
            posting: false,
            verifiedEnc: []
        }
    },
    components: {
        "vitals": vitals,
        "clinic-registration": clinicRegistration,
        "reception": reception,
        "appointment": appointment,
        "staging": staging,
        "consultation": consultation,
        "prescription": prescription,
    },
    methods: {
        addEncounter(encounterData) {
            let key = Object.keys(encounterData)[0];
            this.encounters[key] = encounterData[key];

        },
        saveEncounter: function(encounterOb) {
            let observations = [];
            let enc = {
                url: "observations"
            };
            console.log(encounterOb);
              if(Object.keys(encounterOb).includes("obs")) {
                Object.keys(encounterOb.obs).forEach(element => {
                    let valueKey = encounterOb.obs[element][this.getExpected(encounterOb.obs[element])];
                    if(valueKey !== null && valueKey !== "") {
                        observations.push(encounterOb.obs[element]);
                    }
                });
                enc.observations = observations;
                if(observations.length > 0) {
                    this.verifiedEnc.push(encounterOb.encounter_id);
                    this.postEncounter(enc, encounterOb.encounter_id)
                }
                
            }else if(Object.keys(encounterOb).includes("drug_orders")) {
                enc.drug_orders = encounterOb.drug_orders;
                enc.url = "drug_orders"
                if(enc.drug_orders.length > 0) {
                    this.verifiedEnc.push(encounterOb.encounter_id);
                    this.postEncounter(enc, encounterOb.encounter_id)
                }
            }
            
            
        },
        postEncounter: async function(enc, encounter_id) {
            const personId = this.$route.params.id;
            const encounter = await EncounterService.createEncounter(
                personId,
                encounter_id,
                this.date
            );
            this.successfulOperation = true;
            if (encounter.status === 201 || encounter.status === 200) {
                let encounterID = encounter.encounter_id;
                enc.encounter_id = encounterID;
                const response = await ApiClient.post(enc.url, enc);
                if (response.status === 201 || response.status === 200) {
                this.numEnc++;
                if(this.numEnc === this.verifiedEnc.length) {
                    this.posting = false;
                    this.$router.go(0);
                }
                this.success = true;
                this.fail = false;
                this.postResponse = "Appointment has been set.";
                // this.$router.go(0);
                } else {
                // this.posting = false;
                let toast = this.$toasted.show("Some Observations failed to save !!", { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 5000
                });   
                this.fail = true;
                this.postResponse = "Appointment could not be set.";
                }
            } else {
                // this.posting = false;
                this.success = false;
                this.fail = true;
                this.postResponse = "Appointment could not be set.";
            }
        },
        createEncounters: function() {
            this.posting = true;
            
            let encounters = Object.keys(this.$refs);
            encounters.forEach(el => {
                this.$refs[el].saveEncounter();
            })
            let keys = Object.keys(this.encounters);
            keys.forEach(enc => {
                this.saveEncounter(this.encounters[enc]);
            });
            // this.posting = false;
        },
        getExpected: function(element) {
            let expected = [
                "value_group_id",
                "value_boolean",
                "value_coded",
                "value_coded_name_id",
                "value_drug",
                "value_datetime",
                "value_numeric",
                "value_modifier",
                "value_text"
            ];
            let key = "";
            Object.keys(element).filter(function(elem) {
                if (expected.includes(elem)) {
                    key = elem;
                }
            });
            return key;
        },
    },
    mounted() {
    EventBus.$on('set-present', payload => {
        this.patientPresent = payload === "1066" ? false : true;  
    });
  }
}
</script>

<style>

</style>