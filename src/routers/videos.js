import express from 'express';
import {
  getVideos,
  watchVideo,
  editVideo,
  saveVideo,
  postVideo,
  getUpload,
} from '../controllers/videos';

export default function videosRouter() {
  const router = express.Router();
  const PARAM_ID = ':id(\\d+)';

  router.get('/', getVideos);
  router.get(`/${PARAM_ID}`, watchVideo);
  router.route(`/${PARAM_ID}/edit`).post(saveVideo).get(editVideo);
  router.route('/upload').post(postVideo).get(getUpload);

  return router;
}
