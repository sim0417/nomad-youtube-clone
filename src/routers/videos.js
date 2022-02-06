import express from 'express';
import { getVideos } from '../controllers/videos';

export default function videosRouter() {
  const router = express.Router();
  router.get('/', getVideos);

  return router;
}
