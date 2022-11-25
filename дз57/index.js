// настройка, инициализация

// создаём все три компонента
const clockModel = new Clock();
const clockView = new ClockViewDOM();
const clockController = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBody = document.querySelector(".clock__body");

// увязываем компоненты друг с другом
clockModel.init(clockView);
clockView.start(clockModel, clockBody);
clockController.start(clockModel, clockBody);

// инициируем первичное отображение Model во View
clockModel.start();
