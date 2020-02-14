<template>
  
<div>
    <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <side-bar/>
    <!-- /#sidebar-wrapper -->
    
    <!-- Page Content -->
    <div id="page-content-wrapper">

    <top-nav/>
      <div class="container-fluid">
        <h1 class="mt-4">Simple Sidebar</h1>
        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/topNav.vue';
import Sidebar from '@/components/SideBar.vue'

export default {
  name: 'home',
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar
  }
}
</script>

<style >

</style>