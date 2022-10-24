// Размеры игры
export const gameSize = document.querySelector(".pong");
gameSize.style.cssText = `width: ${800}px; height: ${500}px `;
const gameHeader = document.querySelector(".pong__header").offsetHeight;

// Размеры игрового поля
export const field = {
  width: parseInt(gameSize.style.width),
  height: parseInt(gameSize.style.height) - gameHeader,
};
