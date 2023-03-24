import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let selectedMs = null;
let timerId = null;

startButton.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectTime(selectedDates);
  },
};

const flatpick = flatpickr('#datetime-picker', options);

function selectTime(selectedDates) {
  selectedMs = selectedDates[0].getTime();
  if (selectedMs < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
  startButton.removeAttribute('disabled');
}

function countTime() {
  if (selectedMs > Date.now()) {
    timerId = setInterval(() => {
      const difference = selectedMs - Date.now();

      secondsElement.textContent = convertMs(difference).seconds;
      minutesElement.textContent = convertMs(difference).minutes;
      hoursElement.textContent = convertMs(difference).hours;
      daysElement.textContent = convertMs(difference).days;

      if (difference < 1000) {
        clearInterval(timerId);
      }
    }, 1000);
  }
  startButton.setAttribute('disabled', 'true');
}

startButton.addEventListener('click', countTime);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
