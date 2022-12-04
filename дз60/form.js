"use strict";

let formA = document.forms["formA"];
let formB = document.forms["formB"];

const links = [
  "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json",
  "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json",
];

const dataArr = [];
const formsArr = [formA, formB];

for (let i = 0; i < links.length; i++) {
  const link = links[i];

  loadData(link);
}

function loadData(url) {
  $.ajax(url, {
    type: "GET",
    dataType: "json",
    async: false,
    success: dataLoaded,
    error: errorHandler,
  });
}

function dataLoaded(data) {
  dataArr.push(data);
  if (dataArr.length === links.length) {
    for (let i = 0; i < dataArr.length; i++) {
      formFunc(dataArr[i], formsArr[i]);
    }
  }
}

function errorHandler(jqXHR, statusStr, errorStr) {
  console.error(statusStr + " " + errorStr);
}
