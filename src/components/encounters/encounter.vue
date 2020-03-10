<template>
  <div>
    <clinic-registration v-on:addEncounter="addEncounter" ref="clinicRegistration"></clinic-registration>
    <vitals v-on:addEncounter="addEncounter" ref="vitals"></vitals>      
    <appointment v-on:addEncounter="addEncounter" ref="appointment"></appointment>      
    <reception ref="reception" v-on:addEncounter="addEncounter"></reception>
    <!-- <staging/> -->
    <consultation ref="consultation" v-on:addEncounter="addEncounter"/>
    <prescription v-on:addEncounter="addEncounter" ref="prescription"/>
    <!-- <vitals v-on:addEncounter="addEncounter" ref="vitals"></vitals>       -->
    <button type="button" class="btn btn-primary" @click="createEncounters">save</button>
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
import { isMoment } from 'moment';
export default {
    data: function() {
        return {
            encounters: {},
            numEnc: 0,
        }
    },
    components: {
        "vitals": vitals,
        "clinic-registration": clinicRegistration,
        "reception": reception,
        "appointment": appointment,
        "staging": staging,
        "consultation": consultation,
        "prescription": prescription
    },
    methods: {
        addEncounter(encounterData) {
            let key = Object.keys(encounterData)[0];
            this.encounters[key] = encounterData[key];
            
        },
        saveEncounter: async function(encounterOb) {
            let observations = [];
            let enc = {
                url: "observations"
            };
              if(Object.keys(encounterOb).includes("obs")) {
                Object.keys(encounterOb.obs).forEach(element => {
                    observations.push(encounterOb.obs[element]);
                });
                enc.observations = observations;
                
            }else if(Object.keys(encounterOb).includes("drug_orders")) {
                enc.drug_orders = encounterOb.drug_orders;
                enc.url = "drug_orders"
            }
            
            const personId = this.$route.params.id;
            const encounter = await EncounterService.createEncounter(
                personId,
                encounterOb.encounter_id
            );
            this.successfulOperation = true;
            if (encounter.status === 201 || encounter.status === 200) {
                let encounterID = encounter.encounter_id;
                enc.encounter_id = encounterID;
                const response = await ApiClient.post(enc.url, enc);
                if (response.status === 201 || response.status === 200) {
                this.numEnc++;
                if(this.numEnc === Object.keys(this.encounters).length) {
                    this.$router.go(0);
                }
                this.success = true;
                this.fail = false;
                this.postResponse = "Appointment has been set.";
                // this.$router.go(0);
                } else {
                this.success = false;
                this.fail = true;
                this.postResponse = "Appointment could not be set.";
                }
            } else {
                this.success = false;
                this.fail = true;
                this.postResponse = "Appointment could not be set.";
            }
        },
        createEncounters: function() {
        //    console.log(this.$refs); 
            let encounters = Object.keys(this.$refs);
            encounters.forEach(el => {

            //    console.log(el); 
                this.$refs[el].saveEncounter();
            })
            // console.log()
            let keys = Object.keys(this.encounters);
            // this.numEnc = this.keys.length;
            keys.forEach(enc => {
                this.saveEncounter(this.encounters[enc]);
            });
            
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
    }
}
</script>

<style>

</style>