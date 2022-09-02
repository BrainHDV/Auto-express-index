'use strict';

   /* Правила валидации
   
   1. Пустые строки - ошибка. 
   2. "Разработчики" и "Название сайта" не более 50 символов.
   3. URL сайта не должен быть только из букв.
   4. Пустая дата - ошибка. Дата запуска сайта не позднее 2016 года.
   5. В строке "Посетителей в сутки" должны быть цифры, а не буквы.
   6. Email должен состоять из соответствующих символов. Регион не важен.
   7. "Рубрика каталога" предполагает недоступность варианта - здоровье.
   8. В строке "Размещение" отсутствует услуга - бесплатное.
   9. Отзывы должны быть разрешены.
   10. В описании сайта должно быть не менее 50 символов.
   
   */ 

   const form = document.forms.form;

   const developers = form.elements.developers;
   const siteName = form.elements.siteName;
   const url = form.elements.siteURL;
   const siteDate = form.elements.siteDate;
   const visitors = form.elements.siteVisitors;
   const email = form.elements.siteEmail;
   const selection = form.elements.catalog;
   const radioBtnFree = document.getElementById('free');
   const radioBtnPay = document.getElementById('pay');
   const radioBtnVip = document.getElementById('vip');
   const checkbox = form.elements.checkbox;
   const formTextarea = form.elements.textarea;
   
   form.addEventListener('submit', formValidateSubmit);

   developers.addEventListener('blur', formValidText);
   developers.addEventListener('input', formValidText);

   siteName.addEventListener('blur', formValidText);
   siteName.addEventListener('input', formValidText);

   url.addEventListener('blur', formValidUrl);
   url.addEventListener('input', formValidUrl);

   siteDate.addEventListener('blur', formValidDate);
   siteDate.addEventListener('input', formValidDate);

   visitors.addEventListener('change', formValidVisitors);
   visitors.addEventListener('input', formValidVisitors);

   email.addEventListener('change', formValidEmail);
   email.addEventListener('input', formValidEmail);

   selection.addEventListener('change', formValidSelect);
   radioBtnFree.addEventListener('focus', formValidRadio);
   radioBtnPay.addEventListener('change', formValidRadioPayVip);
   radioBtnVip.addEventListener('change', formValidRadioPayVip);
   checkbox.addEventListener('change', formValidCheckbox);

   formTextarea.addEventListener('blur', formValidTextarea);
   formTextarea.addEventListener('change', formValidTextarea);
   formTextarea.addEventListener('input', formValidTextarea);
   
   
function formValidText(e) {
   e = e || window.event;
   let self = this;
   const developersValue = self.value;
   
   self.classList.remove('error');
   self.classList.remove('text-error');
   self.parentElement.classList.remove('error');
   self.parentElement.classList.remove('text-error');


   if(developersValue === '') {
      self.parentElement.classList.add('error');
      self.classList.add('error');
      e.preventDefault();
   }
   
   if(developersValue.length > 50) {
      self.parentElement.classList.add('text-error');
      self.classList.add('text-error');
      e.preventDefault();
   }

} 

function formValidUrl(e) {
   e = e || window.event;
   let self = this;

   const urlValue = self.value;
   formRemoveError(self);
   self.parentElement.classList.remove('url');

   if(urlValue === '') {
      formAddError(self);
      e.preventDefault();
   } else {
      if(urlTest(self)) {
         formAddError(self);
         self.parentElement.classList.add('url');
         e.preventDefault();
      }
   }

}

function formValidDate(e) {
      e = e || window.event;
      let self = this;
   
      const siteDateValue = parseInt(self.value);
      
      formRemoveError(self);
      self.parentElement.classList.remove('date');
   
      if(isNaN(siteDateValue)) {
         formAddError(self);
         e.preventDefault();
      }
   
      if(siteDateValue < 2016 && self.classList.contains('date')) {
         self.parentElement.classList.add('date');
         formAddError(self);
         e.preventDefault();
      }
   
}

function formValidVisitors(e) {
   e = e || window.event;
   let self = this;

   const visitorsNum = parseInt(self.value.trim());
   
   formRemoveError(self);
   self.classList.remove('error-num')
   self.parentElement.classList.remove('error-num')

   if(isNaN(visitorsNum)) {
      formAddError(self);
      e.preventDefault();
   }

   if(self.classList.contains('visitors') && isNaN(visitorsNum) && self.value !== '') {
      self.classList.add('error-num')
      self.parentElement.classList.add('error-num')
      e.preventDefault();
   }

   
}

function formValidEmail(e) {
   e = e || window.event;
   let self = this;

   const emailValue = self.value;
   formRemoveError(self);
   self.parentElement.classList.remove('email');

   if(emailValue === '') {
      formAddError(self);
      e.preventDefault();
   }

   if(self.classList.contains('email') && emailValue !== '') {
      if(emailTest(email)) {
         self.parentElement.classList.add('email');
         formAddError(self);
         e.preventDefault();
      }
   }
}

function formValidSelect(e) {
   e = e || window.event;
   let self = this;

   const selectValue = self.value;
   formRemoveError(self);

   if(selectValue === 'health') {
      formAddError(self);
      e.preventDefault();
   }

}

function formValidRadio(e) {
   e = e || window.event;
   let self = this;
   
   const radioSpans = document.querySelectorAll('.radio-span');
   const radioSpanFree = document.querySelector('.error-free');
   const radioFree = document.getElementById('free');

   radioSpans.forEach( span => {
      const freeValue = radioFree.value;
      
      if(freeValue === 'free') {
         formAddError(radioSpanFree);
         span.parentElement.classList.add('free');     
      }
      
   })
   
}

function formValidRadioPayVip(e) {
   e = e || window.event;
   const radioSpanFree = document.querySelector('.error-free');
   const radioPay = document.getElementById('pay');
   const radioVip = document.getElementById('vip');
   
   const payValue = radioPay.value;
   const vipValue = radioVip.value;

   if(payValue === 'pay') {
      formRemoveError(radioSpanFree);
      radioSpanFree.parentElement.classList.remove('free');     
   }

   if(vipValue === 'vip') {
      formRemoveError(radioSpanFree);
      radioSpanFree.parentElement.classList.remove('free');     
   }
   
}

function formValidCheckbox(e) {
   e = e || window.event;
   let self = this;

   const checkboxValue = self.checked;
   const checkboxSpan = document.querySelector('.checkbox-span');
   
   formRemoveError(checkboxSpan);
   
   if(!checkboxValue) {
      formAddError(checkboxSpan);
      e.preventDefault();
   } 

}

function formValidTextarea(e) {
   e = e || window.event;
   let self = this;
   
   const textareaValue = self.value;

   formRemoveError(self);
   self.parentElement.classList.remove('min');
   
   
   if(textareaValue.length === 0) {
      formAddError(self);
      e.preventDefault();
   }
   
   if(textareaValue.length >=1 && textareaValue.length < 50) {
      formAddError(self);
      self.parentElement.classList.add('min');
      e.preventDefault();
   }

}
