"use strict";
import { canvas, c } from "./modules/GameSet.js";
import { paddleLeft, paddleRight } from "./modules/Paddle.js";
import { ball } from "./modules/Ball.js";

addEventListener("load", animate);

// Кнопка старта
export const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", start);

// Начало игры
export function start() {
  ball.loop();
  addEventListener("keydown", keyDown);
  addEventListener("keyup", keyUp);
  startButton.removeEventListener("click", start);
}

function animate() {
  // Очистка перед отрисовкой
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Фон поля
  c.beginPath();
  c.fillStyle = "#f1c453";
  c.fillRect(0, 0, canvas.width, canvas.height);

  ball.move();
  paddleLeft.move();
  paddleRight.move();

  requestAnimationFrame(animate);
}

export let paddleSpeed;

export function keyDown(e) {
  e = e || window.event;
  paddleSpeed = 4;
  switch (e.key) {
    case "Shift":
      paddleLeft.speedY = -paddleSpeed;
      break;
    case "Control":
      paddleLeft.speedY = paddleSpeed;
      break;
    case "ArrowUp":
      paddleRight.speedY = -paddleSpeed;
      break;
    case "ArrowDown":
      paddleRight.speedY = paddleSpeed;
      break;
  }
}

export function keyUp(e) {
  e = e || window.event;
  paddleSpeed = 0;
  switch (e.key) {
    case "Shift":
      paddleLeft.speedY = paddleSpeed;
      break;
    case "Control":
      paddleLeft.speedY = paddleSpeed;
      break;
    case "ArrowUp":
      paddleRight.speedY = paddleSpeed;
      break;
    case "ArrowDown":
      paddleRight.speedY = paddleSpeed;
      break;
  }
}
