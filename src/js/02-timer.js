import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

button.disabled = true;

const option = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.disabled = false;
    }
  },
};

flatpickr(input, option);

let counterId = null;

const onClick = () => {
  counterId = setInterval(() => {
    const futureDate = new Date(input.value);
    const presentDate = Date.now();

    const counterTime = convertMs(futureDate - presentDate);
    // console.log(counterTime);
    changeCounter(counterTime);

    if (
      counterTime.days === 0 &&
      counterTime.hours === 0 &&
      counterTime.minutes === 0 &&
      counterTime.seconds === 0
    ) {
      clearInterval(counterId);
    }
  }, 1000);

  button.disabled = true;
};

button.addEventListener('click', onClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function changeCounter({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);

  input.disabled = true;
}
