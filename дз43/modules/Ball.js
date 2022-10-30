import { scoreLeft, scoreRight } from "../index.js";
import { field } from "./GameSet.js";
import { racketLeft, racketRight } from "./Racket.js";

const centerX = field.width / 2 - 20;
const centerY = field.height / 2 - 20;

const ballSpeed = 4;

export const ball = {
  x: centerX,
  y: centerY,
  width: 20,
  height: 20,
  speedX: 0,
  speedY: 0,

  loop() {
    // после попадания в левую\правую сторону
    // перемещаем мячик в центр
    this.x = centerX;
    this.y = centerY;

    // задаем направление осям
    this.speedX = randomDirection();
    this.speedY = randomDirection();
  },

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  },

  update() {
    const ballElem = document.querySelector(".ball");
    ballElem.style.top = this.y + "px";
    ballElem.style.left = this.x + "px";

    this.x += this.speedX;
    this.y += this.speedY;

    // Стороны мяча
    const rightSide = this.x + this.width;
    const leftSide = this.x + this.speedX;
    const topSide = this.y;
    const bottomSide = this.y + this.height;

    // Столкновение с ракетками
    // Левая ракетка
    if (
      leftSide <= racketLeft.x &&
      topSide <= racketLeft.y + racketLeft.height &&
      bottomSide >= racketLeft.y
    ) {
      this.speedX = -this.speedX;
    }

    // Правая ракетка
    if (
      rightSide >= racketRight.x &&
      topSide <= racketRight.y + racketRight.height &&
      bottomSide >= racketRight.y
    ) {
      this.speedX = -this.speedX;
    }

    // Right
    if (this.x + this.speedX + this.width > field.width) {
      this.stop();
      scoreLeft.textContent = parseInt(scoreLeft.textContent) + 1;
    }

    // Left
    if (this.x + this.speedX < 0) {
      this.stop();
      scoreRight.textContent = parseInt(scoreRight.textContent) + 1;
    }

    // Top & Bottom
    if (this.y + this.height + this.speedY >= field.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  },
};

export function randomDirection() {
  return Math.random() * 1 > 0.5 ? -ballSpeed : ballSpeed;
}
