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
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDate = new Date(selectedDates);

    this.defaultDate = selectedDate;
    console.log(selectedDate);
    getSelect(selectedDate.getTime() - currentDate);
    if (selectedDate.getTime() < currentDate) {
      alert('choose a valid date in the future');
      return;
    }
    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      const currentDate = Date.now();

      let timeRemaining = selectedDate.getTime() - currentDate;

      const timerId = setInterval(() => {
        if (timeRemaining < 1000) {
          alert('the end');
          clearInterval(timerId);
          return;
        }
        timeRemaining -= 1000;
        console.log(convertMs(timeRemaining));
      }, 1000);
      convertMs(timeRemaining);
    });
  },
};

const instance = flatpickr('#datetime-picker', options);

console.log(instance.config);

function getSelect(ms) {
  convertMs(ms);
  console.log(convertMs(ms));
}

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
