const recordStartButton = document.querySelector('#record-start-btn');
const recordView = document.querySelector('#record-view');

let stream;
let recorder;
let videoFile;

const startRecordingHandler = () => {
  recordStartButton.textContent = 'Stop Recording';
  recordStartButton.addEventListener('click', stopRecordingHandler);
  recordStartButton.removeEventListener('click', startRecordingHandler);

  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recordView.srcObject = null;
    recordView.src = videoFile;
    recordView.loop = true;
    recordView.play();
  };
  recorder.start();
};

const stopRecordingHandler = () => {
  recordStartButton.textContent = 'Download Recording';
  recordStartButton.addEventListener('click', downloadRecordFileHandler);
  recordStartButton.removeEventListener('click', stopRecordingHandler);

  recorder.stop();
};

const downloadRecordFileHandler = () => {
  const elementDownloadLink = document.createElement('a');
  elementDownloadLink.href = videoFile;
  elementDownloadLink.download = 'my-record-video.webm';
  document.body.appendChild(elementDownloadLink);
  elementDownloadLink.click();
};

const initRecord = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  recordView.srcObject = stream;
  recordView.play();
};

window.onload = () => {
  initRecord();
  recordStartButton.addEventListener('click', stopRecordingHandler);
};
