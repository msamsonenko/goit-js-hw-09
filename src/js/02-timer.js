import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: [],
  
};

const instance = flatpickr('#datetime-picker', options);

console.log(options)
console.log(instance)
function closeCalendar(selectedDates) {

  const currentDate = Date.now();
  const selectedDate = new Date(selectedDates);
  this.defaultDate = selectedDate;


  console.log(currentDate);
  console.log(selectedDate)
  console.log(this)
  if (selectedDate.getTime() < currentDate) {
    alert('choose a valid date in the future')
    return;
  }
  startBtn.disabled = false;
 
}
instance.config.onClose.push(closeCalendar)

function onStartBtnClick() {
  const currentDate = Date.now();
const pickedDate = instance.config.defaultDate.getTime();

  let timeRemaining =  pickedDate - currentDate;
  setInterval(() => {
      timeRemaining -= 1000;
      console.log(convertMs(timeRemaining));
      console.log(timeRemaining);
    }, 1000);
    console.log(timeRemaining);
    convertMs(timeRemaining);

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
