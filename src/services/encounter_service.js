import ApiClient from "./api_client";

export default class EncounterService {
  static async createEncounter(person_id, encounter_type_id) {

    const response = await ApiClient.post("encounters", {
      patient_id: person_id,
      encounter_type_id: encounter_type_id,
      program_id: 1,
    });

    const responseBody = await response.json();

    if (response.status === 400) {
      throw `Could not create encounter: Invalid parameters provided: ${responseBody.error.message}`;
    }
    responseBody["status"] = response.status;

    return responseBody;
  }

}
