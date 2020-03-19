import ApiClient from "./api_client";
import moment from "moment";

export default class EncounterService {
  static async createEncounter(person_id, encounter_type_id, encounter_date) {
    let params = {
      patient_id: person_id,
      encounter_type_id: encounter_type_id,
      program_id: 1,
    };
    if(encounter_date !== null || encounter_date !== "") {
       params.encounter_datetime = moment(encounter_date).format('YYYY-MM-DD');
    }
    const response = await ApiClient.post("encounters", params);

    const responseBody = await response.json();

    if (response.status === 400) {
      throw `Could not create encounter: Invalid parameters provided: ${responseBody.error.message}`;
    }
    responseBody["status"] = response.status;

    return responseBody;
  }

}
