<template>
  <div>
    <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
        <top-nav />
            <br>
        <div class="container-fluid">
		<div class="form-check">
		<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="cleaningDone">
		<label class="form-check-label" for="exampleCheck1">Cleaning done</label>
		</div>
		<div v-if="cleaningDone">

		<div class="form-group">
		<label for="exampleInputEmail1">Date cleaning done</label>
		<input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="dateDone">
		</div>
		<div class="form-group">
		<label for="exampleInputPassword1">Verified by</label>
		<input type="text" class="form-control" id="exampleInputPassword1" v-model="doneBy">
		</div>
		
		<button type="submit" class="btn btn-primary" :disabled="!(doneBy !== '' && dateDone !== null)">Submit</button>
		</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import siteName from "@/components/settings/siteName.vue";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": Sidebar,
  },
    data: function() {
        return {
		cleaningDone: false,
		doneBy: "",
		dateDone: null
        }
    }, methods: {
        
    }
};
</script>