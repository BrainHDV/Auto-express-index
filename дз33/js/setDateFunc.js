function setTime(timeFormat, hourDegree) {
  // Всего 360 градусов, 360/60 = 6 - столько градусов нужно передвигать стрелку каждую секунду
  const deg = 6;
  const currentDate = new Date(),
    seconds = currentDate.getSeconds() * deg,
    minutes = currentDate.getMinutes() * deg,
    hours = currentDate.getHours() * hourDegree;
  hourArrow.style.transform = `rotate(${hours + minutes / timeFormat}deg)`;
  minuteArrow.style.transform = `rotate(${minutes}deg)`;
  secondArrow.style.transform = `rotate(${seconds}deg)`;
}
