function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

let intervalId = null;

start.addEventListener('click', () => {
  intervalId = setInterval(() => {
    onStart();
  }, 1000);
});

stop.addEventListener('click', () => {
  clearInterval(intervalId);
  onStop();
});

function onStart() {
  document.body.style.backgroundColor = getRandomHexColor();
  start.setAttribute('disabled', true);
  stop.removeAttribute('disabled');
}

function onStop() {
  stop.setAttribute('disabled', true);
  start.removeAttribute('disabled');
}
