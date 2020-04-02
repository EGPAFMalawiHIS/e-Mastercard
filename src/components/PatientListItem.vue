<template>
  <div class="card mb-2 shadow-lg card-hover" :class="selected && 'card-selected'" style="width: 100%;" @click="triggerOnClick">
        <div class="row">
            <div class="col-md-3" style="margin: auto">
                <img :src="imageType" class="card-img rounded-circle" alt="avatar">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" style="text-align: left">{{fullName}} - {{arvNumber}}</h5>
                    <table class="table patient-details">
                        <tbody>
                            <tr><td>DoB:</td><td>{{formattedAge}}</td></tr>
                            <tr><td>Phone #:</td><td>{{ phoneNumber }}</td></tr>
                            <tr><td>Address:</td><td>{{ address }}</td></tr>
                            <tr><td>Visits:</td><td>{{ visitsCount }}</td></tr>
                        </tbody>
                    </table>
                    <!-- <router-link :to="{name: 'patient_mastercard', id: patient.patient_id}">See more</router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

import ApiClient from "@/services/api_client";
import PersonService from "@/services/person_service";


export default {
    props: ["patient", "selected"],
    created() {
        ApiClient.get(`patients/${this.patient.patient_id}/visits`)
                 .then(response => response.json())
                 .then(visits => this.visits = visits);
    },
    data() {
        return {
            visits: []
        }
    },
    computed: {
        fullName() {
            const {given_name, family_name} = this.patient.person.names[0];

            return ` ${given_name} ${family_name}`;
        },
        formattedAge() {
            return `${moment(this.patient.person.birthdate).format('DD-MMM-YYYY')} (${moment().diff(this.patient.person.birthdate, 'years',false)} years old)`;
        },
        imageType() {
            return this.patient.person.gender === "M" ? require("../assets/male-1.png") : require("../assets/female-2.png");
        },
        arvNumber() {
            let identifier = this.patient.patient_identifiers.filter(function(entry) { return entry.type.name === "ARV Number"; });
            return identifier.length > 0 ? identifier[0].identifier : "N/A";
        },
        address() {
            return PersonService.getPersonAttribute(this.patient.person, PersonService.ATTR_LANDMARK) || 'Unknown';
        },
        phoneNumber() {
            return PersonService.getPersonAttribute(this.patient.person, PersonService.ATTR_CELLPHONE_NUMBER) || 'Unknown';
        },
        visitsCount() {
            return this.visits.length;
        }
    },
    methods: {
        triggerOnClick() {
            this.$emit('on-click', this.patient.patient_id);
        }
    }

}
</script>

<style scoped>
.card h5 {
    font-size: 12pt;
    font-weight: bold;
}

.card p {
    font-size: 9pt;
}

.card > h5, .card p {
    text-align: left;
}

.card-hover:hover {
    border-color: blue;
}

.card-body {
    padding-left: 0;
    padding-right: 0;
}

.card-selected {
    border: 2px solid blue;
}

.patient-details td {
    font-size: 10pt;
    text-align: left;
    padding: .3rem 0 .3rem 0;
}
</style>