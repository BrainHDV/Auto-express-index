"use strict";
import { ball } from "./modules/Ball.js";
import { racketLeft, racketRight } from "./modules/Racket.js";

// Запускаем таймер сразу после загрузки страницы
window.addEventListener("load", animate);

// Счетчик очков, левый\правый
export let scoreLeft = document.getElementById("score-left");
export let scoreRight = document.getElementById("score-right");

// Кнопка для начала игры
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", start);

// Начать играть
function start() {
  ball.loop();
}

// Инициализация мячика и ракеток
function init() {
  racketLeft.move();
  racketRight.move();
  ball.update();
}

// Анимация
export function animate() {
  init();
  requestAnimationFrame(animate);
}

// Ловим событие keydown&keyup и вешаем обработчик
// для управления ракетками
addEventListener("keydown", (e) => {
  e = e || window.event;
  const speed = 4;
  switch (e.key) {
    case "Shift":
      racketLeft.speedY = -speed;
      break;
    case "Control":
      racketLeft.speedY = speed;
      break;
    case "ArrowUp":
      racketRight.speedY = -speed;
      break;
    case "ArrowDown":
      racketRight.speedY = speed;
      break;
  }
});

addEventListener("keyup", (e) => {
  e = e || window.event;
  const speed = 0;
  switch (e.key) {
    case "Shift":
      racketLeft.speedY = speed;
      break;
    case "Control":
      racketLeft.speedY = speed;
      break;
    case "ArrowUp":
      racketRight.speedY = speed;
      break;
    case "ArrowDown":
      racketRight.speedY = speed;
      break;
  }
});
