const context = new AudioContext();
const audioElement = document.getElementById('track');
/* set loop porperty on audio element and dynamically add the loop attribute to the audio element. Set the value of the attribute to true. */
audioElement.loop = true;
const source = context.createMediaElementSource(audioElement);

source.connect(context.destination);
// create buffer source using AJAX request
const bufferSource = context.createBufferSource();
const request = new XMLHttpRequest();
request.open('GET', 'audio/Late_Night_Drive.mp3', true);
request.responseType = 'arraybuffer';
request.onload = () => {
  context.decodeAudioData(request.response, (buffer) => {
    bufferSource.buffer = buffer;
    // ...
  });
};
request.send();
// buffer
bufferSource.start();
// when un-commented, the music plays on page  load
// audioElement.play();

// start/top buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const refreshButton = document.getElementById('refresh');
let confettiSettings = { target: 'my-canvas' };
let confetti = new ConfettiGenerator(confettiSettings);

// create random background color
function randomBgColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  let bgColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(bgColor);
  document.body.style.backgroundColor = bgColor;
}

function randomBtnColor1() {
  // set up random button background color
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let bgBtnColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(bgBtnColor);
  const button1 = document.querySelector('#start');
  button1.style.backgroundColor = bgBtnColor;
  // set up button color
  let red2 = Math.floor(Math.random() * 255);
  let green2 = Math.floor(Math.random() * 255);
  let blue2 = Math.floor(Math.random() * 255);
  let btnColor = `rgb(${red2}, ${green2}, ${blue2})`;
  button1.style.color = btnColor;
}

function randomBtnColor2() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let bgBtnColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(bgBtnColor);
  const button2 = document.querySelector('#stop');
  button2.style.backgroundColor = bgBtnColor;
  let red2 = Math.floor(Math.random() * 255);
  let green2 = Math.floor(Math.random() * 255);
  let blue2 = Math.floor(Math.random() * 255);
  let btnColor = `rgb(${red2}, ${green2}, ${blue2})`;
  button2.style.color = btnColor;
}

function refresh() {
  window.location.reload();
}
/* place audioElement.play() inside function so that audio only starts when click on start button instead of on page load. */
function play() {
  const audioElement = document.getElementById('track');
  audioElement.play();
}

refreshButton.addEventListener('click', refresh);

// start button listener
startButton.addEventListener('click', (e) => {
  play();
  if (context.state === 'suspended') {
    context.resume();
    // HTML
  }
  randomBgColor();
  randomBtnColor1();
  confetti.render();
});

// stop button listener
stopButton.addEventListener('click', (e) => {
  context.suspend();
  bufferSource.stop();
  audioElement.pause();
  randomBgColor();
  randomBtnColor2();
  confetti.render();
});
