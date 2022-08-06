import express from 'express';
import { getHomepage } from '../controllers/root';

export default function rootRouter() {
  const router = express.Router();
  router.get('/', getHomepage);

  return router;
}
