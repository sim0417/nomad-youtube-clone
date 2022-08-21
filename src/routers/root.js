import express from 'express';
import { getVideos, searchVideo } from '../controllers/videos';
import { viewSignup, signup, viewLogin, login } from '../controllers/users';
import { blockLoginUser } from '../middlewares';

export default function rootRouter() {
  const router = express.Router();
  router.get('/', getVideos);
  router.get('/search', searchVideo);

  router.all('/signup', blockLoginUser);
  router.get('/signup', viewSignup);
  router.post('/signup', signup);

  router.all('/login', blockLoginUser);
  router.get('/login', viewLogin);
  router.post('/login', login);

  return router;
}
