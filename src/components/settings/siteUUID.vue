<template>
  <div class="row">
    <div class="col">
      <label for="exampleFormControlSelect1">Site UUID</label>
    </div>
    <div class="col">
      <div class="form-group">
        <input type="text"
          class="form-control" name="uuid" id="uuid" aria-describedby="helpId" placeholder="" v-model="siteUUID">
      </div>
    </div>
    <div class="col">
      <button @click="postOutcome" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
import GlobalProperties from "@/services/global_properties";
export default {
  components: {
  },
  data: function() {
    return {
      siteUUID: null
    };
  },
  methods: {
   
    postOutcome: async function() {
      let gp = {
        property: "site_uuid",
        property_value: this.siteUUID
      };
      const response = await ApiClient.post(`/global_properties`, gp);
      if (response.status === 201 || response.status === 200) {

        sessionStorage.siteUUID = this.siteUUID;
        let toast = this.$toasted.show("Successfully saved", { 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 5000
        });
        console.log("Succesfully done");
        // this.$router.go(0);
      } else {
        console.log("Failed to update");
      }
    },
    getSiteUUID: async function() {
      const siteUUID = await GlobalProperties.getSiteUUID();
      this.siteUUID = siteUUID;
    }
  },
  mounted() {
    this.getSiteUUID();
  }
};
</script>