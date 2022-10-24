function addZero(num) {
  return num < 10 ? "0" + num : num;
}

function addError(elem, selector) {
  elem.classList.add("error");
  selector.style.display = "block";
}

function removeError(elem, selector) {
  elem.classList.remove("error");
  selector.style.display = "none";
}
