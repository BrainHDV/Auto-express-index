"use strict";
const form = document.querySelector(".clock__menu-form"),
  menu = document.querySelector(".clock__menu"),
  formInput = document.querySelector(".input-text"),
  errorMessage = document.querySelector(".input-error");

// Хеш с настройками циферблата
const settings = {
  clockDiameter: 0,
  clockFormat: null,
};

formInput.addEventListener("change", validateInput);
form.addEventListener("submit", submitValue);

function submitValue(e) {
  e = e || window.event;
  e.preventDefault();
  const errors = validateInput();

  if (errors === 0) {
    //  Если нет ошибок
    //  buildClockFunc script
    menu.classList.add("none");
    buildClock();
  }
}

function validateInput(e) {
  e = e || window.event;
  e.preventDefault();
  const formInputValue = formInput.value;
  const form = document.forms.menuForm;
  const formInputLabel = form.elements.format;
  const format = formInputLabel.value;
  const menuText = document.querySelector(".clock__menu-text");
  let error = 0;

  settings.clockDiameter = parseInt(formInputValue);
  settings.clockFormat = parseInt(format);
  removeError(formInput, errorMessage);

  if (formInputValue < 200) {
    addError(formInput, errorMessage);
    error++;
  }

  if (formInputValue > 800) {
    addError(formInput, errorMessage);
    error++;
  }

  if (format === "") {
    menuText.style.color = "red";
    error++;
  }

  return error;
}
