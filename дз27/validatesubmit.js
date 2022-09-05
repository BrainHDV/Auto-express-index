'use strict';

function formValidateSubmit(e) {
   e = e || window.event;
   
   const form = document.forms.form;

   const developers = form.elements.developers;
   const developersValue = developers.value;
   const siteName = form.elements.siteName;
   const siteNameValue = siteName.value;

   const siteDate = form.elements.siteDate;
   const siteDateValue = parseInt(siteDate.value);
   
   const visitors = form.elements.siteVisitors;
   const visitorsNum = parseInt(visitors.value.trim());

   const inputs = document.querySelectorAll('.form__input');
   const select = document.querySelector('.form__select');
   const radioBtn = form.elements.placement;
   const radioBtnSpan = document.querySelector('.radio-span');
   const checkbox = document.querySelector('.input-checkbox');
   const checkboxSpan = document.querySelector('.checkbox-span');
   const formTextarea = form.elements.textarea;
   const textareaValue = formTextarea.value;

   if(textareaValue.length === 0) {
      formAddError(formTextarea);
      formTextarea.focus();
      formTextarea.scrollIntoView();
      e.preventDefault();
   }



   for (let i = inputs.length-1; i > -1; i--) {
      let input = inputs[i];
      
      formRemoveError(input);
      formRemoveError(select);
      formRemoveError(radioBtnSpan);
      formRemoveError(checkboxSpan);
      formRemoveError(formTextarea);
      developers.classList.remove('text-error');
      siteName.classList.remove('text-error');
      input.classList.remove('error-num');

      input.parentElement.classList.remove('url');
      input.parentElement.classList.remove('date');
      input.parentElement.classList.remove('error-num');
      input.parentElement.classList.remove('text-error');
      input.parentElement.classList.remove('email');
      radioBtnSpan.parentElement.classList.remove('free');
      formTextarea.parentElement.classList.remove('min');


      if(input.value === '') {
         formAddError(input);
         input.focus();
         input.scrollIntoView();
         e.preventDefault();
      } 

      if(developersValue.length > 50) {
         developers.parentElement.classList.add('text-error');
         developers.classList.add('text-error');
         developers.focus();
         developers.scrollIntoView();
         e.preventDefault();
      } 
      
      if(siteNameValue.length > 50) {
         siteName.parentElement.classList.add('text-error');
         siteName.classList.add('text-error');
         siteName.focus();
         siteName.scrollIntoView();
         e.preventDefault();
      }
   
      if(input.classList.contains('url') && input.value !== '') {
         if(urlTest(input)) {
            input.parentElement.classList.add('url');
            input.focus();
            input.scrollIntoView();
            formAddError(input);
            e.preventDefault();
         }
      }
      
      if(siteDateValue < 2016 && input.classList.contains('date')) {
         input.parentElement.classList.add('date')
         formAddError(input);
         input.focus();
         input.scrollIntoView();
         e.preventDefault();
      }
      
      if(input.classList.contains('visitors') && isNaN(visitorsNum) && input.value !== '') {
         input.classList.add('error-num');
         input.parentElement.classList.add('error-num');
         input.focus();
         input.scrollIntoView();
         e.preventDefault();
      }
      
      if(input.classList.contains('email') && input.value !== '') {
         if(emailTest(input)) {
            input.parentElement.classList.add('email');
            formAddError(input);
            input.focus();
            input.scrollIntoView();
            e.preventDefault();
         }
      }
   }   

   if(select.value === 'health') {
      formAddError(select);
      e.preventDefault();
   }
   
   if(radioBtn.value === '') {
      radioBtnSpan.parentElement.classList.add('error');
      e.preventDefault();
   }
   
   if(radioBtn.value === 'free') {
      formAddError(radioBtnSpan);
      radioBtnSpan.parentElement.classList.add('free');
      e.preventDefault();
   }

   if(!checkbox.checked) {
      formAddError(checkboxSpan);
      e.preventDefault();
   }
   
   if(textareaValue.length === 0) {
      formAddError(formTextarea);
      e.preventDefault();
   }

   if(textareaValue.length >=1 && textareaValue.length < 50) {
      formAddError(formTextarea);
      formTextarea.focus();
      formTextarea.scrollIntoView();
      formTextarea.parentElement.classList.add('min');
      e.preventDefault();
   }

}