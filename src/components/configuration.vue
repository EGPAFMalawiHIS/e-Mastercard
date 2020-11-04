<template>
  <div>
    <b-button v-b-modal.modal-1 pill id="config" :variant="checked ? 'outline-primary' : 'outline-secondary'"
      >Manual Configuration
    </b-button>

    <b-modal id="modal-1" title="Configure Server" xl centered ref="modal-1">
      <b-form-checkbox
        v-model="checked"
        name="check-button"
        switch
        size="lg"
        style="margin-left: 20%"
      >
        Use manual configuration
      </b-form-checkbox>

      <br />
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label-size="md"
        label="IP Address"
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          size="lg"
          v-model="ipAddress"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label-size="md"
        label="Port"
        label-for="input-lg2"
      >
        <b-form-input id="input-lg2" size="lg" v-model="port"></b-form-input>
      </b-form-group>

      <template #modal-footer="{}">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          size="lg"
          variant="success"
          @click="setConfig()"
          style="float: left"
        >
          Save
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ApiClient from "../services/api_client";
export default {
  data: function () {
    return {
      ipAddress: null,
      port: null,
    };
  },
  methods: {
    setConfig: function () {
      localStorage.setItem("ip-address", this.ipAddress);
      localStorage.setItem("port", this.port);
      ApiClient.config.source = null;
        let toast = this.$toasted.show("configuration saved", { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000});
      this.$refs["modal-1"].hide()
    },
  },
  computed: {
    checked: {
      get() {
        let f = localStorage.useLocalStorage;
        return f ? JSON.parse(f) : f;
      },
      set(val) {
        localStorage.useLocalStorage = val;
        this.$router.go(0);
      },
    },
  },
  mounted() {
    this.ipAddress = localStorage["ip-address"]
      ? localStorage["ip-address"]
      : null;
    this.port = localStorage["port"] ? localStorage["port"] : null;
  },
};
</script>

<style>
#config {
  position: fixed;
  bottom: 5px;
  right: 5px;
}
</style>