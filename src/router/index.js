import errors from './errors';
import users from './users';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  ...errors,
  ...users,
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
    path: "/regimen_distribution_weight",
    name: "Regimen Distribution by Weight",
    component: () => import("../views/RegimenDistributionWeight.vue")
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
  }
  ,{
    path: "/survival_analysis",
    name: "SurvivalAnalysis",
    component: () => import("../views/SurvivalAnalysis.vue")
  },
  {
    path: "/registration/:id/:new",
    name: "registration",
    component: () => import("../views/Registration.vue")
  },
  {
    path: "/tx_rtt",
    name: "txRTT",
    component: () => import("../views/txRTT.vue")
  },
  {
    path: "/cleaning_tools",
    name: "cleaning_tools",
    component: () => import("../views/DataCleaningTools.vue")
  },
  {
    path: "/cleaning_tools/cleaning_tool",
    name: "Date enrolled greater than start date",
    component: () => import("../views/cleaning_tools/cleaning_tool.vue")
  },   
  {
    path: "/cleaning_tools/merging",
    name: "merging",
    component: () => import("../views/cleaning_tools/Merging.vue")
  },
  {
    path: "/ipt_coverage",
    name: "IPTcoverage",
    component: () => import("../views/IPTcoverage.vue")
  },
  {
    path: "/moh_disaggregated",
    name: "MohDisaggregated",
    component: () => import("../views/MohDisaggregated.vue")
  },
  {
    path: "/moh_disaggregated_regimen",
    name: "MohDisaggregatedRegimen",
    component: () => import("../views/cohortDisaggregatedRegimen.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (['/login', '/error'].includes(to.path) || sessionStorage.apiKey) {
    return next();
  }

  return next('/login');
});

export default router;
