import express from 'express';
import {
  logout,
  viewEditProfile,
  editProfile,
  authGithub,
  authGithubCallback,
  viewEditPassword,
  editPassword,
  viewUserProfile,
} from '../controllers/users';
import {
  blockNotLoginUser,
  blockLoginUser,
  uploadAvatarFiles,
} from '../middlewares';

export default function usersRouter() {
  const router = express.Router();

  router.get('/logout', blockNotLoginUser, logout);
  router.get('/github', blockLoginUser, authGithub);
  router.get('/github/callback', blockLoginUser, authGithubCallback);

  router
    .route('/edit-profile')
    .all(blockNotLoginUser)
    .get(viewEditProfile)
    .post(uploadAvatarFiles.single('avatar'), editProfile);

  router
    .route('/edit-password')
    .all(blockNotLoginUser)
    .get(viewEditPassword)
    .post(editPassword);

  router.get('/:id', viewUserProfile);

  return router;
}
