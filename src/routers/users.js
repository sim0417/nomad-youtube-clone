import express from 'express';
import { getUser } from '../controllers/users';

export default function usersRouter() {
  const router = express.Router();
  router.get('/', getUser);

  return router;
}
