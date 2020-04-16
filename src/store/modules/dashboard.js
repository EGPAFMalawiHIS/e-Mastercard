const state = {
  defaulters: {
    count: -1,
    lastUpdated: null,
    patients: []
  },
  lipo: {
    count: -1,
    patients: []
  },
  patientsDueForViralLoad: {
    count: -1,
    patients: []
  },
  patientsOnDtg: {
    count: -1,
    patients: [],  // List of patients under this category
  },
  patientsWithAppointmentsTomorrow: {
    count: -1,
    patients: []
  },
  patientsWithMissedAppointments: {
    count: -1,
    patients: []
  },
  txCurrent30: {
    count: -1,
    patients: []
  },
  txCurrent60: {
    count: -1,
    patients: []
  },
  completeAndIncompleteVisits: null
};

const actions = {};

const getters = {};

const mutations = {
  setDefaulters(state, patients) {
    state.defaulters.patients = patients;
    state.defaulters.count = patients.length;
    state.defaulters.lastUpdated = new Date();
  },
  setPatientsOnDtg(state, patients) {
    state.patientsOnDtg.patients = patients;
    state.patientsOnDtg.count = patients.length;
  },
  setTxCurrent30(state, patients) {
    state.txCurrent30.patients = patients;
    state.txCurrent30.count = patients.length;
  },
  setTxCurrent60(state, patients) {
    state.txCurrent60.patients = patients;
    state.txCurrent60.count = patients.length;
  },
  setPatientsDueForViralLoad(state, patients) {
    state.patientsDueForViralLoad.patients = patients;
    state.patientsDueForViralLoad.count = patients.length;
  },
  setPatientsWithMissedAppointments(state, patients) {
    state.patientsWithMissedAppointments.patients = patients;
    state.patientsWithMissedAppointments.count = patients.length;
  },
  setPatientsWithAppointmentsTomorrow(state, patients) {
    state.patientsWithAppointmentsTomorrow.patients = patients;
    state.patientsWithAppointmentsTomorrow.count = patients.length;
  },
  setCompleteAndIncompleteVisits(state, visits) {
    state.completeAndIncompleteVisits = visits;
  }
}

export default {actions, getters, mutations, state};
