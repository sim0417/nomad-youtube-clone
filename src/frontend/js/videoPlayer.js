const video = document.getElementById('video');

const playButton = document.getElementById('play');
const playBtnIcon = playButton.querySelector('i');
const muteButton = document.getElementById('mute');
const muteBtnIcon = muteButton.querySelector('i');
const fullScreenButton = document.getElementById('fullScreen');
const fullScreenIcon = fullScreenButton.querySelector('i');

const currentTimeText = document.getElementById('currentTime');
const totalTimeText = document.getElementById('totalTime');

const volumeRange = document.getElementById('volume');
const timelineRange = document.getElementById('timeline');

const videoContainer = document.getElementById('videoContainer');
const videoControllers = document.getElementById('videoControllers');

const DEFAULT_VOLUME = 0.5;

let volumeValue = DEFAULT_VOLUME;
video.volume = volumeValue;

let mouseLeaveControllerShowTimerId = null;
let mouseStopControllerShowTimeId = null;

let isVideoEnd = false;

const handleVideoPlay = () => {
  if (!video) return;

  if (isVideoEnd === true) {
    video.currentTime = 0;
    playBtnIcon.classList = 'fas fa-pause';
    video.play();
    return;
  }

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
};

const handleVideoMute = () => {
  if (!video) return;

  if (volumeValue === 0) {
    video.muted = false;
    volumeRange.value = DEFAULT_VOLUME;
    volumeValue = DEFAULT_VOLUME;
    muteBtnIcon.classList = 'fas fa-volume-up';
    return;
  }

  const isMuted = video.muted;

  video.muted = !isMuted;
  muteBtnIcon.classList = isMuted ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  volumeRange.value = isMuted ? volumeValue : 0;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  let numberValue = Number(value);

  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = 'fas fa-volume-up';
  }

  if (numberValue === 0) {
    video.muted = true;
    muteBtnIcon.classList = 'fas fa-volume-mute';
  }

  volumeValue = numberValue;
  video.volume = numberValue;
};

const handleVideoFullScreen = () => {
  const docFullScreen = document.fullscreenElement;

  if (docFullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const handleVideoFullScreenChange = () => {
  fullScreenIcon.classList = document.fullscreenElement
    ? 'fas fa-compress'
    : 'fas fa-expand';
};

const getFormattedTime = (second) => {
  const subStartIndex = 11;
  const subEndIndex = subStartIndex + 8;
  const isosDateTime = new Date(second * 1000).toISOString();

  return isosDateTime.substring(subStartIndex, subEndIndex);
};

const handleVideoLoadData = () => {
  const videoDuration = Math.floor(video.duration);
  totalTimeText.innerText = getFormattedTime(videoDuration);

  timelineRange.max = videoDuration;

  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
  muteBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up';
  fullScreenIcon.classList = document.fullscreenElement
    ? 'fas fa-compress'
    : 'fas fa-expand';
};

const handleVideoTimeUpdate = () => {
  const videoDuration = Math.floor(video.duration);
  const videoCurrentTime = Math.floor(video.currentTime);
  currentTimeText.innerText = getFormattedTime(videoCurrentTime);
  timelineRange.value = videoCurrentTime;

  if (videoDuration === videoCurrentTime) {
    playBtnIcon.classList = 'fas fa-redo-alt';
    isVideoEnd = true;
  } else {
    playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
    isVideoEnd = false;
  }
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

const handleVideoKeyDown = (event) => {
  const { code } = event;
  if (code === 'Space') {
    handleVideoPlay();
  }
};

const handleVideoEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  });
};

playButton.addEventListener('click', handleVideoPlay);
muteButton.addEventListener('click', handleVideoMute);
fullScreenButton.addEventListener('click', handleVideoFullScreen);
volumeRange.addEventListener('input', handleVolumeChange);
timelineRange.addEventListener('input', handleChangeVideoTimeline);
video.addEventListener('loadedmetadata', handleVideoLoadData);
video.addEventListener('timeupdate', handleVideoTimeUpdate);
video.addEventListener('click', handleVideoPlay);
video.addEventListener('ended', handleVideoEnded);
videoContainer.addEventListener('mousemove', handleVideoMouseMove);
videoContainer.addEventListener('mouseleave', handleVideoMouseLeave);
videoContainer.addEventListener(
  'fullscreenchange',
  handleVideoFullScreenChange,
);
document.addEventListener('keydown', handleVideoKeyDown);
