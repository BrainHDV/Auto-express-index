let time;

class Clock {
  constructor() {
    let clockView = null;

    this.init = function (view) {
      clockView = view;
    };

    this.updateView = function () {
      if (clockView) clockView.update();
    };

    this.start = function () {
      this.updateView();
      time = setInterval(() => {
        clockView.update();
      }, 1000);
    };

    this.stop = function () {
      clearInterval(time);
      time = null;
    };
  }
}
