<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
            <br>
        <div class="container-fluid">
		<div class="form-check">
		<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="cleaningDone">
		<label class="form-check-label" for="exampleCheck1">Cleaning done</label>
		</div>
		<div v-if="cleaningDone">

		<div class="form-group">
		<label for="exampleInputEmail1">Date cleaning done</label>
		<input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="dateDone">
		</div>
		<div class="form-group">
		<label for="exampleInputPassword1">Verified by</label>
		<input type="text" class="form-control" id="exampleInputPassword1" v-model="doneBy">
		</div>
		
		<button  class="btn btn-primary" :disabled="!(doneBy !== '' && dateDone !== null)" @click="saveVerification">Submit</button>
		</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import ApiClient from '../../services/api_client';
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
  },
    data: function() {
        return {
		cleaningDone: false,
		doneBy: "",
		dateDone: null
        }
    }, methods: {
       async saveVerification() {
         const payload = {
           "data_cleaning_datetime": this.dateDone,
           "supervisors" : [this.doneBy]
         }
         const response = await ApiClient.post('/data_cleaning_confirmation', payload);
          if (response.status === 201 || response.status === 200) {
            let toast = this.$toasted.show("Successfully saved", { 
                theme: "toasted-primary", 
                position: "top-right", 
                duration : 5000
            });
            console.log("Succesfully done");
            // this.$router.go(0);
            this.doneBy = "";
            this.dateDone = null;
            this.cleaningDone = false;
          } else {
            console.log("Failed to update");
          }
       } 
    }
};
</script>