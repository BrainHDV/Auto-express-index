'use strict';

function dragDrop() {

   const images = document.querySelectorAll('img');
   
   window.addEventListener('load', getCoords);
      
   function getCoords(e) {
      e = e || window.event;
      
      function getElementPos(elem) {
         let elemCoord = elem.getBoundingClientRect();
         
         return {
               top: elemCoord.top + window.pageYOffset,
               left: elemCoord.left + window.pageXOffset
            };
         }
         
         const coordsArr = [];
         
         for(let image of images) {
            let imgCoord = getElementPos(image);
            coordsArr.push(imgCoord);
         }
         
         for ( let i = 0; i < images.length; i++) {
            let image = images[i];
   
            image.style.top = coordsArr[i].top + 'px';
            image.style.left = coordsArr[i].left + 'px';
            
            image.style.position = 'absolute';
         }
         
   }
      
   for (let image of images) {
   
      image.addEventListener('mousedown', mouseDown);
      image.addEventListener('mouseenter', mouseEnter);
      image.addEventListener('mousedown', changeIndex);
      image.addEventListener('dragstart', e => e.preventDefault())
   
      function mouseDown(e) {
         e = e || window.event;
         let self = this;
         
         let shiftX = e.clientX - self.getBoundingClientRect().left; 
         let shiftY = e.clientY - self.getBoundingClientRect().top;
         
         self.style.position = 'absolute';
         self.style.cursor = 'grabbing';
         
         
         document.addEventListener('mousemove', mouseMove);
         
         function mouseMove(e) {
            e = e || window.event;
            
            image.style.left = e.pageX - shiftX + 'px';
            image.style.top = e.pageY - shiftY + 'px';
         }
         
         image.addEventListener('mouseup', mouseUp);
         
         function mouseUp(e) {
            e = e || window.event;
            document.removeEventListener('mousemove', mouseMove);
            e.target.style.cursor = 'grab';
         }
      }
      
      function mouseEnter(e) {
         e = e || window.event;
         e.target.style.cursor = 'pointer';
      }
   
      function changeIndex(e) {
         e = e || window.event;
         let self = this;
         
         for( let i = 0; i < images.length; i++) {
            let image = images[i];
            image.style.zIndex = 10;       
         }
      
         self.style.zIndex = 20;
      }
   }

}

dragDrop();
