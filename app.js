const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

// Making the format of the output time display
const padLeft = (value, length) =>
  value.toString().length < length ? padLeft("0" + value, length) : value;

const makeTimeDisplay = () =>
  `${padLeft(Math.floor(fakeDuration / 60), 2)}:${padLeft(
    Math.floor(fakeDuration % 60),
    2
  )}`;

timeDisplay.textContent = makeTimeDisplay();

// Play the sounds
sounds.forEach((sound) => {
  sound.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function () {
  checkPlaying(song);
});

// replay the actual sound and reset the duration
replay.addEventListener("click", function () {
  restartSong(song);
});

const restartSong = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
};

// Selecting the time duration
timeSelect.forEach((option) => {
  option.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = makeTimeDisplay();
  });
});

// Check if the song is playing or stopped
const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

// Make the animation of the circle and the time display
song.ontimeupdate = function () {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = padLeft(Math.floor(elapsed % 60), 2);
  let minutes = padLeft(Math.floor(elapsed / 60), 2);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
