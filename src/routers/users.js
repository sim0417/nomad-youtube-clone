import express from 'express';
import {
  logout,
  viewEditProfile,
  editProfile,
  authGithub,
  authGithubCallback,
} from '../controllers/users';
import { blockNotLoginUser, blockLoginUser } from '../middlewares';

export default function usersRouter() {
  const router = express.Router();

  router.get('/logout', blockNotLoginUser, logout);
  router.get('/github', blockLoginUser, authGithub);
  router.get('/github/callback', blockLoginUser, authGithubCallback);

  router.all('/edit-profile', blockNotLoginUser);
  router.get('/edit-profile', viewEditProfile);
  router.post('/edit-profile', editProfile);

  return router;
}
