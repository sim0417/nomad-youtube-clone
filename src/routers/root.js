import express from 'express';
import { getVideos, searchVideo } from '../controllers/videos';
import { viewSignup, signup, viewLogin, login } from '../controllers/users';

export default function rootRouter() {
  const router = express.Router();
  router.get('/', getVideos);
  router.get('/search', searchVideo);
  router.get('/signup', viewSignup);
  router.post('/signup', signup);
  router.get('/login', viewLogin);
  router.post('/login', login);

  return router;
}
