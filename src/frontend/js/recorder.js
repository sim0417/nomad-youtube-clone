import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const recordButton = document.querySelector('#record-btn');
const recordView = document.querySelector('#record-view');

let stream;
let recorder;
let videoFile;

const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
});

const FFMPEG_FILE_NAME = {
  INPUT: 'recording.webm',
  OUTPIT: 'output.mp4',
  THUMBNAIL: 'thumbnail.jpg',
};

const startRecordingHandler = () => {
  recordButton.disabled = true;
  recordButton.innerText = 'Recording';
  recordButton.removeEventListener('click', startRecordingHandler);

  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recordView.srcObject = null;
    recordView.src = videoFile;
    recordView.loop = true;
    recordView.play();

    recordButton.innerText = 'Download';
    recordButton.addEventListener('click', downloadRecordFileHandler);
    recordButton.disabled = false;
  };
  recorder.start();

  setTimeout(() => {
    recorder.stop();
  }, 3000);
};

const makeDownloadLink = ({ fileName, fileUrl }) => {
  const elementDownloadLink = document.createElement('a');
  elementDownloadLink.href = fileUrl;
  elementDownloadLink.download = fileName;
  document.body.appendChild(elementDownloadLink);
  elementDownloadLink.click();
};

const downloadRecordFileHandler = async () => {
  recordButton.textContent = 'Downloading...';
  recordButton.disabled = true;

  ffmpeg.FS('writeFile', FFMPEG_FILE_NAME.INPUT, await fetchFile(videoFile));
  await ffmpeg.run(
    '-i',
    FFMPEG_FILE_NAME.INPUT,
    '-r',
    '60',
    FFMPEG_FILE_NAME.OUTPIT,
  );
  await ffmpeg.run(
    '-i',
    FFMPEG_FILE_NAME.INPUT,
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    FFMPEG_FILE_NAME.THUMBNAIL,
  );

  const mp4VideoFile = ffmpeg.FS('readFile', FFMPEG_FILE_NAME.OUTPIT);
  const mp4VideoBlob = new Blob([mp4VideoFile.buffer], { type: 'video/mp4' });
  const mp4Url = URL.createObjectURL(mp4VideoBlob);

  makeDownloadLink({ fileName: 'my-record-video.mp4', fileUrl: mp4Url });

  const thumbnailFile = ffmpeg.FS('readFile', FFMPEG_FILE_NAME.THUMBNAIL);
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: 'image/jpg' });
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  makeDownloadLink({
    fileName: 'my-record-thumbnail.jpg',
    fileUrl: thumbnailUrl,
  });

  ffmpeg.FS('unlink', FFMPEG_FILE_NAME.INPUT);
  ffmpeg.FS('unlink', FFMPEG_FILE_NAME.OUTPIT);
  ffmpeg.FS('unlink', FFMPEG_FILE_NAME.THUMBNAIL);

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbnailUrl);

  recordButton.disabled = false;
  recordButton.textContent = 'Record Again';
  recordButton.removeEventListener('click', downloadRecordFileHandler);
  recordButton.addEventListener('click', startRecordingHandler);
};

const initRecord = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });

  recordView.srcObject = stream;
  recordView.play();
};

window.onload = async () => {
  initRecord();
  recordButton.addEventListener('click', startRecordingHandler);

  await ffmpeg.load();
};
