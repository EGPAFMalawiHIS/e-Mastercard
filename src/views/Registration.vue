<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
        <div class="container-fluid">
          <Registration style="margin-top:10px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import Registration from "@/components/encounters/Registration.vue";

export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    Registration
  }
};
</script>
