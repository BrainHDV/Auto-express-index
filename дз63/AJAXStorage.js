"use strict";
let updatePassword;
const stringName = "RUD_TEST_INFO";
const ajaxHandleScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

window.addEventListener("load", readInfo);

class AJAXStorage {
  constructor() {
    this.storage = {};
  }

  addValue(key, value) {
    this.storage[key] = value;
    getLockInfo();
  }

  getValue(key) {
    if (key in this.storage) {
      return this.storage[key];
    }
  }

  deleteValue(key) {
    if (key in this.storage) {
      delete this.storage[key];
      getLockInfo();
      return true;
    } else {
      return false;
    }
  }

  getKeys() {
    return Object.keys(this.storage);
  }
}

const drinkStorage = new AJAXStorage();

function readInfo() {
  $.ajax({
    url: ajaxHandleScript,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      f: "READ",
      n: stringName,
    },
    success: readReady,
    error: errorHandler,
    complete: complete,
  });
}

function complete() {
  document.querySelector(".loading").style.display = "none";
}

function readReady(data) {
  if (data.error != undefined) alert(data.error);
  else if (data.result != "") {
    drinkStorage.storage = JSON.parse(data.result);
  }
}

function getLockInfo() {
  updatePassword = Math.random();

  $.ajax({
    url: ajaxHandleScript,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      f: "LOCKGET",
      n: stringName,
      p: updatePassword,
    },
    success: updateData,
    error: errorHandler,
  });
}

function updateData(data) {
  document.querySelector(".loading").style.display = "block";
  if (data.error != undefined) alert(data.error);

  $.ajax({
    url: ajaxHandleScript,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      f: "UPDATE",
      n: stringName,
      v: JSON.stringify(drinkStorage.storage),
      p: updatePassword,
    },
    success: updateReady,
    error: errorHandler,
    complete: complete,
  });
}

function updateReady(callresult) {
  if (callresult.error != undefined) alert(callresult.error);
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + " " + errorStr);
}
