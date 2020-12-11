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
                  <img :src="tool.icon_path" class="btn-icon" />
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
          path: "/cleaning_tools/cleaning_tool",
          name: "Cleaning Tool",
          icon_path: require("../assets/clean.png")
        },
        {
          path: "/cleaning_tools/merging",
          name: "Patient Merging",
          icon_path: require("../assets/merge.png")
        },
        {
          path: "/cleaning_tools/visit_stats",
          name: "Patient visit stats",
          icon_path: require("../assets/report-icons/line-chart.png")
        }
      ]
    };
  }
};
</script>
