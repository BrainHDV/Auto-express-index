import { field } from "./GameSet.js";

// Класс ракеток
export default class Racket {
  constructor(x, y, speedY, width, height, selector) {
    this.x = x;
    this.y = y - height;
    this.speedY = speedY;
    this.width = width;
    this.height = height;
    this.selector = selector;
  }

  update() {
    const racket = document.getElementById(this.selector);
    racket.style.top = this.y + "px";
    racket.style.left = this.x + "px";

    if (this.y + this.height + this.speedY >= field.height) {
      this.y = field.height - this.height - this.speedY;
    }

    if (this.y <= 0) {
      this.y = this.y + this.speedY;
    }
  }

  up() {
    this.y -= this.speedY;
    this.update();
  }

  down() {
    this.y += this.speedY;
    this.update();
  }
}

// Левая и правая ракетка
export const racketLeft = new Racket(
  10,
  field.height / 2,
  5,
  10,
  80,
  "left-racket"
);
export const racketRight = new Racket(
  field.width - 20,
  field.height / 2,
  5,
  10,
  80,
  "right-racket"
);
