import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0] - Date.now());
    const dif = selectedDates[0] - Date.now();
    if (dif <= 0) {
      alert('Please choose a date in the future');
      return;
    }
    btnStart.removeAttribute('disabled');
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onClick);

function onClick() {
  setInterval(() => {
    const dif = new Date(input.value) - Date.now();
    if (dif <= 0) {
      return;
    }
    btnStart.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    const { days, hours, minutes, seconds } = convertMs(dif);
    refs.days.textContent = addLeadingZero(days.toString());
    refs.hours.textContent = addLeadingZero(hours.toString());
    refs.minutes.textContent = addLeadingZero(minutes.toString());
    refs.seconds.textContent = addLeadingZero(seconds.toString());
  }, 1000);
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

function addLeadingZero(value) {
  return value.padStart('2', '0');
}
