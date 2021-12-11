import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//function for converting UTC time to user readable time
import { convertMs } from './02-timer/02-convert-ms';
//object with DOM elements displaying timer
import { timerElements } from './02-timer/02-timer-elements';
const {
  days: daysElem,
  hours: hoursElem,
  minutes: minutesElem,
  seconds: secondsElem,
  startBtn,
} = timerElements;

import Notiflix from 'notiflix';

//disabling start button on page load
startBtn.disabled = true;
//flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //get current date
    const currentDate = Date.now();
    //get selected date
    const selectedDate = new Date(selectedDates);
    //sets input display date to salected date
    this.defaultDate = selectedDate;
    //checks if the selected date is in the future
    if (selectedDate.getTime() < currentDate) {
      Notiflix.Notify.failure('Choose a valid date in the future');
      return;
    }
    //enabling start button
    startBtn.disabled = false;
    //add event listener to the start btn
    startBtn.addEventListener('click', () => {
      //on click get current date
      const currentDate = Date.now();
      // calculate time left to selected date
      let timeRemaining = selectedDate.getTime() - currentDate;
      //timer satrt, called every second
      const timerId = setInterval(() => {
        //stops timer if remaining time is less then a second
        if (timeRemaining < 1000) {
          Notiflix.Notify.success('Congrats! Countdown coplete.');
          clearInterval(timerId);
          return;
        }
        //decrements remaining time by second
        timeRemaining -= 1000;
        //convert remaining time to user readable time
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        //displays timer on page
        daysElem.textContent = addLeadingZero(days);
        hoursElem.textContent = addLeadingZero(hours);
        minutesElem.textContent = addLeadingZero(minutes);
        secondsElem.textContent = addLeadingZero(seconds);
      }, 1000);
    });
  },
};
//create instance of flatpicker
flatpickr('#datetime-picker', options);
//adds leading zero to timer elements, for user friendly display
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
