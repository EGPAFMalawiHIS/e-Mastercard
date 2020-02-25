<template>
    <table class="table table-dark">
        <thead>
            <tr>
                <th>Visit Date</th>
                <th>Given To</th>
                <th>Weight </th>
                <th>Height </th>
                <th>Side Effects</th>
                <th>ART Regimen</th>
                <th>Next Appointment</th>
                <th>Outcome</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(visit, index) in visits" :key="index">
                <td scope="row">{{visit.visitDate}}</td>
                <td>{{visit.givenTo}}</td>
                <td>{{visit.weight}}</td>
                <td>{{visit.height}}</td>
                <td>{{visit.sideEffects}}</td>
                <td>{{visit.ARTRegimen}}</td>
                <td>{{visit.nextAppointment}}</td>
                <td>{{visit.outcome}}</td>
            </tr>
            <tr>
                <td scope="row"></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>    
</template>

<script>
import ApiClient from "../services/api_client";
export default {
    data: function() {
        return {
            visitMock: 
             {
                weight: "100", 
                height: "150", 
                sideEffects: "N/A",
                ARTRegimen: "5A",
                givenTo: "Patient",
                nextAppointment: "25/AUG/2020",
                outcome: "Died"

             },
            visits: [
            ],
        obs: [
        {
          conceptID: 5089,
          variableName: "weight",
          valueType: "value_numeric",
          secondType: "value_text"
        },
        {
          conceptID: 5090,
          variableName: "height",
          valueType: "value_numeric",
          secondType: "value_text"
        }
      ]
        }
    }, methods: {
        getVisits: async function(){
            await ApiClient.get(`/patients/${this.$route.params.id}/visits`)
            .then(res=> {
                res.json().then(ret => {
                    ret.forEach(element => {
                       this.visits.push({
                           ...this.visitMock,
                           visitDate: element
                       }) 
                    });
                });
            })
        }
    }, mounted() {
        this.getVisits();
    }
}
</script>

<style>

</style>