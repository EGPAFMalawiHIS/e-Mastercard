import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import Store from "@/store";

Vue.use(VueRouter);

function authSuperuser(to, from, next) {
    if (Store.getters.userIs('Superuser')) {
      next();
      return;
    }

    next('/');
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: "/patient/mastercard/:id",
    name: "patient_mastercard",
    component: () => import("../views/Mastercard.vue")
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/Reports.vue")
  },
  {
    path: "/moh",
    name: "moh_reports",
    component: () => import("../views/MoHreports.vue")
  },
  {
    path: "/cohort",
    name: "cohort",
    component: () => import("../views/Cohort.vue")
  },
  {
    path: "/pepfar_disaggregated",
    name: "pepfar_disaggregated",
    component: () => import("../views/PepfarDisaggregated.vue")
  },
  {
    path: "/pepfar",
    name: "pepfar",
    component: () => import("../views/PepfarReports.vue")
  },
  {
    path: "/moh_art_disaggregated",
    name: "moh_art_disaggregated",
    component: () => import("../views/MohDisaggregated.vue")
  },
  {
    path: "/drill_down/:indicator/:id",
    name: "cohort_driller",
    component: () => import("../views/CohortDriller.vue")
  },
  {
    path: "/art_refill_periods",
    name: "art_refill_periods",
    component: () => import("../views/ArtRefillPeriods.vue")
  },
  {
    path: "/patient_registration",
    name: "patient_registration",
    component: () => import("../views/PatientRegistration.vue")
  },
  {
    path: "/clinic",
    name: "clinic",
    component: () => import("../views/ClinicReports.vue")
  },
  {
    path: "/appointments",
    name: "clinicAppointments",
    component: () => import("../views/ClinicAppointments.vue")
  },
  {
    path: "/defaulters",
    name: "defaulltersList",
    component: () => import("../views/DefaulterList.vue")
  },
  {
    path: "/appointment_missed",
    name: "AppointmentMissed",
    component: () => import("../views/AppointmentMissed.vue")
  },
  {
    path: "/regimen_distribution",
    name: "RegimenDistribution",
    component: () => import("../views/RegimenDistribution.vue")
  },
  {
    path: "/regimen_switch",
    name: "RegimenSwitch",
    component: () => import("../views/RegimenSwitch.vue")
  },
  {
    path: "/pepfar_defaulter_list",
    name: "PepfarDefaulterList",
    component: () => import("../views/PepfarDefaulterList.vue")
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Registration.vue")
  },
  {
    path: "/tx_ml",
    name: "txML",
    component: () => import("../views/txML.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue")
  },
  {
    path: "/users",
    name: "ListUsers",
    component: () => import("../views/Users/list.vue"),
    beforeEnter: authSuperuser,
  },
  {
    path: "/users/create",
    name: "CreateUser",
    component: () => import("../views/Users/create.vue"),
    beforeEnter: authSuperuser
  },
  {
    path: "/users/edit/:userId",
    name: "EditUser",
    component: () => import("../views/Users/edit.vue"),
    beforeEnter: authSuperuser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
