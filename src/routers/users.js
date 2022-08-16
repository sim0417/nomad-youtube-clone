import express from 'express';
import {
  logout,
  viewEdit,
  viewProfile,
  editProfile,
  authGithub,
  authGithubCallback,
} from '../controllers/users';

export default function usersRouter() {
  const router = express.Router();

  router.get('/logout', logout);
  router.get('/edit', viewEdit);
  router.get('/github', authGithub);
  router.get('/github/callback', authGithubCallback);
  router.get('/profile', viewProfile);
  router.post('/profile', editProfile);

  return router;
}
