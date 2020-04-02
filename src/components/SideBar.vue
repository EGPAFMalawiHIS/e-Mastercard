<template>
  <div class="border-right side-bar" id="sidebar-wrapper" style="text-align:left">
      <div class="sidebar-heading">e-Mastercard </div>
      <div class="list-group list-group-flush">
        <a href="/" class="side-list list-group-item list-group-item-action ">Dashboard</a>
        <a href="/search" class="side-list list-group-item list-group-item-action ">Search / Create client</a>
        <a href="/reports" class="side-list list-group-item list-group-item-action ">Reports</a>
        <a href="/cleaning_tools" class="side-list list-group-item list-group-item-action ">Data cleaning tools</a>
        <a v-if="this.$store.getters.userIs('Superuser')" href="/users" class="side-list list-group-item list-group-item-action">users</a>
        
        <!-- <a href="#" class="side-list list-group-item list-group-item-action ">Overview</a>
        <a href="#" class="side-list list-group-item list-group-item-action ">Events</a>
        <a href="#" class="side-list list-group-item list-group-item-action ">Profile</a>
        <a href="#" class="side-list list-group-item list-group-item-action ">Status</a> -->
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.side-bar {
    background-color: #43425D;
  }
  .sidebar-heading {
    background-color: #3B3B53;
    color: aliceblue;
  }
  .side-list {
    background-color: #43425D !important;
    color: white !important;
  }
  #sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}
#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
@media print {
  .side-bar {
    display: none;
  }
} 
@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
