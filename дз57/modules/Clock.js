let time;

class Clock {
  constructor() {
    let clockView = null;

    this.init = function (view) {
      clockView = view;
    };

    this.start = function () {
      if (clockView) clockView.update();
    };

    this.stop = function () {
      clearInterval(time);
      time = null;
    };

    this.time = function (hourArrow, minuteArrow, secondArrow) {
      const secDeg = 6;
      const hourDeg = 30;
      const timeFormat = 12;
      const currentDate = new Date(),
        seconds = currentDate.getSeconds() * secDeg,
        minutes = currentDate.getMinutes() * secDeg,
        hours = currentDate.getHours() * hourDeg;
      hourArrow.style.transform = `rotate(${hours + minutes / timeFormat}deg)`;
      minuteArrow.style.transform = `rotate(${minutes}deg)`;
      secondArrow.style.transform = `rotate(${seconds}deg)`;
    };
  }
}
