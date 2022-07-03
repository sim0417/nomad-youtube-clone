import express from 'express';
import { getVideos, watchVideo, editVideo, saveVideo } from '../controllers/videos';

export default function videosRouter() {
  const router = express.Router();
  router.get('/', getVideos);
  router.get('/:id', watchVideo);
  router.post('/:id/edit', saveVideo);
  router.get('/:id/edit', editVideo);
  return router;
}
