<template>
    <div class="row">
        <div class="col">
            <b-form-datepicker   v-model="visit_date" :disabled="isEnrolled" ></b-form-datepicker>
        </div>
        <div class="col">
            <button class="btn btn-success" @click="enroll" :disabled="isEnrolled">
                Enroll in program
            </button>
        </div>
        <div class="col">
            <button class="btn btn-danger" @click="voidProgram" :disabled="patient_programs.length === 0"> 
                Void program
            </button>
        </div>
    </div>
</template>

<script>
import ApiClient from "../services/api_client";
export default {
data: function(){
    return {
        visit_date: null,
        patient_programs: []
    }
},
methods: {
    voidProgram: async function(id, index) {
      let patient_program_id = this.patient_programs.filter( l => {return l.program.name === "HIV PROGRAM"})[0].patient_program_id;
      let url = `/patient_programs/${patient_program_id}?reason='duplicate / system error'`;
      const response = await ApiClient.remove(url);
          if (response.status === 201 || response.status === 204) {
                  let toast = this.$toasted.show("Program voided", { 
                  theme: "toasted-primary", 
                  position: "top-right", 
                  duration : 2000
                });
                this.$root.$emit('bv::hide::modal', 'outcome-modal', '#btnShow')
          } else {
            console.log(response.status);
            console.log('Failed to update')
          }
    },
    enroll: async function() {
        if(!this.visit_date) {
            let toasted = this.$toasted.show("No date selected", { 
                  theme: "toasted-primary", 
                  position: "top-right", 
                  duration : 2000
                });
        }else {

        
        let programs = {
            program_id: 1,
            date_enrolled: this.visit_date
        }
          let patientID = this.$route.params.id;
          const response = await ApiClient.post(`/patients/${patientID}/programs`, programs);
          if (response.status === 201 || response.status === 200) {
                  let toast = this.$toasted.show("Patient Enrolled", { 
                  theme: "toasted-primary", 
                  position: "top-right", 
                  duration : 2000
                });
                this.$root.$emit('bv::hide::modal', 'outcome-modal', '#btnShow')
          } else if(response.status === 409){
              let toast = this.$toasted.show("Patient already enrolled in program", { 
                  theme: "toasted-primary", 
                  position: "top-right", 
                  duration : 2000
                });
          }else {
              console.log('Failed to update')
          }
        }
    },
    getPrograms: async function() {
        this.patient_programs = [];
        let context = this;
        await ApiClient.get(`/patients/${this.$route.params.id}/programs`).then(res => {
            res.json().then(ret => {
                context.patient_programs =ret;
            })
        })
    }
},
mounted() {
    this.getPrograms();
},
computed: {
    isEnrolled() {
        return this.patient_programs.filter( l => {return l.program.name === "HIV PROGRAM"}).length > 0 ? true : false  
    }
}
}

</script>

<style>

</style>