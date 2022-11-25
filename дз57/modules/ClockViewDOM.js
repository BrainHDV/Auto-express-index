class ClockViewDOM {
  constructor() {
    let clockModel = null; // с какой моделью работаем
    const clockFaceDiametr = 400;
    let clockField = null; // внутри какого тега наша вёрстка

    let hourArrow = null; // часовая стрелка
    let secondArrow = null; // минутная стрелка
    let minuteArrow = null; // секундная стрелка

    this.start = function (model, field) {
      clockModel = model;
      clockField = field;

      // ищем и запоминаем нужные элементы DOM
      clockField.style.cssText = `width: ${clockFaceDiametr}px; height: ${clockFaceDiametr}px;`;
      hourArrow = clockField.querySelector(".hr");
      minuteArrow = clockField.querySelector(".mn");
      secondArrow = clockField.querySelector(".sc");

      // инициализация цифр и фона
      for (let i = 1; i <= 12; i++) {
        const numberDiv = document.createElement("div");
        numberDiv.textContent = i;
        numberDiv.classList.add("clock-number");

        clockField.appendChild(numberDiv);
      }

      const numbers = document.querySelectorAll(".clock-number"),
        // Высчитываем центр циферблата
        clockCenterX = clockFaceDiametr / 2,
        clockCenterY = clockFaceDiametr / 2,
        // Здесь я подбирал размер кружков за цифрами для того чтобы он подходил при изменении диаметра
        numberBgWidth = clockCenterX / 5,
        numberBgHeight = clockCenterY / 5,
        // Расстояние от центра до кружка с цифрой
        radiusFromCenter = clockFaceDiametr / 2 / 1.2;

      let step = (2 * Math.PI) / numbers.length;
      let angle = (parseFloat(30) / 180) * Math.PI;

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
    };

    this.update = function () {
      clockModel.time(hourArrow, minuteArrow, secondArrow);
      time = setInterval(() => {
        clockModel.time(hourArrow, minuteArrow, secondArrow);
      }, 1000);
    };
  }
}
