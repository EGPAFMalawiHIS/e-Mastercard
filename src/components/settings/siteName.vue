<template>
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
</template>

<script>
import TopNav from "@/components/topNav.vue";
import ApiClient from "../../services/api_client";
import EventBus from "@/services/event-bus.js";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
export default {
  components: {
    "v-select": VueSelect
  },
  data: function() {
    return {
      locations: [],
      location: null
    };
  },
  methods: {
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
    },
    getVal(val) {
      this.location = val.location_id;
    },
    postOutcome: async function() {
      let gp = {
        property: "current_health_center_id",
        property_value: this.location
      };
      const response = await ApiClient.post(`/global_properties`, gp);
      if (response.status === 201 || response.status === 200) {
      EventBus.$emit('change-location', null);
        let toast = this.$toasted.show("Successfully saved", { 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 5000
        });
        // this.$router.go(0);
      } else {
        console.log("Failed to update");
      }
    }
  }, 
  mounted() {
    this.getlocations(sessionStorage.location_name);
  }
};
</script>