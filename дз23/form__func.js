'use strict';

function formFunc(formArr, formName) {
   formArr.forEach( elem => {
      
      let formLabel = document.createElement('label');
      let formLabelText = document.createTextNode(elem.label);
      let formInput = document.createElement('input');
      let formSelect = document.createElement('select');
      let formTextarea = document.createElement('textarea');
      let formDiv = document.createElement('div');
      
      formName.style.cssText = "width: 350px;"
      
      if ('label' in elem) {
         formLabel.appendChild(formLabelText)
         formDiv.appendChild(formLabel);
         formName.appendChild(formDiv);

         formInput.style.width = 100 + '%';
      }
      
      if (elem.kind === 'longtext') {
         formName.appendChild(formInput); 
         formInput.name = elem.name;
         formInput.type = 'text';
      }

      if (elem.kind === 'number') {
         formName.appendChild(formInput); 
         formInput.type = elem.kind;
         formInput.name = elem.name;
         formInput.style.width =  40 + "px";
      }

      if (elem.kind === 'shorttext') {
         formName.appendChild(formInput); 
         formInput.type = 'email';
         formInput.name = elem.name;
         formInput.style.width =  150 + "px";
      }

      if (elem.kind === 'combo') {
         formName.appendChild(formSelect);
         formSelect.name = 'division';

         elem.variants.forEach( option => {
            let selectOption = document.createElement('option');
            formSelect.appendChild(selectOption);
            selectOption.value = option.value;
            selectOption.innerHTML = option.text;
         })

         formLabel.style.float = 'left';
         formLabel.style.marginRight = 10 + 'px';
      }

      if (elem.kind === 'radio') {

         elem.variants.forEach( radioInfo => {
            let radioInput = document.createElement('input');
            let radioSpan = document.createElement('span');
            let radioSpanText = document.createTextNode(radioInfo.text);

            radioSpan.appendChild(radioSpanText);
            formName.appendChild(radioInput);
            formName.appendChild(radioSpan);
            radioInput.name = elem.name;
            radioInput.type = elem.kind;
            radioInput.value = radioInfo.value;
         })
         formLabel.style.float = 'left';

      }

      if (elem.kind === 'check') {
         formName.appendChild(formInput);
         formInput.type = 'checkbox';
         formInput.name = 'votes';
         formInput.checked = true;

         formLabel.style.float = 'left';
         formInput.style.width = 15 + 'px';
      }

      if (elem.kind === 'memo') {
         formName.appendChild(formTextarea);
         formTextarea.name = elem.name;
         formTextarea.style.display = 'block';
      }

      if (elem.kind === 'submit') {
         formName.appendChild(formInput);
         formInput.type = elem.kind;
         formInput.value = elem.caption;
         formInput.style.display = 'block';
         formInput.style.marginTop = 10 + 'px';
      }

      
   })

}