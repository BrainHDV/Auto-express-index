function buildClock() {
  const clockDiametr = settings.clockDiameter;
  const timeFormat = settings.clockFormat;
  const clock = document.querySelector(".clock__body"),
    // Радиус часов
    radius = clockDiametr / 2,
    //  Высота секундной стрелки относительно радиуса
    secondArrowHeight = radius / 1.8,
    //  Высота минутной стрелки относительно радиуса
    minuteArrowHeight = radius / 2,
    //  Высота часовой стрелки относительно радиуса
    hourArrowHeight = radius / 2.8;

  //  Часы получают заданные размеры. Выставляется высота стрелок.
  clock.style.cssText = `display: flex; width:${clockDiametr}px; height:${clockDiametr}px`;
  hourArrow.style.cssText = `height: ${hourArrowHeight}px`;
  minuteArrow.style.cssText = `height: ${minuteArrowHeight}px`;
  secondArrow.style.cssText = `height: ${secondArrowHeight}px`;

  //   Циклом создаем цифры. Условие отвечает за размер шрифта и ширину стрелок, если диаметр меньше 450.
  //   Закрепляем результат к DOM дереву
  for (let i = 1; i <= timeFormat; i++) {
    const numberDiv = document.createElement("div");
    numberDiv.textContent = i;
    numberDiv.classList.add("clock-number");
    clockDiametr < 450
      ? ((numberDiv.style.cssText = "font-size: 12px"),
        (hourArrow.style.width = 4 + "px"),
        (minuteArrow.style.width = 3 + "px"))
      : (numberDiv.style.cssText = "font-size: 16px");
    clock.appendChild(numberDiv);
  }

  // Находим только что созданные цифры
  const numbers = document.querySelectorAll(".clock-number"),
    // Высчитываем центр циферблата
    clockCenterX = clock.offsetWidth / 2,
    clockCenterY = clock.offsetHeight / 2,
    // Здесь я подбирал размер кружков за цифрами для того чтобы он подходил при изменении диаметра
    numberBgWidth = clockCenterX / 5,
    numberBgHeight = clockCenterY / 5,
    // Расстояние от центра до кружка с цифрой
    radiusFromCenter = radius / 1.2;

  // В этой части кода мы высчитываем угол поворота цифр каждого часа
  // Если формат 12-часовой, то часовая стрелка каждый час будет двигаться на 30 градусов
  // Если формат 24-часовой, то каждый час стрелка будет двигаться на 15 градусов
  let hourDegree;
  timeFormat === 12 ? (hourDegree = 30) : (hourDegree = 15);

  let angle = (parseFloat(hourDegree) / 180) * Math.PI;
  setCircleNumbers();

  function setCircleNumbers() {
    let step = (2 * Math.PI) / numbers.length;

    for (let num = 0; num < numbers.length; num++) {
      let number = numbers[num];
      const numberDivX = clockCenterX + radiusFromCenter * Math.sin(angle);
      const numberDivY = clockCenterY - radiusFromCenter * Math.cos(angle);

      number.style.width = numberBgWidth + "px";
      number.style.height = numberBgHeight + "px";
      number.style.left =
        Math.round(numberDivX - number.offsetWidth / 2) + "px";
      number.style.top =
        Math.round(numberDivY - number.offsetHeight / 2) + "px";
      angle += step;
    }
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
