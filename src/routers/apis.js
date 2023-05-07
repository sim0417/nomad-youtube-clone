import express from 'express';
import { registerView } from '../controllers/videos';

export default function apiRouter() {
  const router = express.Router();
  const PARAM_ID = ':id([0-9a-f]{24})';

  router.post(`/videos/${PARAM_ID}/view`, registerView);

  return router;
}
