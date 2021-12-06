import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    console.log(
      ...selectedDates.map(one => {
        console.log(one);
      }),
    );
  },
};

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

flatpickr('#datetime-picker', options);
