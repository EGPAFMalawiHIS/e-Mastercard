<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
            <br>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    
                    <label for="exampleFormControlSelect1">Site Name</label>
                </div>
                <div class="col">
                    
            <v-select :options="locations" @search="getlocations" @input="getVal"></v-select>
                </div>
                <div class="col">
                    
            <button @click="postOutcome" class="btn btn-primary">Submit</button>
                </div>
            </div>
        <div>
            
            <div class="form-group">
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import ApiClient from "../services/api_client";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "v-select": VueSelect,
  },
    data: function() {
        return {
            locations: [],
            location: null,
        }
    }, methods: {
        getlocations: async function(val) {
        this.locations = [];
        await ApiClient.get(`/locations?name=` + val).then(res => {
            res.json().then(ret => {
            let loc = ret.forEach(element => {
                this.locations.push({
                label: element.name,
                code: element.name,
                location_id: element.location_id
                });
            });
            });
        });
    },getVal(val) {
        this.location = val.location_id;
    },
    postOutcome: async function() {
        console.log(this.location);
         let gp = {
                property: 'current_health_center_id', 
                property_value: this.location
        };
          const response = await ApiClient.post(`/global_properties`, gp);
          if (response.status === 201 || response.status === 200) {
              console.log('Succesfully done')
              this.$router.go(0);
          } else {
              console.log('Failed to update')
          }
        }
    }
};
</script>