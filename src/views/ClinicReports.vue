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
                  <p>Regimen distribution</p>
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
