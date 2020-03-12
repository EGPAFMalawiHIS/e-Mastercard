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
              <div class="btn-container" @click="redirect('/pepfar_disaggregated')">
                <div class="card">
                  <img src="../assets/report-icons/split.png" class="btn-icon" />
                  <p>PEPFAR Disagreggated Report</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/pepfar_defaulter_list')">
                <div class="card">
                  <img src="../assets/report-icons/defaulter-list.png" class="btn-icon" />
                  <p>Defaulter list</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/art_refill_periods')">
                <div class="card">
                  <img src="../assets/report-icons/px.png" class="btn-icon" />
                  <p>TX CURR MMD</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/tx_ml')">
                <div class="card">
                  <img src="../assets/report-icons/tx-ml.png" class="btn-icon" />
                  <p>TX ML</p>
                </div>
              </div>
            </div>

            
          </div>
          
          <div class="row">

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/tx_rtt')">
                <div class="card">
                  <img src="../assets/report-icons/restart.png" class="btn-icon" />
                  <p>TX RTT</p>
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  text-align: center;
  cursor: pointer;
  width: 250px;
  height: 150px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
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

.row {
  padding-bottom: 20px;
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
  },
  methods: {
    redirect: function(url) {
      this.$router.push(url);
    }
  }
};
</script>
