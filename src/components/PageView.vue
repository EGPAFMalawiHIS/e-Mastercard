<template>
  <div class="d-flex" id="wrapper">
    <SideBar />
    
    <div id="page-content-wrapper">
      <TopNav />
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import TopNav from "./topNav";

export default {
  name: 'PageView',
  components: {SideBar, TopNav}
}
</script>

<style scoped>
div.content {
  padding-top: 2.5%;
}

@media (min-width: 1920px) {
  div.content {
    margin: 2%;
  } 
}
</style>
