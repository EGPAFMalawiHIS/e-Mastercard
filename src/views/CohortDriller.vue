<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <!-- Page Content -->
        

        <div class="cohort">

        </div>



        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>


<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue"

export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar
  }


}

</script>