import moment from 'moment';
import { formatGender } from '../utils/str';
import ApiClient from './api_client';
import GlobalProperties from "@/services/global_properties";

export default (() => {
  async function searchPatients({searchText, gender}) {
    const {type, value} = await parseSearchText(searchText);

    switch (type) {
      case 'name':
        return await searchPatientsByNameAndGender(value, gender);
      case 'arv_number':
        return await searchPatientsByARVNumber(value);
      default:
        throw new Error(`Failed to parse searchText: ${searchText}`);
    }
  }

  async function searchPatientsByARVNumber(arvNumber) {
    const url = `search/patients/by_identifier?type_id=4&identifier=${arvNumber}`;
    const response = await ApiClient.get(url)
    
    if (response.status !== 200) {
      throw new Error('Patient search request to API failed');
    }

    return await response.json();
  }

  async function searchPatientsByNameAndGender(fullName, gender) {
    const params = objectToRequestParams(splitName(fullName, gender));
    const response = await ApiClient.get(`search/patients?${params}`);
    
    if (response.status !== 200) {
      throw new Error('Patient search request to API failed');
    }

    return await response.json();
  }

  async function parseSearchText(nameOrArvNumber) {
    if (nameOrArvNumber.match(/^(\w+-ARV-\w+)$/)) {
      return {type: 'arv_number', value: nameOrArvNumber};
    }

    if (nameOrArvNumber.match(/^(\d+)$/)) {
      const sitePrefix = await GlobalProperties.getSitePrefix();
      return {type: 'arv_number', value: `${sitePrefix}-ARV-${nameOrArvNumber}`};
    }

    return {type: 'name', value: nameOrArvNumber};
  }

  const voidPatient = async (params = {}) => {
    return new Promise((resolve, reject) => {
      ApiClient.remove(`patients/${params.patient_id}?reason=${params.reason}`);
      resolve({ status: 200 });
    })
  }

  async function parsePatient (patientId) {
    const res = await ApiClient.get(`/patients/${patientId}`);
    if (res.status === 200) {
      const patient = await res.json();
      return {
        arvNumber: patient.patient_identifiers.find(id => id.identifier_type === 4)?.identifier || '',
        gender: formatGender(patient.person?.gender),
        birthdate: moment(patient.person?.birthdate).format("DD/MMM/YYYY"),
        address: patient.person?.addresses[0]?.city_village || ""
      };
    }
  }
  
  function objectToRequestParams(object) {
    return Object.entries(object).reduce((accum, [field, value]) => {
      if (!value || value.length === 0) {
        return accum;
      }

      return `${accum}&${field}=${encodeURIComponent(value)}`;
    }, '');
  }
  
  function splitName(name, gender) {
    let personOBJ = {};

    const tempName = name.split(" ").filter(entry => /\S/.test(entry));

    if (tempName.length > 0) {
      personOBJ.given_name = tempName[0];
      tempName[1] ? (personOBJ.family_name = tempName[1]) : null;
      if (tempName[2]) {
        personOBJ.middle_name = tempName[1];
        personOBJ.family_name = tempName[2];
      }
    }
    //var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/search/patients/by_identifier?type_id=" + identifier_type + "&identifier="  + identfier_id;
    if (gender) {
      personOBJ.gender = gender;
    }

    return personOBJ;
  }
  
  return {searchPatients, searchPatientsByARVNumber, searchPatientsByNameAndGender, voidPatient, parsePatient};
})();