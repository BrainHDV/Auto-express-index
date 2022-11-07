const width = 800;
const height = 520;
export const canvas = document.querySelector(".pong__body");
export const c = canvas.getContext("2d");
// Устанавливаемые размеры игрового поля
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
