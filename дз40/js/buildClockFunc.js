function buildClock() {
  const clockDiametr = settings.clockDiameter;
  const timeFormat = settings.clockFormat;
  const clock = document.querySelector(".clock__body"),
    // Радиус часов
    radius = clockDiametr / 2;

  const canvas = document.createElement("canvas");

  clock.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const c = canvas.getContext("2d");
  const numberBgDiametr = radius / 10;
  const radiusNumbers = radius / 1.2;

  function reDraw() {
    c.resetTransform();
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.beginPath();
    c.strokeStyle = "#d3d3d3";
    c.arc(centerX, centerY, radius, 0, Math.PI * 2);
    c.lineWidth = 2;
    c.stroke();

    // В этой части кода мы высчитываем угол поворота цифр каждого часа
    // Если формат 12-часовой, то часовая стрелка каждый час будет двигаться на 30 градусов
    // Если формат 24-часовой, то каждый час стрелка будет двигаться на 15 градусов

    let hourDegree;
    timeFormat === 12 ? (hourDegree = 30) : (hourDegree = 15);

    // Условие проверяет часовой формат, чтобы правильно отобразить числа на циферблате
    let hoursNumbers;
    hourDegree === 30 ? (hoursNumbers = 12) : (hoursNumbers = 24);

    let angle = (parseFloat(hourDegree) / 180) * Math.PI;
    let step = (Math.PI * 2) / hoursNumbers;

    for (let i = 0; i < hoursNumbers; i++) {
      const numberBgX = centerX + radiusNumbers * Math.sin(angle);
      const numberBgY = centerY - radiusNumbers * Math.cos(angle);
      c.beginPath();
      c.fillStyle = "#d3d3d3";
      c.arc(numberBgX, numberBgY, numberBgDiametr, 0, Math.PI * 2);
      c.fill();

      angle += step;
    }

    for (let i = 1; i < hoursNumbers + 1; i++) {
      const numberX = centerX + radiusNumbers * Math.sin(angle);
      const numberY = centerY - radiusNumbers * Math.cos(angle);

      c.save();
      c.beginPath();
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "black";
      if (clockDiametr < 350) {
        c.font = "14px Arial";
      } else {
        c.font = "20px Arial";
      }
      c.fillText(`${i}`, numberX, numberY);
      c.restore();

      angle += step;
    }

    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    let hoursArrowDeg;

    timeFormat === 12
      ? (hoursArrowDeg = (Math.PI / 6) * hours)
      : (hoursArrowDeg = (Math.PI / 12) * hours);

    const minutesArrowDeg = (Math.PI / 30) * minutes;
    const secondsArrowDeg = (seconds * Math.PI) / 30;

    // Длинная каждой из стрелок относительно радиуса
    const hourArrow = radius / 3;
    const minuteArrow = radius / 2;
    const secondArrow = radius / 1.5;

    createArrow(centerX, centerY, 5, hoursArrowDeg, "#d3d3d3", hourArrow);
    createArrow(centerX, centerY, 4, minutesArrowDeg, "#d3d3d3", minuteArrow);
    createArrow(centerX, centerY, 2, secondsArrowDeg, "red", secondArrow);

    function createArrow(x, y, lineWidth, rotate, strokeStyle, arrowLength) {
      c.save();
      c.beginPath();
      c.translate(x, y);
      c.rotate(rotate);
      c.translate(-x, -y);
      c.moveTo(x, y);
      c.lineWidth = lineWidth;
      c.strokeStyle = strokeStyle;
      c.lineCap = "round";
      c.lineTo(x, y - arrowLength);
      c.stroke();
      c.restore();
    }

    c.save();
    c.beginPath();
    c.arc(centerX, centerY, 5, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
    c.restore();
  }

  reDraw();

  //   При каждом обновлении выводим в консоль текущее время
  //   Устанавливаем интервал в одну секунду
  setInterval(() => {
    reDraw();
    const currentTime = new Date(),
      hour = currentTime.getHours(),
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds();

    console.log(
      `Текущее время: ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`
    );
  }, 1000);
}
