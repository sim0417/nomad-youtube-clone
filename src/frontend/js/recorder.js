import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const recordStartButton = document.querySelector('#record-start-btn');
const recordView = document.querySelector('#record-view');

let stream;
let recorder;
let videoFile;

const startRecordingHandler = () => {
  recordStartButton.textContent = 'Stop Recording';
  recordStartButton.removeEventListener('click', startRecordingHandler);
  recordStartButton.addEventListener('click', stopRecordingHandler);

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
  recordStartButton.removeEventListener('click', stopRecordingHandler);
  recordStartButton.addEventListener('click', downloadRecordFileHandler);
  recorder.stop();
};

const downloadRecordFileHandler = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
  });
  await ffmpeg.load();

  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile));
  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4');

  await ffmpeg.run(
    '-i',
    'recording.webm',
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    'thumbnail.jpg',
  );

  const mp4VideoFile = ffmpeg.FS('readFile', 'output.mp4');
  const mp4VideoBlob = new Blob([mp4VideoFile.buffer], { type: 'video/mp4' });
  const mp4Url = URL.createObjectURL(mp4VideoBlob);

  const elementVideoDownloadLink = document.createElement('a');
  elementVideoDownloadLink.href = mp4Url;
  elementVideoDownloadLink.download = 'my-record-video.mp4';
  document.body.appendChild(elementVideoDownloadLink);
  elementVideoDownloadLink.click();

  const thumbnailFile = ffmpeg.FS('readFile', 'thumbnail.jpg');
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: 'image/jpg' });
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  const elementThumbnailDownloadLink = document.createElement('a');
  elementThumbnailDownloadLink.href = thumbnailUrl;
  elementThumbnailDownloadLink.download = 'my-record-thumbnail.jpg';
  document.body.appendChild(elementThumbnailDownloadLink);
  elementThumbnailDownloadLink.click();
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
  recordStartButton.addEventListener('click', startRecordingHandler);
};
