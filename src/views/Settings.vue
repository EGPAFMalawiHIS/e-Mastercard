<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
            <br>
        <div class="container-fluid">
            <site-name />            
            <br>
            <site-prefix />            
            <br>
            <site-uuid />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import siteName from "@/components/settings/siteName.vue";
import ApiClient from "../services/api_client";
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import sitePrefix from '../components/settings/sitePrefix.vue';
import siteUUID from '../components/settings/siteUUID.vue';
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "site-name": siteName,
    "site-prefix": sitePrefix,
    "site-uuid": siteUUID
  },
    data: function() {
        return {
        }
    }, methods: {
        
    }
};
</script>