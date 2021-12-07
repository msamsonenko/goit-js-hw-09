import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: [
    function (selectedDates) {
      this.defaultDate = selectedDates;
      // const currentDate = Date.now();
      // const selectedDate = new Date(selectedDates).getTime();
      // if (selectedDate < currentDate) {
      //   return;
      // }
      // startBtn.disabled = false;
      // let timeRemaining = selectedDate - currentDate;
      // setInterval(() => {
      //   timeRemaining -= 1000;
      //   console.log(convertMs(timeRemaining));
      //   console.log(timeRemaining);
      // }, 1000);
      // console.log(timeRemaining);
      // convertMs(timeRemaining);
    },
  ],
};

flatpickr('#datetime-picker', options);

function checkSelectedDate(selectedDates) {}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
