import ApiClient from "./api_client";
import HisDate from "./date_utils";
import { parameterizeObjToString } from '../utils/str';

export const AGE_GROUPS = [
  "<1 year",
  "1-4 years",
  "5-9 years",
  "10-14 years",
  "15-19 years",
  "20-24 years",
  "25-29 years",
  "30-34 years",
  "35-39 years",
  "40-44 years",
  "45-49 years",
  "50-54 years",
  "55-59 years",
  "60-64 years",
  "65-69 years",
  "70-74 years",
  "75-79 years",
  "80-84 years",
  "85-89 years",
  "90 plus years",
];

export const GENDERS = ["F", "M"];

export default class ReportService {
  constructor() {
    this.date = HisDate.isoDate();
    this.startDate = '';
    this.endDate = '';
    this.quarter = '';
    this.programID = 1;
    this.isPepfar = false;
  }

  getDateIntervalPeriod() {
    return `${HisDate.localDate(this.startDate)} - ${HisDate.localDate(this.endDate)}`;
  }

  setStartDate(date) {
    this.startDate = date;
  }

  setEndDate(date) {
    this.endDate = date;
  }

  setQuarter(quarter) {
    this.quarter = quarter;
  }

  getReport(url, params = {}) {
    return ApiClient
      .get(`${url}?${this.buildRequestParams(params)}`)
      .then(res => res.json())
      .catch(e => console.log(e))
  } 

  buildRequestParams(params = {}) {
    const payload = { date: this.date, program_id: this.programID };
    if (this.startDate && this.endDate) {
      payload["start_date"] = this.startDate;
      payload["end_date"] = this.endDate;
    }
    if (this.quarter) {
      payload["quarter"] = this.quarter;
    }
    return parameterizeObjToString({ ...payload, ...params });
  }

  getMaternalStatus(patientIds) {
    const params = { report_definition: 'pepfar' }
    const data = { 'patient_ids': patientIds }
    return ApiClient.post(`${'/vl_maternal_status'}?${this.buildRequestParams(params)}`, data)
  }

  async getTbPrevReport() {
    return this.getReport('/programs/1/reports/tb_prev2')
  }
}
