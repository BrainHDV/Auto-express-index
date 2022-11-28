// настройка, инициализация

// создаём все три компонента
const clockModelNY = new Clock("GMT-5");
const clockViewNY = new ClockViewDOM();
const clockControllerNY = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBody1 = document.querySelector("#clock-DOM1");

// увязываем компоненты друг с другом
clockModelNY.init(clockViewNY);
clockViewNY.start(clockModelNY, clockBody1);
clockControllerNY.start(clockModelNY, clockBody1);

// инициируем первичное отображение Model во View
clockModelNY.start();

// создаём все три компонента
const clockModelMinsk = new Clock("GMT+3");
const clockViewMinsk = new ClockViewDOM();
const clockControllerMinsk = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBody2 = document.querySelector("#clock-DOM2");

// увязываем компоненты друг с другом
clockModelMinsk.init(clockViewMinsk);
clockViewMinsk.start(clockModelMinsk, clockBody2);
clockControllerMinsk.start(clockModelMinsk, clockBody2);

// инициируем первичное отображение Model во View
clockModelMinsk.start();
