"use strict";
import { ball } from "./modules/Ball.js";
import { racketLeft, racketRight } from "./modules/Racket.js";

// Счетчик очков, левый\правый
export const scoreLeft = document.getElementById("score-left");
export const scoreRight = document.getElementById("score-right");

// Кнопка для начала игры
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", update);

// Инициализируем местоположение... левой и правой ракетки.
racketLeft.update();
racketRight.update();
// Инициализируем мяч
ball.update();

// Объявляем переменную для отмены вызова функции requestAnimationFrame
export let animate;
// Анимация мячика
export function update() {
  cancelAnimationFrame(animate);
  animate = requestAnimationFrame(update);
  ball.update();
}

// Создаю id для остановки анимации ракетки
let requestId;
// Лучше способа сделать остановку анимации не придумал
// поэтому написал функции для каждого направления
function paddleUpLeft() {
  requestId = undefined;
  racketLeft.up();
  start(paddleUpLeft);
}

function paddleDownLeft() {
  requestId = undefined;
  racketLeft.down();
  start(paddleDownLeft);
}

function paddleUpRight() {
  requestId = undefined;
  racketRight.up();
  start(paddleUpRight);
}

function paddleDownRight() {
  requestId = undefined;
  racketRight.down();
  start(paddleDownRight);
}

function start(paddle) {
  if (!requestId) {
    requestId = requestAnimationFrame(paddle);
  }
}

function stop() {
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

// Ловим событие keydown&keyup и вешаем обработчик
// для управления ракетками
addEventListener("keydown", (e) => {
  e = e || window.event;
  switch (e.key) {
    case "Shift":
      start(paddleUpLeft);
      break;
    case "Control":
      start(paddleDownLeft);
      break;
    case "ArrowUp":
      start(paddleUpRight);
      break;
    case "ArrowDown":
      start(paddleDownRight);
      break;
  }
});

addEventListener("keyup", (e) => {
  e = e || window.event;
  switch (e.key) {
    case "Shift":
      stop();
      break;
    case "Control":
      stop();
      break;
    case "ArrowUp":
      stop();
      break;
    case "ArrowDown":
      stop();
      break;
  }
});
