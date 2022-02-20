import express from 'express';

export default function globalRouter() {
  const router = express.Router();
  const getHomepage = (req, res) => {
    res.render('home');
  };
  router.get('/', getHomepage);

  return router;
}
