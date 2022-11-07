import { canvas, c } from "./GameSet.js";
const paddleCenterY = canvas.height / 2;

export default class Paddle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speedY;
    this.draw();

    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
    }

    if (this.y < 0) {
      this.y = 0;
    }
  }
}

export const paddleLeft = new Paddle(10, paddleCenterY - 40, 10, 80, "#0DB39E");
export const paddleRight = new Paddle(
  canvas.width - 20,
  paddleCenterY - 40,
  10,
  80,
  "#2C699A"
);
