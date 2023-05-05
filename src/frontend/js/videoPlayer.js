const video = document.getElementById('video');
const palyButton = document.getElementById('paly');
const muteButton = document.getElementById('mute');
const timeText = document.getElementById('time');
const volumeRange = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');

let volumeValue = 0.5;
video.volume = volumeValue;

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

const getFormattedTime = (second) => {
  const subStartIndex = 11;
  const subEndIndex = subStartIndex + 8;
  const isosDateTime = new Date(second * 1000).toISOString();

  return isosDateTime.substring(subStartIndex, subEndIndex);
};

const handleVideoLoadMetadata = () => {
  const videoDuration = video.duration;
  totalTime.innerText = getFormattedTime(Math.floor(videoDuration));
};

const handleVideoTimeUpdate = () => {
  const videoCurrentTime = video.currentTime;
  currentTime.innerText = getFormattedTime(Math.floor(videoCurrentTime));
};

palyButton.addEventListener('click', handleVideoPlay);
muteButton.addEventListener('click', handleVideoMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadedmetadata', handleVideoLoadMetadata);
video.addEventListener('timeupdate', handleVideoTimeUpdate);
