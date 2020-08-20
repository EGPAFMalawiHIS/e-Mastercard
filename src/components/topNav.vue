<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <!-- <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button> -->

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item active" style="float: left; left: 0px; position: absolute;">
          <a class="nav-link" href="#">{{location.name}}</a>
        </li>
        <!--li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li> -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{username}}</a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/settings">Settings</a>
            <a class="dropdown-item" href="/login">Logout</a>
            <b-button class="dropdown-item" v-b-modal.modal-center>About</b-button>
          </div>
        </li>
      </ul>
    </div>
    <b-modal id="modal-center" centered title="Application Information" ok-only="">
     <p class="">e-Mastercard version: {{appVersion()}}</p>
      <br>
     <p class="">API version: {{APIVersion}}</p>
     </b-modal>
  </nav>
</template>

<script>
import ApiClient from "@/services/api_client";
import EventBus from "@/services/event-bus.js";
import { mapState, mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      APIVersion: null,
    }
  },
    methods: {
      ...mapMutations(['setLocation']),
      fetchLocationID: async function() {
        const response = await ApiClient.get("global_properties?property=current_health_center_id", {}, {});
        if (response.status === 200) {
          response.json().then((data) => this.fetchLocationName(data.current_health_center_id) );
        }
      },
      async fetchAPIVersion() {
        const response = await ApiClient.get("version", {}, {});
        if (response.status === 200) {
          response.json().then((data) =>  {
            this.APIVersion = data["System version"];
            sessionStorage.EMCVersion = data["System version"]; 
            });
        }
      },
      async fetchLocationName(location_id) {
        const response = await ApiClient.get("locations/" + location_id, {}, {});
        if (response.status === 200) {
          response.json().then((data) => this.createSessionLocationName(data) );
          //this.setLocation(await response.json());
        }
      },
      createSessionLocationName(data){
        this.setLocation(data);
        sessionStorage.location = data.name;
        sessionStorage.location_name = data.name;
      },
      appVersion() {
        let applicationVersion  = ApiClient.config.version || '2.0-dev';
        sessionStorage.APIVersion = applicationVersion;
      return applicationVersion;
     },
    },
    computed: {
        ...mapState(['location']),
        username() {
            return (this.$store.user ? this.$store.user.username : sessionStorage.username);  
        }
    }, mounted() {
      if (!sessionStorage.apiKey) {
        this.$router.push('/login');
      } 
      EventBus.$on('change-location', payload => {
        this.fetchLocationID();
      });
      this.fetchAPIVersion();
      setTimeout(() => this.fetchLocationID(), 300);
    }
};

</script>

<style>
</style>