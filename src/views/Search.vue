<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <side-bar />
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <top-nav />
        <div class="container-fluid">
            	
          <input class="form-control rounded border-primary" id="myInput" type="text" placeholder="Search for a patient.." v-model="search_text"/>
          <br />
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody id="myTable">
              <tr>
                <td>{{search_text}}</td>
                <td>
                  <patient-card/>
                </td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@mail.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@greatstuff.com</td>
              </tr>
              <tr>
                <td>Anja</td>
                <td>Ravendale</td>
                <td>a_r@test.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import PatientCard from "@/components/PatientCard.vue";

export default {
  name: "home",
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
    "patient-card": PatientCard
  },
  data: function() {
      return {
          search_text : null,
      }
  }
};
</script>

<style scoped>
</style>