<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
        <div class="container-fluid mt-5">
          <site-name class="mb-4" />       
          <site-prefix class="mb-4" />  
          <site-uuid class="mb-4" />
          <general-preference label="Is military site?" :property="Properties.MILITARY_SITE" /> 
          <!-- <div class="row">
            <div class="col-10 offset-1 my-5">
              <h3 class="text-left">General Preferences:</h3>  
                         
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import siteName from "@/components/settings/siteName.vue";
import sitePrefix from '../components/settings/sitePrefix.vue';
import siteUUID from '../components/settings/siteUUID.vue';
import GeneralPreference from '../components/settings/GeneralPreference.vue.vue';
import { Properties } from "../services/global_properties";

export default {
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "site-name": siteName,
    "site-prefix": sitePrefix,
    "site-uuid": siteUUID,
    GeneralPreference,
  },
  data: () => ({
    Properties
  })
};
</script>