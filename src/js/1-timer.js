
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import imageUrl from '../img/alert-icon.svg'

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            refs.startBtn.setAttribute('disabled', '');
            refs.startBtn.classList.remove('right-date');
                   iziToast.error({
                       message: 'Please choose a date in the future',
                       backgroundColor: '#ef4040',
                       messageColor: '#fff',
                       messageSize: '16',
                       imageWidth: 302,
                       close: true,
                       closeOnEscape: true,
                       closeOnClick: true,
                       progressBar: true,
                       progressBarColor: '#b51b1b',
                       transitionIn: 'flipInX',
                       transitionOut: 'flipOutX',
                       position: 'topRight',
                       iconUrl: imageUrl,
                       iconColor: '#FAFAFB',
                
            });
            
        } else {
          refs.startBtn.removeAttribute('disabled', ''),
            refs.startBtn.classList.add('right-date')
    };
    console.log(selectedDates[0]);
    }
};

flatpickr(refs.input, options);



refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = false;
  startTimer();
});

function startTimer() {
  timerId = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerId);
            updateTimer(0);
            iziToast.success({
                title: 'Complete',
                message: 'Countdown finished!'
            });
            refs.input.disabled = false;
            return;
        }

        updateTimer(timeDifference);
    }, 1000);
};

function updateTimer(ms) {
    const time = convertMs(ms);
    refs.days.textContent = addLeadingZero(time.days);
    refs.hours.textContent = addLeadingZero(time.hours);
    refs.minutes.textContent = addLeadingZero(time.minutes);
    refs.seconds.textContent = addLeadingZero(time.seconds);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

