'use strict';

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
      
      for(let image of images) {
         image.style.position = 'absolute';
         
         coordsArr.forEach(item => {
            image.style.top = item.top + 'px';
            image.style.left = item.left + 'px';
         })
      }
      
   }
   
   
   
for (let image of images) {
   image.addEventListener('mousedown', mouseDown);
   image.addEventListener('mouseenter', mouseEnter);


   function mouseDown(e) {
      e = e || window.event;
      let self = this;
      
      let shiftX = e.clientX - self.getBoundingClientRect().left; 
      let shiftY = e.clientY - self.getBoundingClientRect().top;
      
      self.style.position = 'absolute';
      self.style.cursor = 'grabbing';
      self.style.zIndex = 10;
      
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


   image.addEventListener('dragstart', e => e.preventDefault())

}