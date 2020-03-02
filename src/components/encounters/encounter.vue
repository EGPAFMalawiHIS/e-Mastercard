<template>
  <div>
    <clinic-registration v-on:addEncounter="addEncounter" ref="clinicRegistration"></clinic-registration>
    <vitals v-on:addEncounter="addEncounter" ref="vitals"></vitals>      
    <button type="button" class="btn btn-primary" @click="createEncounters">save</button>
  </div>
</template>

<script>
import vitals from '@/components/encounters/vitals.vue'
import clinicRegistration from '@/components/encounters/clinicRegistration.vue'
import ApiClient from "../../services/api_client";
import EncounterService from "../../services/encounter_service";
export default {
    data: function() {
        return {
            encounters: {},
        }
    },
    components: {
        "vitals": vitals,
        "clinic-registration": clinicRegistration
    },
    methods: {
        addEncounter(encounterData) {
            let key = Object.keys(encounterData)[0];
            this.encounters[key] = encounterData[key];
        },
        saveEncounter: async function(encounterOb) {
            let observations = [];
            Object.keys(encounterOb.obs).forEach(element => {
                observations.push(encounterOb.obs[element]);
            });
            const personId = this.$route.params.id;
            const encounter = await EncounterService.createEncounter(
                personId,
                encounterOb.encounter_id
            );
            this.successfulOperation = true;
            if (encounter.status === 201 || encounter.status === 200) {
                let encounterID = encounter.encounter_id;
                let f = {
                encounter_id: encounterID,
                observations: observations
                };
                const response = await ApiClient.post("observations", f);
                if (response.status === 201 || response.status === 200) {
                this.success = true;
                this.fail = false;
                this.postResponse = "Appointment has been set.";
                this.$router.go(0);
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
            
            let encounters = Object.keys(this.$refs);
            encounters.forEach(el => {
                this.$refs[el].saveEncounter();
            })
            // this.encounters.push(this.encounter);
            let keys = Object.keys(this.encounters);
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