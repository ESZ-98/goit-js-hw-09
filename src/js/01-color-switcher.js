const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');
let timerId = null;

stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
   stopButton.setAttribute('disabled', true);
startButton.removeAttribute('disabled');
clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
