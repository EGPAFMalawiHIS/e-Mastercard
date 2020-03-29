<template>
  <div class="row">
    <div class="col">
      <label for="exampleFormControlSelect1">Site Prefix</label>
    </div>
    <div class="col">
      <div class="form-group">
        <input type="text"
          class="form-control" name="" id="" aria-describedby="helpId" placeholder="" v-model="sitePrefix">
      </div>
    </div>
    <div class="col">
      <button @click="postOutcome" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
export default {
  components: {
  },
  data: function() {
    return {
      sitePrefix: null
    };
  },
  methods: {
   
    postOutcome: async function() {
      let gp = {
        property: "site_prefix",
        property_value: this.sitePrefix
      };
      const response = await ApiClient.post(`/global_properties`, gp);
      if (response.status === 201 || response.status === 200) {
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
    }
  }
};
</script>