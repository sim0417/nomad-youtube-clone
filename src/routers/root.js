import express from 'express';
import { getVideos, searchVideo } from '../controllers/videos';
import { viewSignup, signup, viewLogin, login } from '../controllers/users';
import { blockLoginUser } from '../middlewares';

export default function rootRouter() {
  const router = express.Router();
  router.get('/', getVideos);
  router.get('/search', searchVideo);
  router.route('/signup').all(blockLoginUser).get(viewSignup).post(signup);
  router.route('/login').all(blockLoginUser).get(viewLogin).post(login);

  return router;
}
