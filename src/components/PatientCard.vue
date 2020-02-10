<template>
  <div class="card mb-3" style="width: 100%;">
        <div class="row">
            <div class="col-md-4">
                <img :src="imageType" class="card-img rounded-circle" alt="..."  style="margin: auto;">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">  {{full_name}}</h5>
                    <p class="card-text">{{formatted_age}}</p>
                    <p class="card-text">ARV Number: {{ARV_number}}</p>
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
            return this.patient.person.gender === "M" ? require("../assets/man.png") : require("../assets/woman.png");
        }
    }

}
</script>

<style>

</style>