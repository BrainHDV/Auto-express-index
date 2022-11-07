import { canvas, c } from "./GameSet.js";
import { paddleLeft, paddleRight } from "./Paddle.js";
import { startButton, start, keyDown, keyUp } from "../index.js";
const ballCenterX = canvas.width / 2;
const ballCenterY = canvas.height / 2;
const ballSpeed = 4;

// Игроки
const playerLeft = document.querySelector(".player-left");
const playerRight = document.querySelector(".player-right");

export default class Ball {
  constructor(x, y, radius, startAngle, endAngle, color) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    c.fill();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.update();
  }

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }

  loop() {
    this.x = ballCenterX;
    this.y = ballCenterY;

    this.speedX = randomDirection();
    this.speedY = randomDirection();
  }

  update() {
    this.draw();

    // Стороны мяча
    const rightSide = this.x + this.radius;
    const leftSide = this.x + this.speedX - this.radius / 2;
    const topSide = this.y;
    const bottomSide = this.y + this.radius;

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

    // Right
    if (this.x + this.speedX + this.radius > canvas.width) {
      this.stop();
      pause();
      playerLeft.textContent = parseInt(playerLeft.textContent) + 1;
    }
    // Left
    if (this.x + this.speedX - this.radius < 0) {
      this.stop();
      pause();
      playerRight.textContent = parseInt(playerRight.textContent) + 1;
    }
    // Bottom
    if (this.y + this.speedY + this.radius >= canvas.height) {
      this.speedY = -this.speedY;
    }
    // Top
    if (this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
  }
}

function pause() {
  startButton.addEventListener("click", start);
  removeEventListener("keydown", keyDown);
}

export const ball = new Ball(
  ballCenterX,
  ballCenterY,
  10,
  0,
  Math.PI * 2,
  "#118AB2"
);

export function randomDirection() {
  return Math.random() * 1 > 0.5 ? -ballSpeed : ballSpeed;
}
