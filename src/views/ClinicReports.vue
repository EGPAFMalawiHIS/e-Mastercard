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
              <div class="btn-container" @click="redirect('/appointments')">
                <div class="card">
                  <img src="../assets/report-icons/appointments.png" class="btn-icon"/>
                  <p>Clinic appointments</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/defaulters')">
                <div class="card">
                  <img src="../assets/report-icons/defaulter-list.png" class="btn-icon"/>
                  <p>Defaulter list</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/appointment_missed')">
                <div class="card">
                  <img src="../assets/report-icons/appointment-missed.png" class="btn-icon"/>
                  <p>Missed appointments</p>
                </div>
              </div>
            </div>
          
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/regimen_distribution')">
                <div class="card">
                  <img src="../assets/report-icons/regimen-give.png" class="btn-icon"/>
                  <p>Regimen dispensation</p>
                </div>
              </div>
            </div>

          </div>

          <div class="row">

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/regimen_switch')">
                <div class="card">
                  <img src="../assets/report-icons/regimen-switch.png" class="btn-icon"/>
                  <p>Regimen switch</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/regimen_formulation_pt')">
                <div class="card">
                  <img src="../assets/report-icons/medical.png" class="btn-icon"/>
                  <p>Regimens and formulation - patient level</p>
                </div>
              </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/pregnant_patients')">
                <div class="card">
                  <img src="../assets/report-icons/pregnant.png" class="btn-icon"/>
                  <p>Pregnant Patients</p>
                </div>
            </div>
            </div>

            <div class="col-sm">
              <div class="btn-container" @click="redirect('/incomplete_visits_report')">
                <div class="card">
                  <img src="../assets/report-icons/refill.png" class="btn-icon"/>
                  <p>Incomplete visits</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/client_due_for_vl')">
                <div class="card">
                  <img src="../assets/report-icons/viral_load.png" class="btn-icon"/>
                  <p>Clients due for VL</p>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/tpt_outcomes')">
                <div class="card">
                  <img src="../assets/report-icons/stats.png" class="btn-icon"/>
                  <p>TPT Outcomes</p>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic_tx_rtt')">
                <div class="card">
                  <img src="../assets/report-icons/restart.png" class="btn-icon" />
                  <p>TX RTT</p>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic_retention_report')">
                <div class="card">
                  <img src="../assets/report-icons/retention.png" class="btn-icon" />
                  <p>Retention</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic_other_outcomes')">
                <div class="card">
                  <img src="../assets/report-icons/defaulter-list.png" class="btn-icon" />
                  <p>Other Outcomes</p>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic_vl_report')">
                <div class="card">
                  <img src="../assets/report-icons/vl.png" class="btn-icon" />
                  <p>Viral Load</p>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="btn-container" @click="redirect('/clinic_lab_results_report')">
                <div class="card">
                  <img src="../assets/report-icons/lab-results.png" class="btn-icon" />
                  <p>Lab Results</p>
                </div>
              </div>
            </div>
            <div class="col-sm"></div>
          </div>
        </div>        
      </div>
    </div>

  </div>
</template>

<style scoped>

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
