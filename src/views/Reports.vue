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
        

        <div class="container" id="btn-container">
          <div class="row">
            
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/moh')">
                <div class="card">
                  <img src="../assets/mw.png" class="btn-icon"/>
                  <p>MoH reports</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic')">
                <div class="card">
                  <img src="../assets/clinic.png" class="btn-icon"/>
                  <p>Clinic reports</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/pepfar')">
                <div class="card">
                  <img src="../assets/PEPFAR.png" class="btn-icon"/>
                  <p>PEPFAR reports</p>
                </div>
              </div>
            </div>

          </div>
        </div>



        <!-- Page Content end -->
      </div>
    </div>

  </div>
</template>

<style scope>

#btn-container {
  margin-top: 10px;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  text-align: center;
  cursor: pointer;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.btn-container {
  padding: 2px 16px;
  width: 230px;
}

.btn-icon {
  width: 100px;
  height: 100px;
  padding-top: 12px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.card p {
  font-weight: bold;
}

</style>




<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";

export default {
  name: "reports",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar
  }, methods: {
    redirect: function(url) {
      this.$router.push(url);
    }
  }
  
}



</script>
