// настройка, инициализация

// создаём все три компонента
const clockModelNY = new Clock("GMT-5");
const clockViewNY = new ClockViewDOM();
const clockControllerNY = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBodyNY = document.querySelector("#clock-DOM1");

// увязываем компоненты друг с другом
clockModelNY.init(clockViewNY);
clockViewNY.start(clockModelNY, clockBodyNY);
clockControllerNY.start(clockModelNY, clockBodyNY);

// инициируем первичное отображение Model во View
clockModelNY.start();

// создаём все три компонента
const clockModelMinsk = new Clock("GMT+3");
const clockViewMinsk = new ClockViewDOM();
const clockControllerMinsk = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBodyMinsk = document.querySelector("#clock-DOM2");

// увязываем компоненты друг с другом
clockModelMinsk.init(clockViewMinsk);
clockViewMinsk.start(clockModelMinsk, clockBodyMinsk);
clockControllerMinsk.start(clockModelMinsk, clockBodyMinsk);

// инициируем первичное отображение Model во View
clockModelMinsk.start();
