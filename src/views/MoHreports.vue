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
              <div class="btn-container" @click="redirect('/cohort')">
                <div class="card">
                  <img src="../assets/report-icons/cohort.png" class="btn-icon"/>
                  <p>Cohort</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/moh_disaggregated')">
                <div class="card">
                  <img src="../assets/report-icons/split.png" class="btn-icon"/>
                  <p>Cohort Disagreggated</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/survival_analysis')">
                <div class="card">
                  <img src="../assets/report-icons/refill.png" class="btn-icon"/>
                  <p>Survival analysis</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container">
                <div class="card">
                  <img src="../assets/report-icons/vl.png" class="btn-icon"/>
                  <p>Viral load</p>
                </div>
              </div>
            </div>
          
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/ipt_coverage')">
                <div class="card">
                  <img src="../assets/report-icons/ipt-coverage.png" class="btn-icon"/>
                  <p>IPT (coverage)</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/moh_disaggregated_regimen')">
                <div class="card">
                  <img src="../assets/report-icons/distribution.png" class="btn-icon"/>
                  <p>Regimen distribution</p>
                </div>
              </div>
            </div>

             <div class="col-sm">
              <div class="btn-container" @click="redirect('/moh_disaggregated_regimen')">
                <div class="card">
                  <img src="../assets/report-icons/distribution.png" class="btn-icon"/>
                  <p>Regimen distribution, Weight</p>
                </div>
              </div>
            </div>           

            <div class="col-sm">
              <!--div class="btn-container" @click="redirect">
                <div class="card">
                  <img src="../assets/report-icons/cohort.png" class="btn-icon"/>
                  <p>IPT (usage)</p>
                </div>
              </div-->
            </div>


          </div>

          <div class="row">

            <div class="col-sm">
              <!--div class="btn-container" @click="redirect">
                <div class="card">
                  <img src="../assets/report-icons/cohort.png" class="btn-icon"/>
                  <p>IPT (usage)</p>
                </div>
              </div-->
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
  width: 250px;
  height: 150px;
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
  }, methods: {
    redirect: function (url) {
      this.$router.push(url);
    }
  }
}



</script>
