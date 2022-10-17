function buildClock() {
  const clockDiametr = settings.clockDiameter;
  const timeFormat = settings.clockFormat;
  const clock = document.querySelector(".clock__body"),
    // Радиус часов
    radius = clockDiametr / 2;

  const clockFace = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  clockFace.setAttribute("stroke", "#d3d3d3");
  clockFace.setAttribute("stroke-width", 2);
  clockFace.setAttribute("fill", "none");
  clockFace.setAttribute("cx", "50%");
  clockFace.setAttribute("cy", "50%");
  clockFace.setAttribute("r", radius);
  clock.appendChild(clockFace);

  //  Часы получают заданные размеры. Выставляется высота стрелок.
  clock.style.cssText = `width: ${clockDiametr}px; height: ${clockDiametr}px`;

  // С помощью функции buildArrows можно определить ширину и высоту стрелки

  buildArrows(hourArrow, 6, "35%");
  buildArrows(minuteArrow, 4, "25%");
  buildArrows(secondArrow, 2, "20%");

  function buildArrows(arrow, width, height) {
    arrow.setAttribute("stroke-width", width);
    arrow.setAttribute("x1", "50%");
    arrow.setAttribute("y1", "50%");
    arrow.setAttribute("x2", "50%");
    arrow.setAttribute("y2", height);
  }

  //   Циклом создаем цифры. Условие отвечает за размер шрифта и ширину стрелок, если диаметр меньше 450.
  //   Закрепляем результат к DOM дереву
  for (let i = 1; i <= timeFormat; i++) {
    const numberDiv = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    numberDiv.setAttribute("cx", "50%");
    numberDiv.setAttribute("cy", "50%");
    numberDiv.setAttribute("fill", "#d3d3d3");
    numberDiv.classList.add("clock-number");

    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.style.fill = "black";
    clockDiametr > 450
      ? (text.style.fontSize = 18 + "px")
      : (text.style.fontSize = 12 + "px");
    text.textContent = i;
    text.classList.add("clock-text");
    group.appendChild(numberDiv);
    group.appendChild(text);
    clock.appendChild(group);
  }

  // Находим только что созданные цифры
  const numbers = document.querySelectorAll(".clock-number"),
    textArr = document.querySelectorAll(".clock-text"),
    // Высчитываем центр циферблата
    clockCenterX = clockDiametr / 2,
    clockCenterY = clockDiametr / 2,
    // Здесь я подбирал размер кружков за цифрами для того чтобы он подходил при изменении диаметра
    numberBgWidth = clockCenterX / 10,
    // Расстояние от центра до кружка с цифрой
    radiusFromCenter = radius / 1.2;

  // В этой части кода мы высчитываем угол поворота цифр каждого часа
  // Если формат 12-часовой, то часовая стрелка каждый час будет двигаться на 30 градусов
  // Если формат 24-часовой, то каждый час стрелка будет двигаться на 15 градусов
  let hourDegree;
  timeFormat === 12 ? (hourDegree = 30) : (hourDegree = 15);

  let angle = (parseFloat(hourDegree) / 180) * Math.PI;

  let step = (2 * Math.PI) / textArr.length;

  // Снизу два цикла
  // Первым мы расставляем кружки в которых будет цифра каждого часа
  // Второй расставляем сами цифры

  for (let num = 0; num < numbers.length; num++) {
    let number = numbers[num];
    const numberBgX = clockCenterX + radiusFromCenter * Math.sin(angle);
    const numberBgY = clockCenterY - radiusFromCenter * Math.cos(angle);

    number.setAttribute("cx", numberBgX);
    number.setAttribute("cy", numberBgY);
    number.setAttribute("r", numberBgWidth);
    angle += step;
  }

  for (let num = 0; num < textArr.length; num++) {
    let text = textArr[num];
    const textX = clockCenterX + radiusFromCenter * Math.sin(angle);
    const textY = clockCenterY - radiusFromCenter * Math.cos(angle);

    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    angle += step;
  }

  //   Вызываем функцию setTime чтобы СРАЗУ показывать время правильно
  //   Устанавливаем интервал одну секунду
  //   При каждом обновлении выводим в консоль текущее время
  setTime(timeFormat, hourDegree);
  setInterval(() => {
    setTime();
    const currentTime = new Date(),
      hour = currentTime.getHours(),
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds();

    console.log(
      `Текущее время: ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`
    );
  }, 1000);
}
