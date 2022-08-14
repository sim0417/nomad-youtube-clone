import express from 'express';
import { getHomepage, search } from '../controllers/root';

export default function rootRouter() {
  const router = express.Router();
  router.get('/', getHomepage);
  router.get('/search', search);

  return router;
}
