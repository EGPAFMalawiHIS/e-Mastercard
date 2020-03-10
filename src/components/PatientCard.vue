<template>
  <div class="card mb-3 shadow-lg card-hover" style="width: 100%;" @click="toMastercard">
        <div class="row">
            <div class="col-md-4">
                <img :src="imageType" class="card-img rounded-circle" alt="..."  style="padding: 10%;">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" style="float: left">  {{full_name}}</h5>
                    <p class="card-text" style="float: left">{{formatted_age}}</p>
                    <p class="card-text" style="float: left">ARV Number: {{arvNumber}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props: ["patient"],

    data: function() {
        return {
            ARV_number: 1,
        }
    },
    mounted() {
    },computed: {
        full_name() {
            return ` ${this.patient['person'].names[0].given_name} ${this.patient.person.names[0].family_name} `;
        }, formatted_age() {
            return ` ${moment(this.patient.person.birthdate).format('DD-MMM-YYYY')} (${moment().diff(this.patient.person.birthdate, 'years',false)} years old)`;
        },
        imageType() {
            return this.patient.person.gender === "M" ? require("../assets/male-1.png") : require("../assets/female-2.png");
        },
        arvNumber() {
            let identifier = this.patient.patient_identifiers.filter(function(entry) { return entry.type.name === "ARV Number"; });
            return identifier.length > 0 ? identifier[0].identifier : "N/A";
        }
    }, methods: {
        toMastercard: function() {
            this.$router.push(`/patient/mastercard/${this.patient.patient_id}`);
        }
    }

}
</script>

<style>
.card-hover:hover {
    border-color: blue;
}
</style>