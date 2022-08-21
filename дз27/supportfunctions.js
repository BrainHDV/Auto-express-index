'use strict';

function formAddError(tag) {
   tag.parentElement.classList.add('error');
   tag.classList.add('error');
}

function formRemoveError(tag) {
   tag.parentElement.classList.remove('error');
   tag.classList.remove('error');
}

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function urlTest(input) {
   return !/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(input.value);
}