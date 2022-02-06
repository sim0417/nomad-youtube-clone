import express from 'express';

export default function globalRouter() {
  const router = express.Router();
  const getHomepage = (req, res) => {
    res.send('Homepage');
  };
  router.get('/', getHomepage);

  return router;
}
