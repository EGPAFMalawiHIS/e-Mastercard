<template>
  <div class="d-flex" id="wrapper">
      <side-bar />
      <div id="page-content-wrapper">
         <top-nav />
        <!-- Page Content -->
        <div id="main-container" class="col-12 table-col">
          <div class="row">
          <!-- <span>{{report_title}}<button @click="$router.go(-1)" class="btn btn-primary">Back</button></span>   -->
           <sdPicker ></sdPicker>
          </div>
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
        </div>
        <!-- Page Content end -->
    </div>
  </div>
    
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'
import ApiClient from "../services/api_client";
import TopNav from "@/components/topNav.vue";
import Sidebar from "@/components/SideBar.vue";
import moment from 'moment';
import StartAndEndDatePicker from "@/components/StartAndEndDatePicker.vue";

export default {
    name: 'App',
    data: function() {
        return {
          report_title: 'Appointment missed ',
        reportData: null,
        dTable: null,
        formatedData: [],
            rows: [{
                    "id": 1,
                    "name": {
                        "first_name": "Vladimir",
                        "last_name": "Nitzsche"
                    },
                    "address": {
                        "country": "Mayotte"
                    },
                    "email": "franecki.anastasia@gmail.com",
                },
                {
                    "id": 2,
                    "name": {
                        "first_name": "Irwin",
                        "last_name": "Bayer"
                    },
                    "age": 23,
                    "address": {
                        "country": "Guernsey"
                    },
                    "email": "rlittle@macejkovic.biz",
                },
                {
                    "id": 3,
                    "name": {
                        "first_name": "Don",
                        "last_name": "Herman"
                    },
                    "address": {
                        "country": "Papua New Guinea"
                    },
                    "email": "delia.becker@cormier.com",
                }],
            columns: [{
                    label: "id",
                    name: "id",
                    filter: {
                        type: "simple",
                        placeholder: "id"
                    },
                    sort: true,
                },
                {
                    label: "First Name",
                    name: "name.first_name",
                    filter: {
                        type: "simple",
                        placeholder: "Enter first name"
                    },
                    sort: true,
                },
                {
                    label: "Email",
                    name: "email",
                    sort: true,
                },
                {
                    label: "Country",
                    name: "address.country",
                    filter: {
                        type: "simple",
                        placeholder: "Enter country"
                    },
                }],
            config: {
                checkbox_rows: true,
                rows_selectable: true,
                card_title: "Report"
            }
        }
    },
    components: {
        VueBootstrap4Table,
        "top-nav": TopNav,
    "side-bar": Sidebar,
    "sdPicker": StartAndEndDatePicker
    }
}
</script>