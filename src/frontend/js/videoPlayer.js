const video = document.getElementById('video');
const palyButton = document.getElementById('paly');
const muteButton = document.getElementById('mute');
const timeText = document.getElementById('time');
const volumeRange = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const timelineRange = document.getElementById('timeline');
const fullScreenButton = document.getElementById('fullScreen');
const videoContainer = document.getElementById('videoContainer');
const videoControllers = document.getElementById('videoControllers');

let volumeValue = 0.5;
video.volume = volumeValue;

let mouseLeaveControllerShowTimerId = null;
let mouseStopControllerShowTimeId = null;

const handleVideoPlay = () => {
  if (!video) return;

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  palyButton.innerText = video.paused ? 'Play' : 'Pause';
};

const handleVideoMute = () => {
  if (!video) return;

  const isMuted = video.muted;

  video.muted = !isMuted;
  muteButton.innerText = isMuted ? 'Mute' : 'Unmute';
  volumeRange.value = isMuted ? volumeValue : 0;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteButton.innerText = 'Mute';
  }

  volumeValue = value;
  video.volume = value;
};

const handleVideoFullScreen = () => {
  const docFullScreen = document.fullscreenElement;

  if (docFullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }

  fullScreenButton.innerText = docFullScreen
    ? 'Full Screen'
    : 'Exit Full Screen';
};

const getFormattedTime = (second) => {
  const subStartIndex = 11;
  const subEndIndex = subStartIndex + 8;
  const isosDateTime = new Date(second * 1000).toISOString();

  return isosDateTime.substring(subStartIndex, subEndIndex);
};

const handleVideoLoadMetadata = () => {
  const videoDuration = Math.floor(video.duration);
  totalTime.innerText = getFormattedTime(videoDuration);

  timelineRange.max = videoDuration;
};

const handleVideoTimeUpdate = () => {
  const videoCurrentTime = Math.floor(video.currentTime);
  currentTime.innerText = getFormattedTime(videoCurrentTime);
  timelineRange.value = videoCurrentTime;
};

const handleChangeVideoTimeline = (event) => {
  const {
    target: { value },
  } = event;

  video.currentTime = value;
};

const hideVideoContollers = () => videoControllers.classList.remove('show');

const handleVideoMouseMove = () => {
  if (mouseLeaveControllerShowTimerId) {
    clearTimeout(mouseLeaveControllerShowTimerId);
    mouseLeaveControllerShowTimerId = null;
  }
  if (mouseStopControllerShowTimeId) {
    clearTimeout(mouseStopControllerShowTimeId);
    mouseStopControllerShowTimeId = null;
  }

  videoControllers.classList.add('show');
  mouseStopControllerShowTimeId = setTimeout(hideVideoContollers, 3000);
};

const handleVideoMouseLeave = () => {
  mouseLeaveControllerShowTimerId = setTimeout(hideVideoContollers, 3000);
};

palyButton.addEventListener('click', handleVideoPlay);
muteButton.addEventListener('click', handleVideoMute);
fullScreenButton.addEventListener('click', handleVideoFullScreen);
volumeRange.addEventListener('input', handleVolumeChange);
timelineRange.addEventListener('input', handleChangeVideoTimeline);
video.addEventListener('loadedmetadata', handleVideoLoadMetadata);
video.addEventListener('timeupdate', handleVideoTimeUpdate);
video.addEventListener('mousemove', handleVideoMouseMove);
video.addEventListener('mouseleave', handleVideoMouseLeave);
