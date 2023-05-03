<template>
  <div>
    <Loader :loading="loading"></Loader>
    <div class="row my-4" style="font-size: 20px;">
      <div class="col">
        <label for="exampleFormControlSelect1">{{ label }}</label>
      </div>
      <div class="col">
        <fieldset>
          <div class="form-check form-check-inline mx-4">
            <input
              class="form-check-input"
              type="radio"
              value="true"
              v-model="propertyValue"
            />
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="false"
              v-model="propertyValue"
            />
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
        </fieldset>
      </div>
      <div class="col">
        <button @click="updateProperty" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalPropertiesService from "@/services/global_properties";
import Loader from "@/components/Loader";

export default {
  data: function() {
    return {
      propertyValue: null,
      loading: false,
    };
  },
  props: ["label", "property"],
  components: { Loader },
  methods: {
    async updateProperty() {
      this.loading = true;
      await GlobalPropertiesService.setProp(this.property, `${this.propertyValue}`)
      this.loading = false;
    }
  },
  async mounted() {
    this.propertyValue =(await GlobalPropertiesService.getProp(this.property))[this.property];
  }
};
</script>