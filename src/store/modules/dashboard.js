const state = {
  defaulters: {
    count: -1,
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
  txCurrent: {
    count: -1,
    patients: []
  }
};

const actions = {};

const getters = {};

const mutations = {
  setDefaulters(state, patients) {
    state.defaulters.patients = patients;
    state.defaulters.count = patients.length;
  },
  setPatientsOnDtg(state, patients) {
    state.patientsOnDtg.patients = patients;
    state.patientsOnDtg.count = patients.length;
  },
  setTxCurrent(state, patients) {
    state.txCurrent.patients = patients;
    state.txCurrent.count = patients.length;
  },
  setPatientsWithMissedAppointments(state, patients) {
    state.patientsWithMissedAppointments.patients = patients;
    state.patientsWithMissedAppointments.count = patients.length;
  },
  setPatientsWithAppointmentsTomorrow(state, patients) {
    state.patientsWithAppointmentsTomorrow.patients = patients;
    state.patientsWithAppointmentsTomorrow.count = patients.length;
  }
}

export default {actions, getters, mutations, state};
