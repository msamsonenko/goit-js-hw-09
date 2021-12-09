import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { timer } from './02-timer-interface';
const { days: daysElem, hours: hoursElem, minutes: minutesElem, seconds: secondsElem } = timer;

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDate = new Date(selectedDates);

    this.defaultDate = selectedDate;
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
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);

        daysElem.textContent = addLeadingZero(days);
        hoursElem.textContent = addLeadingZero(hours);
        minutesElem.textContent = addLeadingZero(minutes);
        secondsElem.textContent = addLeadingZero(seconds);
      }, 1000);
    });
  },
};

const instance = flatpickr('#datetime-picker', options);

function getSelect(ms) {
  const convertedObj = convertMs(ms);
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
