<template>
  <div class="form-row">
   
    <div class="form-group col-md-8">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-4">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
</template>

<script>
import ApiClient from "../../services/api_client";
export default {
    data: function() {
        return {
            regimens: [],
        }
    },
    methods: {
    getlocations: async function(val) {
      await ApiClient.get(`/locations?name=` + val).then(res => {
        res.json().then(ret => {
            console.log(ret);
         });
      });
    },
    }
}
</script>

<style>

</style>