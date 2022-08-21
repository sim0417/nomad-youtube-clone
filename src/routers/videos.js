import express from 'express';
import {
  getVideos,
  watchVideo,
  editVideo,
  saveVideo,
  postVideo,
  getUpload,
  deleteVideo,
} from '../controllers/videos';
import { blockNotLoginUser } from '../middlewares';

export default function videosRouter() {
  const router = express.Router();
  const PARAM_ID = ':id([0-9a-f]{24})';

  router.get('/', getVideos);
  router.get(`/${PARAM_ID}`, watchVideo);

  router
    .route(`/${PARAM_ID}/edit`)
    .all(blockNotLoginUser)
    .post(saveVideo)
    .get(editVideo);
  router.route(`/${PARAM_ID}/delete`).all(blockNotLoginUser).get(deleteVideo);
  router.route('/upload').all(blockNotLoginUser).post(postVideo).get(getUpload);

  return router;
}
