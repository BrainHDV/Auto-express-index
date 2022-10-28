"use strict";
import { ball } from "./modules/Ball.js";
import { field } from "./modules/GameSet.js";
import { racketLeft, racketRight } from "./modules/Racket.js";

// Запускаем таймер сразу после загрузки страницы
window.addEventListener("load", update);

// Счетчик очков, левый\правый
export let scoreLeft = document.getElementById("score-left");
export let scoreRight = document.getElementById("score-right");

const scores = {
  playerLeft: 0,
  playerRight: 0,
};

// Кнопка для начала игры
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", moveBall);

// Инициализируем местоположение... левой и правой ракетки.
racketLeft.update();
racketRight.update();
// Инициализируем мяч
ball.update();

// Анимация мячика
export function update() {
  racketLeft.move();
  racketRight.move();
  ball.update();

  requestAnimationFrame(update);
}

export function moveBall() {
  ball.move();
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
