import { field } from "./GameSet.js";

const pongBody = document.querySelector(".pong__body");
const paddleCenterY = field.height / 2;

export class Paddle {
  constructor(x, y, width, height, color, selector) {
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.color = color;
    this.selector = selector;
  }

  draw() {
    const paddle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    paddle.setAttribute("x", this.x);
    paddle.setAttribute("y", this.y);
    paddle.setAttribute("width", this.width);
    paddle.setAttribute("height", this.height);
    paddle.setAttribute("fill", this.color);
    paddle.setAttribute("class", this.selector);
    pongBody.appendChild(paddle);
  }

  update() {
    const paddle = document.querySelector(`.${this.selector}`);
    paddle.setAttribute("y", this.y);

    // Top
    if (this.y <= 0) {
      this.y = 0;
    }

    // Bottom
    if (this.y + this.speedY + this.height >= field.height) {
      this.y = field.height - this.height;
    }
  }

  move() {
    this.y += this.speedY;
    this.update();
  }
}

export const paddleLeft = new Paddle(
  10,
  paddleCenterY - 40,
  10,
  80,
  "#c9cba3",
  "paddle-left"
);
export const paddleRight = new Paddle(
  field.width - 20,
  paddleCenterY - 40,
  10,
  80,
  "#e26d5c",
  "paddle-right"
);
