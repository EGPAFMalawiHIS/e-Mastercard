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
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ApiClient from "../services/api_client";
import { mapState, mapMutations } from 'vuex';

export default {
    methods: {
      ...mapMutations(['setLocation']),
      fetchLocationID: async function() {
        const response = await ApiClient.get("global_properties?property=current_health_center_id", {}, {});
        if (response.status === 200) {
          response.json().then((data) => this.fetchLocationName(data.current_health_center_id) );
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
      }
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
      setTimeout(() => this.fetchLocationID(), 300);
    }
};

</script>

<style>
</style>