import { isEmptyObject } from "jquery";
import moment from 'moment';
import { sanitize } from "./str";

export function toCsvString(columns, rows, footer = {}) {
  let str = columns.filter((c) => c.exportable !== false)
    .map((c) => c.label)
    .join(",");

  str += "\n";
  str += rows.map((r) => columns
    .filter((c) => c.exportable !== false)
    .map((c) => Array.isArray(r[c.name]) 
      ? r[c.name].length
      : sanitize(r[c.name]) 
    )
    .join(",")
  ).join("\n");

  str += "\n" + `Date Created:  ${moment().format("YYYY-MM-DD:h:m:s")}`;
  if (!isEmptyObject(footer)) {
    str += "\n" + `Quarter: ${footer.startDate} to ${footer.endDate}`;
  }
  str += "\n" + `e-Mastercard Version : ${sessionStorage.EMCVersion}`;
  str += "\n" + `API Version ${sessionStorage.APIVersion}`;
  str += "\n" + `Site UUID: ${sessionStorage.siteUUID}`;

  // for (let i = 0; i < 34; i++) {
  //   str += ",";
  // }
  return str;
}

export function exportToCSV(columns, rows, filename, footer = {}) {
  const csvString = toCsvString(columns, rows, footer);
  var csvData = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  //IE11 & Edge
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(csvData, filename);
  } else {
    //In FF link must be added to DOM to be clicked
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvData);
    link.setAttribute("download", `${sessionStorage.location_name} ${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
