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
            <div class="col" v-for="(tool, index) in tools" :key="index">
              <div class="btn-container" @click="redirect(tool.path)">
                <div class="card">
                  <img src="../assets/clean.png" class="btn-icon" />
                  <p>{{tool.name}}</p>
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
  },
  data: function() {
    return {
      tools: [
        {
          path:
            "/cleaning_tools/date_enrolled_greater_than_earliest_start_date",
          name: "Date enrolled greater than start date"
        },
        {
          path: "/cleaning_tools/encounters_after_death",
          name: "Encounters after death"
        },
        {
          path: "/cleaning_tools/enrolled_before_birth",
          name: "Enrolled before birth"
        },
        {
          path: "/cleaning_tools/incomplete_visits",
          name: "Incomplete Visits"
        },
        {
          path: "/cleaning_tools/male_with_female_obs",
          name: "Male with Female Obs"
        },
        {
          path: "/cleaning_tools/missing_start_reason",
          name: "missing start reason"
        },
        {
          path: "/cleaning_tools/multiple_start_reason",
          name: "Multiple start reasons"
        },
        {
          path: "/cleaning_tools/pre_art_and_unkown_outocme",
          name: "pre ART and unknown outcome"
        },
        {
          path: "/cleaning_tools/prescription_without_dispensation",
          name: "Prescription without dispensation"
        }
      ]
    };
  }
};
</script>
