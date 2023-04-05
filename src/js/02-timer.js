// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    const selected = selectedDates[0];
    if (selected <= now) {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const datePicker = document.querySelector(`#datetime-picker`);

let timerId;

startBtn.disabled = true;
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datePicker.disabled = true;
  const selected = new Date(datePicker.value);
  timerId = setInterval(() => {
    const remaining = selected - new Date();
    if (remaining <= 0) {
      datePicker.disabled = false;
      clearInterval(timerId);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(remaining);
      daysValue.textContent = String(days).padStart(2, '0');
      hoursValue.textContent = String(hours).padStart(2, '0');
      minutesValue.textContent = String(minutes).padStart(2, '0');
      secondsValue.textContent = String(seconds).padStart(2, '0');
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
