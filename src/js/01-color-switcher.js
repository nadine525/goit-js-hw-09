const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  stopBtn.disabled = false;
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;

  clearInterval(timerId);
});
