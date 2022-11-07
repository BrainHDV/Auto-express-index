import { field } from "./GameSet.js";
import { paddleLeft, paddleRight } from "./Paddle.js";
import { startButton, start, keyDown, keyUp } from "../index.js";
const pongBody = document.querySelector(".pong__body");
const ballCenterX = field.width / 2;
const ballCenterY = field.height / 2;

let ballSpeed = 5;

const playerLeft = document.querySelector(".player-left");
const playerRight = document.querySelector(".player-right");

export class Ball {
  constructor(cx, cy, radius, color, selector) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.selector = selector;
  }

  loop() {
    this.cx = ballCenterX;
    this.cy = ballCenterY;

    this.speedX = randomDirection();
    this.speedY = randomDirection();
  }

  draw() {
    const ball = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    ball.setAttribute("cx", this.cx);
    ball.setAttribute("cy", this.cy);
    ball.setAttribute("r", this.radius);
    ball.setAttribute("fill", this.color);
    ball.setAttribute("class", this.selector);
    pongBody.appendChild(ball);
  }

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    const ball = document.querySelector(`.${this.selector}`);
    ball.setAttribute("cx", this.cx);
    ball.setAttribute("cy", this.cy);

    this.cx += this.speedX;
    this.cy += this.speedY;

    // Стороны мяча
    const rightSide = this.cx + this.radius;
    const leftSide = this.cx + this.speedX - this.radius / 2;
    const topSide = this.cy;
    const bottomSide = this.cy + this.radius;

    // Левая ракетка
    if (
      leftSide <= paddleLeft.x + paddleLeft.width &&
      topSide <= paddleLeft.y + paddleLeft.height &&
      bottomSide >= paddleLeft.y
    ) {
      this.speedX = -this.speedX;
    }

    // Правая ракетка
    if (
      rightSide >= paddleRight.x &&
      topSide <= paddleRight.y + paddleRight.height &&
      bottomSide >= paddleRight.y
    ) {
      this.speedX = -this.speedX;
    }

    // Top
    if (this.cy - this.radius <= 0) {
      this.speedY = -this.speedY;
    }

    //Bottom
    if (this.cy + this.radius + this.speedY >= field.height) {
      this.speedY = -this.speedY;
    }

    // Right
    if (this.cx + this.radius + this.speedX > field.width) {
      this.stop();
      pause();
      playerLeft.textContent = parseInt(playerLeft.textContent) + 1;
    }

    // Left
    if (this.cx + this.speedX - this.radius < 0) {
      this.stop();
      pause();
      playerRight.textContent = parseInt(playerRight.textContent) + 1;
    }
  }
}

function pause() {
  startButton.addEventListener("click", start);
  removeEventListener("keydown", keyDown);
}

export function randomDirection() {
  return Math.random() * 1 > 0.5 ? -ballSpeed : ballSpeed;
}

export const ball = new Ball(ballCenterX, ballCenterY, 10, "#f94144", "ball");
