import express from 'express';
import {
  logout,
  viewEdit,
  viewProfile,
  signout,
  authGithub,
  authGithubCallback,
} from '../controllers/users';

export default function usersRouter() {
  const router = express.Router();

  router.get('/logout', logout);
  router.get('/edit', viewEdit);
  router.get('/remove', signout);
  router.get('/github', authGithub);
  router.get('/github/callback', authGithubCallback);

  router.get('/:id', viewProfile);

  return router;
}
