'use strict';

const images = document.querySelectorAll('img');

for (let image of images) {
   
   image.addEventListener('mousedown', mouseDown);
   image.addEventListener('load', getCoords);
   image.addEventListener('mouseenter', mouseEnter);
   
   function getCoords(e) {
      e = e || window.event;
      let self = this;
      self.style.position = 'absolute';
      self.style.left = Math.ceil(self.getBoundingClientRect().left) + 'px';
      self.style.top = Math.ceil(self.getBoundingClientRect().top) + 'px'; 
   }
   
   function mouseDown(e) {
      e = e || window.event;
      let self = this;
      
      self.style.position = 'absolute';
      let shiftX = e.clientX - self.getBoundingClientRect().left; 
      let shiftY = e.clientY - self.getBoundingClientRect().top;
      
      self.style.cursor = 'grabbing';
      self.style.zIndex = 100;
      
      
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
      e.target.style.zIndex = 10;
   }
   
   
   image.addEventListener('dragstart', e => e.preventDefault())
   
}


